<template>
  <view class="cc-field cc-filed-cell-left-icon" :class="{ 'cc-field-start': !$slots.rightIcon }">
    <cc-cell :border="border" :icon="leftIcon">
      <template #title>
        <view
          v-if="label"
          @click="clickLeft"
          class="cc-field-label"
          :class="{ 'cc-field-label-disabled': disabled }"
        >
          <view v-if="required" class="cc-field-label-required">*</view>
          <view>{{ label }}</view>
        </view>
      </template>
      <template #value>
        <view style="width: 100%; display: flex; align-items: center">
          <textarea
            v-model="inputValue"
            class="cc-field-input"
            v-if="type === 'textarea'"
            :style="{ height: 24 * Number(rows) + 'rpx' }"
            :maxlength="maxlength"
          ></textarea>
          <input
            v-else
            class="cc-field-input"
            :class="{
              'cc-field-input-disabled': disabled,
              'cc-field-input-error': error,
            }"
            v-model="inputValue"
            :placeholder="placeholder"
            :type="type"
            :disabled="disabled"
            :maxlength="Number(maxlength)"
            @input="handleInput"
            @change="handleChange"
            @focus="handleFocus"
            @blur="handleBlur"
            @confirm="handleInput"
          />
          <view style="width: 100%" v-if="$slots.button">
            <slot name="button"></slot>
          </view>
        </view>
      </template>
      <template #right-icon>
        <view style="z-index: 999">
          <cc-icon
            @click="clear"
            v-if="inputValue && clearable"
            type="close"
            size="16"
            color="#969799"
          ></cc-icon>
          <cc-icon @click="clickRight" :type="rightIcon" size="16" color="#969799"></cc-icon>
        </view>
      </template>
    </cc-cell>
    <view class="cc-field-error-message">{{ errorMessage }}</view>
    <view v-if="maxlength && showWordLimit" class="cc-field-word-limit"
      >{{ inputValue.length }} / {{ maxlength }}</view
    >
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

type FieldTypeProps = 'text' | 'tel' | 'password' | 'number' | 'textarea'

const props = withDefaults(
  defineProps<{
    modelValue: string
    label?: string
    placeholder?: string
    border?: boolean
    clearable?: boolean
    disabled?: boolean
    required?: boolean
    error?: boolean
    showWordLimit?: boolean
    type?: FieldTypeProps
    leftIcon?: string
    rightIcon?: string
    errorMessage?: string
    maxlength?: string | number
    rows?: string | number
  }>(),
  {
    label: '',
    placeholder: '',
    border: true,
    clearable: false,
    disabled: false,
    required: false,
    error: false,
    showWordLimit: false,
    type: 'text',
    leftIcon: '',
    rightIcon: '',
    errorMessage: '',
    maxlength: -1,
    rows: 1,
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
}>()

const inputValue = ref<string>(props.modelValue)

// 事件处理
const clear = (e: Event) => {
  inputValue.value = ''
  emits('clear', e)
}
const handleInput = () => {
  emits('input', inputValue.value)
}
const handleChange = () => {
  emits('change', inputValue.value)
}
const handleFocus = (e: FocusEvent) => {
  emits('focus', e)
}
const handleBlur = (e: FocusEvent) => {
  emits('blur', e)
}
const clickLeft = (e: Event) => {
  emits('clickLeft', e)
}
const clickRight = (e: Event) => {
  emits('clickRight', e)
}

watch(
  () => inputValue.value,
  val => {
    emits('update:modelValue', val)
  }
)
watch(
  () => props.modelValue,
  val => {
    inputValue.value = val
  }
)
</script>

<style scoped lang="scss">
.cc-field {
  position: relative;
  width: 100%;
  textarea {
    position: relative;
    top: 8rpx;
  }
  &-icon {
    position: relative;
    top: 4rpx;
  }
  &-error-message {
    position: absolute;
    color: #ee0a24;
    font-size: 24rpx;
    bottom: -40rpx;
    left: 164rpx;
  }
  &-word-limit {
    position: absolute;
    color: #646566;
    font-size: 24rpx;
    bottom: -36rpx;
    right: 0;
  }
  &-start {
    .cc-cell-value {
      justify-content: flex-start;
    }
  }
  &-label {
    min-width: 108rpx;
    margin-right: 24rpx;
    position: relative;
    top: 4rpx;
    &-disabled {
      color: #c8c9cc;
    }
    &-required {
      position: absolute;
      left: -16rpx;
      top: -4rpx;
      color: #ee0a24;
      font-size: 28rpx;
    }
  }
  &-input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 0;
    color: #323233;
    line-height: inherit;
    text-align: left;
    border: 0;
    resize: none;
    outline: none;
    &-error {
      color: #ee0a24;
    }
    &-disabled {
      color: #c8c9cc;
      cursor: not-allowed;
      opacity: 1;
    }
  }
}
</style>
