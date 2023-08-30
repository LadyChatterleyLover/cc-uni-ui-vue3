<template>
  <view>
    <view class="flex a-center content" v-if="lineData">
      <view><slot name="content"></slot></view>
    </view>
    <view class="flex a-center" style="padding-right: 10rpx">
      <view
        class="progress-container"
        id="container"
        ref="progressContainerRef"
        :style="{ background: inBgColor }"
      >
        <view
          class="progress-content flex j-end"
          id="content"
          ref="progressContentRef"
          :style="{
            height: strokeWidth + 'rpx',
            background: bgColor,
            width: contentWidth,
            transition: `width ${Number(duration) / 1000}s ease`,
          }"
          v-if="isAnimate"
        >
          <view class="textInside flex a-center j-center" v-if="textInside && !noData">
            <view>{{ percentage }}%</view>
          </view>
        </view>
        <view
          v-if="!isAnimate"
          class="progress-content flex j-end"
          :style="{ width: percentage + '%', height: strokeWidth + 'rpx', background: bgColor }"
        >
          <view class="textInside flex a-center j-center" v-if="textInside && !noData">
            <view class="text">{{ percentage }}%</view>
          </view>
        </view>
      </view>
      <view>
        <view class="percentage" v-if="!textInside && !lineData && !noData && !isAnimate"
          >{{ percentage }}%</view
        >
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { uni } from '@dcloudio/uni-h5'
import { nextTick, ref, getCurrentInstance, onMounted, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    // 进度条的值
    percentage: number
    // 是否内联显示数据
    textInside?: boolean
    // 进度条高度
    strokeWidth?: string | number
    // 默认动画时长
    duration?: string | number
    // 是否有动画
    isAnimate?: boolean
    // 背景颜色
    bgColor?: string
    // 是否不显示数据
    noData?: boolean
    // 是否自定义显示内容
    lineData?: boolean
    // 自定义底色
    inBgColor?: string
  }>(),
  {
    textInside: false,
    isAnimate: false,
    lineData: false,
    noData: false,
    strokeWidth: 24,
    duration: 2000,
    bgColor: '#409eff',
    inBgColor: '#ebeef5',
  }
)

const instance = getCurrentInstance()
const contentWidth = ref('')
const progressContainerRef = ref()
const progressContentRef = ref()

const start = () => {
  if (props.isAnimate) {
    // #ifdef H5
    nextTick(() => {
      let progressContainer = progressContainerRef.value.$el
      let progressContent = progressContentRef.value.$el
      let style = window.getComputedStyle(progressContainer, null)
      const w = style.width.replace('px', '')
      let width = Number(w) * ((props.percentage * 1) / 100)
      progressContent.style.width = width.toFixed(2) + 'px'
      progressContent.style.transition = `width ${Number(props.duration) / 1000}s ease`
    })
    // #endif
    const container = uni.createSelectorQuery().in(instance).selectAll('#container')
    container.boundingClientRect().exec(res1 => {
      const w = ((props.percentage * 1) / 100).toFixed(2)
      contentWidth.value = res1[0][0].width * 1 * Number(w) + 'px'
    })
  }
}

onMounted(() => {
  start()
})

watch(
  () => props.percentage,
  () => {
    start()
  }
)
</script>

<style scoped lang="scss">
.content {
  margin-bottom: 20rpx;
  .c-per {
    font-size: 52rpx;
  }
}
.progress-container {
  width: 100%;
  border-radius: 100px;
  .progress-content {
    border-radius: 200rpx;
    width: 0;
  }
  .textInside {
    color: #fff;
    margin-right: 10rpx;
    position: relative;
  }
}
.text {
  margin-left: 10rpx;
}
.percentage {
  margin-left: 12rpx;
  font-size: 12px;
  width: 60rpx;
}
.flex {
  display: flex;
}
.a-center {
  align-items: center;
}
.j-center {
  justify-content: center;
}
.j-between {
  justify-content: space-between;
}
.content {
  margin-bottom: 20rpx;
  color: #666;
  font-size: 32rpx;
}
</style>
