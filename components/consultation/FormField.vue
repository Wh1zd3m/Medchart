<script setup lang="ts">
defineProps < {
  label: string
  modelValue: string
  rows?: number
  placeholder?: string
} > ()

defineEmits < { 'update:modelValue': [string] } > ()
 
</script>

<template>
  <div class="mb-5">
    <label class="block text-[10px] font-bold text-slate-500 tracking-[0.12em] uppercase mb-1.5">
      {{ label }}
    </label>
    <textarea 
      :rows="rows ?? 3"
      :value="modelValue"
      :placeholder="placeholder ?? ''"
      @input="$emit('update:modelValue',($event.target as HTMLTextAreaElement).value)"
      class="w-full bg-slate-900/80 border border-slate-700/60 rounded-lg text-slate-200 text-[13.5px] font-mono leading-relaxed px-3 py-2.5 resize-y outline-none transition-all duration-150 placeholder:text-slate-600 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10 hover:border-slate-600"
    />
  </div>
</template>
