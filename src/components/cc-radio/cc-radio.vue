<template>
  <view class="cc-radio" @click="change">
    <slot v-if="$slots.icon" name="icon" :checked="checked"></slot>
    <view
      v-else
      class="cc-radio-icon"
      :class="[
        {
          'cc-radio-icon-round': shape === 'round',
        },
      ]"
      :style="{
        width: computedIconSize + 'rpx',
        height: computedIconSize + 'rpx',
        background: computedDisabled ? '#ebedf0' : checked ? computedCheckedColor : '#fff',
        border: computedDisabled
          ? '#c8c9cc'
          : checked
          ? `1px solid ${computedCheckedColor}`
          : '1px solid #c8c9cc',
      }"
      @click.stop="clickIcon"
    >
      <cc-icon
        v-if="checked"
        type="checkmarkempty"
        :size="computedIconSize"
        :color="computedDisabled ? '#c8c9cc' : '#fff'"
      ></cc-icon>
    </view>
    <view
      class="cc-radio-label"
      :style="{
        color: computedDisabled ? '#c8c9cc' : '#323233',
      }"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch, computed, inject } from 'vue'
import { radioGroupKey } from '../cc-radio-group/constants'
import { RadioGroupValue } from '../cc-radio-group/cc-radio-group.vue'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    shape?: 'round' | 'square'
    name: RadioGroupValue
    disabled?: boolean
    labelDisabled?: boolean
    labelPosition?: 'left' | 'right'
    iconSize?: number | string
    checkedColor?: string
  }>(),
  {
    modelValue: false,
    shape: 'round',
    disabled: false,
    labelDisabled: false,
    labelPosition: 'left',
    iconSize: 40,
    checkedColor: '#1989fa',
  }
)

const radioGroup = inject(radioGroupKey, undefined)
const checked = ref(false)

const change = () => {
  if (radioGroup.disabled || props.labelDisabled || props.disabled) {
    return
  }
  radioGroup.modelValue = props.name
  radioGroup.change(props.name)
}

const clickIcon = () => {
  if (radioGroup.disabled || props.disabled) {
    return
  }
  radioGroup.modelValue = props.name
  radioGroup.change(props.name)
}

const computedIconSize = computed(() => {
  if (radioGroup && radioGroup.iconSize && !props.iconSize) {
    return radioGroup.iconSize
  } else {
    return props.iconSize
  }
})

const computedDisabled = computed(() => {
  if (radioGroup && radioGroup.disabled && !props.disabled) {
    return radioGroup.disabled
  } else {
    return props.disabled
  }
})

const computedCheckedColor = computed(() => {
  if (radioGroup && radioGroup.checkedColor && !props.checkedColor) {
    return radioGroup.checkedColor
  } else {
    return props.checkedColor
  }
})

watch(
  () => props.modelValue,
  val => {
    checked.value = val
  },
  { immediate: true }
)

watch(
  () => radioGroup,
  val => {
    if (val) {
      const value = val.modelValue
      checked.value = props.name === value
    }
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
.cc-radio {
  display: flex;
  align-items: center;
  overflow: hidden;
  user-select: none;
  width: fit-content;
  box-sizing: border-box;
  margin-bottom: 16rpx;
  margin-right: 40rpx;
  &-icon {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    &-round {
      border-radius: 100%;
    }
  }
  &-label {
    margin-left: 16rpx;
    line-height: 40rpx;
  }
}
</style>
