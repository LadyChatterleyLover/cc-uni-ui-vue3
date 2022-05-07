<template>
  <view class="cc-overlay" :style="{ zIndex: Number(zIndex) }" :animation="animationData" @click="handleClick"></view>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    zIndex?: string | number
  }>(),
  {
    modelValue: false,
    zIndex: 999,
  }
)

const emits = defineEmits(['update:modelValue'])

const zIndex = ref<number>(Number(props.zIndex))
const animation = ref<any>({})
const animationData = ref<any>({})

onMounted(() => {
  animation.value = uni.createAnimation({
    duration: 300,
    timingFunction: 'linear',
  })
})

const handleClick = () => {
  emits('update:modelValue', !props.modelValue)
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      animation.value.opacity(1).step()
      animationData.value = animation.value.export()
    } else {
      animation.value.opacity(0).step()
      animationData.value = animation.value.export()
    }
  }
)
</script>

<style scoped lang="scss">
.cc-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  background: rgba(0, 0, 0, 0.5);
}
</style>
