<template>
  <cc-overlay
    v-model="visible"
    :closeOnClickOverlay="closeOnClickOverlay"
    :flex="mode === '' ? true : false"
  >
    <view
      class="cc-popup-content"
      :class="[
        'cc-popup-content-' + mode,
        { 'cc-popup-content-round': round && mode === 'bottom' },
      ]"
      :style="{ height: height + 'rpx', width: width + 'rpx' }"
      :animation="animationData"
      @click.stop="() => {}"
    >
      <slot></slot>
      <view v-if="closeable" @click="close" class="cc-popup-content-close">
        <cc-icon :type="closeIcon" v-if="closeIcon" size="16" color="#909399"></cc-icon>
        <cc-icon v-else type="closeempty" size="16" color="#909399"></cc-icon>
      </view>
    </view>
  </cc-overlay>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

export type Mode = '' | 'left' | 'right' | 'top' | 'bottom'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    mode?: Mode
    closeable?: boolean
    closeIcon?: string
    duration?: string | number
    width?: string | number
    height?: string | number
    round?: boolean
    closeOnClickOverlay?: boolean
    showMask?: boolean
  }>(),
  {
    modelValue: false,
    mode: '',
    closeable: false,
    closeIcon: 'closeempty',
    duration: 300,
    width: '',
    height: '',
    round: false,
    closeOnClickOverlay: true,
    showMask: true,
  }
)
const emits = defineEmits(['update:modelValue', 'close', 'open'])

const visible = ref(props.modelValue)
const animation = ref<any>({})
const animationData = ref<any>({})

const close = () => {
  emits('close')
  emits('update:modelValue', !props.modelValue)
}

onMounted(() => {
  animation.value = uni.createAnimation({
    duration: Number(props.duration),
    timingFunction: 'linear',
  })
})

watch(
  () => props.modelValue,
  val => {
    visible.value = val
  }
)
watch(
  () => visible.value,
  val => {
    if (val) {
      emits('open')
      if (props.mode === 'left') {
        setTimeout(() => {
          animation.value.translateX(0).step()
          animationData.value = animation.value.export()
        }, 50)
      }
      if (props.mode === 'right') {
        setTimeout(() => {
          animation.value.translateX(0).step()
          animationData.value = animation.value.export()
        }, 50)
      }
      if (props.mode === 'top') {
        setTimeout(() => {
          animation.value.translateY(0).step()
          animationData.value = animation.value.export()
        }, 50)
      }
      if (props.mode === 'bottom') {
        setTimeout(() => {
          animation.value.translateY(0).step()
          animationData.value = animation.value.export()
        }, 50)
      }
    } else {
      if (props.mode === 'left') {
        animation.value.translateX('-100%').step()
        animationData.value = animation.value.export()
      }
      if (props.mode === 'right') {
        animation.value.translateX('100%').step()
        animationData.value = animation.value.export()
      }
      if (props.mode === 'top') {
        animation.value.translateY('-100%').step()
        animationData.value = animation.value.export()
      }
      if (props.mode === 'bottom') {
        animation.value.translateY('100%').step()
        animationData.value = animation.value.export()
      }
    }
    emits('update:modelValue', val)
  }
)

defineExpose({
  close,
})
</script>

<style scoped lang="scss">
.cc-popup {
  &-content {
    background: #fff;
    z-index: 2000;
    position: relative;
    padding: 80rpx 60rpx;
    &-round {
      border-radius: 48rpx 48rpx 0 0;
    }
    &-close {
      position: absolute;
      top: 10rpx;
      right: 10rpx;
      z-index: 1000;
    }
    &-left {
      transform: translateX(-100%);
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
    }
    &-right {
      transform: translateX(100%);
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
    }
    &-top {
      transform: translateY(-100%);
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
    }
    &-bottom {
      transform: translateY(100%);
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
    }
  }
}
</style>
