<template>
  <view class="demo">
    <view class="demo-title">基础用法</view>
    <view class="demo-item">
      <view>
        <cc-switch v-model="checked1" @change="onChange"></cc-switch>
      </view>
    </view>

    <view class="demo-title">禁用状态</view>
    <view class="demo-item">
      <view>
        <cc-switch disabled v-model="checked2"></cc-switch>
      </view>
    </view>

    <view class="demo-title">自定义颜色</view>
    <view class="demo-item">
      <view>
        <cc-switch activeColor="#ee0a24" inactiveColor="#abc123" v-model="checked3"></cc-switch>
      </view>
    </view>

    <view class="demo-title">自定义尺寸</view>
    <view class="demo-item">
      <view>
        <cc-switch size="16" v-model="checked4"></cc-switch>
      </view>
      <view>
        <cc-switch size="36" v-model="checked5"></cc-switch>
      </view>
    </view>

    <view class="demo-title">文字显示</view>
    <view class="demo-item">
      <view>
        <cc-switch v-model="checked6" activeText="搁浅"></cc-switch>
      </view>
      <view>
        <cc-switch v-model="checked7" activeText="威廉古堡" inactiveText='双节棍'></cc-switch>
      </view>
      <view>
        <cc-switch v-model="checked8"  activeTextColor="#ee0a24" inactiveTextColor="#abc123" activeText="黑色幽默"></cc-switch>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"
let checked1 = ref<boolean>(false)
let checked2 = ref<boolean>(false)
let checked3 = ref<boolean>(false)
let checked4 = ref<boolean>(false)
let checked5 = ref<boolean>(false)
let checked6 = ref<boolean>(false)
let checked7 = ref<boolean>(false)
let checked8 = ref<boolean>(false)


let onChange = (val: boolean) => {
  console.log(val)
}
</script>

<style scoped lang="scss">
.demo {
  margin-bottom: 40rpx;
  &-title {
    padding: 20rpx;
  }
  &-item {
    display: flex;
    align-items: center;
    margin-left: 4rpx;
    view {
      margin-left: 30rpx;
    }
  }
}
</style>