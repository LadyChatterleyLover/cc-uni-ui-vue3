<template>
  <view
    class="cc-avatar"
    :style="{
      width: avatarWidth + 'px',
      height: avatarHeight + 'px',
      borderRadius: round ? '100%' : '0',
    }"
  >
    <img
      :mode="imgMode"
      @error="handleError"
      v-if="src && !error"
      :style="{ borderRadius: round ? '100%' : '5px' }"
      class="cc-avatar-img"
      :src="src"
    />
    <slot v-else></slot>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type AvatarSizeProps = '' | 'large' | 'small' | 'number'

const props = withDefaults(
  defineProps<{
    // 头像路径
    src?: string
    // 是否圆形图片
    round?: boolean
    // 尺寸
    size?: AvatarSizeProps
    // 图片模式
    imgMode?: string
  }>(),
  {
    src: '',
    round: false,
    size: '',
    imgMode: 'aspectFill',
  }
)

const emits = defineEmits<{
  error: [val: Event]
}>()
const error = ref<boolean>(false)

const avatarWidth = computed(() => {
  if (!props.size) return 38
  else if (props.size === 'large') return 60
  else if (props.size === 'small') return 30
  else return props.size
})

const avatarHeight = computed(() => {
  if (!props.size) return 38
  else if (props.size === 'large') return 60
  else if (props.size === 'small') return 30
  else return props.size
})

const handleError = e => {
  error.value = true
  emits('error', e)
}
</script>

<style scoped lang="scss">
.cc-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;
  background: #c0c4cc;
  &-img {
    width: 100%;
    height: 100%;
  }
}
</style>
