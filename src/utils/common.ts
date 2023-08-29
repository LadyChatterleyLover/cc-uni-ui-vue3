export function rpxToPx(rpx: number) {
  const screenWidth = uni.getSystemInfoSync().screenWidth
  return (screenWidth / 750) * rpx
}
