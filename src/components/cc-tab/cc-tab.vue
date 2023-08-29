<template>
  <view class="cc-tabs-content" @click="clickItem">
    <view class="cc-tabs-content-title">
      <view :class="{ disabled }" v-if="$slots.default"><slot></slot></view>
      <view v-else>{{ title }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {
  ComponentInternalInstance,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  ref,
} from 'vue'
import { tabsKey } from '../cc-tabs/constants'
import { uni } from '@dcloudio/uni-h5'

const props = withDefaults(
  defineProps<{
    // 标题
    title?: string
    // 是否禁用
    disabled?: boolean
  }>(),
  {
    title: '',
    disabled: false,
  }
)

const tabs = inject(tabsKey, undefined)
const instance = getCurrentInstance()

const index = ref(0)

const clickItem = () => {
  if (props.disabled) {
    return
  }
  tabs?.setIndex(index.value)
  tabs?.change(index.value)
  uni
    .createSelectorQuery()
    .in(this)
    .selectAll('.cc-tabs-content')
    .boundingClientRect(res => {
      let width = res[index.value].width
      let offsetLeft = res[index.value].left
      let left = offsetLeft - (width - (tabs?.lineWidth as number)) / 2
      tabs?.setScrollLeft(left < 0 ? 0 : left)
    })
    .exec()
}

onMounted(() => {
  tabs?.addChild(instance as ComponentInternalInstance)
  nextTick(() => {
    index.value = tabs?.children.value.indexOf(instance as ComponentInternalInstance) as number
  })
})
</script>

<style scoped lang="scss">
.cc-tabs-content {
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  position: relative;
  &-title {
    padding: 0px 20rpx;
    font-size: 12px;
    margin-bottom: 20rpx;
  }
}
.disabled {
  color: #c8c9cc;
  background-color: #f7f8fa;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
