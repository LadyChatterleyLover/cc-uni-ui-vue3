<template>
  <view class="demo">
    <view class="demo-title">基础用法</view>
    <view class="demo-item">
      <cc-coupon-cell @click="show = true" :coupons="coupons">
        <cc-popup height="1000" round v-model="show" mode="bottom">
          <cc-coupon-list
            v-model:chosen-coupon="chosenCoupon"
            :coupons="coupons"
            :disabled-coupons="disabledCoupons"
          ></cc-coupon-list>
        </cc-popup>
      </cc-coupon-cell>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref<boolean>(false)
const chosenCoupon = ref(-1)
const coupons = [
  {
    available: 1,
    condition: '无使用门槛\n最多优惠12元',
    reason: '',
    value: 150,
    name: '优惠券名称',
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: '1.5',
    unitDesc: '元',
    description: '描述信息',
  },
  {
    available: 1,
    condition: '无使用门槛\n最多优惠12元',
    reason: '',
    value: 300,
    name: '优惠券名称',
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: '3.0',
    unitDesc: '元',
    description: '描述信息',
  },
]

const disabledCoupons = [
  {
    available: 1,
    condition: '无使用门槛\n最多优惠12元',
    value: 150,
    name: '优惠券名称',
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: '1.5',
    unitDesc: '元',
    reason: '优惠券不可用描述信息',
  },
  {
    available: 1,
    condition: '无使用门槛\n最多优惠12元',
    value: 150,
    name: '优惠券名称',
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: '1.5',
    unitDesc: '元',
    reason: '优惠券不可用描述信息',
  },
]
</script>

<style scoped lang="scss">
.demo {
  height: 100vh;
  background: #f7f7f7;
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
