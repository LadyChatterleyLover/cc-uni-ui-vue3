<template>
  <view class="cc-contact-card" @click="handleClick">
    <view class="cc-contact-card-icon" v-if="type === 'add'">
      <cc-icon type="plusempty" color="#fff" :size="48"></cc-icon>
    </view>
    <view v-else>
      <cc-icon type="person" :size="36" style="margin-right: 15px"></cc-icon>
    </view>
    <view class="cc-contact-card-content">
      <view v-if="type === 'add'">{{ addText }}</view>
      <view v-else style="color: #323233">
        <view>姓名: {{ name }}</view>
        <view>电话: {{ tel }}</view>
      </view>
    </view>
    <view class="cc-contact-card-arrow" v-if="editable">
      <cc-icon type="arrowright" color="#969799"></cc-icon>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    // 类型
    type?: 'add' | 'edit'
    // 联系人姓名
    name?: string
    // 联系人手机号
    tel?: string
    // 添加时的文案提示
    addText?: string
    // 是否可编辑
    editable?: boolean
  }>(),
  {
    type: 'edit',
    name: '',
    tel: '',
    addText: '添加联系人',
    editable: true,
  }
)

const emits = defineEmits<{
  click: []
}>()

const handleClick = () => {
  if (!props.editable) return
  emits('click')
}
</script>

<style scoped lang="scss">
.cc-contact-card {
  display: flex;
  align-items: center;
  padding: 24px;
  position: relative;
  background: #fff;
  &::before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: -webkit-repeating-linear-gradient(
      135deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #1989fa 0,
      #1989fa 45%,
      transparent 0,
      transparent 50%
    );
    background: repeating-linear-gradient(
      -45deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #1989fa 0,
      #1989fa 45%,
      transparent 0,
      transparent 50%
    );
    background-size: 80px;
    content: '';
  }
  &-icon {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1989fa;
    border-radius: 5px;
    margin-right: 15px;
  }
  &-content {
    flex: 1;
    font-size: 14px;
    color: #323233;
  }
}
</style>
