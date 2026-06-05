import { ref, computed } from 'vue'
import type {
  Patient, Vital, Tab, TabId,
  HistoryData, ExamData, DiagnosisData,
  TestOrder, PrescriptionItem, AppointmentData,
} from '~/types/consultation'

export function useConsultation() {
  // ─── Patient ─────────────────────────────────────────────────────────────
  const patient: Patient = {
    name: 'Adaeze Nwosu',
    id: 'HMR-2024-08843',
    age: 29,
    sex: 'Female',
    blood: 'B+',
    weight: '67 kg',
    visitType: 'Follow-up',
    insurance: 'NHIS',
    doctor: 'Dr. Emeka Okafor',
    initials: 'EO',
    date: '29 May 2026',
  }

  // ─── Vitals ──────────────────────────────────────────────────────────────
  const vitals: Vital[] = [
    { label: 'Blood Pressure', short: 'BP',  value: '138/90', unit: 'mmHg',  status: 'warning',  icon: '🫀' },
    { label: 'Pulse Rate',     short: 'PR',  value: '88',     unit: 'bpm',   status: 'normal',   icon: '💓' },
    { label: 'Temperature',   short: 'T°',  value: '37.4',   unit: '°C',    status: 'normal',   icon: '🌡' },
    { label: 'SpO₂',          short: 'O₂',  value: '97',     unit: '%',     status: 'normal',   icon: '🫁' },
    { label: 'Resp. Rate',    short: 'RR',  value: '18',     unit: '/min',  status: 'normal',   icon: '🌬' },
    { label: 'BMI',           short: 'BMI', value: '24.2',   unit: 'kg/m²', status: 'normal',   icon: '⚖️' },
  ]

  // ─── Tabs ─────────────────────────────────────────────────────────────────
  const tabs: Tab[] = [
    { id: 'history',        label: 'History',        icon: '📋' },
    { id: 'examination',    label: 'Examination',    icon: '🔬' },
    { id: 'diagnosis',      label: 'Diagnosis',      icon: '🩺' },
    { id: 'investigations', label: 'Investigations', icon: '🧪' },
    { id: 'prescription',   label: 'Prescription',   icon: '💊' },
    { id: 'appointment',    label: 'Appointment',    icon: '📅' },
  ]

  const activeTab = ref<TabId>('history')
  const saved = ref(false)
  const saving = ref(false)

  // ─── History ─────────────────────────────────────────────────────────────
  const history = ref<HistoryData>({
    pc: 'Headache and dizziness for 3 days',
    hpc: 'Patient reports persistent frontal headache rated 6/10, associated with intermittent dizziness on standing. No vomiting, no visual disturbance. Notes poor medication adherence over the past 2 weeks.',
    pmh: 'Hypertension (Dx 2022)\nType 2 Diabetes Mellitus (Dx 2021)',
    drugHistory: 'Metformin 500mg BD\nLisinopril 10mg OD',
    allergies: 'Penicillin — urticarial rash',
    familyHistory: 'Father: Hypertension, CVA (age 57)\nMother: T2DM',
    socialHistory: 'Non-smoker. Occasional alcohol. Secondary school teacher. Married with 2 children.',
  })

  // ─── Examination ─────────────────────────────────────────────────────────
  const exam = ref<ExamData>({
    general: 'Alert and oriented ×3. No acute distress. Mildly anxious. No pallor, jaundice, or cyanosis. Well nourished.',
    cvs: 'S1 S2 heard, no murmurs or added sounds. JVP not elevated. Apex beat non-displaced. Peripheral pulses equal and present.',
    respiratory: 'Chest clear to auscultation bilaterally. No wheeze, crepitations or pleural rub. Resonant percussion note.',
    git: 'Abdomen soft, non-tender. No organomegaly. Bowel sounds present. No masses palpated.',
    cns: 'GCS 15/15. Cranial nerves II–XII grossly intact. Power 5/5 all limbs. Reflexes normal. Sensation intact.',
    msk: 'No joint swelling or tenderness. Full range of motion. No deformity.',
    local: '',
  })

  // ─── Diagnosis ───────────────────────────────────────────────────────────
  const diagnosis = ref<DiagnosisData>({
    primary: 'I10 — Essential (primary) hypertension, uncontrolled',
    secondary: 'E11 — Type 2 diabetes mellitus, on treatment\nZ87.39 — Poor medication compliance',
    plan: '1. Step up antihypertensive — add Amlodipine 5mg OD\n2. Reinforce medication adherence and lifestyle modification (DASH diet, 30min walk daily)\n3. Request FBC, U&E, fasting lipid profile\n4. Arrange ABPM if BP remains elevated at next visit\n5. Review in 4 weeks with investigation results\n6. Sick leave: 2 working days',
  })

  // ─── Investigations ──────────────────────────────────────────────────────
  const orders = ref<TestOrder[]>([
    { id: 1, name: 'FBC (Full Blood Count)',    category: 'lab',       status: 'pending' },
    { id: 2, name: 'Urea & Electrolytes (U&E)', category: 'lab',       status: 'resulted', result: 'Na 138 | K 4.1 | Cr 89', flag: 'normal' },
    { id: 3, name: 'Fasting Lipid Profile',     category: 'lab',       status: 'processing' },
    { id: 4, name: 'Chest X-ray (PA view)',     category: 'radiology', status: 'pending' },
  ])

  function addOrder(name: string, category: TestOrder['category']) {
    if (!name.trim()) return
    orders.value.push({ id: Date.now(), name, category, status: 'pending' })
  }

  function removeOrder(id: number) {
    orders.value = orders.value.filter(o => o.id !== id)
  }

  // ─── Prescription ─────────────────────────────────────────────────────────
  const prescriptions = ref<PrescriptionItem[]>([
    { id: 1, drug: 'Amlodipine',  dose: '5mg',   route: 'Oral', frequency: 'OD',  duration: '30 days' },
    { id: 2, drug: 'Lisinopril',  dose: '10mg',  route: 'Oral', frequency: 'OD',  duration: '30 days' },
    { id: 3, drug: 'Metformin',   dose: '500mg', route: 'Oral', frequency: 'BD',  duration: '30 days' },
    { id: 4, drug: 'Paracetamol', dose: '1g',    route: 'Oral', frequency: 'TDS', duration: '5 days (PRN)' },
  ])

  function addPrescription(item: Omit<PrescriptionItem, 'id'>) {
    if (!item.drug.trim()) return
    prescriptions.value.push({ ...item, id: Date.now() })
  }

  function removePrescription(id: number) {
    prescriptions.value = prescriptions.value.filter(p => p.id !== id)
  }

  // ─── Appointment ─────────────────────────────────────────────────────────
  const appointment = ref<AppointmentData>({
    date: '2026-06-26',
    time: '10:00',
    dept: 'General OPD',
    doctor: 'Dr. Emeka Okafor',
    reason: 'BP review with investigation results and medication assessment',
    notes: 'Patient to bring all current medications for review',
    sms: true,
    email: false,
    sickLeave: true,
  })

  // ─── Save ─────────────────────────────────────────────────────────────────
  async function saveConsultation() {
    saving.value = true
    await new Promise(r => setTimeout(r, 700))
    saving.value = false
    saved.value = true
    setTimeout(() => (saved.value = false), 3000)
  }

  // ─── Tab completion dots ──────────────────────────────────────────────────
  const tabComplete = computed(() => ({
    history: !!history.value.pc,
    examination: !!exam.value.general,
    diagnosis: !!diagnosis.value.primary,
    investigations: orders.value.length > 0,
    prescription: prescriptions.value.length > 0,
    appointment: !!appointment.value.date,
  }))

  return {
    patient, vitals, tabs,
    activeTab, saved, saving,
    history, exam, diagnosis,
    orders, addOrder, removeOrder,
    prescriptions, addPrescription, removePrescription,
    appointment,
    saveConsultation, tabComplete,
  }
}
