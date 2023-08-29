import type { ComponentInternalInstance, ComputedRef, InjectionKey } from 'vue'

export interface TabbarContext {
  active: ComputedRef<number | string>
  children: ComputedRef
  router?: boolean
  activeColor?: string
  inactiveColor?: string
  iconSize?: string | number
  change: (val: number) => void
  addChild: (val: ComponentInternalInstance) => void
}

export const tabbarKey: InjectionKey<TabbarContext> = Symbol('tabbarKey')
