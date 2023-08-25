<template>
  <view style="background: #f7f7f7; height: 100vh">
    <view class="demo">
      <view class="demo-title">基础用法</view>
      <view class="demo-item">
        <cc-field
          v-model="value1"
          label="文本"
          :border="false"
          clearable
          @clear="handleClear"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
          @clickLeft="clickLeft"
        ></cc-field>
      </view>
      <view v-if="value1">当前输入框值: {{ value1 }}</view>
    </view>

    <view class="demo">
      <view class="demo-title">输入框类型</view>
      <view class="demo-item">
        <cc-field v-model="value2" label="文本"></cc-field>
      </view>
      <view class="demo-item">
        <cc-field v-model="value3" label="密码" type="password"></cc-field>
      </view>
      <view class="demo-item">
        <cc-field v-model="value4" type="tel" label="手机号"></cc-field>
      </view>
      <view class="demo-item">
        <cc-field v-model="value5" type="number" label="数字"></cc-field>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">禁用状态</view>
      <view class="demo-item">
        <cc-field v-model="value7" label="禁用" disabled></cc-field>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">显示图标</view>
      <view class="demo-item">
        <cc-field
          v-model="value8"
          left-icon="search"
          right-icon="person"
          placeholder="显示图标"
          label="文本"
          @clickRight="clickRight"
        ></cc-field>
      </view>
      <view class="demo-item">
        <cc-field left-icon="chat" v-model="value9" placeholder="显示图标" label="文本"></cc-field>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">必填</view>
      <view class="demo-item">
        <cc-field v-model="value10" label="文本" required></cc-field>
      </view>
      <view class="demo-item">
        <cc-field
          v-model="value11"
          label="文本"
          required
          error
          error-message="都怪那天雨下的太急"
        ></cc-field>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">输入长度限制</view>
      <view class="demo-item">
        <cc-field :maxlength="50" show-word-limit v-model="value12" label="文本"></cc-field>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">自适应高度</view>
      <view class="demo-item">
        <cc-field
          :maxlength="200"
          show-word-limit
          v-model="value13"
          type="textarea"
          rows="1"
          label="文本"
        ></cc-field>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">插入按钮</view>
      <view class="demo-item">
        <cc-field v-model="value14" label="文本">
          <template #button>
            <cc-button type="success" size="small">发送验证码</cc-button>
          </template>
        </cc-field>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref<string>('')
const value2 = ref<string>('')
const value3 = ref<string>('')
const value4 = ref<string>('')
const value5 = ref<string>('')
const value6 = ref<string>('只读状态')
const value7 = ref<string>('禁用状态')
const value8 = ref<string>('')
const value9 = ref<string>('123')
const value10 = ref<string>('')
const value11 = ref<string>('遇见你的那天起')
const value12 = ref<string>('')
const value13 = ref<string>('')
const value14 = ref<string>('')

const handleInput = (val: string) => {
  console.log(val)
}
const handleChange = (val: string) => {
  console.log(val)
}
const handleFocus = (e: FocusEvent) => {
  console.log('focus', e)
}
const handleBlur = (e: FocusEvent) => {
  console.log('blur', e)
}
const handleClear = (e: MouseEvent) => {
  console.log('clear')
}
const clickLeft = (e: MouseEvent) => {
  console.log('clickLeft', e)
}
const clickRight = (e: MouseEvent) => {
  console.log('clickRight', e)
}
</script>

<style scoped lang="scss">
.demo {
  margin-bottom: 20px;
  padding: 10px;
  &-title {
    padding: 10px;
  }
  &-item {
    padding: 0 5px;
    margin-bottom: 10px;
  }
}
</style>
