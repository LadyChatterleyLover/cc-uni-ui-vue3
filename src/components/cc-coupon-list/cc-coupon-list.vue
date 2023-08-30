<template>
  <view class="cc-coupon-list">
    <view class="cc-coupon-list-exchange">
      <view class="cc-coupon-list-exchange-search">
        <cc-search
          round
          :showAction="false"
          :placeholder="inputPlaceholder"
          v-model="inputValue"
        ></cc-search>
      </view>
      <view class="cc-coupon-list-exchange-btn">
        <cc-button
          :disabled="disabled"
          :loading="exchangeButtonLoading"
          :style="{ color: exchangeButtonColor }"
          size="small"
          @click="exchange"
          >{{ exchangeButtonText }}</cc-button
        >
      </view>
    </view>
    <view class="cc-coupon-list-tabs">
      <cc-tabs
        v-model="current"
        activeColor="#323233"
        inactiveColor="#646566"
        :lineColor="lineColor"
        @change="changeTab"
      >
        <view class="cc-coupon-list-content">
          <cc-tab :title="enabledTitle">
            <view
              class="cc-coupon-list-content-enable"
              v-for="(item, index) in cloneCoupons"
              :key="index"
              @click="clickItem(item, index)"
            >
              <view class="cc-coupon-list-content-enable-info">
                <view class="cc-coupon-list-content-enable-info-left">
                  <view class="cc-coupon-list-content-enable-info-left-price">
                    {{ item.valueDesc }}
                    <text style="font-size: 12px">{{ item.unitDesc }}</text>
                  </view>
                  <view class="cc-coupon-list-content-enable-info-left-condition">{{
                    item.condition
                  }}</view>
                </view>
                <view class="cc-coupon-list-content-enable-info-center">
                  <view class="cc-coupon-list-content-enable-info-center-name">{{
                    item.name
                  }}</view>
                  <view class="cc-coupon-list-content-enable-info-center-time"
                    >{{ item.startTime }} - {{ item.endTime }}</view
                  >
                </view>
                <view
                  class="cc-coupon-list-content-enable-info-right"
                  :style="{ background: currentValue === index ? '#1989fa' : '' }"
                >
                  <cc-icon
                    v-if="currentValue === index"
                    type="checkmarkempty"
                    :size="28"
                    color="#fff"
                  ></cc-icon>
                </view>
              </view>
              <view class="cc-coupon-list-content-enable-label">{{ item.description }}</view>
            </view>
          </cc-tab>
          <cc-tab :title="disabledTitle">
            <view
              class="cc-coupon-list-content-enable"
              v-for="(item, index) in cloneDisableCoupons"
              :key="index"
            >
              <view class="cc-coupon-list-content-enable-info">
                <view class="cc-coupon-list-content-enable-info-left" style="color: inherit">
                  <view class="cc-coupon-list-content-enable-info-left-price">
                    {{ item.valueDesc }}
                    <text style="font-size: 24rpx">{{ item.unitDesc }}</text>
                  </view>
                  <view class="cc-coupon-list-content-enable-info-left-condition">{{
                    item.condition
                  }}</view>
                </view>
                <view class="cc-coupon-list-content-enable-info-center">
                  <view class="cc-coupon-list-content-enable-info-center-name">{{
                    item.name
                  }}</view>
                  <view class="cc-coupon-list-content-enable-info-center-time"
                    >{{ item.startTime }} - {{ item.endTime }}</view
                  >
                </view>
              </view>
              <view class="cc-coupon-list-content-enable-label">{{ item.reason }}</view>
            </view>
          </cc-tab>
        </view>
      </cc-tabs>
    </view>
    <view class="cc-coupon-list-btn" @click="close">
      <cc-button round block :color="closeButtonColor">{{ closeButtonText }}</cc-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { uni } from '@dcloudio/uni-h5'
import { CouponItem } from '../cc-coupon-cell/cc-coupon-cell.vue'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash-es'
import { computed, getCurrentInstance, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    // 当前输入的兑换码
    value?: string
    // 当前选中优惠券的索引
    chosenCoupon?: number
    // 优惠券
    coupons: CouponItem[]
    // 不可用优惠券列表
    disabledCoupons?: CouponItem[]
    // 可用优惠券列表标题
    enabledTitle?: string
    // 不可用优惠券列表标题
    disabledTitle?: string
    // 兑换按钮颜色
    exchangeButtonColor?: string
    // 兑换按钮文字
    exchangeButtonText?: string
    // 是否显示兑换按钮加载动画
    exchangeButtonLoading?: boolean
    // 是否禁用兑换按钮
    exchangeButtonDisabled?: boolean
    // 兑换码最小长度
    exchangeMinLength?: number
    // 是否显示列表底部按钮
    showCloseButton?: boolean
    // 列表底部按钮文字
    closeButtonText?: string
    // 列表底部按钮颜色
    closeButtonColor?: string
    // 输入框文字提示
    inputPlaceholder?: string
    // 是否展示兑换栏
    showExchangeBar?: boolean
    // tabs滑块颜色
    lineColor?: string
  }>(),
  {
    value: '',
    chosenCoupon: -1,
    disabledCoupons: () => [],
    enabledTitle: '可用',
    disabledTitle: '不可用',
    exchangeButtonColor: '#ee0a24',
    exchangeButtonText: '兑换',
    exchangeButtonLoading: false,
    exchangeButtonDisabled: false,
    exchangeMinLength: 1,
    showCloseButton: true,
    closeButtonText: '不使用优惠',
    closeButtonColor: '#ee0a24',
    lineColor: '#ee0a24',
    inputPlaceholder: '请输入优惠码',
    showExchangeBar: true,
  }
)

const emits = defineEmits<{
  change: [val: { item: CouponItem; index: number }]
  changeCoupon: [val: string]
  exchange: [val: string]
  'update:chosenCoupon': [val: number | string]
}>()

const instance = getCurrentInstance()

const current = ref<number>(0)
const cloneCoupons = ref<CouponItem[]>([])
const cloneDisableCoupons = ref<CouponItem[]>([])
const currentValue = ref<number>(props.chosenCoupon)
const inputValue = ref<string>(props.value)

const disabled = computed(
  () => props.exchangeButtonDisabled || !inputValue.value || !inputValue.value.length
)

const changeTab = (val: number) => {
  current.value = val
}
// 选中优惠券
const clickItem = (item: CouponItem, index: number) => {
  let parent: any = null
  // #ifdef H5
  parent = instance?.parent?.parent?.parent
  // #endif
  // #ifndef H5
  parent = instance?.parent
  // #endif
  parent.exposed.close()
  currentValue.value = index
  emits('change', { item, index })
  uni.$emit('changeCoupon', item)
  emits('update:chosenCoupon', index)
}
// 点击兑换按钮
const exchange = () => {
  if (!props.exchangeButtonDisabled || !inputValue.value || !inputValue.value.length) return
  emits('exchange', inputValue.value)
}
// 点击不使用优惠券按钮
const close = () => {
  let parent: any = null
  // #ifdef H5
  parent = instance?.parent?.parent?.parent
  // #endif
  // #ifndef H5
  parent = instance?.parent
  // #endif
  parent.exposed.close()
  uni.$emit('changeCoupon', null)
}

const init = () => {
  cloneCoupons.value = cloneDeep(props.coupons)
  cloneDisableCoupons.value = cloneDeep(props.disabledCoupons)

  cloneCoupons.value.map((item: CouponItem, index: number) => {
    item.startTime = dayjs(item.startAt).format('YYYY.MM.DD')
    item.endTime = dayjs(item.endAt).format('YYYY.MM.DD')
    item.radioList = [{ value: index, checkedColor: '#e54d42' }]
  })

  cloneDisableCoupons.value.map((item: CouponItem) => {
    item.startTime = dayjs(item.startAt).format('YYYY.MM.DD')
    item.endTime = dayjs(item.endAt).format('YYYY.MM.DD')
  })
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.cc-coupon-list {
  &-exchange {
    display: flex;
    align-items: center;
    height: 88rpx;
    padding: 12rpx 20rpx;
    &-search {
      flex: 1;
    }
  }
  &-content {
    background: #f7f8fa;
    height: 860rpx;
    padding: 20rpx 30rpx;
    &-enable {
      margin: 0 24rpx 24rpx;
      overflow: hidden;
      background: #fff;
      border-radius: 16rpx;
      &-info {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        min-height: 168rpx;
        padding: 28rpx;
        color: #323233;
        position: relative;
        &-left {
          color: #ee0a24;
          min-width: 192rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          &-price {
            font-weight: 500;
            font-size: 60rpx;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-bottom: 12rpx;
          }
          &-condition {
            text-align: center;
            font-size: 24rpx;
            line-height: 32rpx;
            white-space: pre-wrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
        &-center {
          &-name {
            font-weight: 700;
            font-size: 28rpx;
            margin-bottom: 20rpx;
          }
          &-time {
            font-size: 24rpx;
          }
        }
        &-right {
          position: absolute;
          top: 70rpx;
          right: 50rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40rpx;
          height: 40rpx;
          border-radius: 100%;
          border: 2rpx solid #c8c9cc;
        }
      }
      &-label {
        padding: 16rpx 32rpx;
        font-size: 24rpx;
        border-top: 2rpx dashed #ebedf0;
        color: #323233;
      }
    }
  }
  &-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20rpx 30rpx;
  }
}
.cc-button {
  border: none;
  background: #fff;
}
</style>
