<template>
  <view>
    <view class="demo">
      <view class="demo-title">基础用法</view>
      <view class="demo-item">
        <cc-button @click="show1 = true">打开键盘</cc-button>
        <cc-password-input
          v-model="show1"
          @compconste="handleCompconste"
          @change="handleChange"
          @backspace="handleBackspace"
        ></cc-password-input>
      </view>
      <view>当前输入值: {{ value1 }}</view>
    </view>

    <view class="demo">
      <view class="demo-title">自定义长度</view>
      <view class="demo-item">
        <cc-button @click="show2 = true">打开键盘</cc-button>
        <cc-password-input v-model="show2" length="4"></cc-password-input>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">自定义间距</view>
      <view class="demo-item">
        <cc-button @click="show3 = true">打开键盘</cc-button>
        <cc-password-input v-model="show3" gutter="0"></cc-password-input>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">明文显示</view>
      <view class="demo-item">
        <cc-button @click="show4 = true">打开键盘</cc-button>
        <cc-password-input v-model="show4" :mask="false"></cc-password-input>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">设置初始值</view>
      <view class="demo-item">
        <cc-button @click="show5 = true">打开键盘</cc-button>
        <cc-password-input v-model="show5" initValue="1234" :mask="false"></cc-password-input>
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
const show5 = ref<boolean>(false)
const value1 = ref<string>('')

const handleCompconste = (val: string) => {
  console.log('compconste', val)
}
const handleChange = (val: string) => {
  console.log('change', val)
}
const handleBackspace = (val: string) => {
  console.log('backspace', val)
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
