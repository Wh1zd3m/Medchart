<script setup lang="ts">
import type { AppointmentData } from '~/types/consultation'

const props = defineProps<{ modelValue: AppointmentData }>()
const emit = defineEmits<{ 'update:modelValue': [v: AppointmentData] }>()

function update<K extends keyof AppointmentData>(key: K, value: AppointmentData[K]) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

const DEPTS = [
  'General OPD', 'Cardiology', 'Internal Medicine',
  'Obstetrics & Gynaecology', 'Neurology', 'Orthopedics',
  'Dermatology', 'ENT', 'Ophthalmology',
]

const inputClass = `
  w-full bg-slate-900/80 border border-slate-700/60 rounded-lg
  text-slate-200 text-sm font-mono px-3 py-2.5 outline-none
  placeholder:text-slate-600 transition-all duration-150
  focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10
`
</script>

<template>
  <div>
    <ConsultationSectionTitle title="Next Appointment" />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1.5">Date</label>
        <input
          type="date"
          :value="modelValue.date"
          @input="update('date', ($event.target as HTMLInputElement).value)"
          :class="inputClass"
        />
      </div>
      <div class="mt-3 mb-5">
        <label class="block text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1.5">Time</label>
        <input
          type="time"
          :value="modelValue.time"
          @input="update('time', ($event.target as HTMLInputElement).value)"
          :class="inputClass"
        />
      </div>
      <div class="mt-3 mb-5">
        <label class="block text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1.5">Department</label>
        <select
          :value="modelValue.dept"
          @change="update('dept', ($event.target as HTMLSelectElement).value)"
          :class="inputClass + ' cursor-pointer'"
        >
          <option v-for="d in DEPTS" :key="d">{{ d }}</option>
        </select>
      </div>
      <div class="mt-3 mb-5">
        <label class="block text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1.5">Assigned Doctor</label>
        <input
          :value="modelValue.doctor"
          @input="update('doctor', ($event.target as HTMLInputElement).value)"
          :class="inputClass"
        />
      </div>
    </div>

    <div class="mt-3 mb-4">
      <label class="block text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1.5">Reason for Follow-up</label>
      <textarea
        :value="modelValue.reason"
        @input="update('reason', ($event.target as HTMLTextAreaElement).value)"
        rows="3"
        placeholder="e.g. BP review with investigation results"
        class="w-full bg-slate-900/80 border border-slate-700/60 rounded-lg text-slate-200 text-sm font-mono px-3 py-2.5 outline-none resize-y placeholder:text-slate-600 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10 transition-all"
      />
    </div>

    <div class="mb-5">
      <label class="block text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1.5">Additional Instructions</label>
      <textarea
        :value="modelValue.notes"
        @input="update('notes', ($event.target as HTMLTextAreaElement).value)"
        rows="2"
        placeholder="Any special instructions for next visit…"
        class="w-full bg-slate-900/80 border border-slate-700/60 rounded-lg text-slate-200 text-sm font-mono px-3 py-2.5 outline-none resize-y placeholder:text-slate-600 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/10 transition-all"
      />
    </div>

    <ConsultationSectionTitle title="Notifications & Documents" />
    <div class="flex flex-wrap gap-6">
      <label
        v-for="opt in [
          { key: 'sms',       label: '📱 Send SMS reminder' },
          { key: 'email',     label: '📧 Send email reminder' },
          { key: 'sickLeave', label: '🏥 Issue sick leave certificate' },
        ]"
        :key="opt.key"
        class="flex items-center gap-2.5 cursor-pointer text-slate-300 text-sm"
      >
        <input
          type="checkbox"
          :checked="(modelValue as any)[opt.key]"
          @change="update(opt.key as keyof AppointmentData, ($event.target as HTMLInputElement).checked as any)"
          class="w-4 h-4 accent-emerald-500 cursor-pointer"
        />
        {{ opt.label }}
      </label>
    </div>
  </div>
</template>
