<template>
  <view>
    <view class="demo">
      <view class="demo-title">基础用法</view>
      <view class="demo-item">
        <cc-stepper @minus="minus" @plus="plus" v-model="value1"></cc-stepper>
      </view>
      <view>当前值: {{ value1 }}</view>
    </view>

    <view class="demo">
      <view class="demo-title">设置步长</view>
      <view class="demo-item">
        <cc-stepper step="5" v-model="value2"></cc-stepper>
      </view>
      <view>当前值: {{ value2 }}</view>
    </view>

    <view class="demo">
      <view class="demo-title">最小值和最大值</view>
      <view class="demo-item">
        <cc-stepper min="5" max="15" v-model="value3"></cc-stepper>
      </view>
      <view>当前值: {{ value3 }}</view>
    </view>

    <view class="demo">
      <view class="demo-title">禁用状态</view>
      <view class="demo-item">
        <cc-stepper disabled v-model="value4"></cc-stepper>
      </view>
      <view>当前值: {{ value4 }}</view>
    </view>

    <view class="demo">
      <view class="demo-title">禁用输入框</view>
      <view class="demo-item">
        <cc-stepper disable-input v-model="value5"></cc-stepper>
      </view>
      <view>当前值: {{ value5 }}</view>
    </view>

    <view class="demo">
      <view class="demo-title">限制输入整数</view>
      <view class="demo-item">
        <cc-stepper integer v-model="value6"></cc-stepper>
      </view>
      <view>当前值: {{ value6 }}</view>
    </view>

    <view class="demo">
      <view class="demo-title">限制小数位位数</view>
      <view class="demo-item">
        <cc-stepper decimalLength="3" v-model="value7"></cc-stepper>
      </view>
      <view>当前值: {{ value7 }}</view>
    </view>

    <view class="demo">
      <view class="demo-title">自定义大小</view>
      <view class="demo-item">
        <cc-stepper input-width="40" button-size="32" v-model="value8"></cc-stepper>
      </view>
      <view>当前值: {{ value8 }}</view>
    </view>

    <view class="demo">
      <view class="demo-title">圆角按钮</view>
      <view class="demo-item">
        <cc-stepper disable-input round v-model="value9"></cc-stepper>
      </view>
      <view>当前值: {{ value9 }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"
const value1 = ref<number>(1)
const value2 = ref<number>(1)
const value3 = ref<number>(1)
const value4 = ref<number>(1)
const value5 = ref<number>(1)
const value6 = ref<number>(1)
const value7 = ref<number>(1)
const value8 = ref<number>(1)
const value9 = ref<number>(1)

const minus = () => {
  console.log("minus")
}
const plus = () => {
  console.log("plus")
}
</script>

<style scoped lang="scss">
.demo {
  margin-bottom: 40rpx;
  padding: 20rpx;
  &-title {
    padding: 20rpx;
  }
  &-item {
    padding: 0 10rpx;
    margin-bottom: 20rpx;
  }
}
</style>
