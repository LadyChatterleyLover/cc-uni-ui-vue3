<template>
  <view>
    <view>
      <view class="title">基础语法</view>
      <view>
        <cc-search
          v-model="value"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @confirm="handleConfirm"
          @close="close"
          @cancel="cancel"
        ></cc-search>
      </view>
    </view>

    <view>
      <view class="title">圆形</view>
      <view>
        <cc-search v-model="value" round></cc-search>
      </view>
    </view>

    <view>
      <view class="title">文字对齐方式</view>
      <view>
        <cc-search v-model="value" textAlign="center"></cc-search>
      </view>
      <view>
        <cc-search v-model="value" textAlign="right"></cc-search>
      </view>
    </view>

    <view>
      <view class="title">图标对齐方式</view>
      <view>
        <cc-search v-model="value" iconAlign="center" textAlign="center"></cc-search>
      </view>
      <view>
        <cc-search v-model="value" iconAlign="right" textAlign="right"></cc-search>
      </view>
    </view>

    <view>
      <view class="title">自定义图标</view>
      <view>
        <cc-search v-model="value" round icon="person"></cc-search>
      </view>
    </view>

    <view>
      <view class="title">左侧内容</view>
      <view>
        <cc-search v-model="value" round label="地址"></cc-search>
      </view>
    </view>

    <view>
      <view class="title">禁用</view>
      <view>
        <cc-search v-model="value" round disabled></cc-search>
      </view>
    </view>

    <view>
      <view class="title">自定义左侧内容</view>
      <view>
        <cc-search v-model="value" round>
          <template #label>
            <view class="label">
              <view>地址</view>
              <view style="margin-left: 8rpx">
                <cc-icon type="arrowdown" size="10"></cc-icon>
              </view>
            </view>
          </template>
        </cc-search>
      </view>
    </view>

    <view>
      <view class="title">自定义右侧内容</view>
      <view>
        <cc-search v-model="value" round>
          <template #action>
            <view>搜索</view>
          </template>
        </cc-search>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')

const close = () => {
  console.log('close')
}
const cancel = () => {
  console.log('cancel')
}
const handleInput = (e: Event) => {
  console.log('input', e)
}
const handleFocus = (e: Event) => {
  console.log('focus', e)
}
const handleBlur = (e: Event) => {
  console.log('blur', e)
}
const handleConfirm = (e: Event) => {
  console.log('confirm', e)
}
</script>

<style lang="scss" scoped>
.title {
  margin: 20rpx;
}
.label {
  display: flex;
  align-items: center;
}
</style>
