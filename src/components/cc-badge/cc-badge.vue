<template>
  <view class="cc-badge">
    <slot></slot>
    <view
      :style="{ background: bgColor, color, top: offset[0] + 'px', right: offset[1] + 'px' }"
      class="cc-badge-content"
      v-if="!dot"
    >
      <template v-if="content">{{ showContent }}</template>
      <slot name="content" v-else></slot>
    </view>
    <view
      v-else
      class="cc-badge-dot"
      :style="{
        background: bgColor,
        top: offset[0] + 'px',
        right: offset[1] + 'px',
      }"
    ></view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(
  defineProps<{
    content?: number | string
    max?: number | string
    dot?: boolean
    bgColor?: string
    color?: string
    offset?: number[] | string[]
  }>(),
  {
    content: '',
    max: '',
    dot: false,
    bgColor: '',
    color: '',
    offset: () => [],
  }
)

const showContent = computed(() => {
  if (props.max && typeof props.content === 'number') {
    if (Number(props.content) < Number(props.max)) return props.content
    else return props.max + '+'
  } else {
    return props.content
  }
})
</script>

<style scoped lang="scss">
.cc-badge {
  position: relative;
  &-content {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8rpx;
    border-radius: 100%;
    z-index: 99;
    font-size: 24rpx;
    background: #ee0a24;
    color: #fff;
    transform: translate(50%, -50%);
    transform-origin: 100%;
  }
  &-dot {
    width: 16rpx;
    min-width: 0;
    height: 16rpx;
    background-color: #ee0a24;
    border-radius: 100%;
    position: absolute;
    top: -8rpx;
    right: -8rpx;
    transform: translate(0, 0);
  }
}
</style>
