<template>
  <cc-popup
    mode="bottom"
    :closeOnClickOverlay="closeOnClickOverlay"
    :closeable="closeable"
    :round="round"
    v-model="visible"
  >
    <view class="cc-action-sheet">
      <view v-if="title" class="cc-action-sheet-title">{{ title }}</view>
      <view>
        <view v-if="description" class="cc-action-sheet-description">
          <view>{{ description }}</view>
          <view class="cc-action-sheet-description-line"></view>
        </view>
        <slot></slot>
        <view v-if="showCancel" class="cc-action-sheet-cancel" @click="cancel">
          <view class="cc-action-sheet-cancel-line"></view>
          <view class="cc-action-sheet-cancel-text">{{ cancelText }}</view>
        </view>
      </view>
    </view>
  </cc-popup>
</template>

<script lang="ts" setup>
import { provide, ref, watch } from 'vue'
import { actionSheetKey } from './constants'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    // 标题
    title?: string
    // 描述
    description?: string
    // 圆角菜单
    round?: boolean
    // 关闭按钮
    closeable?: boolean
    // 显示底部取消按钮
    showCancel?: boolean
    // 是否在点击遮罩层后关闭
    closeOnClickOverlay?: boolean
    // 是否在点击取消按钮关闭
    closeOnClickAction?: boolean
    // 取消文字
    cancelText?: string
  }>(),
  {
    modelValue: false,
    title: '',
    description: '',
    round: false,
    closeable: false,
    showCancel: false,
    closeOnClickOverlay: true,
    closeOnClickAction: true,
    cancelText: '取消',
  }
)

const emits = defineEmits<{
  'update:modelValue': [val: boolean]
  cancel: []
  select: [val: String]
}>()

const visible = ref(false)

const selectEvent = (val: String) => {
  emits('select', val)
}

watch(
  () => props.modelValue,
  val => {
    visible.value = val
  }
)

watch(
  () => visible.value,
  val => {
    emits('update:modelValue', val)
  }
)

const close = () => {
  visible.value = false
}

// 取消
const cancel = () => {
  if (props.closeOnClickAction) {
    visible.value = false
  }
  emits('cancel')
}

provide(actionSheetKey, {
  select: selectEvent,
  close,
})
</script>

<style lang="scss" scoped>
.cc-action-sheet {
  &-title {
    font-weight: 500;
    font-size: 32rpx;
    line-height: 96rpx;
    text-align: center;
    position: relative;
  }
  &-description {
    position: relative;
    padding: 40rpx 0 20rxp 0;
    color: #969799;
    font-size: 28rpx;
    line-height: 20rpx;
    text-align: center;
    &-line {
      width: 92%;
      margin-left: 4%;
      height: 2rpx;
      background: #ebedf0;
      margin-top: 30rpx;
    }
  }
  &-cancel {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 14rpx 0 28rpx 0;
    font-size: 32rpx;
    background-color: #fff;
    border: none;
    &-line {
      width: 100%;
      height: 16rpx;
      background-color: #f7f8fa;
    }
    &-text {
      margin-top: 20rpx;
    }
  }
}
</style>
