<script setup lang="ts">
import type { ExamData } from '~/types/consultation';

const props = defineProps < { modelValue: ExamData } > ()
const emit = defineEmits < { 'update:modelValue': [v: ExamData] } > ()

function update(key: keyof ExamData, value: string) {
  emit('update:modelValue', {...props.modelValue, [key]: value})
}
</script>

<template>
  <div>
    <ConsultationSectionTitle title="General Appearance"/>
    <ConsultationFormField 
      label="General"
      :modelValue="modelValue.general"
      @update:modelValue="update('general', $event)"
      :rows="2"
      placeholder="Alert, oriented, no acute distress, pallor, jaundice,cyanosis..."
    
    />

    <ConsultationSectionTitle title="Systemic Examination" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ConsultationFormField 
      label="Cardiovascular System (CVS)"
      :modelValue="modelValue.cvs"
      @update:modelValue="update('cvs',$event)"
      :rows="3"
    />
    <ConsultationFormField 
      label="Respiratory System (RS)"
      :modelValue="modelValue.respiratory"
      @update:modelValue="update('respiratory',$event)"
      :rows="3"
    />
    <ConsultationFormField 
      label="Gastrointestinal System (GI)"
      :modelValue="modelValue.git"
      @update:modelValue="update('git',$event)"
      :rows="3"
    />
    <ConsultationFormField 
      label="Central Nervous System (CNS)"
      :modelValue="modelValue.cns"
      @update:modelValue="update('cns',$event)"
      :rows="3"
     />
     <ConsultationFormField 
      label="Musculoskeletal System (MSK)"
      :modelValue="modelValue.msk"
      @update:modelValue="update('msk',$event)"
      :rows="2"
     />
     <ConsultationFormField 
       label="Local / Specific Examination"
       :modelValue="modelValue.local"
       @update:modelValue="update('local',$event)"
       :rows="2"
       placeholder="Document any focused local exam findings..."
     />
     </div>
  </div>
</template>
