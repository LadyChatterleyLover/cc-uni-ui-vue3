<template>
  <view class="cc-alert" :style="{ borderColor, background }" v-if="visible">
    <view class="cc-alert-icon" v-if="showIcon"
      ><cc-icon :type="icon" :color="iconColor" size="14"></cc-icon
    ></view>
    <view class="cc-alert-content">
      <view class="cc-alert-content-title" v-if="title">{{ title }}</view>
      <view class="cc-alert-content-description" v-if="description">{{ description }}</view>
    </view>
    <view class="cc-alert-close" @click="close" v-if="closeable"
      ><cc-icon type="closeempty" size="14" color="#c0c4cc"></cc-icon
    ></view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

export type AlertType = 'primary' | 'success' | 'warning' | 'error' | 'info'

const props = withDefaults(
  defineProps<{
    // 标题
    title?: string
    // 描述
    description?: string
    // 是否显示警告提示
    modelValue?: boolean
    // 类型
    type?: AlertType
    // 是否显示图标
    showIcon?: boolean
    // 是否可关闭
    closeable?: boolean
  }>(),
  {
    title: '',
    description: '',
    type: 'warning',
    modelValue: true,
    showIcon: false,
    closeable: false,
  }
)

const emits = defineEmits<{
  'update:modelValue': [val: boolean]
  change: [val: boolean]
  close: []
}>()

const visible = ref(props.modelValue)

const iconList = [
  {
    type: 'primary',
    icon: 'checkbox',
  },
  {
    type: 'success',
    icon: 'info',
  },
  {
    type: 'error',
    icon: 'close',
  },
  {
    type: 'warning',
    icon: 'info',
  },
  {
    type: 'info',
    icon: 'info',
  },
]

const colorList = [
  {
    type: 'primary',
    borderColor: '#a0cfff',
    background: '#ecf5ff',
  },
  {
    type: 'success',
    borderColor: '#71d5a1',
    background: '#dbf1e1',
  },
  {
    type: 'error',
    borderColor: '#a0cfff',
    background: '#fef0f0',
  },
  {
    type: 'warning',
    borderColor: '#fcbd71',
    background: '#fdf6ec',
  },
  {
    type: 'info',
    borderColor: '#c8c9cc',
    background: '#f4f4f5',
  },
]

const iconColorList = [
  {
    type: 'primary',
    color: '#2979ff',
  },
  {
    type: 'success',
    color: '#19be6b',
  },
  {
    type: 'error',
    color: '#fa3534',
  },
  {
    type: 'warning',
    color: '#f90',
  },
  {
    type: 'info',
    color: '#909399',
  },
]

const icon = computed(() => iconList.find(item => props.type === item.type)?.icon)
const iconColor = computed(() => iconColorList.find(item => props.type === item.type)?.color)
const borderColor = computed(() => colorList.find(item => props.type === item.type)?.borderColor)
const background = computed(() => colorList.find(item => props.type === item.type)?.background)

const close = () => {
  visible.value = false
  emits('close')
}

watch(
  () => visible.value,
  val => {
    emits('change', val)
    emits('update:modelValue', val)
  }
)

watch(
  () => props.modelValue,
  val => {
    visible.value = val
  }
)
</script>

<style scoped lang="scss">
.cc-alert {
  display: flex;
  align-items: center;
  position: relative;
  width: fit-content;
  border: 1px solid;
  padding: 6px 12px;
  border-radius: 2px;
  &-icon {
    margin-right: 6px;
  }
  &-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-title {
      font-size: 13px;
      color: #303133;
      font-weight: 500;
    }
    &-description {
      font-size: 12px;
      text-align: left;
      color: #606266;
    }
  }
  &-close {
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 99;
  }
}
</style>
