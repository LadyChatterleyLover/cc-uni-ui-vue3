<template>
  <view class="cc-search">
    <view class="cc-search-content" :class="{ 'cc-search-round': round }">
      <view class="cc-search-content-label">
        <view v-if="$slots.label">
          <slot name="label"></slot>
        </view>
        <view v-else>{{ label }}</view>
      </view>
      <view class="cc-search-content-cell">
        <view
          class="cc-search-content-icon"
          :class="{
            'cc-search-content-icon-align-center': iconAlign === 'center',
            'cc-search-content-icon-align-right': iconAlign === 'right',
          }"
        >
          <view v-if="$slots.icon">
            <slot name="icon"></slot>
          </view>
          <view v-else>
            <cc-icon :type="icon" color="#323233" v-if="icon"></cc-icon>
            <cc-icon type="search" color="#323233" v-else></cc-icon>
          </view>
        </view>
        <view
          class="cc-search-content-input"
          :class="{
            'cc-search-content-text-align-center': textAlign === 'center',
            'cc-search-content-text-align-right': textAlign === 'right',
          }"
        >
          <input
            class="cc-search-content-input-wrap"
            placeholder-class="cc-search-content-input-placeholder"
            type="text"
            :placeholder="placeholder"
            v-model="inputValue"
            :disabled="disabled"
            :maxlength="maxlength"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @confirm="handleConfirm"
          />
          <view
            class="cc-search-content-input-close"
            v-if="inputValue"
            @click="clear"
            @mousedown="mousedown"
          >
            <cc-icon color="rgb(96, 98, 102)" type="close" size="14"></cc-icon>
          </view>
        </view>
      </view>
    </view>
    <view v-if="$slots.action || actionText" class="cc-search-action" @click="cancel">
      <view v-if="$slots.action">
        <slot name="action"></slot>
      </view>
      <view v-else>{{ actionText }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

type Align = 'left' | 'center' | 'right'

const props = withDefaults(
  defineProps<{
    modelValue: string
    // 左侧内容
    label?: string
    // 图标
    icon?: string
    // 禁用
    disabled?: boolean
    // 是否在搜索框右侧显示取消按钮
    showAction?: boolean
    // 是否显示清除图标
    clearable?: boolean
    // 是否为圆形搜索框
    round?: boolean
    // 取消按钮文字
    actionText?: string
    // 占位符
    placeholder?: string
    // 最大输入字符
    maxlength?: string | number
    // 文字对齐方式
    textAlign?: Align
    // 图标对齐方式
    iconAlign?: Align
  }>(),
  {
    label: '',
    icon: '',
    actionText: '',
    placeholder: '',
    disabled: false,
    showAction: false,
    clearable: false,
    round: false,
    maxlength: -1,
    textAlign: 'left',
    iconAlign: 'left',
  }
)

const emits = defineEmits<{
  'update:modelValue': [val: string]
  change: [val: string]
  input: [val: string]
  focus: [e: FocusEvent]
  blur: [e: FocusEvent]
  clickRight: [e: Event]
  clickLeft: [e: Event]
  clear: [e: Event]
  click: [e: Event]
  cancel: [e: Event]
  close: [e: Event]
  confirm: [e: Event]
}>()

const inputValue = ref<string>(props.modelValue!)

// 事件处理
const clear = (e: Event) => {
  inputValue.value = ''
  emits('clear', e)
}
const handleInput = () => {
  emits('input', inputValue.value)
}
const handleConfirm = e => {
  emits('confirm', e)
}
const handleFocus = (e: FocusEvent) => {
  emits('focus', e)
}
const handleBlur = (e: FocusEvent) => {
  emits('blur', e)
}
// 清空输入框时不触发失去焦点事件
const mousedown = (e: Event) => {
  e.preventDefault()
}
const cancel = e => {
  if (!props.disabled) emits('cancel', e)
}

watch(
  () => inputValue.value,
  val => {
    emits('update:modelValue', val)
  }
)
</script>

<style scoped lang="scss">
.cc-search {
  display: flex;
  align-items: center;
  padding: 20rpx 24rpx;
  background: #fff;
  input {
    outline: none;
    border: none;
  }
  &-round {
    border-radius: 48rpx !important;
  }
  &-content {
    position: relative;
    display: flex;
    flex: 1;
    padding-left: 48rpx;
    background-color: #f7f8fa;
    border-radius: 4rpx;
    &-text-align-center {
      justify-content: center;
      text-align: center;
    }
    &-text-align-right {
      justify-content: right;
      text-align: right;
    }
    &-icon-align-center {
      position: absolute;
      left: 38%;
    }
    &-icon-align-right {
      position: absolute;
      right: 20%;
    }
    &-label {
      font-size: 28rpx;
      display: flex;
      align-items: center;
      color: #323233;
      padding: 0 10rpx;
    }
    &-cell {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 10rpx 16rpx 10rpx 0;
    }
    &-input {
      position: relative;
      flex: 1;
      margin-left: 12rpx;
      display: flex;
      align-items: center;
      &-wrap {
        flex: 1;
      }
      &-close {
        width: 48rpx;
        background: rgb(242, 242, 242);
      }
    }
    &-input-placeholder {
      color: #969799;
    }
  }
  &-action {
    width: 66rpx;
    margin-left: 12rpx;
    font-size: 28rpx;
  }
}
</style>
