<template>
  <view>
    <view class="demo">
      <view class="demo-title">基础用法</view>
      <view class="demo-item">
        <cc-count-down :time="time"></cc-count-down>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">分隔符为中文</view>
      <view class="demo-item">
        <cc-count-down separator="zh" :time="time"></cc-count-down>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">自定义样式</view>
      <view class="demo-item">
        <cc-count-down :time="time">
          <template #default="{ timeData }">
            <span class="block">{{ timeData.hours }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.minutes }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.seconds }}</span>
          </template>
        </cc-count-down>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let time = ref<number>(1000 * 60 * 60 * 3)
</script>

<style scoped lang="scss">
.demo {
  margin-bottom: 40rpx;
  &-title {
    padding: 20rpx;
  }
}
.colon {
  display: inline-block;
  margin: 0 8rpx;
  color: #ee0a24;
}
.block {
  display: inline-block;
  width: 44rpx;
  color: #fff;
  font-size: 24rpx;
  text-align: center;
  background-color: #ee0a24;
}
</style>
