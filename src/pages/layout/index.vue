<template>
  <view>
    <view class="title">基础用法</view>
    <view class="demo">
      <cc-row>
        <cc-col span="8">
          <view class="col">span: 8</view>
        </cc-col>
        <cc-col span="8">
          <view class="col">span: 8</view>
        </cc-col>
        <cc-col span="8">
          <view class="col">span: 8</view>
        </cc-col>
      </cc-row>
    </view>

    <view class="demo">
      <cc-row>
        <cc-col span="4">
          <view class="col">span: 4</view>
        </cc-col>
        <cc-col span="10" offset="4">
          <view class="col">offset: 4, span: 10</view>
        </cc-col>
      </cc-row>
    </view>

    <view class="demo">
      <cc-row>
        <cc-col offset="12" span="12">
          <view class="col">offset: 12, span: 12</view>
        </cc-col>
      </cc-row>
    </view>
  </view>

  <view>
    <view class="title">列元素间距</view>
    <view class="demo">
      <cc-row gutter="20">
        <cc-col span="8">
          <view class="col">span:8</view>
        </cc-col>
        <cc-col span="8">
          <view class="col">span:8</view>
        </cc-col>
        <cc-col span="8">
          <view class="col">span:8</view>
        </cc-col>
      </cc-row>
    </view>
  </view>

  <view>
    <view class="title">flex布局</view>
    <view>左对齐</view>
    <view class="demo">
      <cc-row>
        <cc-col span="6">
          <view class="col">span:6</view>
        </cc-col>
        <cc-col span="6">
          <view class="col">span:6</view>
        </cc-col>
        <cc-col span="6">
          <view class="col">span:6</view>
        </cc-col>
      </cc-row>
    </view>

    <view>居中</view>
    <view class="demo">
      <cc-row justify="center">
        <cc-col span="6">
          <view class="col">span:6</view>
        </cc-col>
        <cc-col span="6">
          <view class="col">span:6</view>
        </cc-col>
        <cc-col span="6">
          <view class="col">span:6</view>
        </cc-col>
      </cc-row>
    </view>

    <view>右对齐</view>
    <view class="demo">
      <cc-row justify="end">
        <cc-col span="6">
          <view class="col">span:6</view>
        </cc-col>
        <cc-col span="6">
          <view class="col">span:6</view>
        </cc-col>
        <cc-col span="6">
          <view class="col">span:6</view>
        </cc-col>
      </cc-row>
    </view>

    <view>两端对齐</view>
    <view class="demo">
      <cc-row justify="space-between">
        <cc-col span="6">
          <view class="col">span:6</view>
        </cc-col>
        <cc-col span="6">
          <view class="col">span:6</view>
        </cc-col>
        <cc-col span="6">
          <view class="col">span:6</view>
        </cc-col>
      </cc-row>
    </view>

    <view>每个元素的两侧间隔相等</view>
    <view class="demo">
      <cc-row justify="space-around">
        <cc-col span="6">
          <view class="col">span:6</view>
        </cc-col>
        <cc-col span="6">
          <view class="col">span:6</view>
        </cc-col>
        <cc-col span="6">
          <view class="col">span:6</view>
        </cc-col>
      </cc-row>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.title {
  margin: 40rpx;
}
.demo {
  width: 100%;
  height: 80rpx;
  margin: 20rpx 0;
}
.col {
  margin-bottom: 20rpx;
  color: #fff;
  font-size: 26rpx;
  line-height: 60rpx;
  text-align: center;
  width: 100%;
}
.col:nth-child(odd) {
  background-color: #39a9ed;
}
.col:nth-child(even) {
  background-color: #66c6f2;
}
cc-col {
  width: 100%;
}
</style>
