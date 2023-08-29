<template>
  <swiper-item @longpress.prevent="longpress" @click="clickItem" class="cc-swiper-item">
    <view class="cc-swiper-item-img">
      <view v-if="$slots.default" class="cc-swiper-item-img-content"
        ><slot :current="swiper?.currentIndex.value"></slot
      ></view>
      <image v-else class="cc-swiper-item-img-content" :src="src" :mode="swiper?.mode"></image>
    </view>
  </swiper-item>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { swiperKey } from '../cc-swiper/constants'

withDefaults(
  defineProps<{
    src?: string
  }>(),
  {
    src: '',
  }
)

const swiper = inject(swiperKey, undefined)

const clickItem = e => {
  swiper?.clickItem(e)
}

const longpress = e => {
  e.preventDefault()
  swiper?.longpress(e)
}
</script>

<style scoped lang="scss">
.cc-swiper-item {
  width: 100%;
  height: 100%;
  &-img {
    width: 100%;
    height: 100%;
    &-content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
