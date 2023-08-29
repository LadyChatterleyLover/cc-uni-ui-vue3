<template>
  <view class="demo">
    <view class="demo-title">基础用法</view>
    <view class="demo-item">
      <cc-grid>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
      </cc-grid>
    </view>

    <view class="demo-title">设置列数</view>
    <view class="demo-item">
      <cc-grid :column="3">
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
      </cc-grid>
    </view>

    <view class="demo-title">设置间距</view>
    <view class="demo-item">
      <cc-grid :gutter="20">
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
      </cc-grid>
    </view>

    <view class="demo-title">自定义样式</view>
    <view class="demo-item">
      <cc-grid>
        <cc-grid-item text="文字" icon="image" textColor="#1989fa" iconColor="red"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
      </cc-grid>
    </view>

    <view class="demo-title">内容横向排列</view>
    <view class="demo-item">
      <cc-grid :vertical="false">
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
      </cc-grid>
    </view>

    <view class="demo-title">徽标提示</view>
    <view class="demo-item">
      <cc-grid>
        <cc-grid-item text="文字" icon="image" dot></cc-grid-item>
        <cc-grid-item text="文字" icon="image" badge="5"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
        <cc-grid-item text="文字" icon="image"></cc-grid-item>
      </cc-grid>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.demo {
  background: #f7f8fa;
  &-title {
    padding: 20rpx;
  }
  &-item {
    margin-bottom: 60rpx;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
