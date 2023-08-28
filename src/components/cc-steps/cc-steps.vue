<template>
  <view class="cc-steps" :class="{ 'cc-steps-vertical': vertical }">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { provide, computed, useSlots, ComponentInternalInstance, ref } from 'vue'
import { stepsKey } from './constants'

const props = withDefaults(
  defineProps<{
    modelValue: number
    // 以点的形式展现
    dot?: boolean
    // 是否是竖向
    vertical?: boolean
  }>(),
  {
    dot: false,
    vertical: false,
  }
)

const emits = defineEmits<{
  'update:modelValue': [val: number]
  change: [val: number]
}>()

const children = ref<ComponentInternalInstance[]>([])

const changeEvent = (val: number) => {
  emits('update:modelValue', val)
  emits('change', val)
}

const addChild = (child: ComponentInternalInstance) => {
  children.value.push(child)
}

provide(stepsKey, {
  active: computed(() => props.modelValue),
  vertical: props.vertical,
  dot: props.dot,
  children: computed(() => children.value),
  change: changeEvent,
  addChild,
})
</script>

<style scoped lang="scss">
.cc-steps {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &-vertical {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
