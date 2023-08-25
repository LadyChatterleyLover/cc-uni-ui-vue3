<template>
  <view class="cc-skeleton" v-if="loading">
    <view
      v-if="avatar"
      class="cc-skeleton-avatar"
      :class="{ 'cc-skeleton-avatar-round': round, 'cc-skeleton-animate': animate }"
      :style="{ width: avatarSize + 'px', height: avatarSize + 'px', background: bgColor }"
    ></view>
    <view class="cc-skeleton-wrap" :class="{ 'cc-skeleton-wrap-hasavatar': avatar }">
      <view
        v-if="title"
        class="cc-skeleton-content cc-skeleton-title"
        :class="{ 'cc-skeleton-animate': animate }"
        :style="{ background: bgColor }"
      ></view>
      <template v-if="row > 0">
        <view
          v-for="item in row"
          :key="item"
          class="cc-skeleton-content cc-skeleton-row"
          :class="{ 'cc-skeleton-row-last': item === row, 'cc-skeleton-animate': animate }"
          :style="{ background: bgColor }"
        ></view>
      </template>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    // 段落占位图行数
    row?: number
    // 是否开启动画
    animate?: boolean
    // 是否显示标题占位图
    title?: boolean
    // 是否显示头像占位图
    avatar?: boolean
    // 是否显示骨架屏，传 false 时会展示子组件内容
    loading?: boolean
    // 头像占位图大小
    avatarSize?: string | number
    // 头像是否圆形
    round?: boolean
    // 骨架组件背景颜色
    bgColor?: string
  }>(),
  {
    row: 0,
    animate: false,
    title: false,
    avatar: false,
    loading: true,
    round: true,
    avatarSize: 32,
    bgColor: '#f2f3f5',
  }
)
</script>

<style scoped lang="scss">
.cc-skeleton {
  width: 100%;
  display: flex;
  &-animate {
    animation: skeleton-animate 1.2s ease-in-out infinite;
  }
  &-title {
    width: 40%;
  }
  &-wrap {
    flex: 1;
    &-hasavatar {
      padding-top: 16rpx;
    }
  }
  &-content {
    height: 16px;
  }
  &-avatar {
    margin-right: 32rpx;
    &-round {
      border-radius: 100%;
    }
  }
  &-row {
    width: 100%;
    margin-top: 40rpx;
    &-last {
      width: 60%;
    }
  }
}
@keyframes skeleton-animate {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.6;
  }
}
</style>
