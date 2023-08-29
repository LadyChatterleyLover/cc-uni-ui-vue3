import type { ComponentInternalInstance, ComputedRef, InjectionKey } from 'vue'

export interface TabsContext {
  active: ComputedRef<string | number>
  children: ComputedRef
  lineWidth?: string | number
  lineHeight?: string | number
  lineColor?: string
  activeColor?: string
  inactiveColor?: string
  change: (val: number) => void
  setIndex: (val: number) => void
  setScrollLeft: (val: number) => void
  addChild: (val: ComponentInternalInstance) => void
}

export const tabsKey: InjectionKey<TabsContext> = Symbol('tabsKey')
