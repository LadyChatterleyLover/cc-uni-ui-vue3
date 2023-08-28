import type { ComponentInternalInstance, ComputedRef, InjectionKey } from 'vue'

export interface StepsContext {
  active: ComputedRef<number>
  vertical: boolean
  dot: boolean
  children: ComputedRef<ComponentInternalInstance[]>
  change: (val: number) => void
  addChild: (val: ComponentInternalInstance) => void
}

export const stepsKey: InjectionKey<StepsContext> = Symbol('stepsKey')
