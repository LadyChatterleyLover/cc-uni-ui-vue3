<template>
  <view class="cc-submit-bar">
    <view class="cc-submit-bar-tip" v-if="$slots.tip">
      <slot name="tip"></slot>
    </view>
    <view class="cc-submit-bar-container">
      <slot></slot>
      <view class="cc-submit-bar-container-wrap">
        <view class="cc-submit-bar-label">{{ label }}:</view>
        <view class="cc-submit-bar-price">
          <view class="cc-submit-bar-currency">{{ currency }}</view>
          <view class="cc-submit-bar-leftPrice">{{ leftPrice }}</view>
          <view class="cc-submit-bar-rightPrice">.{{ rightPrice }}</view>
        </view>
        <view>
          <cc-button
            :loading="loading"
            :disabled="disabled"
            :color="buttonColor"
            round
            @click="submit"
          >
            {{ buttonText }}
          </cc-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    // 价钱
    price: number
    // 左侧文案
    label?: string
    // 按钮文字
    buttonText?: string
    // 按钮颜色
    buttonColor?: string
    // 货币符号
    currency?: string
    // 价格小数点后位数
    decimalLength?: string | number
    // 是否禁用按钮
    disabled?: boolean
    // 是否显示加载中的按钮
    loading?: boolean
  }>(),
  {
    label: '合计',
    buttonText: '提交订单',
    buttonColor: '#ee0a24',
    currency: '￥',
    decimalLength: 2,
    disabled: false,
    loading: false,
  }
)

const emits = defineEmits<{
  submit: []
}>()

const leftPrice = ref<number>(0)
const rightPrice = ref<string>('')

const submit = () => {
  if (!props.disabled && !props.loading) {
    emits('submit')
  }
}
onMounted(() => {
  leftPrice.value = Math.floor(props.price / 100)
  rightPrice.value = String((props.price / 100).toFixed(props.decimalLength as number)).split(
    '.'
  )[1]
})
</script>

<style scoped lang="scss">
.cc-submit-bar {
  &-tip {
    padding: 16rpx 24rpx;
    color: #f56723;
    font-size: 24rpx;
    line-height: 1.5;
    background-color: #fff7cc;
  }
  &-container {
    display: flex;
    align-items: center;

    &-wrap {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex: 1;
    }
  }
  &-price {
    display: flex;
    align-items: center;
    margin: 0 10rpx;
    color: #ee0a24;
  }
  &-currency {
    font-size: 24rpx;
    position: relative;
    top: 2rpx;
  }
  &-leftPrice {
    font-size: 20px;
    font-weight: 500;
  }
  &-rightPrice {
    font-size: 12px;
    position: relative;
    top: 1px;
  }
}
.disable {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
