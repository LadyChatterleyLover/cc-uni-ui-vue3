<template>
  <view class="cc-coupon-cell">
    <cc-cell :title="cellTitle" :value="cellValue" isLink @click="clickCell"></cc-cell>
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { uni } from '@dcloudio/uni-h5'
import { onMounted, ref } from 'vue'

export interface CouponItemRadioListItem {
  value: string | number
  checkedColor: string
}

export interface CouponItem {
  id: string
  name: string
  condition?: string
  startAt?: number
  endAt?: number
  description?: string
  reason?: string
  value?: number
  valueDesc?: string
  unitDesc?: string
  startTime?: string
  endTime?: string
  radioList: CouponItemRadioListItem[]
}

const props = withDefaults(
  defineProps<{
    // 单元格标题
    title?: string
    // 当前选中优惠券的索引
    chosenCoupon?: string | number
    // 优惠券数组
    coupons: CouponItem[]
    // 货币符号
    currency?: string
  }>(),
  {
    title: '优惠券',
    chosenCoupon: '',
    currency: '￥',
  }
)

const emits = defineEmits<{
  click: []
}>()

const cellTitle = ref<string>(props.title)
let cellValue = ref<string>('')

const clickCell = () => {
  emits('click')
}

onMounted(() => {
  cellValue.value = `${props.coupons.length}张可用`
  uni.$on('changeCoupon', (val: any) => {
    if (val) cellValue.value = `-${props.currency} ${(val.value / 100).toFixed(2)}`
    else cellValue.value = `${props.coupons.length}张可用`
  })
})
</script>

<style scoped></style>
