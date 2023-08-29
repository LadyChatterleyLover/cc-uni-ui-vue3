<template>
  <view
    class="cc-slide-verify"
    :style="{
      width: slideWidth + 'rpx',
      height: slideHeight + 'rpx',
      fontSize,
      background: bgColor,
    }"
  >
    <view
      class="cc-slide-verify-content"
      :style="{ background: activeBgColor, width: activeBarWidth + 'px', transitionDuration }"
    >
      <view
        class="cc-slide-verify-content"
        :style="{ width: slideWidth + 'rpx', height: slideHeight + 'rpx', fontSize }"
        >{{ tip }}</view
      >
    </view>
    <view
      class="cc-slide-verify-drag"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      :style="{ transitionDuration, transform: `translateX(${activeBarWidth}px)` }"
    >
      <template v-if="status === 'none'">
        <view class="cc-slide-verify-drag-arrow"
          ><cc-icon type="arrowright" :size="iconSize" :color="iconColor"></cc-icon
        ></view>
        <view class="cc-slide-verify-drag-arrow"
          ><cc-icon type="arrowright" :size="iconSize" :color="iconColor"></cc-icon
        ></view>
      </template>
      <view class="cc-slide-verify-drag-check" v-else
        ><cc-icon :type="succeccIcon" :size="iconSize" :color="activeIconColor"></cc-icon
      ></view>
    </view>
    <view>{{ tip }}</view>
  </view>
</template>

<script setup lang="ts">
import { uni } from '@dcloudio/uni-h5'
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    // 提示文字
    tip?: string
    // 滑块条宽度
    slideWidth?: string | number
    // 滑块条高度
    slideHeight?: string | number
    // 滑块背景颜色
    bgColor?: string
    // 验证之后的滑块背景颜色
    activeBgColor?: string
    // 图标颜色
    iconColor?: string
    // 验证成功之后图标颜色
    activeIconColor?: string
    // 图标大小
    iconSize?: string | number
    // 字体大小
    fontSize?: string | number
    // 成功图标
    succeccIcon?: string
  }>(),
  {
    tip: '拖动滑块验证',
    slideWidth: 600,
    slideHeight: 60,
    bgColor: '#E9E9E9',
    activeBgColor: '#19be6b',
    iconColor: '#cbcbcb',
    activeIconColor: '#19be6b',
    iconSize: 28,
    fontSize: 28,
    succeccIcon: 'checkbox',
  }
)

const emits = defineEmits<{
  success: []
}>()

const activeBarWidth = ref(0)
const startX = ref(0)
const status = ref<'done' | 'none'>('none')
const transitionDuration = ref('0.6s')

const touchstart = e => {
  startX.value = e.changedTouches[0].clientX
  transitionDuration.value = '0s'
}

const touchmove = e => {
  let move = e.changedTouches[0].clientX
  if (startX.value - move > 0) return
  let dis = uni.upx2px(props.slideWidth) - uni.upx2px(80)
  activeBarWidth.value =
    -Math.floor(startX.value - move) >= dis ? dis : -Math.floor(startX.value - move)
}

const touchend = () => {
  let dis = uni.upx2px(props.slideWidth) - uni.upx2px(80)
  if (activeBarWidth.value < dis) {
    transitionDuration.value = '0.6s'
    activeBarWidth.value = 0
  } else {
    activeBarWidth.value = dis
    status.value = 'done'
    return
  }
}

watch(
  () => status.value,
  val => {
    if (val === 'done') emits('success')
  }
)
</script>

<style scoped lang="scss">
.cc-slide-verify {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &-drag {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 80rpx;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    transition: all;
    &-arrow {
      &:first-child {
        position: relative;
        left: 6rpx;
      }
    }
  }
  &-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    overflow: hidden;
    transition: all;
    color: #fff;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
}
</style>
