<template>
  <view>
    <view>
      <view class="title">基础用法</view>
      <view class="item">
        <cc-countup :end="end" :startVal="0" :endVal="1000"></cc-countup>
      </view>
      <view class="item">
        <cc-countup :startVal="100" :endVal="500"></cc-countup>
      </view>
    </view>

    <view>
      <view class="title">千分位分隔符</view>
      <view class="item">
        <cc-countup :startVal="0" :endVal="3000"></cc-countup>
      </view>
      <view class="item">
        <cc-countup :startVal="0" :endVal="3000" separator="."></cc-countup>
      </view>
      <view class="item">
        <cc-countup :startVal="0" :useGrouping="false" :endVal="3000"></cc-countup>
      </view>
    </view>

    <view>
      <view class="title">小数位和分割符号</view>
      <view class="item">
        <cc-countup :decimalPlaces="2" :startVal="0" :endVal="3000.55"></cc-countup>
      </view>
      <view class="item">
        <cc-countup :decimalPlaces="5" :startVal="0" :endVal="3000.55"></cc-countup>
      </view>
      <view class="item">
        <cc-countup :startVal="0" :decimalPlaces="2" decimal="," :endVal="3000.55"></cc-countup>
      </view>
    </view>

    <view>
      <view class="title">使用过渡动画</view>
      <view class="item">
        <cc-countup :startVal="0" :endVal="3000"></cc-countup>
      </view>
      <view class="item">
        <cc-countup :startVal="0" :useEasing="false" :endVal="3000"></cc-countup>
      </view>
    </view>

    <view>
      <view class="title">前缀和后缀内容</view>
      <view class="item">
        <cc-countup prefix="￥" :startVal="0" :endVal="3000"></cc-countup>
      </view>
      <view class="item">
        <cc-countup :startVal="0" suffix="元" :endVal="3000"></cc-countup>
      </view>
    </view>

    <view>
      <view class="title">滚动持续时长</view>
      <view class="item">
        <cc-countup :duration="5" :startVal="0" :endVal="3000"></cc-countup>
      </view>
      <view class="item">
        <cc-countup :duration="1" :startVal="0" :endVal="3000"></cc-countup>
      </view>
    </view>

    <view>
      <view class="title">逆向滚动</view>
      <view class="item">
        <cc-countup :startVal="3000" :endVal="0"></cc-countup>
      </view>
    </view>

    <view>
      <view class="title">实例方法</view>
      <view class="item">
        <cc-countup :end="end" :autoplay="false" ref="countup" :startVal="0" :endVal="10000"></cc-countup>
      </view>
      <view class="item">
        <cc-button type="primary" size="small" @click="start">开始</cc-button>
        <cc-button type="primary" size="small" @click="pauseResume">暂停</cc-button>
        <cc-button type="primary" size="small" @click="reset">重置</cc-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const countup = ref()
const end = () => {
  console.log('end')
}
const start = () => {
  countup.value.countup.start(end)
}
const pauseResume = () => {
  countup.value.countup.pauseResume()
}
const reset = () => {
  countup.value.countup.reset()
}
</script>

<style lang="scss" scoped>
.title {
  margin: 20rpx;
}
.item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  button {
    margin-right: 10rpx;
  }
}
</style>
