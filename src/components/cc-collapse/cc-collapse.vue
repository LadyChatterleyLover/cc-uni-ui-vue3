<template>
  <view class="cc-collapse">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { provide, computed, ref } from 'vue'
import { collapseKey } from './constants'

const props = withDefaults(
  defineProps<{
    modelValue: string | number
    accordion?: boolean
  }>(),
  {
    accordion: false,
  }
)

const emits = defineEmits<{
  'update:modelValue': [val: string | number]
  change: [val: string | number]
}>()

const activeList = ref<string[] | number[]>([])

const changeEvent = (val: string | number) => {
  emits('update:modelValue', val)
  emits('change', val)
}

const setActiveList = (val: string[] | number[]) => {
  activeList.value = val
}

provide(collapseKey, {
  value: computed(() => props.modelValue),
  accordion: computed(() => props.accordion),
  activeList: computed(() => activeList.value),
  change: changeEvent,
  setActiveList,
})
</script>

<style scoped lang="scss">
.cc-collapse {
  width: 100%;
}
</style>
