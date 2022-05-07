<template>
  <view
    class="cc-overlay"
    :style="{ zIndex: Number(zIndex), background, display }"
    :animation="animationData"
    @click="handleClick"
  >
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    zIndex?: string | number
    duration?: string | number
    background?: string
  }>(),
  {
    modelValue: false,
    zIndex: 999,
    duration: 300,
    background: 'rgba(0,0,0,.5)',
  }
)

const emits = defineEmits(['update:modelValue', 'click'])

const zIndex = ref<number>(Number(props.zIndex))
const animation = ref<any>({})
const animationData = ref<any>({})
const display = ref<'block' | 'none'>('none')

onMounted(() => {
  animation.value = uni.createAnimation({
    duration: Number(props.duration),
    timingFunction: 'linear',
  })
})

const handleClick = (e: Event) => {
  emits('update:modelValue', !props.modelValue)
  emits('click', e)
}

let cleanup = () => {}

const stopWatch = watch(
  () => props.modelValue,
  (val) => {
    let timer1: number | null = null
    let timer2: number | null = null
    if (val) {
      display.value = 'block'
      timer1 = setTimeout(() => {
        animation.value.opacity(1).step()
        animationData.value = animation.value.export()
      }, 50)
    } else {
      animation.value.opacity(0).step()
      animationData.value = animation.value.export()
      timer2 = setTimeout(() => {
        display.value = 'none'
      }, Number(props.duration) + 100)
    }
    cleanup = () => {
      clearTimeout(timer1 as number)
      clearTimeout(timer2 as number)
    }
  }
)

onUnmounted(() => {
  stopWatch()
  cleanup()
})
</script>

<style scoped lang="scss">
.cc-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
