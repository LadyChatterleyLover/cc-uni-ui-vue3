import type { ComponentInternalInstance, ComputedRef, InjectionKey } from 'vue'

export interface SidebarContext {
  active: ComputedRef<string | number>
  children: ComputedRef
  bgColor?: string
  activeColor?: string
  textColor?: string
  activeTextColor?: string
  width?: string | number
  showLine?: boolean
  lineColor?: string
  lineWidth?: string | number
  lineHeight?: string | number
  change: (val: number) => void
  setIndex: (val: number) => void
  addChild: (val: ComponentInternalInstance) => void
}

export const sidebarKey: InjectionKey<SidebarContext> = Symbol('sidebarKey')
