<template>
  <cc-popup mode="bottom" v-model="modelValue" ref="popup">
    <view class="cc-number-keyboard">
      <view class="cc-number-keyboard-tooltip" v-if="showTooltip">
        <view
          class="cc-number-keyboard-tooltip-cancel"
          v-if="showTooltip && showCancelBtn"
          @click="cancel"
        >
          {{ cancelText }}
        </view>
        <view class="cc-number-keyboard-tooltip-text" v-if="showTooltip && showTips">{{
          tips
        }}</view>
        <view
          class="cc-number-keyboard-tooltip-confirm"
          v-if="showTooltip && showConfirmBtn"
          @click="confirm"
        >
          {{ confirmText }}
        </view>
      </view>
      <view class="cc-number-keyboard-wrap">
        <view class="cc-number-keyboard-wrap-content">
          <view
            class="cc-number-keyboard-wrap-content-item"
            v-for="(item, index) in keyboardItem"
            :key="index"
            @click="clickItem(item, index)"
          >
            <view class="cc-number-keyboard-wrap-content-item-key" v-html="item"></view>
          </view>
        </view>
      </view>
    </view>
  </cc-popup>
</template>

<script setup lang="ts">
import { watch, ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    // 键盘模式 数字还是身份证
    mode?: 'number' | 'card'
    // 是否打乱键盘顺序
    random?: boolean
    // 是否显示工具栏
    showTooltip?: boolean
    // 是否显示中间文字
    showTips?: boolean
    // 是否显示确认按钮
    showConfirmBtn?: boolean
    // 是否显示取消按钮
    showCancelBtn?: boolean
    // 确认文字
    confirmText?: string
    // 取消文字
    cancelText?: string
    // 中间文字
    tips?: string
    // 底部.按键
    extraKey?: string
  }>(),
  {
    mode: 'number',
    random: false,
    showTooltip: true,
    showTips: true,
    showConfirmBtn: true,
    showCancelBtn: true,
    confirmText: '确认',
    cancelText: '取消',
    tips: '数字键盘',
    extraKey: '.',
  }
)

const emits = defineEmits<{
  'update:modelValue': [val: boolean]
  change: [val: string]
  backspace: []
  confirm: []
  cancel: []
}>()

// 乱序数组
const randomArr = (arr: any[]) => {
  return arr.sort(() => {
    return Math.random() - 0.5
  })
}

const popup = ref()
const keyboardItem = computed(() => {
  if (props.random) {
    const list = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    const l = randomArr(list)
    l[10] = l[9]
    l[9] = props.extraKey
    l[11] =
      '<svg style="width: 28px;height: 18px" viewBox="0 0 32 22" xmlns="http://www.w3.org/2000/svg"><path d="M28.016 0A3.991 3.991 0 0132 3.987v14.026c0 2.2-1.787 3.987-3.98 3.987H10.382c-.509 0-.996-.206-1.374-.585L.89 13.09C.33 12.62 0 11.84 0 11.006c0-.86.325-1.62.887-2.08L9.01.585A1.936 1.936 0 0110.383 0zm0 1.947H10.368L2.24 10.28c-.224.226-.312.432-.312.73 0 .287.094.51.312.729l8.128 8.333h17.648a2.041 2.041 0 002.037-2.04V3.987c0-1.127-.915-2.04-2.037-2.04zM23.028 6a.96.96 0 01.678.292.95.95 0 01-.003 1.377l-3.342 3.348 3.326 3.333c.189.188.292.43.292.679 0 .248-.103.49-.292.679a.96.96 0 01-.678.292.959.959 0 01-.677-.292L18.99 12.36l-3.343 3.345a.96.96 0 01-.677.292.96.96 0 01-.678-.292.962.962 0 01-.292-.68c0-.248.104-.49.292-.679l3.342-3.348-3.342-3.348A.963.963 0 0114 6.971c0-.248.104-.49.292-.679A.96.96 0 0114.97 6a.96.96 0 01.677.292l3.358 3.348 3.345-3.348A.96.96 0 0123.028 6z" fill="currentColor"></path></svg>'
    return l
  } else
    return [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      props.extraKey,
      '0',
      '<svg style="width: 28px;height: 18px" viewBox="0 0 32 22" xmlns="http://www.w3.org/2000/svg"><path d="M28.016 0A3.991 3.991 0 0132 3.987v14.026c0 2.2-1.787 3.987-3.98 3.987H10.382c-.509 0-.996-.206-1.374-.585L.89 13.09C.33 12.62 0 11.84 0 11.006c0-.86.325-1.62.887-2.08L9.01.585A1.936 1.936 0 0110.383 0zm0 1.947H10.368L2.24 10.28c-.224.226-.312.432-.312.73 0 .287.094.51.312.729l8.128 8.333h17.648a2.041 2.041 0 002.037-2.04V3.987c0-1.127-.915-2.04-2.037-2.04zM23.028 6a.96.96 0 01.678.292.95.95 0 01-.003 1.377l-3.342 3.348 3.326 3.333c.189.188.292.43.292.679 0 .248-.103.49-.292.679a.96.96 0 01-.678.292.959.959 0 01-.677-.292L18.99 12.36l-3.343 3.345a.96.96 0 01-.677.292.96.96 0 01-.678-.292.962.962 0 01-.292-.68c0-.248.104-.49.292-.679l3.342-3.348-3.342-3.348A.963.963 0 0114 6.971c0-.248.104-.49.292-.679A.96.96 0 0114.97 6a.96.96 0 01.677.292l3.358 3.348 3.345-3.348A.96.96 0 0123.028 6z" fill="currentColor"></path></svg>',
    ]
})

const closeMask = () => {
  popup.value!.close()
}

// 事件处理
const cancel = () => {
  popup.value!.close()
  emits('cancel')
}
const confirm = () => {
  popup.value!.close()
  emits('confirm')
}
const clickItem = (item: string, index: number) => {
  if (index !== keyboardItem.value.length - 1) {
    emits('change', item)
  } else emits('backspace')
}

watch(
  () => props.modelValue,
  val => {
    emits('update:modelValue', val)
  }
)

defineExpose({
  closeMask,
})
</script>

<style scoped lang="scss">
.cc-number-keyboard {
  background: #fff;
  &-tooltip {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    margin: 20rpx 0;
    &-cancel,
    &-text,
    &-confirm {
      flex: 1;
      display: flex;
      align-items: center;
    }
    &-cancel {
      padding-left: 28rpx;
      color: #888;
    }
    &-text {
      justify-content: center;
    }
    &-confirm {
      justify-content: flex-end;
      padding-right: 28rpx;
      color: #2979ff;
    }
  }
  &-wrap {
    position: relative;
    z-index: 999;
    background: #f2f3f5;
    padding: 12rpx 0 0 12rpx;
    &-content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      &-item {
        box-sizing: border-box;
        padding: 0 12rpx 12rpx 0;
        flex-basis: 33.333333%;
        font-size: 36rpx;
        color: #333;
        font-weight: 500;
        border-radius: 16rpx;
        &-key {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 96rpx;
          background: #fff;
        }
      }
    }
  }
}
</style>
