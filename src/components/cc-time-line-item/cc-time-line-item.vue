<template>
  <view class="cc-time-line-item">
    <view class="cc-time-line-item-node">
      <slot name="node" v-if="$slots.node"></slot>
      <view v-else class="cc-time-line-item-node-dot"></view>
    </view>
    <view class="cc-time-line-item-content"><slot name="content"></slot></view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.cc-time-line-item {
  display: flex;
  margin-bottom: 12px;
  &-node {
    width: 40rpx;
    display: flex;
    justify-content: center;
    &-dot {
      width: 12rpx;
      height: 12rpx;
      border-radius: 100%;
      background: #ddd;
      position: relative;
      top: 8rpx;
    }
  }
  &-content {
    flex: 1;
    margin-left: 24rpx;
  }
}
</style>
