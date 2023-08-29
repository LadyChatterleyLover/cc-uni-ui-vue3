<template>
  <view class="cc-grid" :style="{ paddingLeft: gutter + 'rpx' }">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { gridKey } from './constants'

const props = withDefaults(
  defineProps<{
    // 列数
    column?: number
    // 间距
    gutter?: string | number
    // 内容是否横向排列
    vertical?: boolean
  }>(),
  {
    column: 4,
    gutter: 0,
    vertical: true,
  }
)

provide(gridKey, {
  column: props.column,
  gutter: props.gutter,
  vertical: props.vertical,
})
</script>

<style scoped lang="scss">
.cc-grid {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
</style>
