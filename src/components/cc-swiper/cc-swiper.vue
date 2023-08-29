<template>
  <view class="cc-swiper" :style="{ height: height + 'rpx' }">
    <swiper
      class="cc-swiper-wrap"
      :autoplay="autoplay"
      :duration="duration"
      :indicator-dots="false"
      :circular="circular"
      :vertical="vertical"
      :current="current"
      :interval="interval"
      :disable-touch="disableTouch"
      @change="handleChange"
    >
      <slot></slot>
    </swiper>
    <view v-if="$slots.dot"
      ><slot name="dot" :current="currentIndex + 1" :length="list!.length"></slot
    ></view>
    <view v-else>
      <view
        class="cc-swiper-dot"
        :class="{ 'cc-swiper-dot-translate': !right }"
        :style="{ bottom: bottom + 'rpx', right: right + 'rpx' }"
        v-if="mode !== 'none' && mode !== 'number'"
      >
        <view
          class="cc-swiper-dot-item"
          :class="{
            'cc-swiper-dot-item-round': currentIndex === index && mode === 'round',
            'cc-swiper-dot-item-rect': mode === 'rect',
          }"
          :style="{
            background: currentIndex === index ? activeColor : indicatorActiveColor,
            ...dotStyle,
          }"
          v-for="(item, index) in list!.length"
          :key="index"
        ></view>
      </view>
      <text v-if="mode === 'number'" class="cc-swiper-dot-number">
        <text>{{ currentIndex + 1 }} / {{ list!.length }}</text>
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { CSSProperties, computed, provide, ref, useSlots } from 'vue'
import { swiperKey } from './constants'

export type SwiperMode = 'none' | 'rect' | 'number' | 'round'

const props = withDefaults(
  defineProps<{
    // 指示点模式
    mode?: SwiperMode
    // 是否自动播放
    autoplay?: boolean
    // 当前轮播图
    current?: string | number
    // 自动切换时间间隔
    interval?: string | number
    // 滑动动画时长
    duration?: string | number
    // 是否采用衔接滑动
    circular?: boolean
    // 滑动方向是否为纵向
    vertical?: boolean
    // 图片模式
    imgMode?: string
    // 轮播图组件高度
    height?: string | number
    // 指示点距离底部位置
    bottom?: string | number
    // 指示点距离右边位置
    right?: string | number
    // 当前未选中的指示点颜色
    indicatorActiveColor?: string
    // 当前选中指示点颜色
    activeColor?: string
    // 指示点样式
    dotStyle?: CSSProperties
    // 禁止用户滑动
    disableTouch?: boolean
  }>(),
  {
    mode: 'round',
    autoplay: true,
    current: 0,
    interval: 3000,
    duration: 500,
    circular: true,
    vertical: false,
    imgMode: 'aspectFill',
    height: 300,
    bottom: 20,
    right: 0,
    indicatorActiveColor: '#ccc',
    activeColor: '#fff',
    disableTouch: false,
  }
)

const emits = defineEmits<{
  change: [val: number]
  clickItem: [e: Event, val: number]
  longpress: [e: Event, val: number]
}>()

const currentIndex = ref(0)

const list = computed(() => useSlots().default?.())
const handleChange = e => {
  currentIndex.value = e.detail.current
  emits('change', e.detail.current)
}

const clickItem = (e: Event) => {
  emits('clickItem', e, currentIndex.value)
}

const longpress = (e: Event) => {
  emits('longpress', e, currentIndex.value)
}

provide(swiperKey, {
  currentIndex: computed(() => currentIndex.value),
  mode: props.mode,
  clickItem,
  longpress,
})
</script>

<style scoped lang="scss">
.cc-swiper {
  width: 100%;
  position: relative;
  &-wrap {
    width: 100%;
    height: 100%;
  }

  &-dot {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    &-translate {
      left: 50%;
      transform: translateX(-50%);
    }
    &-number {
      padding: 4rpx 12rpx;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 48rpx;
      font-size: 12px;
      color: #fff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 20rpx;
    }
    &-item {
      margin: 0 4rpx;
      border-radius: 16rpx;
      transition: all 0.3s;
      width: 12rpx;
      height: 12rpx;
      &-round {
        width: 28rpx;
      }
      &-rect {
        width: 20rpx;
        height: 6rpx;
      }
    }
  }
}
</style>
