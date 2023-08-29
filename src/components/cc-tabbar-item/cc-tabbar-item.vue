<template>
  <view class="cc-tabbar-item" :class="{ disabled }" @click="clickItem">
    <view class="cc-tabbar-item-icon" :class="{ 'cc-tabbar-item-midbtn': midButton }">
      <view class="cc-tabbar-item-dot" v-if="dot"></view>
      <view class="cc-tabbar-item-count" v-if="Number(count) > 0">{{ count }}</view>
      <slot v-if="$slots.midButton" name="midButton" :index="index"></slot>
      <cc-icon
        :type="icon"
        :color="
          tabbar?.router
            ? route === url
              ? tabbar?.activeColor
              : tabbar?.inactiveColor
            : tabbar?.active.value === index
            ? tabbar?.activeColor
            : tabbar?.inactiveColor
        "
        :size="tabbar?.iconSize"
      ></cc-icon>
    </view>
    <view
      class="cc-tabbar-item-text"
      :style="{
        color: tabbar?.router
          ? route === url
            ? tabbar?.activeColor
            : tabbar?.inactiveColor
          : tabbar?.active.value === index
          ? tabbar?.activeColor
          : tabbar?.inactiveColor,
        top: $slots.midButton ? '22rpx' : 0,
      }"
    >
      <slot v-if="$slots.default" :index="index"></slot>
      <text v-else>{{ title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import {
  ref,
  inject,
  onMounted,
  nextTick,
  ComponentInternalInstance,
  getCurrentInstance,
} from 'vue'
import { tabbarKey } from '../cc-tabbar/constants'
import { getCurrentPages, uni } from '@dcloudio/uni-h5'

const props = withDefaults(
  defineProps<{
    // 图标
    icon?: string
    // 显示的文字
    title: string
    // 跳转路径
    url?: string
    // 徽标显示的数字
    count?: string | number
    // 徽标是否显示红点
    dot?: boolean
    // 中间凸起按钮
    midButton?: boolean
    // 是否禁用
    disabled?: boolean
  }>(),
  {
    icon: '',
    url: '',
    count: '',
    dot: false,
    midButton: false,
    disabled: false,
  }
)

const tabbar = inject(tabbarKey, undefined)
const instance = getCurrentInstance()

const route = ref()
const index = ref(0)

const clickItem = () => {
  if (props.disabled) {
    return
  }
  if (props.url) {
    uni.navigateTo({
      url: props.url,
    })
  }
  tabbar?.change(index.value)
}

onMounted(() => {
  const routes = getCurrentPages()
  route.value = routes[routes.length - 1].route
  tabbar?.addChild(instance as ComponentInternalInstance)
  nextTick(() => {
    index.value = tabbar?.children.value.indexOf(instance as ComponentInternalInstance) as number
  })
})
</script>

<style scoped lang="scss">
.cc-tabbar-item {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  padding: 8rpx 0;
  &-text {
    position: relative;
  }
  &-midbtn {
    width: 74rpx;
    height: 74rpx;
    border-radius: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute !important;
    background-color: #fff;
    top: -60rpx;
    left: 36rpx;
    z-index: 6;
  }
  &-icon {
    position: relative;
  }
  &-count {
    position: absolute;
    top: 16rpx;
    right: -16rpx;
    box-sizing: border-box;
    min-width: 32rpx;
    padding: 0 6rpx;
    color: #fff;
    font-weight: 500;
    font-size: 24rpx;
    text-align: center;
    background-color: #ee0a24;
    border: 2rpx solid #fff;
    border-radius: 32rpx;
    transform: translate(50%, -50%);
    transform-origin: 100%;
  }
  &-dot {
    position: absolute;
    width: 16rpx;
    height: 16rpx;
    background: #ee0a24;
    border-radius: 100%;
    top: 8rpx;
    right: -12rpx;
    transform: translate(50%, -50%);
    transform-origin: 100%;
  }
  .disabled {
    color: #c8c9cc;
    cursor: not-allowed;
    pointer-events: none;
  }
}
</style>
