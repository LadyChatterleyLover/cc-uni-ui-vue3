<template>
  <view>
    <cc-popup
      v-model="visible"
      :closeOnClickOverlay="closeOnClickOverlay"
      :closeIcon="closeIcon"
      closeable
      @close="close"
      width="600"
    >
      <view class="cc-rotate-verify">
        <view class="cc-rotate-verify-title" :style="{ color: titleColor, fontSize: titleSize }">{{
          title
        }}</view>
        <view class="cc-rotate-verify-desc" :style="{ color: descColor, fontSize: descSize }">{{
          desc
        }}</view>
        <view
          class="cc-rotate-verify-img"
          :style="{ transform: `rotate(${rotate}deg)`, transitionDuration }"
          ><image :src="src" class="cc-rotate-verify-img-image"></image
        ></view>
        <view
          class="cc-rotate-verify-bar"
          :style="{ width: barWidth + 'rpx', height: barHeight + 'rpx', background: barBgColor }"
        >
          <view
            class="cc-rotate-verify-bar-wrap"
            :style="{
              background: barColor,
              width: barHeight + 'rpx',
              height: barHeight + 'rpx',
              transitionDuration,
              transform: `translateX(${translateX}px)`,
            }"
            @touchstart="touchstart"
            @touchmove="touchmove"
            @touchend="touchend"
          >
            <view class="cc-rotate-verify-bar-wrap-arrow"
              ><cc-icon type="arrowright" size="14" color="#fff"></cc-icon
            ></view>
            <view class="cc-rotate-verify-bar-wrap-arrow"
              ><cc-icon type="arrowright" :size="14" color="#fff"></cc-icon
            ></view>
          </view>
        </view>
      </view>
    </cc-popup>
    <cc-toast ref="toast"></cc-toast>
  </view>
</template>

<script setup lang="ts">
import { uni } from '@dcloudio/uni-h5'
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    // 是否显示验证
    modelValue: boolean
    // 验证图片地址
    src: string
    // 标题
    title?: string
    // 标题大小
    titleSize?: string | number
    // 标题颜色
    titleColor?: string
    // 描述
    desc?: string
    // 描述大小
    descSize?: string | number
    // 描述颜色
    descColor?: string
    // 验证弹层背景色
    bgColor?: string
    // 关闭图标
    closeIcon?: string
    // 点击遮罩层是否可关闭
    closeOnClickOverlay?: boolean
    // 滑块宽度
    barWidth?: string | number
    // 滑块高度
    barHeight?: string | number
    // 滑块背景颜色
    barBgColor?: string
    // 滑块颜色
    barColor?: string
    // 图片默认旋转角度
    // 取值范围： -330deg<angle <-30deg 或 30deg<angle<330deg
    angle?: number
    // 误差范围
    errorRange?: number
    // 验证成功提示
    successMsg?: string
    // 验证失败提示
    errMsg?: string
    // 弹框消失时间
    duration?: string | number
  }>(),
  {
    title: '',
    titleSize: 28,
    titleColor: '#999',
    desc: '拖动滑块使图片角度为正',
    descSize: 32,
    descColor: '#333',
    bgColor: '#fff',
    closeIcon: 'closeempty',
    closeOnClickOverlay: true,
    barWidth: 540,
    barHeight: 90,
    barBgColor: 'rgba(86,119,252,.1)',
    barColor: '#5677fc',
    angle: 30,
    errorRange: 5,
    successMsg: '验证成功',
    errMsg: '验证失败, 请重新验证',
    duration: 2000,
  }
)

const emits = defineEmits<{
  'update:modelValue': [val: boolean]
  success: []
  close: []
}>()

const toast = ref()
const visible = ref(props.modelValue)
const rotate = ref(props.angle)
const startX = ref(0)
const translateX = ref(0)
const transitionDuration = ref('0s')
const status = ref<'done' | 'none'>('none')

const close = () => {
  emits('close')
}

const touchstart = e => {
  startX.value = e.changedTouches[0].clientX
  transitionDuration.value = '0s'
}

const touchmove = e => {
  const move = e.changedTouches[0].clientX
  if (startX.value - move > 0) return
  let dis = uni.upx2px(props.barWidth) - uni.upx2px(props.barHeight)
  translateX.value =
    -Math.floor(startX.value - move) >= dis ? dis : -Math.floor(startX.value - move)
  rotate.value =
    Math.floor(
      360 * (translateX.value / (uni.upx2px(props.barWidth) - (props.barHeight as number)))
    ) + props.angle
}

const touchend = e => {
  let dis = uni.upx2px(props.barWidth) - uni.upx2px(props.barHeight)
  if (translateX.value < dis) {
    transitionDuration.value = '0.6s'
    translateX.value = 0
  } else {
    translateX.value = dis
  }
  if (rotate.value >= 360 - Number(props.errorRange) && rotate.value <= 360 + props.errorRange) {
    status.value = 'done'
    toast.value.show({
      type: 'success',
      title: props.successMsg,
    })
    setTimeout(() => {
      visible.value = false
    }, Number(props.duration))
    setTimeout(() => {
      rotate.value = props.angle
    }, Number(Number(props.duration) + 500))
  } else {
    toast.value.show({
      type: 'error',
      title: props.errMsg,
    })
    transitionDuration.value = '0.6s'
    status.value = 'none'
    rotate.value = props.angle
  }
}

watch(
  () => visible.value,
  val => {
    emits('update:modelValue', val)
  }
)

watch(
  () => props.modelValue,
  val => {
    visible.value = val
  }
)

watch(
  () => status.value,
  val => {
    if (val === 'done') emits('success')
  }
)
</script>

<style scoped lang="scss">
.cc-rotate-verify {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-title {
    margin-bottom: 20rpx;
  }
  &-img {
    width: 200rpx;
    height: 200rpx;
    margin: 30rpx 0;
    transition: all 0.6s;
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
  &-bar {
    border-radius: 48rpx;
    &-wrap {
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.6s;
      &-arrow {
        &:first-child {
          position: relative;
          left: 6rpx;
        }
      }
    }
  }
}
</style>
