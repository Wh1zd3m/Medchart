<script setup lang="ts">
import { useConsultation } from '~/composables/useConsultation'

const {
  patient, vitals, tabs,
  activeTab, saved, saving,
  history, exam, diagnosis,
  orders, addOrder, removeOrder,
  prescriptions, addPrescription, removePrescription,
  appointment,
  saveConsultation, tabComplete,
} = useConsultation()
</script>

<template>
  <div class="min-h-screen bg-[#0d1117] text-slate-200 font-body">

    <!-- ── Top Nav ─────────────────────────────────────────────────────────── -->
    <header class="sticky top-0 z-50 bg-[#0d1117]/95 backdrop-blur border-b border-slate-800/80 px-6 h-14 flex items-center justify-between">
      <div class="flex items-center gap-3.5">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-lg shadow-lg shadow-emerald-900/40">
          🏥
        </div>
        <div>
          <p class="text-sm font-display font-bold text-emerald-400 tracking-tight leading-none">MedChart</p>
          <p class="text-[9px] font-bold text-slate-600 tracking-[0.14em] uppercase mt-0.5">OPD · Doctor Console</p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-right hidden sm:block">
          <p class="text-xs font-semibold text-slate-300">{{ patient.doctor }}</p>
          <p class="text-[10px] text-slate-600">{{ patient.date }}</p>
        </div>
        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-extrabold text-white shadow-md">
          {{ patient.initials }}
        </div>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 py-6 pb-16 space-y-5">

      <!-- ── Patient Banner ──────────────────────────────────────────────── -->
      <div class="
        relative overflow-hidden rounded-2xl border border-slate-700/60
        bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30
        p-5 shadow-xl shadow-black/30
      ">
        <!-- Decorative accent -->
        <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-teal-600 rounded-l-2xl" />

        <div class="pl-4 flex items-center justify-between flex-wrap gap-4">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-900 to-teal-900 border border-emerald-700/40 flex items-center justify-center text-3xl">
              👩🏾
            </div>
            <div>
              <h1 class="text-xl font-display font-extrabold text-white tracking-tight">{{ patient.name }}</h1>
              <div class="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1">
                <span class="font-mono text-xs text-slate-500">{{ patient.id }}</span>
                <span class="text-slate-700">·</span>
                <span class="text-xs text-slate-400">{{ patient.age }}yrs · {{ patient.sex }}</span>
                <span class="text-slate-700">·</span>
                <span class="text-xs text-slate-400">Blood: <strong class="text-red-400">{{ patient.blood }}</strong></span>
                <span class="text-slate-700">·</span>
                <span class="text-xs text-slate-400">{{ patient.weight }}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 items-center">
            <span class="text-[11px] font-bold bg-sky-950/70 text-sky-400 border border-sky-700/40 px-3 py-1 rounded-full">
              {{ patient.visitType }}
            </span>
            <span class="text-[11px] font-bold bg-emerald-950/70 text-emerald-400 border border-emerald-700/40 px-3 py-1 rounded-full">
              {{ patient.insurance }}
            </span>
            <span class="text-[11px] font-bold bg-amber-950/60 text-amber-400 border border-amber-700/40 px-3 py-1 rounded-full">
              ⚠️ Allergy: Penicillin
            </span>
          </div>
        </div>
      </div>

      <!-- ── Vitals Strip ────────────────────────────────────────────────── -->
      <div class="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4">
        <p class="text-[10px] font-bold text-slate-600 tracking-[0.14em] uppercase mb-3">⚡ Triage Vitals</p>
        <div class="flex gap-2.5 flex-wrap">
          <ConsultationVitalCard
            v-for="v in vitals"
            :key="v.short"
            :vital="v"
          />
        </div>
      </div>

      <!-- ── Consultation Card ───────────────────────────────────────────── -->
      <div class="bg-slate-900/70 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">

        <!-- Tab bar -->
        <div class="flex border-b border-slate-800/80 bg-[#0d1117]/60 overflow-x-auto">
          <button
            v-for="t in tabs"
            :key="t.id"
            @click="activeTab = t.id"
            :class="[
              'flex items-center gap-1.5 px-5 py-3.5 text-[13px] font-semibold whitespace-nowrap transition-all duration-150 border-b-2 relative',
              activeTab === t.id
                ? 'border-emerald-500 text-emerald-400 bg-slate-900/60'
                : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
            ]"
          >
            <span>{{ t.icon }}</span>
            {{ t.label }}
            <!-- Completion dot -->
            <span
              v-if="tabComplete[t.id] && activeTab !== t.id"
              class="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute top-2.5 right-2"
            />
          </button>
        </div>

        <!-- Tab content -->
        <div class="p-7 min-h-[420px]">
          <Transition name="fade" mode="out-in">
            <div :key="activeTab">
              <ConsultationHistoryTab
                v-if="activeTab === 'history'"
                v-model="history"
              />
              <ConsultationExaminationTab
                v-else-if="activeTab === 'examination'"
                v-model="exam"
              />
              <ConsultationDiagnosisTab
                v-else-if="activeTab === 'diagnosis'"
                v-model="diagnosis"
              />
              <ConsultationInvestigationsTab
                v-else-if="activeTab === 'investigations'"
                :orders="orders"
                @add="addOrder"
                @remove="removeOrder"
              />
              <ConsultationPrescriptionTab
                v-else-if="activeTab === 'prescription'"
                :items="prescriptions"
                @add="addPrescription"
                @remove="removePrescription"
              />
              <ConsultationAppointmentTab
                v-else-if="activeTab === 'appointment'"
                v-model="appointment"
              />
            </div>
          </Transition>
        </div>

        <!-- Footer -->
        <div class="border-t border-slate-800/80 px-7 py-4 flex items-center justify-between bg-[#0d1117]/50 flex-wrap gap-3">
          <p class="text-xs text-slate-600">
            📝 Consultation by <span class="text-slate-400 font-semibold">{{ patient.doctor }}</span>
          </p>
          <div class="flex gap-2.5 flex-wrap">
            <button class="
              bg-transparent border border-slate-700/70 text-slate-400 hover:text-slate-200
              hover:border-slate-600 text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-150
            ">🖨 Print Record</button>

            <button class="
              bg-transparent border border-slate-700/70 text-slate-400 hover:text-slate-200
              hover:border-slate-600 text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-150
            ">📤 Refer Patient</button>

            <button
              @click="saveConsultation"
              :disabled="saving"
              :class="[
                'text-xs font-bold px-6 py-2 rounded-lg transition-all duration-300 shadow-lg',
                saved
                  ? 'bg-emerald-600 text-white shadow-emerald-900/40'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/40',
                saving ? 'opacity-70 cursor-wait' : ''
              ]"
            >
              <span v-if="saving">⏳ Saving…</span>
              <span v-else-if="saved">✓ Record Saved</span>
              <span v-else>Save Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
