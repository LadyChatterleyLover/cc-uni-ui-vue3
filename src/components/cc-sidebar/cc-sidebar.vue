<template>
  <view class="cc-sidebar">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { ComponentInternalInstance, provide, ref, computed } from 'vue'
import { sidebarKey } from './constants'

const props = withDefaults(
  defineProps<{
    // 当前选中项
    modelValue: string | number
    // 侧边栏宽度
    width?: string | number
    // 显示左侧线条
    showLine?: boolean
    // 线条颜色
    lineColor?: string
    // 线条宽度
    lineWidth?: string | number
    // 线条高度
    lineHeight?: string | number
    // 背景颜色
    bgColor?: string
    // 选中颜色
    activeColor?: string
    // 文字颜色
    textColor?: string
    // 选中文字颜色
    activeTextColor?: string
  }>(),
  {
    width: 160,
    showLine: true,
    lineColor: '#ee0a24',
    lineWidth: 8,
    lineHeight: 32,
    bgColor: '#fff',
    activeColor: '#f7f8fa',
    textColor: '#323233',
    activeTextColor: '#323233',
  }
)

const emits = defineEmits<{
  'update:modelValue': [val: number]
  change: [val: number]
}>()

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

provide(sidebarKey, {
  active: computed(() => props.modelValue),
  children: computed(() => children.value),
  bgColor: props.bgColor,
  activeColor: props.activeColor,
  textColor: props.textColor,
  activeTextColor: props.activeTextColor,
  width: props.width,
  showLine: props.showLine,
  lineColor: props.lineColor,
  lineWidth: props.lineWidth,
  lineHeight: props.lineHeight,
  change: changeEvent,
  setIndex,
  addChild,
})
</script>

<style scoped lang="scss">
.cc-sidebar {
  display: flex;
  flex-direction: column;
}
</style>
