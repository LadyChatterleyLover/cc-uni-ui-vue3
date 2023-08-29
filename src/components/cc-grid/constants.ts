import type { ComputedRef, InjectionKey } from 'vue'

export interface GridContext {
  column?: number
  gutter?: string | number
  vertical?: boolean
}

export const gridKey: InjectionKey<GridContext> = Symbol('gridKey')
