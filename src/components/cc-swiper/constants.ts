import type { ComputedRef, InjectionKey } from 'vue'

export interface SwiperContext {
  currentIndex: ComputedRef<string | number>
  mode?: string
  clickItem: (e: Event) => void
  longpress: (e: Event) => void
}

export const swiperKey: InjectionKey<SwiperContext> = Symbol('swiperKey')
