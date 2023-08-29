<template>
  <view
    class="cc-sidebar-item"
    :style="{
      background:
        sidebar?.active.value === index
          ? sidebar?.activeColor
            ? sidebar?.activeColor
            : '#fff'
          : sidebar?.bgColor,
      width: sidebar?.width + 'rpx',
    }"
    @click="clickItem"
  >
    <cc-badge :dot="dot" :content="badge" v-if="dot || badge">
      <view class="cc-sidebar-item-title">
        <slot v-if="$slots.title" name="title"></slot>
        <text v-else>{{ title }}</text>
      </view>
    </cc-badge>
    <view
      v-else
      class="cc-sidebar-item-title"
      :class="{ 'cc-sidebar-item-weight': sidebar?.active.value === index, disabled: disabled }"
      :style="{
        color:
          sidebar?.active.value === index
            ? sidebar?.activeTextColor
              ? sidebar?.activeTextColor
              : '#323233'
            : sidebar?.textColor
            ? sidebar?.textColor
            : '#323233',
      }"
    >
      <slot v-if="$slots.title" name="title"></slot>
      <text v-else>{{ title }}</text>
    </view>
    <view
      class="cc-sidebar-item-active"
      :style="{
        background: sidebar?.lineColor,
        width: sidebar?.lineWidth + 'rpx',
        height: sidebar?.lineHeight + 'rpx',
      }"
      v-if="sidebar?.showLine && index === sidebar?.active.value"
    ></view>
  </view>
</template>

<script setup lang="ts">
import {
  ComponentInternalInstance,
  inject,
  nextTick,
  onMounted,
  ref,
  getCurrentInstance,
} from 'vue'
import { sidebarKey } from '../cc-sidebar/constants'

const props = withDefaults(
  defineProps<{
    // 标题
    title?: string
    // 是否显示圆点
    dot?: boolean
    // 徽标内容
    badge?: string | number
    // 是否禁用
    disabled?: boolean
  }>(),
  {
    title: '',
    dot: false,
    badge: '',
    disabled: false,
  }
)
const instance = getCurrentInstance()
const sidebar = inject(sidebarKey, undefined)

const index = ref(0)

const clickItem = () => {
  if (props.disabled) {
    return
  }
  sidebar?.setIndex(index.value)
  sidebar?.change(index.value)
}

onMounted(() => {
  sidebar?.addChild(instance as ComponentInternalInstance)
  nextTick(() => {
    index.value = sidebar?.children.value.indexOf(instance as ComponentInternalInstance) as number
  })
})
</script>

<style scoped lang="scss">
.cc-sidebar-item {
  position: relative;
  padding: 40rpx 40rpx;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  &-title {
    font-size: 28rpx;
  }
  &-active {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  &-weight {
    font-weight: 700;
  }
}
.disabled {
  color: #c8c9cc !important;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
