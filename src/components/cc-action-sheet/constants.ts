import type { InjectionKey } from 'vue'

export interface ActionSheetContext {
  select: (val: String) => void
  close: () => void
}

export const actionSheetKey: InjectionKey<ActionSheetContext> = Symbol('actionSheetKey')
