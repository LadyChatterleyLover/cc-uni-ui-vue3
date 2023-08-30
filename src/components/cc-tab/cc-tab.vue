<template>
  <view :style="{ display: tabs?.active.value === index ? 'block' : 'none' }"><slot></slot></view>
</template>

<script setup lang="ts">
import {
  ComponentInternalInstance,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  ref,
} from 'vue'
import { tabsKey } from '../cc-tabs/constants'

withDefaults(
  defineProps<{
    // 标题
    title?: string
    // 标识符
    name?: string
    // 是否禁用
    disabled?: boolean
  }>(),
  {
    title: '',
    name: '',
    disabled: false,
  }
)

const tabs = inject(tabsKey, undefined)
const instance = getCurrentInstance()
const index = ref(-1)

onMounted(() => {
  tabs?.addChild(instance as ComponentInternalInstance)
  nextTick(() => {
    index.value = tabs?.children.value.indexOf(instance as ComponentInternalInstance) as number
  })
})
</script>

<style scoped lang="scss">
.disabled {
  color: #c8c9cc;
  background-color: #f7f8fa;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
