<template>
  <view>
    <view class="title">基础用法</view>
    <view class="item">
      <cc-rate @change="change" v-model="value1"></cc-rate>
    </view>
  </view>

  <view>
    <view class="title">星星总数</view>
    <view class="item">
      <cc-rate :count='10' v-model="value2"></cc-rate>
    </view>
  </view>

  <view>
    <view class="title">自定义图标</view>
    <view class="item">
      <cc-rate activeIcon='heart-filled' inactiveIcon='heart' v-model="value1"></cc-rate>
    </view>
  </view>

  <view>
    <view class="title">禁用状态</view>
    <view class="item">
      <cc-rate disabled v-model="value1"></cc-rate>
    </view>
  </view>

  <view>
    <view class="title">只读状态</view>
    <view class="item">
      <cc-rate readonly v-model="value1"></cc-rate>
    </view>
  </view>

  <view>
    <view class="title">最小选择数</view>
    <view class="item">
      <cc-rate :min-count='5' :count='10' v-model="value1"></cc-rate>
    </view>
  </view>
</template>

<script setup lang="ts">
const value1 = 3
const value2 = 6
const change = (val: number) => {
  console.log('change', val)
}
</script>

<style scoped lang="scss">
.title {
  margin: 20rpx;
}
.item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  button {
    margin-right: 10rpx;
  }
}
</style>