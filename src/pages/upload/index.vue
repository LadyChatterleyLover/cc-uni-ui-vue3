<template>
  <view class="container">
    <view class="demo">
      <view class="demo-title">基础用法</view>
      <view class="demo-item">
        <cc-upload action="http://localhost:3000/upload" @uplpadSuccess="uplpadSuccess"></cc-upload>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">预制图片</view>
      <view class="demo-item">
        <cc-upload action="http://localhost:3000/upload" :fileList="fileList"></cc-upload>
      </view>
    </view>

    <view class="demo">
      <view class="demo-title">自定义样式</view>
      <view class="demo-item">
        <cc-upload action="http://localhost:3000/upload">
          <cc-button type="primary" round size="small">点击上传</cc-button>
        </cc-upload>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const fileList = [
  {
    url: 'https://img01.yzcdn.cn/vant/leaf.jpg',
  },
  {
    url: 'https://img01.yzcdn.cn/vant/sand.jpg',
  },
  {
    url: 'https://img01.yzcdn.cn/vant/tree.jpg',
  },
]

const uplpadSuccess = data => {
  console.log('uplpadSuccess', data)
}
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  .demo {
    margin-bottom: 20rpx;
    &-title {
      padding: #{topx(10)};
    }
    &-item {
      margin-bottom: #{topx(30)};
      padding: 40rpx;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
