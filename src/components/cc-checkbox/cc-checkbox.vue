<template>
  <view class="cc-checkbox" @click="change">
    <slot v-if="$slots.icon" name="icon" :checked="checked"></slot>
    <view
      v-else
      class="cc-checkbox-icon"
      :class="[
        {
          'cc-checkbox-icon-round': shape === 'round',
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
      class="cc-checkbox-label"
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
import { checkboxGroupKey } from '../cc-checkbox-group/constants'
import { CheckboxGroupValue } from '../cc-checkbox-group/cc-checkbox-group.vue'
import { cloneDeep } from 'lodash-es'

type CheckboxValue = string | number | boolean

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    shape?: 'round' | 'square'
    name?: CheckboxValue
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
const emits = defineEmits<{
  'update:modelValue': [val: CheckboxValue]
  change: [val: CheckboxValue]
}>()

const checkBoxGroup = inject(checkboxGroupKey, undefined)

const checked = ref(false)
const checkedList = ref(checkBoxGroup && cloneDeep(checkBoxGroup.modelValue))

const setChecked = () => {
  checked.value = !checked.value
  if (props.name) {
    if (!checked.value) {
      checkBoxGroup.modelValue = (checkBoxGroup.modelValue as []).filter(
        item => item !== props.name
      )
      checkBoxGroup.change(checkBoxGroup.modelValue)
    } else {
      if (Number(checkBoxGroup.max) > 0 && checkedList.value.length >= Number(checkBoxGroup.max)) {
        checked.value = !checked.value
        return
      }
      ;(checkBoxGroup.modelValue as any).push(props.name)
      checkBoxGroup.change(checkBoxGroup.modelValue)
    }
  }
  emits('change', checked.value)
}

const change = () => {
  if (props.labelDisabled || props.disabled) {
    return
  }
  setChecked()
}

const clickIcon = () => {
  if (props.disabled) {
    return
  }
  setChecked()
}

const computedIconSize = computed(() => {
  if (checkBoxGroup && checkBoxGroup.iconSize && !props.iconSize) {
    return checkBoxGroup.iconSize
  } else {
    return props.iconSize
  }
})

const computedDisabled = computed(() => {
  if (checkBoxGroup && checkBoxGroup.disabled && !props.disabled) {
    return checkBoxGroup.disabled
  } else {
    return props.disabled
  }
})

const computedCheckedColor = computed(() => {
  if (checkBoxGroup && checkBoxGroup.checkedColor && !props.checkedColor) {
    return checkBoxGroup.checkedColor
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
  () => checked.value,
  val => {
    emits('update:modelValue', val)
  }
)

watch(
  () => checkBoxGroup,
  val => {
    if (val) {
      const value = checkBoxGroup.modelValue
      if (props.name) {
        checked.value = (value as []).findIndex(item => item === props.name) > -1
      }
    }
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
.cc-checkbox {
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
