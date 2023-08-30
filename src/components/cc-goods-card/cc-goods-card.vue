<template>
  <view class="cc-goods-card">
    <view class="cc-goods-card-wrap" @click="handleClick">
      <view class="cc-goods-card-thumb">
        <img @click="clickimg" :src="thumb" style="width: 100%; height: 100%" />
        <view class="cc-goods-card-thumb-tag" v-if="tag">
          <cc-tag type="error" circleRight>{{ tag }}</cc-tag>
        </view>
      </view>
      <view class="cc-goods-card-content">
        <view class="cc-goods-card-content-info">
          <view class="cc-goods-card-content-info-title" v-if="title">{{ title }}</view>
          <view class="cc-goods-card-content-info-desc" v-if="desc">{{ desc }}</view>
          <view class="cc-goods-card-content-info-tags" v-if="$slots.tags"
            ><slot name="tags"></slot
          ></view>
        </view>
        <view class="cc-goods-card-content-bottom">
          <view class="cc-goods-card-content-bottom-price">
            <view class="cc-goods-card-content-bottom-price-p" v-if="price">
              {{ currency }}
              <text style="font-size: 16px">{{ String(price).slice(0, 1) }}</text>
              {{ String(price).slice(1) }}
            </view>
            <view class="cc-goods-card-content-bottom-price-o" v-if="originPrice"
              >{{ currency }}{{ originPrice }}</view
            >
          </view>
          <view class="cc-goods-card-content-bottom-num" v-if="num">x{{ num }}</view>
        </view>
      </view>
    </view>
    <view class="cc-goods-card-footer"><slot name="footer"></slot></view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    // 左侧图片
    thumb?: string
    // 标题
    title?: string
    // 描述
    desc?: string
    // 图片角标
    tag?: string
    // 商品数量
    num?: string | number
    // 商品价格
    price?: string | number
    // 商品划线原价
    originPrice?: string | number
    // 货币符号
    currency?: string
  }>(),
  {
    thumb: '',
    title: '',
    desc: '',
    tag: '',
    num: '',
    price: '',
    originPrice: '',
    currency: '￥',
  }
)

const emits = defineEmits<{
  click: []
  'click-thumb': []
}>()

const handleClick = () => {
  emits('click')
}
const clickimg = () => {
  emits('click-thumb')
}
</script>

<style scoped lang="scss">
.cc-goods-card {
  position: relative;
  box-sizing: border-box;
  padding: 32rpx 64rpx;
  color: #323233;
  font-size: 24rpx;
  background-color: #fafafa;
  &-wrap {
    display: flex;
  }
  &-thumb {
    width: 190rpx;
    height: 190rpx;
    margin-right: 16rpx;
    position: relative;
    &-tag {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  &-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 180rpx;
    font-size: 24rpx;
    &-info {
      &-desc {
        color: #646566;
        margin-bottom: 10rpx;
      }
    }
    &-tags {
      display: flex;
      align-items: center;
    }
    &-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-price {
        display: flex;
        align-items: center;
        &-p {
          margin-right: 10rpx;
          font-weight: 500;
        }
        &-o {
          color: #969799;
          text-decoration: line-through;
          position: relative;
          top: 2rpx;
        }
      }
      &-num {
        color: #969799;
      }
    }
  }
  &-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
