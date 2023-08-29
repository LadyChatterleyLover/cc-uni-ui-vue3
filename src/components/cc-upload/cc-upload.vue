<template>
  <view>
    <view class="cc-upload" v-if="imgList.length">
      <view class="cc-upload-list-item" v-for="(item, index) in imgList" :key="index">
        <image
          @click="preview(item, index)"
          class="cc-upload-list-item-img"
          :src="item.url"
          :mode="imageMode"
        ></image>
        <view @click="del(item, index)" class="cc-upload-list-item-delete" v-if="deletable">
          <cc-icon
            class="cc-upload-list-item-delete-icon"
            type="closeempty"
            size="12"
            color="#fff"
          ></cc-icon>
        </view>
      </view>
    </view>
    <view class="cc-upload-btn" @click="upload">
      <slot v-if="$slots.default"></slot>
      <view class="cc-upload-add" v-else>
        <cc-icon :type="uploadButtonIcon" :size="uploadButtonSize"></cc-icon>
        <view class="cc-upload-add-text" v-if="uploadButtonText">{{ uploadButtonText }}</view>
      </view>
    </view>
    <cc-toast ref="toast"></cc-toast>
  </view>
</template>

<script setup lang="ts">
import { uni } from '@dcloudio/uni-h5'
import { ref, watch } from 'vue'

export interface FileItem {
  url: string
}

const props = withDefaults(
  defineProps<{
    // 服务器地址
    action?: string
    // 最大选择图片的数量
    maxCount?: number
    // 预览图片显示模式
    imageMode?: string
    // 上传请求头信息
    header?: any
    // 上传文件的字段名，供后端获取使用
    name?: string
    // original 原图，compressed 压缩图，默认二者都有，H5无效
    sizeType?: string[]
    // original 原图，compressed 压缩图，默认二者都有，H5无效
    sourceType?: string[]
    // 是否开启图片预览
    isPreview?: boolean
    // 是否显示删除按钮
    deletable?: boolean
    // 单个图片上传大小
    maxSize?: number
    // 默认显示的图片列表
    fileList?: FileItem[]
    // 允许的图片后缀
    limitType?: string[]
    // 上传时携带的参数
    formData?: any
    // 上传按钮文字
    uploadButtonText?: string
    // 上传按钮图标
    uploadButtonIcon?: string
    // 上传按钮图标尺寸
    uploadButtonSize?: string | number
  }>(),
  {
    action: '',
    maxCount: 99,
    imageMode: 'aspectFill',
    name: 'file',
    sizeType: () => ['original', 'compressed'],
    sourceType: () => ['album', 'camera'],
    isPreview: true,
    deletable: true,
    maxSize: Number.MAX_VALUE,
    fileList: () => [],
    limitType: () => ['png', 'jpg', 'jpeg', 'webp', 'gif'],
    uploadButtonText: '选择图片',
    uploadButtonIcon: 'plusempty',
    uploadButtonSize: 32,
  }
)

const emits = defineEmits<{
  oversize: [val: { file: File; fileList: FileItem[] }]
  uplpadSuccess: [val: { data: any; statusCode: number }]
  change: [val: { data: any; statusCode: number }]
  uploadError: [val: any]
  chooseFail: [val: any]
  listChange: [val: FileItem[]]
  preview: [val: { item: FileItem; index: number }]
  delete: [val: { item: FileItem; index: number }]
  progress: [val: number]
}>()

const imgList = ref(props.fileList)
const percent = ref(0)
const uploadTask = ref<any>(null)
const toast = ref()

const upload = () => {
  uni.chooseImage({
    count: props.maxCount,
    sizeType: props.sizeType,
    sourceType: props.sourceType,
    success: res => {
      // 选择图片成功
      if (res.errMsg === 'chooseImage:ok') {
        let files = res.tempFiles
        let filePaths = res.tempFilePaths
        // 检验文件大小
        if (files.some(file => file.size > props.maxSize)) {
          toast.value.show({
            title: `上传图片最大尺寸为${props.maxSize}kb`,
            type: 'error',
          })
          files.map(file => {
            if (file.size > props.maxSize) {
              emits('oversize', {
                file,
                fileList: imgList.value,
              })
            }
          })
          return
        }
        // 检验文件格式
        // #ifdef H5
        files.map(file => {
          if (!props.limitType.includes(file.type.split('/')[1])) {
            toast.value.show({
              title: `上传图片只支持${props.limitType.join(',')}格式`,
              type: 'error',
            })
            return
          }
        })
        // #endif
        // #ifndef H5
        files.map(file => {
          if (!props.limitType.includes(file.path.split('.')[1])) {
            toast.value.show({
              title: `上传图片只支持${props.limitType.join(',')}格式`,
              type: 'error',
            })
            return
          }
        })
        // #endif
        filePaths.map(path => {
          let obj = {
            url: '',
          }
          // 开始上传
          uploadTask.value = uni.uploadFile({
            url: props.action,
            filePath: path,
            name: props.name,
            formData: props.formData,
            header: props.header,
            success: result => {
              if (result.errMsg === 'uploadFile:ok') {
                emits('uplpadSuccess', {
                  data: JSON.parse(result.data),
                  statusCode: result.statusCode,
                })
                obj.url = path
                imgList.value.push(obj)
              }
            },
            fail: err => {
              emits('uploadError', err)
              console.log(err)
            },
            complete: r => {
              emits('change', {
                data: r && r.data ? JSON.parse(r.data) : null,
                statusCode: r.statusCode,
              })
              uni.hideLoading()
            },
          })

          uploadTask.value.onProgressUpdate(res => {
            percent.value = res.progress
            emits('progress', percent.value)
          })
        })
      } else {
        toast.value.show({
          title: '选择图片失败,请重新选择',
          type: 'warning',
        })
        emits('chooseFail', res)
      }
    },
    fail: err => {
      console.log(err)
    },
  })
}

const preview = (item: FileItem, index: number) => {
  if (!props.isPreview) return
  uni.previewImage({
    current: index,
    urls: imgList.value.map(file => file.url),
  })
  emits('preview', { item, index })
}

const del = (item: FileItem, index: number) => {
  imgList.value.splice(index, 1)
  emits('delete', { item, index })
}

const clear = () => {
  imgList.value = []
}

const abort = () => {
  uploadTask.value.abort()
}

watch(
  () => imgList.value,
  val => {
    emits('listChange', val)
  },
  { deep: true }
)

defineExpose({
  clear,
  abort,
  uploadTask: uploadTask.value,
})
</script>

<style scoped lang="scss">
.cc-upload {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  &-list-item {
    width: 160rpx;
    height: 160rpx;
    background: #f7f7f7;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 20rpx 20rpx 20rpx;
    position: relative;
    &-img {
      width: 120rpx;
      height: 120rpx;
    }
    &-delete {
      position: absolute;
      top: 0;
      right: 0;
      width: 28rpx;
      height: 28rpx;
      background-color: rgba(0, 0, 0, 0.7);
      border-radius: 0 0 0 12px;
      z-index: 999;
      &-icon {
        position: relative;
        /* #ifdef H5 */
        top: -6rpx;
        /* #endif */
        /* #ifndef H5 */
        top: -12rpx;
        /* #endif */
        left: 4rpx;
      }
    }
  }
  &-add {
    width: 160rpx;
    height: 160rpx;
    background: #f7f7f7;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 12px;
    margin: 0 20rpx 20rpx 20rpx;
    &-text {
      margin-top: 10rpx;
    }
  }
}
</style>
