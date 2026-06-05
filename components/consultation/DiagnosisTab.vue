<script setup lang="ts">
import type { DiagnosisData } from '~/types/consultation';

const props = defineProps < { modelValue: DiagnosisData } > ()
const emit = defineEmits < { 'update:modelValue': [v: DiagnosisData] } > () 

function update(key: keyof DiagnosisData, value: string) {
  emit('update:modelValue', {...props.modelValue, [key]: value})
}
</script>

<template>
  <div>
    <ConsultationSectionTitle title="Diagnosis" />
    <ConsultationFormField 
      label="Primary Diagnosis"
      :modelValue="modelValue.primary"
      @update:modelValue="update('primary', $event)"
      :rows="4"
      placeholder="e.g. Migraine, Hypertension, Type 2 Diabetes Mellitus"
    />
    <ConsultationFormField 
      label="Secondary Diagnosis"
      :modelValue="modelValue.secondary"
      @update:modelValue="update('secondary', $event)"
      :rows="3"
      placeholder="e.g. Anemia, Dyslipidemia, Osteoarthritis"
     />

     <ConsultationSectionTitle title="Management Plan" />
     <ConsultationFormField 
      label="Clinical Plan"
      :modelValue="modelValue.plan"
      @update:modelValue="update('plan', $event)"
      :rows="8"
      />
  </div>
</template>
