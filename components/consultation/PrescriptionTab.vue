<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { PrescriptionItem } from '~/types/consultation'

defineProps<{ items: PrescriptionItem[] }>()
const emit = defineEmits<{
  add: [item: Omit<PrescriptionItem, 'id'>]
  remove: [id: number]
}>()

const ROUTES = ['Oral', 'IV', 'IM', 'SC', 'Topical', 'Sublingual', 'Rectal', 'Inhaled']

const form = reactive<Omit<PrescriptionItem, 'id'>>({
  drug: '', dose: '', route: 'Oral', frequency: '', duration: '',
})

function handleAdd() {
  if (!form.drug.trim()) return
  emit('add', { ...form })
  form.drug = ''
  form.dose = ''
  form.frequency = ''
  form.duration = ''
  form.route = 'Oral'
}

const inputClass = `
  w-full bg-slate-900/80 border border-slate-700/60 rounded-lg
  text-slate-200 text-sm font-mono px-3 py-2 outline-none
  placeholder:text-slate-600 transition-all duration-150
  focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10
`
</script>

<template>
  <div>
    <ConsultationSectionTitle title="Add Medication" />

    <!-- Form -->
    <div class="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4 mb-6">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
        <div class="md:col-span-2">
          <label class="block text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">Drug Name</label>
          <input v-model="form.drug" placeholder="e.g. Amlodipine" :class="inputClass" />
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">Dose</label>
          <input v-model="form.dose" placeholder="5mg" :class="inputClass" />
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">Frequency</label>
          <input v-model="form.frequency" placeholder="OD / BD / TDS" :class="inputClass" />
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">Duration</label>
          <input v-model="form.duration" placeholder="30 days" :class="inputClass" />
        </div>
      </div>
      <div class="flex items-end gap-3">
        <div class="w-40">
          <label class="block text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">Route</label>
          <select v-model="form.route" :class="inputClass + ' cursor-pointer'">
            <option v-for="r in ROUTES" :key="r">{{ r }}</option>
          </select>
        </div>
        <button
          @click="handleAdd"
          class="
            bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold
            px-5 py-2 rounded-lg transition-colors duration-150
          "
        >+ Add to Prescription</button>
      </div>
    </div>

    <ConsultationSectionTitle title="Prescription List" />

    <p v-if="items.length === 0" class="text-center text-slate-500 py-10 text-sm">
      No medications prescribed yet
    </p>

    <div v-else class="overflow-x-auto rounded-xl border border-slate-700/50">
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr class="bg-slate-900/80">
            <th v-for="h in ['#', 'Drug', 'Dose', 'Route', 'Frequency', 'Duration', '']"
              :key="h"
              class="text-left px-4 py-3 text-[10px] font-bold text-slate-500 tracking-widest uppercase border-b border-slate-700/50"
            >{{ h }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in items"
            :key="item.id"
            class="border-b border-slate-800/60 hover:bg-slate-900/40 transition-colors"
          >
            <td class="px-4 py-3 font-mono text-xs text-slate-600">{{ String(i + 1).padStart(2, '0') }}</td>
            <td class="px-4 py-3 font-bold text-slate-100">{{ item.drug }}</td>
            <td class="px-4 py-3 font-mono text-slate-400">{{ item.dose }}</td>
            <td class="px-4 py-3 text-slate-400">{{ item.route }}</td>
            <td class="px-4 py-3 font-mono text-slate-400">{{ item.frequency }}</td>
            <td class="px-4 py-3 text-slate-400">{{ item.duration }}</td>
            <td class="px-4 py-3">
              <button @click="$emit('remove', item.id)"
                class="text-slate-600 hover:text-slate-400 text-lg leading-none transition-colors"
              >×</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
