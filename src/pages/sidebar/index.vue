<template>
  <view class="demo">
    <view class="demo-title">基础语法</view>
    <cc-sidebar @change="clickItem" v-model="value1">
      <cc-sidebar-item title="标签1"></cc-sidebar-item>
      <cc-sidebar-item title="标签2"></cc-sidebar-item>
      <cc-sidebar-item title="标签3"></cc-sidebar-item>
    </cc-sidebar>
  </view>

  <view class="demo">
    <view class="demo-title">不显示左侧线条</view>
    <cc-sidebar v-model="value2" :showLine="false">
      <cc-sidebar-item title="标签1"></cc-sidebar-item>
      <cc-sidebar-item title="标签2"></cc-sidebar-item>
      <cc-sidebar-item title="标签3"></cc-sidebar-item>
    </cc-sidebar>
  </view>

  <view class="demo">
    <view class="demo-title">禁用选项</view>
    <cc-sidebar v-model="value3">
      <cc-sidebar-item title="标签1"></cc-sidebar-item>
      <cc-sidebar-item title="标签2" disabled></cc-sidebar-item>
      <cc-sidebar-item title="标签3"></cc-sidebar-item>
    </cc-sidebar>
  </view>

  <view class="demo">
    <view class="demo-title">徽标提示</view>
    <cc-sidebar v-model="value4">
      <cc-sidebar-item title="标签1"></cc-sidebar-item>
      <cc-sidebar-item title="标签2" dot></cc-sidebar-item>
      <cc-sidebar-item title="标签3" :badge="5"></cc-sidebar-item>
    </cc-sidebar>
  </view>

  <view class="demo">
    <view class="demo-title">自定义左侧线条显示</view>
    <cc-sidebar v-model="value5" lineColor="#765489" :lineWidth="12" :lineHeight="40">
      <cc-sidebar-item title="标签1"></cc-sidebar-item>
      <cc-sidebar-item title="标签2"></cc-sidebar-item>
      <cc-sidebar-item title="标签3"></cc-sidebar-item>
    </cc-sidebar>
  </view>

  <view class="demo">
    <view class="demo-title">自定义文字显示</view>
    <cc-sidebar v-model="value5" activeTextColor="red" textColor="#976512">
      <cc-sidebar-item title="标签1"></cc-sidebar-item>
      <cc-sidebar-item title="标签2"></cc-sidebar-item>
      <cc-sidebar-item title="标签3"></cc-sidebar-item>
    </cc-sidebar>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(0)
const value2 = ref(0)
const value3 = ref(0)
const value4 = ref(0)
const value5 = ref(0)

const clickItem = (val: number) => {
  console.log('val', val)
}
</script>

<style lang="scss" scoped>
.demo {
  margin-bottom: 40rpx;
  &-title {
    margin: 20rpx;
  }
}
</style>
