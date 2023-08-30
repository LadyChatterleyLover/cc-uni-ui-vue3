<template>
  <view class="cc-contact-list">
    <view
      class="cc-contact-list-item"
      :class="{ 'cc-contact-list-item-disabled': item.disabled }"
      v-for="(item, index) in contactList"
      :key="item.id"
      @click="clickItem(item, index)"
    >
      <view class="cc-contact-list-item-wrap">
        <view class="cc-contact-list-item-edit" @click.stop="edit(item, index)">
          <cc-icon type="paperclip" color="#969799"></cc-icon>
        </view>
        <view class="cc-contact-list-item-wrap-name">{{ item.name }},</view>
        <view class="cc-contact-list-item-wrap-tel">{{ item.tel }}</view>
        <view v-if="item.isDefault">
          <cc-tag type="error" round>{{ defaultTagText }}</cc-tag>
        </view>
      </view>
      <view
        class="cc-contact-list-check"
        :style="{ background: modelValue === item.id ? '#1989fa' : '' }"
      >
        <cc-icon
          v-if="modelValue === item.id"
          type="checkmarkempty"
          :size="28"
          color="#fff"
        ></cc-icon>
      </view>
    </view>
    <view class="cc-contact-list-button" @click="add">
      <cc-button round block :color="addButtonColor">{{ addText }}</cc-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import { ref } from 'vue'

export interface ContactListItem {
  id: string
  name: string
  tel: string
  isDefault?: boolean
  disabled?: boolean
  checked?: boolean
}

const props = withDefaults(
  defineProps<{
    // 当前选中联系人的 id
    modelValue?: string | number
    // 联系人列表
    list: ContactListItem[]
    // 添加按钮文案
    addText?: string
    // 添加按钮颜色
    addButtonColor?: string
    // 默认联系人标签文案
    defaultTagText?: string
  }>(),
  {
    modelValue: '',
    addText: '新建联系人',
    addButtonColor: '#ee0a24',
    defaultTagText: '默认',
  }
)

const emits = defineEmits<{
  'update:modelValue': [val: string | number]
  select: [val: { item: ContactListItem; index: number }]
  add: []
  edit: [val: { item: ContactListItem; index: number }]
}>()

let contactList = ref<ContactListItem[]>(cloneDeep(props.list))

let clickItem = (item: ContactListItem, index: number) => {
  if (item.disabled) return
  emits('update:modelValue', item.id)
  emits('select', { item, index })
}

let edit = (item: ContactListItem, index: number) => {
  if (item.disabled) return
  emits('edit', { item, index })
}
let add = () => {
  emits('add')
}
</script>

<style scoped lang="scss">
.cc-contact-list {
  background: #fff;
  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32rpx;
    &-disabled {
      opacity: 0.6;
    }
    &-wrap {
      display: flex;
      align-items: center;
      &-name {
        margin: 0 30rpx;
      }
      &-tel {
        margin-right: 30rpx;
      }
    }
  }
  &-check {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40rpx;
    height: 40rpx;
    border-radius: 100%;
    border: 2rpx solid #c8c9cc;
  }
  &-button {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    padding: 16rpx 30rpx;
  }
}
</style>
