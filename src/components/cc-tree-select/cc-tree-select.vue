<template>
  <view class="cc-tree-select">
    <template v-if="isMultiple">
      <view class="cc-tree-select-index">
        <view
          @click="clickNav(item, index)"
          v-for="(item, index) in list"
          :key="index"
          class="cc-tree-select-index-container"
          :class="{
            'cc-tree-select-index-active': currentIndex === index,
            'cc-tree-select-disabled': item.disabled,
          }"
        >
          <cc-badge v-if="item.dot || item.badge" :dot="item.dot" :content="item.badge">{{
            item.text
          }}</cc-badge>
          <text v-else>{{ item.text }}</text>
        </view>
      </view>
      <view class="cc-tree-select-content" v-if="currentItem && currentItem.children">
        <view
          class="cc-tree-select-content-item"
          v-for="(item, index) in currentItem.children"
          :key="index"
          @click="clickItem(item, index)"
        >
          <view
            class="cc-tree-select-content-item-text"
            :class="{ 'cc-tree-select-disabled': item.disabled }"
            :style="{ color: item.checked ? activeColor : '#000' }"
            >{{ item.text }}</view
          >
          <view v-if="item.checked">
            <cc-icon :type="selectedIcon" :color="activeColor" size="16"></cc-icon>
          </view>
        </view>
      </view>
    </template>
    <template v-else>
      <view class="cc-tree-select-index">
        <view
          @click="clickNav(item, index)"
          v-for="(item, index) in list"
          :key="index"
          class="cc-tree-select-index-container"
          :class="{
            'cc-tree-select-index-active': currentIndex === index,
            'cc-tree-select-disabled': item.disabled,
          }"
        >
          <cc-badge v-if="item.dot || item.badge" :dot="item.dot" :content="item.badge">{{
            item.text
          }}</cc-badge>
          <text v-else>{{ item.text }}</text>
        </view>
      </view>
      <view class="cc-tree-select-content" v-if="currentItem && currentItem.children">
        <view
          class="cc-tree-select-content-item"
          v-for="(item, index) in currentItem.children"
          :key="index"
          @click="clickItem(item, index)"
        >
          <view
            class="cc-tree-select-content-item-text"
            :class="{ 'cc-tree-select-disabled': item.disabled }"
            :style="{ color: currentItem.currentChildIndex === index ? activeColor : '#000' }"
            >{{ item.text }}</view
          >
          <view v-if="currentItem.currentChildIndex === index">
            <cc-icon :type="selectedIcon" :color="activeColor" size="16"></cc-icon>
          </view>
        </view>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import { cloneDeep } from 'lodash-es'

export interface TreeSelectItem {
  id: string | number
  text: string
  disabled?: boolean
  dot?: boolean
  badge?: string | number
  index?: number
  checked?: boolean
  currentChildIndex?: number
  children?: TreeSelectItem[]
}

const props = withDefaults(
  defineProps<{
    // 分类数据
    items: TreeSelectItem[]
    // 左侧选中项的索引
    mainActiveIndex?: number
    // 右侧选中项的 id，支持传入数组
    activeId?: string | number | string[] | number[]
    // 选中时的图标
    selectedIcon?: string
    // 激活时颜色
    activeColor?: string
  }>(),
  {
    mainActiveIndex: 0,
    activeId: 0,
    selectedIcon: 'checkmarkempty',
    activeColor: '#ee0a24',
  }
)

const emits = defineEmits<{
  clickNav: [val: { item: TreeSelectItem; index: number }]
  clickItem: [val: { item: TreeSelectItem; index: number }]
}>()

const currentIndex = ref(-1)
const currentItem = ref<TreeSelectItem>()
const list = ref<TreeSelectItem[]>(cloneDeep(props.items))

let isMultiple = computed(() => {
  return Array.isArray(props.activeId)
})

const clickNav = (item: TreeSelectItem, index: number) => {
  if (item.disabled) return
  if (isMultiple.value) {
    currentIndex.value = index
    currentItem.value = list.value[currentIndex.value]
    list.value.map((item: TreeSelectItem) => {
      if ((props.activeId as any[]).includes(item.id)) {
        item.checked = true
      } else {
        item.checked = false
      }
    })
  } else {
    currentIndex.value = index
    currentItem.value = list.value[currentIndex.value]
    currentItem.value!.index = index
  }
  emits('clickNav', { item, index })
}

let clickItem = (item: TreeSelectItem, index: number) => {
  if (isMultiple.value) {
    list.value.map((item1: TreeSelectItem) => {
      item1.children &&
        item1.children &&
        item1.children!.map((item2: TreeSelectItem) => {
          if (item1.index !== currentIndex.value) {
            item2.checked = false
          }
        })
    })
    item.checked = !item.checked
    emits('clickItem', { item, index })
  } else {
    list.value.map((item: TreeSelectItem) => {
      if (item.index !== currentIndex.value) {
        item.currentChildIndex = -1
      } else {
        item.currentChildIndex = index
      }
    })
    emits('clickItem', { item, index })
  }
}

const init = () => {
  if (isMultiple.value) {
    list.value.map((item: TreeSelectItem, index: number) => {
      item.index = index
      if (item.children && item.children.length) {
        item.children.map((item1: TreeSelectItem) => {
          item1.checked = false
          item1.index = index
          if (String(props.activeId).includes(String(item1.id))) {
            item1.checked = true
          }
        })
      }
    })
    currentIndex.value = props.mainActiveIndex
    currentItem.value = list.value[props.mainActiveIndex]
  } else {
    list.value.map((item: TreeSelectItem, index: number) => {
      item.index = index
    })
    currentIndex.value = props.mainActiveIndex
    currentItem.value = list.value[props.mainActiveIndex]
    currentItem.value.currentChildIndex = Number(props.activeId)
  }
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.cc-tree-select {
  width: 100%;
  display: flex;
  &-disabled {
    color: #c8c9cc !important;
    cursor: not-allowed;
  }
  &-index {
    flex: 1;
    &-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 96rpx;
      background-color: #f7f8fa;
    }
    &-active {
      background: #fff;
    }
  }
  &-content {
    flex: 2;
    background: #fff;
    &-item {
      height: 96rpx;
      padding: 0 64rpx 0 32rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
