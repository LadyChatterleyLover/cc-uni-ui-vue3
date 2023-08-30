<template>
  <view class="cc-password-input">
    <view
      class="cc-password-input-content"
      :class="{
        'cc-password-input-content-show': modelValue,
        'cc-password-input-content-hide': !modelValue,
      }"
      :style="{ display: contentDisplay }"
    >
      <view
        class="cc-password-input-content-item"
        :class="{
          'cc-password-input-content-item-noborder':
            Number(gutter) === 0 && index < list.length - 1,
        }"
        v-for="(item, index) in list"
        :key="index"
        :style="{ marginRight: gutter + 'px' }"
      >
        <view
          class="cc-password-input-content-item-content"
          :class="{ 'cc-password-input-content-item-content-mask': mask }"
          v-if="item"
        >
          <view class="cc-password-input-content-item-content-nomask" v-if="!mask">{{ item }}</view>
        </view>
      </view>
      <view @click="close" class="cc-password-input-content-close" v-if="closeable">
        <cc-icon type="closeempty" size="22"></cc-icon>
      </view>
    </view>
    <cc-number-keyboard
      :showTooltip="false"
      v-model="modelValue"
      extra-key
      @change="handleChange"
      @backspace="backspace"
      ref="keyboard"
    ></cc-number-keyboard>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    // 是否显示密码输入框
    modelValue: boolean
    // 自定义长度
    length?: string | number
    // 显示关闭按钮
    closeable?: boolean
    // 格子间距
    gutter?: string | number
    // 是否密文显示
    mask?: boolean
    // 初始值
    initValue?: string
  }>(),
  {
    length: 6,
    closeable: true,
    gutter: 10,
    mask: true,
    initValue: '',
  }
)

// const emits = defineEmits(['update:value', 'compconste', 'change', 'backspace'])
const emits = defineEmits<{
  'update:modelValue': [val: boolean]
  compconste: [val: string]
  change: [val: string]
  backspace: [val: string]
}>()

const list = ref<string[]>([])
const display = ref<'block' | 'none'>('none')
const contentDisplay = ref<'flex' | 'none'>('none')
const clickNum = ref<number>(-1)

const keyboard = ref()

if (!props.initValue) list.value = Array(Number(props.length)).fill('') as string[]
else {
  const strArr: string[] = props.initValue.split('')
  list.value = [
    ...strArr,
    ...(Array(Number(Number(props.length) - props.initValue.length)).fill('') as string[]),
  ]
  clickNum.value = props.initValue.length - 1
}

// 输入值的时候
const handleChange = (val: string) => {
  clickNum.value++
  list.value[clickNum.value] = val
  if (clickNum.value >= 5) {
    clickNum.value = -1
    emits('update:modelValue', !props.modelValue)
    emits('compconste', list.value.join(''))
  }
}
// 点后退按钮
const backspace = () => {
  console.log(clickNum.value)
  list.value[clickNum.value] = ''
  clickNum.value--
  if (list.value.length) emits('backspace', list.value.join(''))
  if (clickNum.value <= -1) {
    clickNum.value = -1
  }
}

// 点击关闭按钮
const close = () => {
  list.value = list.value = Array(Number(props.length)).fill('') as string[]
  keyboard.value.closeMask()
  clickNum.value = -1
}

watch(
  () => list.value,
  val => {
    const valArr = Object.values(val)
    const list = Array(Number(props.length)).fill('')
    if (props.modelValue && JSON.stringify(valArr) !== JSON.stringify(list))
      emits('change', val.join(''))
  },
  { deep: true }
)

watch(
  () => props.modelValue,
  val => {
    if (val) {
      display.value = 'block'
      contentDisplay.value = 'flex'
    } else {
      setTimeout(() => {
        display.value = 'none'
        contentDisplay.value = 'none'
        list.value = Array(Number(props.length)).fill('') as string[]
      }, 80)
    }
    emits('update:modelValue', val)
  }
)
</script>

<style scoped lang="scss">
.cc-password-input {
  &-content {
    position: fixed;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    background: #fff;
    display: flex;
    align-items: center;
    padding: 56rpx 48rpx;
    opacity: 0;
    z-index: 2000;
    &-close {
      position: absolute;
      right: 8rpx;
      top: 8rpx;
      z-index: 99;
    }
    &-show {
      animation: show-content 0.3s linear forwards;
    }
    &-hide {
      animation: hide-content 0.3s linear forwards;
    }
    &-item {
      width: 80rpx;
      height: 80rpx;
      background: #fff;
      border: 2rpx solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      &-noborder {
        border-right: 0;
      }
      &-content {
        width: 20rpx;
        height: 20rpx;
        &-mask {
          background: #000;
          border-radius: 100%;
        }
        &-nomask {
          position: relative;
          top: -8rpx;
          left: -2rpx;
        }
      }
    }
  }
}
@keyframes show {
  from {
    opacity: 0;
    bottom: 0;
  }
  to {
    opacity: 1;
    bottom: 444rpx;
  }
}
@keyframes hide {
  from {
    opacity: 1;
    bottom: 444rpx;
  }
  to {
    opacity: 0;
    bottom: 0;
  }
}
@keyframes show-content {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes hide-content {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
