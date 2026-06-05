<script setup lang="ts">
import { ref } from 'vue'
import type { TestOrder, TestCategory } from '~/types/consultation'

defineProps<{ orders: TestOrder[] }>()
const emit = defineEmits<{
  add: [name: string, category: TestCategory]
  remove: [id: number]
}>()

const newName = ref('')
const newCat = ref<TestCategory>('lab')

function handleAdd() {
  if (!newName.value.trim()) return
  emit('add', newName.value.trim(), newCat.value)
  newName.value = ''
}

const statusConfig = {
  pending:    { label: 'Pending',    classes: 'bg-slate-800 text-slate-400 border border-slate-700' },
  processing: { label: 'Processing', classes: 'bg-amber-950/60 text-amber-400 border border-amber-700/40' },
  resulted:   { label: 'Resulted',   classes: 'bg-emerald-950/60 text-emerald-400 border border-emerald-700/40' },
}

const flagConfig = {
  normal: { icon: '✓', color: 'text-emerald-400' },
  high:   { icon: '↑', color: 'text-red-400' },
  low:    { icon: '↓', color: 'text-sky-400' },
}

const catIcons: Record<TestCategory, string> = {
  lab: '🧪',
  radiology: '🩻',
  other: '📌',
}
</script>

<template>
  <div>
    <ConsultationSectionTitle title="Order Investigations" />

    <!-- Add row -->
    <div class="flex gap-2 mb-6">
      <input
        v-model="newName"
        @keydown.enter="handleAdd"
        placeholder="Type test name and press Enter…  e.g. FBC, Chest X-ray"
        class="
          flex-1 bg-slate-900/80 border border-slate-700/60 rounded-lg
          text-slate-200 text-sm font-mono px-3 py-2.5 outline-none
          placeholder:text-slate-600 transition-all duration-150
          focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10
        "
      />
      <select
        v-model="newCat"
        class="
          bg-slate-900/80 border border-slate-700/60 rounded-lg
          text-slate-300 text-sm px-3 py-2.5 outline-none cursor-pointer
          focus:border-emerald-500/70 w-36
        "
      >
        <option value="lab">🧪 Lab</option>
        <option value="radiology">🩻 Radiology</option>
        <option value="other">📌 Other</option>
      </select>
      <button
        @click="handleAdd"
        class="
          bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold
          px-5 py-2.5 rounded-lg transition-colors duration-150 whitespace-nowrap
        "
      >
        + Order
      </button>
    </div>

    <ConsultationSectionTitle title="Investigation List" />

    <p v-if="orders.length === 0" class="text-center text-slate-500 py-10 text-sm">
      No investigations ordered yet
    </p>

    <div v-else class="flex flex-col gap-2.5">
      <div
        v-for="(order, i) in orders"
        :key="order.id"
        class="
          flex items-center justify-between
          bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3
          hover:border-slate-600 transition-colors duration-150
        "
      >
        <div class="flex items-center gap-3">
          <span class="font-mono text-xs text-slate-600">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="text-lg">{{ catIcons[order.category] }}</span>
          <div>
            <span class="font-semibold text-slate-200 text-sm">{{ order.name }}</span>
            <span class="ml-2 text-[10px] font-bold bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-wider">
              {{ order.category }}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span
            v-if="order.result"
            :class="['font-mono text-sm font-semibold', order.flag ? flagConfig[order.flag].color : 'text-slate-400']"
          >
            {{ order.result }}
            <span v-if="order.flag">{{ flagConfig[order.flag].icon }}</span>
          </span>

          <span :class="['text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider', statusConfig[order.status].classes]">
            {{ statusConfig[order.status].label }}
          </span>

          <button
            @click="$emit('remove', order.id)"
            class="text-slate-600 hover:text-slate-400 text-lg leading-none transition-colors"
          >×</button>
        </div>
      </div>
    </div>
  </div>
</template>
