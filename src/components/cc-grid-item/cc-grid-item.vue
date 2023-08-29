<template>
  <view
    class="cc-grid-item"
    @click="clickItem"
    :style="{
      flexBasis: basis,
      paddingRight: grid?.gutter + 'rpx',
      marginBottom: grid?.gutter + 'rpx',
    }"
  >
    <view>
      <slot v-if="$slots.default"></slot>
      <view
        v-else
        :style="{ flexDirection: grid?.vertical ? 'column' : 'row' }"
        class="cc-grid-item-content"
      >
        <view class="cc-grid-item-icon">
          <cc-badge :dot="dot" :content="badge" v-if="dot || badge">
            <cc-icon :type="icon" :color="iconColor" :size="iconSize"></cc-icon>
          </cc-badge>
          <cc-icon v-if="!dot && !badge" :type="icon" :color="iconColor" :size="iconSize"></cc-icon>
        </view>
        <view
          class="cc-grid-item-text"
          :class="{ 'cc-grid-item-content': !grid?.vertical }"
          :style="{ fontSize: textSize + 'rpx', color: textColor }"
          >{{ text }}</view
        >
      </view>
    </view>
    <view class="cc-grid-item-border-right" v-if="!grid?.gutter"></view>
    <view class="cc-grid-item-border-bottom" v-if="!grid?.gutter"></view>
  </view>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { gridKey } from '../cc-grid/constants'

const props = withDefaults(
  defineProps<{
    text?: string
    icon?: string
    textColor?: string
    iconColor?: string
    iconSize?: string | number
    textSize?: string | number
    dot?: boolean
    badge?: number | string
  }>(),
  {
    text: '',
    icon: '',
    textColor: '',
    iconColor: '',
    badge: '',
    iconSize: 40,
    textSize: 28,
    dot: false,
  }
)

const emits = defineEmits<{
  clickItem: [e: Event]
}>()

const grid = inject(gridKey, undefined)

const basis = computed(() => 100 / (grid?.column as number) + '%')

const clickItem = e => {
  emits('clickItem', e)
}
</script>

<style scoped lang="scss">
.cc-grid-item {
  box-sizing: border-box;
  position: relative;
  &-content {
    padding: 32rpx 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
  &-content-row {
    margin-left: 16rpx;
  }
  &-border-right {
    position: absolute;
    height: 100%;
    width: 2rpx;
    background: #ebedf0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  &-border-bottom {
    position: absolute;
    height: 2rpx;
    width: 100%;
    background: #ebedf0;
    bottom: 0;
  }
}
</style>
