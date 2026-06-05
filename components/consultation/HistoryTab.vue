<script setup lang="ts">
import type { HistoryData } from '~/types/consultation'

const props = defineProps<{ modelValue: HistoryData }>()
const emit = defineEmits<{ 'update:modelValue': [v: HistoryData] }>()

function update(key: keyof HistoryData, value: string) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
</script>

<template>
  <div>
    <ConsultationSectionTitle title="Chief Complaint" />
    <ConsultationFormField
      label="Presenting Complaint (PC)"
      :modelValue="modelValue.pc"
      @update:modelValue="update('pc', $event)"
      :rows="2"
      placeholder="e.g. Headache and dizziness for 3 days"
    />

    <ConsultationSectionTitle title="History of Presenting Complaint" />
    <ConsultationFormField
      label="HPC — Onset, character, duration, associated symptoms"
      :modelValue="modelValue.hpc"
      @update:modelValue="update('hpc', $event)"
      :rows="4"
    />

    <ConsultationSectionTitle title="Background History" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ConsultationFormField
        label="Past Medical History (PMH)"
        :modelValue="modelValue.pmh"
        @update:modelValue="update('pmh', $event)"
        :rows="3"
      />
      <ConsultationFormField
        label="Drug History"
        :modelValue="modelValue.drugHistory"
        @update:modelValue="update('drugHistory', $event)"
        :rows="3"
      />
      <ConsultationFormField
        label="Allergies"
        :modelValue="modelValue.allergies"
        @update:modelValue="update('allergies', $event)"
        :rows="2"
        placeholder="Drug / Food / Environmental"
      />
      <ConsultationFormField
        label="Family History"
        :modelValue="modelValue.familyHistory"
        @update:modelValue="update('familyHistory', $event)"
        :rows="2"
      />
    </div>
    <ConsultationFormField
       label="Social History (smoking, alcohol, occupation, marital status)"
       :modelValue="modelValue.socialHistory"
       @update:modelValue="update('socialHistory', $event)"
       :rows="2"
    />
  </div>
</template>
