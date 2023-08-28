import type { InjectionKey } from 'vue'
import { ComputedRef } from 'vue'

export interface CollapseContext {
  value: ComputedRef<string | number>
  accordion?: ComputedRef<boolean>
  activeList?: ComputedRef<string[] | number[]>
  change: (val: string | number) => void
  setActiveList: (val: string[] | number[]) => void
}

export const collapseKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')
