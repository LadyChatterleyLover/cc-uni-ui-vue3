<template>
  <view class="cc-tabs">
    <scroll-view scroll-x :scroll-left="scrollLeft" :scroll-with-animation="animation">
      <view class="cc-tabs-wrap">
        <slot></slot>
      </view>
      <view
        v-if="modelValue === index"
        class="cc-tabs-line"
        :style="{
          transform: `translateX(${translateX}px)`,
          width: lineWidth + 'rpx',
          height: lineHeight + 'rpx',
          background: lineColor,
        }"
      ></view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, provide, ComponentInternalInstance, computed, watch, onMounted } from 'vue'
import { tabsKey } from './constants'
import { uni } from '@dcloudio/uni-h5'
import { rpxToPx } from '../../utils/common'

const props = withDefaults(
  defineProps<{
    // 当前激活项
    modelValue: number
    // 底部滑块宽度
    lineWidth?: number
    // 底部滑块高度
    lineHeight?: number
    // 底部滑块颜色
    lineColor?: string
    // 激活时的文字颜色
    activeColor?: string
    // 标签栏文字未激活颜色
    inactiveColor?: string
    // 是否开启滚动动画
    animation?: boolean
  }>(),
  {
    lineWidth: 40,
    lineHeight: 6,
    lineColor: '#2979ff',
    activeColor: '#2979ff',
    inactiveColor: '#303133',
    animation: true,
  }
)

const emits = defineEmits<{
  'update:modelValue': [val: number]
  change: [val: number]
}>()

const translateX = ref(0)
const scrollLeft = ref(0)
const index = ref(0)
const children = ref<ComponentInternalInstance[]>([])

const changeEvent = (val: number) => {
  emits('update:modelValue', val)
  emits('change', val)
}

const addChild = child => {
  children.value.push(child)
}

const setIndex = (i: number) => {
  index.value = i
}

const setScrollLeft = (left: number) => {
  scrollLeft.value = left
}

const init = () => {
  uni
    .createSelectorQuery()
    .in(this)
    .selectAll('.cc-tabs-content')
    .boundingClientRect(res => {
      let x = 0
      for (let i = 0; i < props.modelValue; i++) {
        x += res[i].width
      }
      translateX.value =
        x - rpxToPx(props.lineWidth) + (res[props.modelValue].width + rpxToPx(props.lineWidth)) / 2
    })
    .exec()
}

onMounted(() => {
  init()
})

provide(tabsKey, {
  active: computed(() => props.modelValue),
  children: computed(() => children.value),
  lineWidth: props.lineWidth,
  lineHeight: props.lineHeight,
  lineColor: props.lineColor,
  activeColor: props.activeColor,
  inactiveColor: props.inactiveColor,
  change: changeEvent,
  setIndex,
  addChild,
  setScrollLeft,
})

watch(
  () => props.modelValue,
  () => {
    init()
  }
)
</script>

<style scoped lang="scss">
scroll-view ::v-deep ::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}
.cc-tabs {
  position: relative;

  &-wrap {
    flex: 1;
    display: flex;
    align-items: center;
  }
  &-line {
    border-radius: 3px;
    position: absolute;
    bottom: 2px;
    z-index: 1;
    transition: all 0.2s linear;
  }
}
</style>
