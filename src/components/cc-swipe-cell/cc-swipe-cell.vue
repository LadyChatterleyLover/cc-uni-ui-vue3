<template>
  <view class="cc-swipe-cell" @touchstart="touchStart" @touchend="touchEnd" @touchmove="touchMove">
    <view
      class="cc-swipe-cell-wrap"
      :style="{ transform: `translateX(${slideX}px)`, transitionDuration }"
    >
      <view class="cc-swipe-cell-wrap-left">
        <slot name="left"></slot>
      </view>
      <view class="cc-swipe-cell-wrap-content" @click="handleClick">
        <slot></slot>
      </view>
      <view class="cc-swipe-cell-wrap-right" :id="`cc-swipe-cell-wrap-right-${uid}`">
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { uni } from '@dcloudio/uni-h5'
import { ref, onMounted, getCurrentInstance, nextTick } from 'vue'

const instance = getCurrentInstance()
const uid = instance!.uid
const slideX = ref<number>(0)
const startSlideX = ref<number>(0)
const btnWidth = ref<number>(0)
const startX = ref<number>(0)
const lastX = ref<number>(0)
const startTime = ref<number>(0)
const transitionDuration = ref<string>('0.1s')

const emits = defineEmits<{
  click: []
}>()

const init = () => {
  nextTick(() => {
    const query = uni.createSelectorQuery().in(instance)
    query
      .select(`#cc-swipe-cell-wrap-right-${uid}`)
      .boundingClientRect(data => {
        if (data) {
          btnWidth.value = data.width * -1
        }
      })
      .exec()
  })
}

// 滑动开始
const touchStart = (e: TouchEvent) => {
  startTime.value = e.timeStamp
  //记录滑块的初始位置
  startSlideX.value = slideX.value
  startX.value = e.touches[0].pageX
  lastX.value = startX.value
  transitionDuration.value = '0s'
}
// 滑动中
const touchMove = (e: TouchEvent) => {
  const endX = e.touches[0].pageX
  const distance = endX - lastX.value
  const dis = slideX.value + distance
  if (dis <= 0 && dis >= btnWidth.value) {
    slideX.value = dis
  }
  lastX.value = endX
  transitionDuration.value = '0s'
}
// 滑动结束
const touchEnd = (e: TouchEvent) => {
  let distance = 10
  const endTime = e.timeStamp
  const endX = startX.value - lastX.value
  if (Math.abs(endTime - startTime.value) > 200) {
    distance = btnWidth.value / -2
  }
  if (endX > distance) {
    slideX.value = btnWidth.value
  } else if (endX < distance * -1) {
    slideX.value = 0
  } else {
    slideX.value = startSlideX.value
  }
  transitionDuration.value = '0.1s'
}

const handleClick = () => {
  slideX.value = 0
  emits('click')
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.cc-swipe-cell {
  position: relative;
  overflow: hidden;
  cursor: grab;
  &-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    transition: all 0.1s linear;
    &-left {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transform: translateX(-100%);
    }
    &-right {
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      transform: translateX(100%);
    }
    &-content {
      flex: 1;
    }
  }
}
</style>
