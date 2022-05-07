<template>
  <view
    class="cc-col"
    :style="{
      width,
      'margin-left': offset,
      'padding-left': padding,
      'padding-right': padding,
    }"
  >
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

const props = withDefaults(
  defineProps<{
    span?: number | string
    offset?: number | string
  }>(),
  {
    span: '',
    offset: '',
  }
)

const gutter = inject('gutter')

// 计算宽度
const width = computed(() => {
  return ((props.span as number) / 24) * 100 === 0 ? '100%' : ((props.span as number) / 24) * 100 + '%'
})
// 计算传了gutter的padding值
const padding = computed(() => {
  if (gutter) {
    return (gutter as number) / 2 + 'px'
  }
  return 0
})
// 计算偏移量
const offset = computed(() => {
  if (props.offset) {
    return ((props.offset as number) / 24) * 100 + '%'
  }
  return 0
})
</script>

<style scoped lang="scss"></style>
