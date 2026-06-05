<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="flex items-center gap-2.5 mb-4 mt-1">
    <span class="inline-block w-5 h-0.5 bg-emerald-500 rounded-full" />
    <span class="text-[10px] font-bold text-emerald-400 tracking-[0.14em] uppercase">
      {{ title }}
    </span>
  </div>
</template>
