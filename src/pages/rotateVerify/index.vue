<template>
  <view>
    <cc-button type="primary" @click="show = true">开始验证</cc-button>
    <cc-rotate-verify v-model="show" :src="src"></cc-rotate-verify>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const src = ref('https://hx.dcloud.net.cn/static/favicon/favicon.png')
</script>

<style scoped></style>
