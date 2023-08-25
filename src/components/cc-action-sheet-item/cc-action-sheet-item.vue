<template>
  <view
    @click="handleClick"
    class="cc-action-sheet-item"
    :style="{ color: color, fontSize: fontSize && fontSize + 'rpx' }"
    :class="{ 'cc-action-sheet-item-disabled': disabled }"
  >
    <view class="cc-action-sheet-item-loading" v-if="loading">
      <cc-icon type="spinner-cycle" size="16" color="#c8c9cc"></cc-icon>
    </view>
    <view v-else>{{ name }}</view>
  </view>
  <view class="cc-action-sheet-item-subname" v-if="subname">{{ subname }}</view>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { actionSheetKey } from '../cc-action-sheet/constants'

const actionSheet = inject(actionSheetKey, undefined)

const props = withDefaults(
  defineProps<{
    name: string
    // 二级标题
    subname?: string
    // 文字颜色
    color?: string
    // 是否禁用
    disabled?: boolean
    // 文字大小
    fontSize?: number | string
    // 加载状态
    loading?: boolean
    // 是否在点击选项后关闭
    closeOnClickAction?: boolean
  }>(),
  {
    subname: '',
    color: '',
    disabled: false,
    loading: false,
    closeOnClickAction: true,
    fontSize: '',
  }
)

const handleClick = () => {
  actionSheet.select(props.name)
  if (props.closeOnClickAction) {
    actionSheet.close()
  }
}
</script>

<style lang="scss" scoped>
.cc-action-sheet-item {
  width: 100%;
  padding: 28rpx 0;
  font-size: 16px;
  background-color: #fff;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &-loading {
    animation: loading 1.5s linear infinite;
  }
  &-subname {
    margin-top: 16rpx;
    color: #969799;
    font-size: 12px;
    line-height: 36rpx;
  }
  &-disabled {
    color: #c8c9cc;
    cursor: not-allowed;
    pointer-events: none;
  }
}
@keyframes loading {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
