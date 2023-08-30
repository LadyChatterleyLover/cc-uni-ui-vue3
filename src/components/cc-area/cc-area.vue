<template>
  <view class="cc-area">
    <view class="cc-area-btn">
      <view class="cc-area-btn-cancel" @click="cancel">{{ cancelText }}</view>
      <view class="cc-area-btn-title">{{ title }}</view>
      <view class="cc-area-btn-confirm" @click="confirm">{{ confirmText }}</view>
    </view>
    <picker-view :value="region" @change="bindChange">
      <picker-view-column v-if="columnsNum >= 1">
        <view class="cc-area-item" v-for="(item, index) in regionList" :key="index">{{
          item.name
        }}</view>
      </picker-view-column>
      <picker-view-column v-if="regionList[region[0]] && columnsNum >= 2">
        <view
          class="cc-area-item"
          v-for="(item, index) in regionList[region[0]].city"
          :key="index"
          >{{ item.name }}</view
        >
      </picker-view-column>
      <picker-view-column v-if="regionList[region[0]] && columnsNum === 3">
        <view
          class="cc-area-item"
          v-for="(item, index) in (regionList[region[0]].city as any)[region[1]].area"
          :key="index"
          >{{ item.name }}</view
        >
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import data, { AreaItem, City } from './area'
import { cloneDeep } from 'lodash-es'

const props = withDefaults(
  defineProps<{
    // 标题
    title?: string
    // 取消文字
    cancelText?: string
    // 确认文字
    confirmText?: string
    // 显示列数，3-省市区，2-省市，1-省
    columnsNum?: number
    // 列占位提示文字
    columnsPlaceholder?: string[]
  }>(),
  {
    title: '标题',
    cancelText: '取消',
    confirmText: '确认',
    columnsNum: 3,
    columnsPlaceholder: () => [],
  }
)

const emits = defineEmits<{
  change: [val: number[]]
  confirm: [val: AreaItem[]]
  cancel: []
}>()

const region = ref([0, 0, 0])
const regionList = ref<AreaItem[]>([])
const area = ref<AreaItem[]>([])

const bindChange = e => {
  let val = e.detail.value
  if (region.value[0] !== val[0]) {
    region.value = [val[0], 0, 0]
  } else if (region.value[1] !== val[1]) {
    region.value = [val[0], val[1], 0]
  } else {
    region.value = e.detail.value
  }

  emits('change', region.value)
}

const confirm = () => {
  if (props.columnsNum === 3) {
    area.value = [
      {
        code: regionList.value[region.value[0]].code,
        name: regionList.value[region.value[0]].name,
      },
      {
        code: (regionList.value[region.value[0]].city as AreaItem[])[region.value[1]].code,
        name: (regionList.value[region.value[0]].city as AreaItem[])[region.value[1]].name,
      },
      {
        code: (regionList.value[region.value[0]].city as unknown as City)[region.value[1]].area[
          region.value[2]
        ].code,
        name: (
          (regionList.value[region.value[0]].city as City[])[region.value[1]]
            .area as unknown as City
        )[region.value[2]].name,
      },
    ]
  } else if (props.columnsNum === 2) {
    area.value = [
      {
        code: regionList.value[region.value[0]].code,
        name: regionList.value[region.value[0]].name,
      },
      {
        code: (regionList.value[region.value[0]].city as unknown as AreaItem)[region.value[1]].code,
        name: (regionList.value[region.value[0]].city as unknown as AreaItem)[region.value[1]].name,
      },
    ]
  } else {
    area.value = [
      {
        code: regionList.value[region.value[0]].code,
        name: regionList.value[region.value[0]].name,
      },
    ]
  }
  emits('confirm', area.value)
}

const cancel = () => {
  region.value = [0, 0, 0]
  emits('cancel')
}

const init = () => {
  if (props.columnsPlaceholder && props.columnsPlaceholder.length) {
    let arr = cloneDeep(data)
    let obj: any = {}
    if (props.columnsPlaceholder[0] && props.columnsPlaceholder[1] && props.columnsPlaceholder[2]) {
      obj = {
        name: props.columnsPlaceholder[0],
        code: '',
        city: [
          {
            name: props.columnsPlaceholder[1],
            code: '',
            area: [
              {
                name: props.columnsPlaceholder[2],
                code: '',
              },
            ],
          },
        ],
      }
    }
    if (
      props.columnsPlaceholder[0] &&
      props.columnsPlaceholder[1] &&
      !props.columnsPlaceholder[2]
    ) {
      obj = {
        name: props.columnsPlaceholder[0],
        code: '',
        city: [
          {
            name: props.columnsPlaceholder[1],
            code: '',
          },
        ],
      }
    }
    arr.unshift(obj)
    regionList.value = arr
  } else {
    regionList.value = data
  }
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
.cc-area {
  background-color: #ffffff;
  &-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32rpx;
    height: 88rpx;
    &-cancel {
      font-size: 14px;
      color: #969799;
    }
    &-title {
      font-weight: 500;
    }
    &-confirm {
      font-size: 14px;
      color: #576b95;
    }
  }
  &-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  picker-view {
    width: 100%;
    height: 600rpx;
  }
}
</style>
