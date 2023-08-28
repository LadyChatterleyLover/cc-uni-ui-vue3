<template>
  <view class="cc-collapse-item">
    <cc-cell
      :title="title"
      :value="value"
      :label="label"
      :icon="icon"
      :border="border"
      :size="size"
      :iconSize="iconSize"
      @click="clickItem"
      :isLink="false"
      :class="{ disabled: disabled }"
      :name="name"
    >
      <template #title>
        <slot name="title" v-if="$slots.title"></slot>
      </template>
      <template #value>
        <view>
          <slot name="value" v-if="$slots.value"></slot>
        </view>
      </template>
      <template #right-icon>
        <view v-if="arrow" class="cc-collapse-item-icon">
          <view
            class="cc-collapse-item-icon-content"
            :class="{
              'cc-collapse-item-icon-active': (collapse.activeList.value as any[]).includes(props.name),
            }"
          >
            <cc-icon
              :color="disabled ? '#c8c9cc' : arrowColor ? arrowColor : '#969799'"
              type="arrowdown"
              :size="arrowSize ? arrowSize : 16"
            ></cc-icon>
          </view>
        </view>
      </template>
    </cc-cell>
    <view
      class="cc-collapse-item-wrap"
      :style="{
        height: (collapse.activeList.value as any[]).includes(props.name) ? height + 'px' : 0,
      }"
    >
      <view class="cc-collapse-item-content" :id="`cc-collapse-item-content-${uid}-${name}`">
        <slot v-if="$slots.content" name="content"></slot>
        <view v-else>{{ content }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { inject, ref, getCurrentInstance, nextTick, watch, onMounted } from 'vue'
import { collapseKey } from '../cc-collapse/constants'

const props = withDefaults(
  defineProps<{
    // 标题
    title?: string
    // 内容
    content?: string
    // 标识符
    name: string | number
    // 右侧内容
    value?: string
    // 标题下方描述
    label?: string
    // 左侧图标
    icon?: string
    // 图标大小
    iconSize?: string | number
    // 是否显示边框
    border?: boolean
    // 尺寸
    size?: '' | 'large'
    // 显示右侧箭头
    arrow?: boolean
    // 右侧箭头颜色
    arrowColor?: string
    // 右侧箭头大小
    arrowSize?: string | number
    // 是否禁用
    disabled?: boolean
  }>(),
  {
    title: '',
    content: '',
    value: '',
    label: '',
    icon: '',
    iconSize: 32,
    border: true,
    size: '',
    arrow: true,
    arrowSize: 16,
    arrowColor: '#969799',
    disabled: false,
  }
)

const instance = getCurrentInstance()
const collapse = inject(collapseKey, undefined)
const uid = instance.uid
const height = ref(0)

const clickItem = () => {
  const arr = [...new Set(collapse.activeList.value as any[])]
  collapse.setActiveList(arr)
  if (!(collapse.activeList.value as any[]).includes(props.name)) {
    if (collapse.accordion.value) {
      collapse.setActiveList([])
    }
    ;(collapse.activeList.value as any[]).push(props.name)
  } else {
    const index = (collapse.activeList.value as any[]).indexOf(props.name)
    ;(collapse.activeList.value as any[]).splice(index, 1)
  }
  collapse?.change(props.name)
}
onMounted(() => {
  ;(collapse.activeList.value as any[]).push(collapse?.value.value)
  const arr = [...new Set(collapse.activeList.value as any[])]
  collapse.setActiveList(arr)
})

watch(
  () => collapse.value.value,
  val => {
    nextTick(() => {
      const query = uni.createSelectorQuery().in(instance)
      query
        .select(`#cc-collapse-item-content-${uid}-${val}`)
        .boundingClientRect(data => {
          if (data) {
            height.value = data.height
          }
        })
        .exec()
    })
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.cc-collapse-item {
  .disabled {
    color: #c8c9cc;
    pointer-events: none;
    cursor: not-allowed;
  }
  &-icon {
    display: flex;
    align-items: center;
    &-content {
      transition: all 0.3s;
      margin-left: 8rpx;
    }
    &-active {
      transform: rotate(180deg);
    }
  }
  &-wrap {
    height: 0;
    transition: all 0.3s;
    overflow: hidden;
  }
  &-content {
    padding: 24rpx 32rpx;
    color: #969799;
    font-size: 14px;
  }
}
</style>
