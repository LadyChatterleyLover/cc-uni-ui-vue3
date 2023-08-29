<template>
  <view class="container">
    <view class="demo">
      <view class="demo-title">基础用法</view>
      <cc-swiper>
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/1.jpg"></cc-swiper-item>
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/2.jpg"></cc-swiper-item>
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/3.jpg"></cc-swiper-item>
      </cc-swiper>
    </view>

    <view class="demo">
      <view class="demo-title">指示点位置</view>
      <cc-swiper right="100">
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/1.jpg"></cc-swiper-item>
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/2.jpg"></cc-swiper-item>
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/3.jpg"></cc-swiper-item>
      </cc-swiper>
    </view>

    <view class="demo">
      <view class="demo-title">指示点模式</view>
      <cc-swiper mode="round">
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/1.jpg"></cc-swiper-item>
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/2.jpg"></cc-swiper-item>
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/3.jpg"></cc-swiper-item>
      </cc-swiper>
      <view style="margin-bottom: 40rpx"></view>
      <cc-swiper mode="rect">
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/1.jpg"></cc-swiper-item>
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/2.jpg"></cc-swiper-item>
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/3.jpg"></cc-swiper-item>
      </cc-swiper>
      <view style="margin-bottom: 40rpx"></view>
      <cc-swiper mode="number">
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/1.jpg"></cc-swiper-item>
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/2.jpg"></cc-swiper-item>
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/3.jpg"></cc-swiper-item>
      </cc-swiper>
    </view>

    <view class="demo">
      <view class="demo-title">指示点样式</view>
      <cc-swiper bottom="30" activeColor="red" indicatorActiveColor="#fff">
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/1.jpg"></cc-swiper-item>
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/2.jpg"></cc-swiper-item>
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/3.jpg"></cc-swiper-item>
      </cc-swiper>
    </view>

    <view class="demo">
      <view class="demo-title">不显示指示点</view>
      <cc-swiper mode="none">
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/1.jpg"></cc-swiper-item>
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/2.jpg"></cc-swiper-item>
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/3.jpg"></cc-swiper-item>
      </cc-swiper>
    </view>

    <view class="demo">
      <view class="demo-title">自定义指示点</view>
      <cc-swiper activeColor="red" indicatorActiveColor="#fff">
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/1.jpg"></cc-swiper-item>
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/2.jpg"></cc-swiper-item>
        <cc-swiper-item src="https://cdn.uviewui.com/uview/swiper/3.jpg"></cc-swiper-item>
        <template #dot="{ current, length }">
          <view class="demo-custom">第{{ current }}页 / 总共{{ length }}页</view>
        </template>
      </cc-swiper>
    </view>

    <view class="demo">
      <view class="demo-title">自定义内容</view>
      <cc-swiper>
        <cc-swiper-item>
          <view style="background: #39a9ed; width: 100%; height: 100%">1</view>
        </cc-swiper-item>
        <cc-swiper-item>
          <view style="background: #39a9ed; width: 100%; height: 100%">2</view>
        </cc-swiper-item>
        <cc-swiper-item>
          <view style="background: #39a9ed; width: 100%; height: 100%">3</view>
        </cc-swiper-item>
      </cc-swiper>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container {
  padding-bottom: 20rpx;
}
.demo {
  &-title {
    margin: 16rpx;
  }
  &-custom {
    position: absolute;
    font-size: 24rpx;
    color: #fff;
    right: 50rpx;
    bottom: 30rpx;
  }
}
.custom-img {
  width: 90%;
  margin-left: 5%;
  &-item {
    width: 100%;
    height: 300rpx;
    border-radius: 12rpx;
  }
}
</style>
