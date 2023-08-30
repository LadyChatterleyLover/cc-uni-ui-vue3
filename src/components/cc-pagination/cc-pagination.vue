<template>
  <view class="cc-pagination">
    <view
      class="cc-pagination-pre"
      :class="{ 'cc-pagination-disabled': activeIndex === 1 }"
      @click="pre"
    >
      <slot name="pre" v-if="$slots.pre"></slot>
      <view v-else>{{ prevText }}</view>
    </view>
    <view class="cc-pagination-content" v-if="!simple">
      <view
        class="cc-pagination-content-item"
        :class="{ 'cc-pagination-content-item-active': activeIndex === item.value }"
        v-for="(item, index) in showCount"
        :key="index"
        @click="clickItem(item)"
      >
        <slot
          name="page"
          v-if="$slots.page"
          :current="activeIndex"
          :text="item.text"
          :active="activeIndex === item.value"
        ></slot>
        <view v-else>{{ item.text }}</view>
      </view>
    </view>
    <view v-else class="cc-pagination-desc">
      <slot name="page" v-if="$slots.page" :current="activeIndex"></slot>
      <view v-else>{{ activeIndex }} / {{ total }}</view>
    </view>
    <view
      class="cc-pagination-next"
      :class="{ 'cc-pagination-disabled': activeIndex === total }"
      @click="next"
    >
      <slot name="next" v-if="$slots.next"></slot>
      <view v-else>{{ nextText }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    // 当前页码
    current?: number
    // 是否是简单模式
    simple?: boolean
    // 上一页按钮文字
    prevText?: string
    // 下一页按钮文字
    nextText?: string
    // 总数量
    total?: number
    // 每页记录数
    pageSize?: number
    // 显示的页码个数
    showPageSize?: number
    // 是否显示省略号
    forceEllipses?: boolean
  }>(),
  {
    current: 1,
    simple: false,
    prevText: '上一页',
    nextText: '下一页',
    total: 0,
    pageSize: 10,
    showPageSize: 5,
    forceEllipses: false,
  }
)

const emits = defineEmits<{
  change: [val: number]
}>()

const activeIndex = ref(props.current)

const pre = () => {
  if (activeIndex.value === 1) return
  activeIndex.value--
}
const next = () => {
  if (activeIndex.value === props.total) return
  activeIndex.value++
}

const clickItem = (item: { value: number }) => {
  activeIndex.value = item.value
  emits('change', activeIndex.value)
}

const showCount = computed(() => {
  let arr: { value: number; text: number | string }[] = []
  for (let i = 1; i <= Number(props.total); i++) {
    arr.push({
      value: i,
      text: i,
    })
  }
  if (!props.simple) {
    let total = Number(props.total)
    let showPageSize = Number(props.showPageSize)
    let half = Math.ceil(showPageSize / 2)
    let diff = showPageSize - half

    if (activeIndex.value <= half) return arr.slice(0, showPageSize)
    else if (activeIndex.value > total - diff) {
      return arr.slice(total - showPageSize, total)
    } else {
      if (!props.forceEllipses) {
        return arr.slice(activeIndex.value - half, activeIndex.value + diff)
      } else {
        let arr1 = arr.slice(activeIndex.value - half, activeIndex.value + diff)
        arr1[0].text = '...'
        arr1[arr1.length - 1].text = '...'
        return arr1
      }
    }
  }
})
</script>

<style scoped lang="scss">
.cc-pagination {
  display: flex;
  align-items: center;
  &-desc {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    color: #646566;
  }
  &-pre,
  &-next {
    min-width: 72rpx;
    height: 80rpx;
    user-select: none;
    flex: 1;
    background: #fff;
    color: #0081ff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8rpx;
  }
  &-content {
    display: flex;
    align-items: center;
    &-item {
      height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0081ff;
      min-width: 72rpx;
      height: 80rpx;
      user-select: none;
      flex: 1;
      background: #fff;
      &-active {
        background: #0081ff;
        color: #fff;
      }
    }
  }
  &-disabled {
    color: #646566;
    background-color: #f7f8fa;
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
