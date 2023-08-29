<template>
  <view style="background: #f7f8fa">
    <view class="demo">
      <view class="demo-title">基础用法</view>
      <view class="demo-item">
        <cc-tabbar v-model="value1" @change="handleChange">
          <cc-tabbar-item title="首页" icon="home"></cc-tabbar-item>
          <cc-tabbar-item title="分类" icon="bars"></cc-tabbar-item>
          <cc-tabbar-item title="购物车" icon="cart"></cc-tabbar-item>
          <cc-tabbar-item title="我的" icon="person"></cc-tabbar-item>
        </cc-tabbar>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">徽标显示</view>
      <view class="demo-item">
        <cc-tabbar v-model="value2">
          <cc-tabbar-item title="首页" icon="home"></cc-tabbar-item>
          <cc-tabbar-item title="分类" icon="bars" dot></cc-tabbar-item>
          <cc-tabbar-item title="购物车" icon="cart" count="15"></cc-tabbar-item>
          <cc-tabbar-item title="我的" icon="person"></cc-tabbar-item>
        </cc-tabbar>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">自定义颜色</view>
      <view class="demo-item">
        <cc-tabbar v-model="value3" active-color="#ee0a24" inactive-color="#000">
          <cc-tabbar-item title="首页" icon="home"></cc-tabbar-item>
          <cc-tabbar-item title="分类" icon="bars"></cc-tabbar-item>
          <cc-tabbar-item title="购物车" icon="cart"></cc-tabbar-item>
          <cc-tabbar-item title="我的" icon="person"></cc-tabbar-item>
        </cc-tabbar>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">自定义背景颜色</view>
      <view class="demo-item">
        <cc-tabbar v-model="value4" bgColor="#ddd">
          <cc-tabbar-item title="首页" icon="home"></cc-tabbar-item>
          <cc-tabbar-item title="分类" icon="bars"></cc-tabbar-item>
          <cc-tabbar-item title="购物车" icon="cart"></cc-tabbar-item>
          <cc-tabbar-item title="我的" icon="person"></cc-tabbar-item>
        </cc-tabbar>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">路由跳转</view>
      <view class="demo-item">
        <cc-tabbar v-model="value5">
          <cc-tabbar-item title="首页" icon="home"></cc-tabbar-item>
          <cc-tabbar-item title="分类" icon="bars"></cc-tabbar-item>
          <cc-tabbar-item title="购物车" icon="cart"></cc-tabbar-item>
          <cc-tabbar-item title="我的" icon="person" url="/"></cc-tabbar-item>
        </cc-tabbar>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">中间凸起按钮</view>
      <view class="demo-item">
        <cc-tabbar v-model="value6" bgColor="#ddd">
          <cc-tabbar-item title="首页" icon="home"></cc-tabbar-item>
          <cc-tabbar-item title="分类" icon="bars"></cc-tabbar-item>
          <cc-tabbar-item title="发布" midButton>
            <template #midButton="{ index }">
              <img
                width="37"
                height="37"
                :src="
                  index === value6
                    ? 'https://cdn.uviewui.com/uview/common/min_button_select.png'
                    : 'https://cdn.uviewui.com/uview/common/min_button.png'
                "
              />
            </template>
          </cc-tabbar-item>
          <cc-tabbar-item title="购物车" icon="cart"></cc-tabbar-item>
          <cc-tabbar-item title="我的" icon="person"></cc-tabbar-item>
        </cc-tabbar>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(0)
const value2 = ref(0)
const value3 = ref(0)
const value4 = ref(0)
const value5 = ref(0)
const value6 = ref(0)
const value7 = ref(0)

const handleChange = (val: number) => {
  console.log('val', val)
}
</script>

<style scoped lang="scss">
.demo {
  margin-bottom: 40rpx;

  &-title {
    padding: 20rpx;
    &-fixed {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 120rpx;
    }
  }
  &-item {
    margin-bottom: 20rpx;
  }
}
</style>
