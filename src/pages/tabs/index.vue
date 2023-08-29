<template>
  <view>
    <cc-tabs v-model="active">
      <cc-tab title="明年今日">明年今日</cc-tab>
      <cc-tab title="圣诞节">圣诞节</cc-tab>
      <cc-tab title="无条件">无条件</cc-tab>
      <cc-tab title="沙龙">沙龙</cc-tab>
      <cc-tab title="谢谢侬">谢谢侬</cc-tab>
      <cc-tab title="人来人往">人来人往</cc-tab>
      <cc-tab title="最佳损友">最佳损友</cc-tab>
      <cc-tab title="阿牛">阿牛</cc-tab>
    </cc-tabs>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
</script>

<style scoped></style>
