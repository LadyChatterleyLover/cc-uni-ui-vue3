<template>
  <view
    :class="{ 'cc-nav-bar-fixed': fixed }"
    class="cc-nav-bar"
    :style="{ background, zIndex: Number(zIndex) }"
  >
    <view class="cc-nav-bar-left" @click="clickLeft">
      <view>
        <slot v-if="$slots.left" name="left"></slot>
        <view v-else class="cc-nav-bar-left-content">
          <view class="cc-nav-bar-left-content-icon" v-if="leftArrow">
            <cc-icon :color="background ? '#fff' : leftIconColor" :type="leftIcon"></cc-icon>
          </view>
          <view
            :style="{ color: background ? '#fff' : leftTextColor }"
            class="cc-nav-bar-left-content-text"
          >
            {{ leftText }}
          </view>
        </view>
      </view>
    </view>
    <view @click="clickTitle">
      <slot v-if="$slots.default"></slot>
      <view class="cc-nav-bar-title" v-else :style="{ color: background ? '#fff' : titleColor }">
        {{ title }}
      </view>
    </view>
    <view class="cc-nav-bar-right" @click="clickRight">
      <view>
        <slot name="right" v-if="$slots.right"></slot>
        <view :style="{ color: background ? '#fff' : rightColor, fontSize: titleSize }" v-else>
          {{ rightText }}
        </view>
      </view>
    </view>
  </view>
  <view v-if="fixed && placeholder" class="cc-nav-bar-placeholder"></view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    // 标题
    title?: string
    // 标题颜色
    titleColor?: string
    // 标题尺寸
    titleSize?: string | number
    // 左侧文字
    leftText?: string
    // 左侧图标
    leftIcon?: string
    // 左侧图标颜色
    leftIconColor?: string
    // 左侧文字颜色
    leftTextColor?: string
    // 右侧标题
    rightText?: string
    // 右侧文字颜色
    rightColor?: string
    // 导航栏背景颜色
    background?: string
    // 是否显示左侧箭头
    leftArrow?: boolean
    // 是否固定在顶部
    fixed?: boolean
    // 固定在顶部时，是否在标签位置生成一个等高的占位元素
    placeholder?: boolean
    // 固定在顶部的层级
    zIndex?: string | number
  }>(),
  {
    title: '',
    titleColor: '#606266',
    titleSize: 44,
    leftText: '',
    leftIcon: 'arrowleft',
    leftIconColor: '#606266',
    leftTextColor: '#606266',
    rightText: '',
    rightColor: '#606266',
    background: '',
    leftArrow: false,
    fixed: false,
    placeholder: false,
    zIndex: 999,
  }
)

const emits = defineEmits<{
  clickLeft: [val: Event]
  clickRight: [val: Event]
  clickTitle: [val: Event]
}>()

const clickLeft = e => {
  emits('clickLeft', e)
}
const clickTitle = e => {
  emits('clickTitle', e)
}
const clickRight = e => {
  emits('clickRight', e)
}
</script>

<style scoped lang="scss">
.cc-nav-bar {
  display: flex;
  align-items: center;
  height: 88rpx;
  justify-content: space-between;
  padding: 0 40rpx;
  background: #fff;
  &-placeholder {
    height: 88rpx;
  }
  &-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  &-title {
    width: 400rpx;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &-left,
  &-right {
    font-size: 28rpx;
    height: 88rpx;
    display: flex;
    align-items: center;
  }
  &-left {
    &-content {
      display: flex;
      align-items: center;
      &-icon {
        height: 88rpx;
        display: flex;
        align-items: center;
      }
      &-text {
        margin-left: 8rpx;
      }
    }
  }
}
</style>
