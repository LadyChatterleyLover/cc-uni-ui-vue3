<template>
  <view>
    <view class="demo">
      <view class="demo-title">基础用法</view>
      <view class="demo-item">
        <cc-button @click="show1 = true">打开键盘</cc-button>
        <cc-number-keyboard
          @backspace="backspace"
          @change="handleChange"
          v-model="show1"
        ></cc-number-keyboard>
      </view>
      <view>当前输入值: {{ value1 }}</view>
    </view>

    <view class="demo">
      <view class="demo-title">身份证键盘</view>
      <view class="demo-item">
        <cc-button @click="show2 = true">打开键盘</cc-button>
        <cc-number-keyboard extra-key="x" v-model="show2"></cc-number-keyboard>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">随机数字键盘</view>
      <view class="demo-item">
        <cc-button @click="show3 = true">打开键盘</cc-button>
        <cc-number-keyboard random v-model="show3"></cc-number-keyboard>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show1 = ref<boolean>(false)
const show2 = ref<boolean>(false)
const show3 = ref<boolean>(false)
const show4 = ref<boolean>(false)
const value1 = ref<string>('')

const handleChange = (val: string) => {
  value1.value += val
}
// 退格键被点击
const backspace = () => {
  // 删除value的最后一个字符
  if (value1.value.length) value1.value = value1.value.substr(0, value1.value.length - 1)
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
