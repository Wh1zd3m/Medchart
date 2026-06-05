# MedChart — OPD Doctor Consultation View

A production-grade **Nuxt 3 + Vue 3 + TypeScript + Tailwind CSS** hospital OPD consultation interface. Built with a deep charcoal dark theme, electric emerald accents, and a premium medical records aesthetic.

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | Nuxt 3 (SSR/SPA)                   |
| UI Library  | Vue 3 Composition API (`<script setup>`) |
| Language    | TypeScript (strict mode)            |
| Styling     | Tailwind CSS v3                     |
| State       | Vue `ref` / `reactive` via composable |
| Fonts       | Fraunces (display) + DM Mono (data) + Outfit (body) |

---

## Project Structure

```
medchart/
├── app.vue                         # Root layout
├── nuxt.config.ts                  # Nuxt config (modules, fonts, components)
├── tailwind.config.ts              # Tailwind theme (tokens, fonts, animations)
├── tsconfig.json                   # TypeScript config
├── assets/css/
│   └── main.css                    # Global Tailwind + scrollbar styles
├── types/
│   └── consultation.ts             # All TypeScript interfaces & types
├── composables/
│   └── useConsultation.ts          # All reactive state + business logic
├── pages/
│   └── index.vue                   # Main page (patient banner, vitals, tabs)
└── components/consultation/
    ├── VitalCard.vue               # Colour-coded vital chip
    ├── FormField.vue               # Shared label + textarea field
    ├── SectionTitle.vue            # Section header with accent bar
    ├── HistoryTab.vue              # PC, HPC, PMH, Drug Hx, Allergies, etc.
    ├── ExaminationTab.vue          # General + 6-system exam
    ├── DiagnosisTab.vue            # ICD-10 dx + differentials + plan
    ├── InvestigationsTab.vue       # Order tests, view status + results
    ├── PrescriptionTab.vue         # Add/remove drugs with full details
    └── AppointmentTab.vue          # Next appt date/time/dept + reminders
```

---

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Features

### Patient Banner
- Name, Hospital ID, Age, Sex, Blood Group, Weight
- Visit type, Insurance, and Allergy alert badges

### Vitals Strip
- 6 vitals pulled from triage (BP, Pulse, Temp, SpO₂, RR, BMI)
- Colour-coded: **emerald** = normal · **amber** = warning · **red** = critical

### 6-Tab Consultation Workflow

| Tab | Contents |
|-----|----------|
| **History** | PC, HPC, PMH, Drug History, Allergies, Family & Social History |
| **Examination** | General appearance + CVS, Respiratory, GIT, CNS, MSK, Local |
| **Diagnosis** | ICD-10 primary/secondary dx + Management Plan |
| **Investigations** | Order tests (lab/radiology/other), status badges, result values with flags |
| **Prescription** | Drug name, dose, route, frequency, duration — rendered as table |
| **Appointment** | Date, time, department, doctor, reason, SMS/email/sick-leave toggles |

### UX Details
- **Tab completion dots** — green dot appears when a tab has data
- **Fade transition** — smooth Vue `<Transition>` between tabs
- **Save animation** — button cycles through idle → saving → saved states
- **Auto-component registration** — `Consultation` prefix from `components/consultation/`
- **Strict TypeScript** — all props, emits, and composable returns fully typed

---

## Design System

- **Background**: `#0d1117` (deep charcoal)
- **Primary accent**: Emerald (`emerald-400/500/600`)
- **Warning**: Amber · **Critical**: Red · **Info**: Sky
- **Typography**: Fraunces (headings) / Outfit (body) / DM Mono (clinical data)
- **Cards**: `slate-900` with `slate-800` borders and subtle transparency
- **Tab active state**: `emerald-500` bottom border + lighter background
