<template>
  <view>
    <view class="demo">
      <view class="demo-title">基础用法</view>
      <view class="demo-item">
        <cc-area @confirm="confirm"></cc-area>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">选择省市</view>
      <view class="demo-item">
        <cc-area :columns-num="2"></cc-area>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">配置列占位提示文字</view>
      <view class="demo-item">
        <cc-area :columnsPlaceholder="['请选择', '请选择', '请选择']"></cc-area>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const confirm = val => {
  console.log('val', val)
}
</script>

<style scoped lang="scss">
.demo {
  margin-bottom: 40rpx;
  &-title {
    padding: 20rpx;
  }
}
</style>
