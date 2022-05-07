<template>
  <view>
    <view>
      <view class="title">基础用法</view>
      <view>
        <cc-overlay v-model="show1" @click="handleClick"></cc-overlay>
        <cc-button @click="open1">打开遮罩层</cc-button>
      </view>
    </view>

    <view>
      <view class="title">嵌套内容</view>
      <view>
        <cc-overlay v-model="show2">
          <view class="content">
            <view class="block"></view>
          </view>
        </cc-overlay>
        <cc-button @click="open2">打开遮罩层</cc-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const show1 = ref<boolean>(false)
const show2 = ref<boolean>(false)
const open1 = () => {
  show1.value = true
}
const open2 = () => {
  show2.value = true
}
const handleClick = () => {
  console.log('click')
}
</script>

<style scoped></style>
