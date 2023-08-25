import type { ComputedRef, InjectionKey } from 'vue'
import { RadioGroupValue } from './cc-radio-group.vue'

export interface RadioGroupContext {
  checked: ComputedRef<RadioGroupValue>
  modelValue: RadioGroupValue
  disabled?: boolean
  max?: number | string
  direction?: 'vertical' | 'horizontal'
  iconSize?: number | string
  checkedColor?: string
  change: (val: RadioGroupValue) => void
}

export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('radioGroupKey')
