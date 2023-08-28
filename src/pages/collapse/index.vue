<template>
  <div>
    <div class="title">基础用法</div>
    <div class="title">
      <cc-collapse v-model="value1" @change="handleChange">
        <cc-collapse-item
          name="1"
          title="晴天"
          content="故事的小黄花，从出生那年就飘着童年的荡秋千，随记忆一直晃到现在故事的小黄花，从出生那年就飘着童年的荡秋千，随记忆一直晃到现在"
        ></cc-collapse-item>
        <cc-collapse-item
          name="2"
          title="晴天"
          content="吹着前奏望着天空，我想起花瓣试着掉落为你翘课的那一天，花落的那一天教室的那一间，我怎么看不见消失的下雨天，我好想再淋一遍"
        ></cc-collapse-item>
        <cc-collapse-item
          name="3"
          title="你听得到"
          content="刮风这天，我试过握着你手，但偏偏，雨渐渐，大到我看你不见，还要多久，我才能在你身边，等到放晴的那天，也许我会比较好一点"
        ></cc-collapse-item>
      </cc-collapse>
    </div>

    <div class="title">右侧箭头显示和样式</div>
    <div class="title">
      <cc-collapse v-model="value2">
        <cc-collapse-item
          name="1"
          title="晴天"
          :arrow="false"
          content="故事的小黄花，从出生那年就飘着童年的荡秋千，随记忆一直晃到现在故事的小黄花，从出生那年就飘着童年的荡秋千，随记忆一直晃到现在"
        ></cc-collapse-item>
        <cc-collapse-item
          name="2"
          title="晴天"
          arrowColor="#123abc"
          content="吹着前奏望着天空，我想起花瓣试着掉落为你翘课的那一天，花落的那一天教室的那一间，我怎么看不见消失的下雨天，我好想再淋一遍"
        ></cc-collapse-item>
        <cc-collapse-item
          name="3"
          title="你听得到"
          arrowSize="26"
          content="刮风这天，我试过握着你手，但偏偏，雨渐渐，大到我看你不见，还要多久，我才能在你身边，等到放晴的那天，也许我会比较好一点"
        ></cc-collapse-item>
      </cc-collapse>
    </div>

    <div class="title">手风琴模式</div>
    <div class="title">
      <cc-collapse v-model="value3" accordion>
        <cc-collapse-item
          name="1"
          title="晴天"
          content="故事的小黄花，从出生那年就飘着童年的荡秋千，随记忆一直晃到现在故事的小黄花，从出生那年就飘着童年的荡秋千，随记忆一直晃到现在"
        ></cc-collapse-item>
        <cc-collapse-item
          name="2"
          title="晴天"
          content="吹着前奏望着天空，我想起花瓣试着掉落为你翘课的那一天，花落的那一天教室的那一间，我怎么看不见消失的下雨天，我好想再淋一遍"
        ></cc-collapse-item>
        <cc-collapse-item
          name="3"
          title="你听得到"
          content="刮风这天，我试过握着你手，但偏偏，雨渐渐，大到我看你不见，还要多久，我才能在你身边，等到放晴的那天，也许我会比较好一点"
        ></cc-collapse-item>
      </cc-collapse>
    </div>

    <div class="title">禁用和无边框</div>
    <div class="title">
      <cc-collapse v-model="value3" accordion>
        <cc-collapse-item
          name="1"
          title="晴天"
          disabled
          content="故事的小黄花，从出生那年就飘着童年的荡秋千，随记忆一直晃到现在故事的小黄花，从出生那年就飘着童年的荡秋千，随记忆一直晃到现在"
        ></cc-collapse-item>
        <cc-collapse-item
          name="2"
          title="晴天"
          :border="false"
          content="吹着前奏望着天空，我想起花瓣试着掉落为你翘课的那一天，花落的那一天教室的那一间，我怎么看不见消失的下雨天，我好想再淋一遍"
        ></cc-collapse-item>
        <cc-collapse-item
          name="3"
          title="你听得到"
          content="刮风这天，我试过握着你手，但偏偏，雨渐渐，大到我看你不见，还要多久，我才能在你身边，等到放晴的那天，也许我会比较好一点"
        ></cc-collapse-item>
      </cc-collapse>
    </div>

    <div class="title">自定义内容</div>
    <div class="title">
      <cc-collapse v-model="value3" accordion>
        <cc-collapse-item
          name="1"
          content="故事的小黄花，从出生那年就飘着童年的荡秋千，随记忆一直晃到现在故事的小黄花，从出生那年就飘着童年的荡秋千，随记忆一直晃到现在"
        >
          <template #title>
            <cc-icon type="search"></cc-icon>
            搜索
          </template>
        </cc-collapse-item>
        <cc-collapse-item name="2" title="晴天">
          <template #content> 回到过去 </template>
        </cc-collapse-item>
        <cc-collapse-item
          name="3"
          title="你听得到"
          content="刮风这天，我试过握着你手，但偏偏，雨渐渐，大到我看你不见，还要多久，我才能在你身边，等到放晴的那天，也许我会比较好一点"
        >
          <template #value> 轨迹 </template>
        </cc-collapse-item>
      </cc-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('1')
const value2 = ref('1')
const value3 = ref('1')
const value4 = ref('1')

const handleChange = (val: string | number) => {
  console.log('val', val)
}
</script>

<style scoped lang="scss">
.title {
  padding: 20rpx;
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
