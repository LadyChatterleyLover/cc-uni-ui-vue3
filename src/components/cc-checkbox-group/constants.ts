import type { InjectionKey } from 'vue'
import { CheckboxGroupValue } from './cc-checkbox-group.vue'

export interface CheckboxGroupContext {
  modelValue: CheckboxGroupValue
  disabled?: boolean
  max?: number | string
  direction?: 'vertical' | 'horizontal'
  iconSize?: number | string
  checkedColor?: string
  change: (val: CheckboxGroupValue) => void
}

export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol('checkboxGroupKey')
