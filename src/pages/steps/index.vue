<template>
  <view class="demo">
    <view class="demo-title">基础用法</view>
    <view class="demo-item">
      <cc-steps v-model="active">
        <cc-step name="下单"></cc-step>
        <cc-step name="出库"></cc-step>
        <cc-step name="运输"></cc-step>
        <cc-step name="签收"></cc-step>
      </cc-steps>
    </view>

    <view class="demo-title">展示点</view>
    <view class="demo-item">
      <cc-steps v-model="active" dot>
        <cc-step name="下单"></cc-step>
        <cc-step name="出库"></cc-step>
        <cc-step name="运输"></cc-step>
        <cc-step name="签收"></cc-step>
      </cc-steps>
    </view>

    <view class="demo-title">描述信息</view>
    <view class="demo-item">
      <cc-steps v-model="active" dot>
        <cc-step name="下单" content="描述信息"></cc-step>
        <cc-step name="出库"></cc-step>
        <cc-step name="运输"></cc-step>
        <cc-step name="签收"></cc-step>
      </cc-steps>
    </view>

    <view class="demo-title">竖向排列</view>
    <view class="demo-item">
      <cc-steps v-model="active" vertical>
        <cc-step name="下单"></cc-step>
        <cc-step name="出库"></cc-step>
        <cc-step name="运输"></cc-step>
        <cc-step name="签收"></cc-step>
      </cc-steps>
    </view>
  </view>

  <view class="demo-btn">
    <view class="demo-btn-item" @click="pre">
      <cc-button round type="primary" size="small">上一步</cc-button>
    </view>
    <view class="demo-btn-item" @click="next">
      <cc-button round type="error" size="small">下一步</cc-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)

let pre = () => {
  active.value--
  if (active.value <= 0) active.value = 0
}
let next = () => {
  active.value++
  if (active.value >= 3) active.value = 3
}
</script>

<style scoped lang="scss">
.demo {
  margin-bottom: 40rpx;
  &-title {
    padding: 20rpx;
  }
  &-item {
    margin-left: 4rpx;
    view {
      margin-left: 30rpx;
    }
  }
  &-btn {
    display: flex;
    align-items: center;
    &-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
