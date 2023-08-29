<template>
  <view
    class="cc-tabbar"
    :class="{ 'cc-tabbar-fixed': fixed, 'cc-tabbar-border': border }"
    :style="{
      height: height + 'rpx',
      background: bgColor,
      zIndex: zIndex,
    }"
  >
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { getCurrentPages } from '@dcloudio/uni-h5'
import { ComponentInternalInstance, computed, onMounted, provide, ref } from 'vue'
import { tabbarKey } from './constants'

const props = withDefaults(
  defineProps<{
    // 当前激活菜单索引
    modelValue: string | number
    // 是否固定在底部
    fixed?: boolean
    // 是否显示上边框
    border?: boolean
    // 开启路由模式
    router?: boolean
    // 选中标签的颜色
    activeColor?: string
    // 未选中标签的颜色
    inactiveColor?: string
    // 图标尺寸
    iconSize?: string | number
    // 层级
    zIndex?: string | number
    // 导航栏高度
    height?: string | number
    // 背景颜色
    bgColor?: string
  }>(),
  {
    fixed: false,
    border: false,
    router: false,
    activeColor: '#0081ff',
    inactiveColor: '#7d7e80',
    iconSize: 40,
    height: 100,
    bgColor: '#fff',
    zIndex: 999,
  }
)

const emits = defineEmits<{
  'update:modelValue': [val: number]
  change: [val: number]
}>()

const children = ref<ComponentInternalInstance[]>([])

const changeEvent = (val: number) => {
  emits('update:modelValue', val)
  emits('change', val)
}

const addChild = child => {
  children.value.push(child)
}

const route = ref()

provide(tabbarKey, {
  active: computed(() => props.modelValue),
  children: computed(() => children.value),
  router: props.router,
  activeColor: props.activeColor,
  inactiveColor: props.inactiveColor,
  iconSize: props.iconSize,
  addChild,
  change: changeEvent,
})

onMounted(() => {
  let routes = getCurrentPages()
  route.value = routes[routes.length - 1].route
})
</script>

<style scoped lang="scss">
.cc-tabbar {
  display: flex;
  align-items: center;
  width: 100%;
  &-fixed {
    position: fixed;
    left: 0;
    bottom: 0;
  }
  &-border {
    border-top: 1px solid #eee;
  }
}
</style>
