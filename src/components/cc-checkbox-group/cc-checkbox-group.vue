<template>
  <view
    class="cc-checkbox-group"
    :style="{
      flexDirection: direction === 'vertical' ? 'column' : 'row',
    }"
  >
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
import { provide, reactive, watch, ref } from 'vue'
import { checkboxGroupKey } from './constants'

export type CheckboxGroupValue = string[] | number[] | boolean[]

const props = withDefaults(
  defineProps<{
    modelValue: CheckboxGroupValue
    disabled?: boolean
    max?: number | string
    direction?: 'vertical' | 'horizontal'
    iconSize?: number | string
    checkedColor?: string
  }>(),
  {
    disabled: false,
    max: 0,
    direction: 'vertical',
    iconSize: 40,
    checkedColor: '#1989fa',
  }
)

const emits = defineEmits<{
  'update:modelValue': [val: CheckboxGroupValue]
  change: [val: CheckboxGroupValue]
}>()

const checked = ref<CheckboxGroupValue>([])

const changeEvent = (val: CheckboxGroupValue) => {
  checked.value = [...new Set(val as [])]
}

provide(checkboxGroupKey, {
  ...reactive(props),
  change: changeEvent,
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
    emits('change', val)
  }
)
</script>

<style lang="scss" scoped>
.cc-checkbox-group {
  display: flex;
}
</style>
