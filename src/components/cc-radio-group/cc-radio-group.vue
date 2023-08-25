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
import { provide, reactive, watch, ref, computed } from 'vue'
import { radioGroupKey } from './constants'

export type RadioGroupValue = string | number | boolean

const props = withDefaults(
  defineProps<{
    modelValue: RadioGroupValue
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
  'update:modelValue': [val: RadioGroupValue]
  change: [val: RadioGroupValue]
}>()

const checked = ref<RadioGroupValue>()

const change = (val: RadioGroupValue) => {
  checked.value = val
}

provide(radioGroupKey, {
  ...reactive(props),
  change,
  checked: computed(() => checked.value),
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
