<template>
  <view class="cc-steps-item" :class="{ 'cc-steps-item-vertical': steps?.vertical }">
    <view class="cc-steps-item-index" :class="{ 'cc-steps-item-index-vertical': steps?.vertical }">
      <view
        v-if="steps?.dot"
        class="cc-steps-item-index-dot"
        :style="{ background: steps?.active.value >= index ? '#0081ff' : '#909399' }"
      ></view>
      <view
        v-else
        class="cc-steps-item-index-num"
        :style="{
            background: steps!.active.value >= index ?  '#0081ff' : '#fff',
            color: '#909399',
            border:  `1px solid #909399`
          }"
      >
        <view v-if="steps!.active.value >= index">
          <cc-icon
            v-if="icon"
            :type="icon"
            size="12"
            :color="steps!.active.value >= index ? '#fff' : '#909399'"
          ></cc-icon>
          <cc-icon
            v-else
            type="checkmarkempty"
            :color="steps!.active.value >= index ? '#fff' : '#909399'"
          ></cc-icon>
        </view>
        <view v-else>
          <view v-if="icon">
            <cc-icon v-if="icon" :type="icon" size="12"></cc-icon>
          </view>
          <view v-else>{{ index + 1 }}</view>
        </view>
      </view>

      <view
        class="cc-steps-item-index-line"
        :class="{ 'cc-steps-item-index-line-vertical': steps?.vertical }"
      ></view>
    </view>
    <view
      class="cc-steps-item-name"
      :class="{ 'cc-steps-item-name-vertical': steps?.vertical }"
      :style="{ color: steps!.active.value >= index ?  '#0081ff' : '' }"
      >{{ name }}</view
    >
    <view
      class="cc-steps-item-name cc-steps-item-content"
      :class="{ 'cc-steps-item-content-vertical': steps?.vertical }"
      :style="{ color: steps!.active.value >= index ? '#0081ff' : '' }"
      v-if="content"
      >{{ content }}</view
    >
  </view>
</template>

<script setup lang="ts">
import {
  inject,
  onMounted,
  ref,
  getCurrentInstance,
  ComponentInternalInstance,
  nextTick,
} from 'vue'
import { stepsKey } from '../cc-steps/constants'

const props = withDefaults(
  defineProps<{
    name?: string
    icon?: string
    content?: string
  }>(),
  {
    icon: '',
    name: '',
    content: '',
  }
)

const steps = inject(stepsKey, undefined)
const instance = getCurrentInstance()

const index = ref(0)

onMounted(() => {
  steps?.addChild(instance as ComponentInternalInstance)
  nextTick(() => {
    index.value = steps?.children.value.indexOf(instance as ComponentInternalInstance) as number
  })
})
</script>

<style scoped lang="scss">
.cc-steps-item {
  flex: 1;
  &-vertical {
    display: flex;
  }
  &-index {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    &-vertical {
      flex-direction: column;
    }
    &-dot {
      width: 8px;
      height: 8px;
      background: #909399;
      border-radius: 100%;
    }
    &-line {
      width: 50%;
      height: 2rpx;
      margin: 0 10rpx;
      background: #ebedf0;
      &-vertical {
        width: 2rpx !important;
        height: 40rpx !important;
        margin: 10rpx 0;
      }
    }
    &-num {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50rpx;
      height: 50rpx;
      border-radius: 100%;
      color: #fff;
    }
  }
  &-name {
    font-size: 24rpx;
    margin-top: 20rpx;
    position: relative;
    left: 6rpx;
    &-vertical {
      margin-top: 0;
      left: 20rpx;
    }
  }
  &-content {
    &-vertical {
      position: relative;
      top: 20rpx;
      left: -28px;
    }
  }
}
</style>
