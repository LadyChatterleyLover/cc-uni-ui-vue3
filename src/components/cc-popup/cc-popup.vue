<template>
  <view class="cc-popup">
    <view class="cc-popup-mask"></view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean
  }>(),
  {
    modelValue: false,
  }
)
</script>

<style scoped lang="scss"></style>
