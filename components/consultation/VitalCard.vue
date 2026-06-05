<script setup lang="ts">
import type { Vital } from '~/types/consultation'

defineProps<{ vital: Vital }>()

const statusClasses: Record<string, string> = {
  normal:   'bg-emerald-950/60 border-emerald-700/40 text-emerald-400',
  warning:  'bg-amber-950/60   border-amber-600/40   text-amber-400',
  critical: 'bg-red-950/60     border-red-600/40     text-red-400',
}
const valueClasses: Record<string, string> = {
  normal:  'text-emerald-300',
  warning: 'text-amber-300',
  critical:'text-red-300',
}
</script>

<template>
  <div
    :class="[
      'flex flex-col items-center justify-center rounded-xl border px-4 py-3 min-w-[86px] flex-1 transition-all duration-200 hover:scale-[1.03]',
      statusClasses[vital.status]
    ]"
  >
    <span class="text-lg mb-1">{{ vital.icon }}</span>
    <span
      :class="['font-mono font-bold text-xl leading-none', valueClasses[vital.status]]"
    >{{ vital.value }}</span>
    <span class="text-[10px] mt-0.5 opacity-60">{{ vital.unit }}</span>
    <span class="text-[9px] font-bold tracking-widest uppercase mt-1.5 text-slate-500">{{ vital.short }}</span>
  </div>
</template>
