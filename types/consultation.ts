// ─── Vitals ───────────────────────────────────────────────────────────────────
export type VitalStatus = 'normal' | 'warning' | 'critical'

export interface Vital {
  label: string
  short: string
  value: string
  unit: string
  status: VitalStatus
  icon: string
}

// ─── Patient ──────────────────────────────────────────────────────────────────
export interface Patient {
  name: string
  id: string
  age: number
  sex: string
  blood: string
  weight: string
  visitType: string
  insurance: string
  doctor: string
  initials: string
  date: string
}

// ─── History ──────────────────────────────────────────────────────────────────
export interface HistoryData {
  pc: string
  hpc: string
  pmh: string
  drugHistory: string
  allergies: string
  familyHistory: string
  socialHistory: string
}

// ─── Examination ──────────────────────────────────────────────────────────────
export interface ExamData {
  general: string
  cvs: string
  respiratory: string
  git: string
  cns: string
  msk: string
  local: string
}

// ─── Diagnosis ────────────────────────────────────────────────────────────────
export interface DiagnosisData {
  primary: string
  secondary: string
  plan: string
}

// ─── Investigations ───────────────────────────────────────────────────────────
export type TestCategory = 'lab' | 'radiology' | 'other'
export type TestStatus = 'pending' | 'processing' | 'resulted'
export type FlagType = 'normal' | 'high' | 'low'

export interface TestOrder {
  id: number
  name: string
  category: TestCategory
  status: TestStatus
  result?: string
  flag?: FlagType
}

// ─── Prescription ─────────────────────────────────────────────────────────────
export interface PrescriptionItem {
  id: number
  drug: string
  dose: string
  route: string
  frequency: string
  duration: string
}

// ─── Appointment ──────────────────────────────────────────────────────────────
export interface AppointmentData {
  date: string
  time: string
  dept: string
  doctor: string
  reason: string
  notes: string
  sms: boolean
  email: boolean
  sickLeave: boolean
}

// ─── Tab ──────────────────────────────────────────────────────────────────────
export type TabId = 'history' | 'examination' | 'diagnosis' | 'investigations' | 'prescription' | 'appointment'

export interface Tab {
  id: TabId
  label: string
  icon: string
}
