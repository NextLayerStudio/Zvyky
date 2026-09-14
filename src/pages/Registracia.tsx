import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useCourseData, type Registration } from '../context/CourseDataContext'
import { fillZiadostPDF } from '../utils/fillZiadostPDF'

interface Props {
  location: 'Malacky' | 'Bratislava'
}

type ZakladNa = 'kurzSkuska' | 'osobitnaSkuska' | 'osobitnyVycvik'

interface FormState {
  // Contact
  email: string
  phone: string
  courseType: string
  // PDF fields
  meno: string
  priezvisko: string
  rodnePriezvisko: string
  datumNarodenia: string
  miestoNarodenia: string
  rodneCislo: string
  ulica: string
  mesto: string
  psc: string
  drzitelSkupiny: string
  drzitelPreukazu: string
  zakladNa: ZakladNa
  podpisVMeste: string
  // Minor
  isMinor: boolean
  zakonnyZastupcaMeno: string
  zakonnyZastupcaPriezvisko: string
  zakonnyZastupcaRodneCislo: string
  zakonnyZastupcaSkupina: string
  // Extra
  hasFirstAid: boolean
  firstAidDate: string
  preferredStartDate: string
  notes: string
}

const COURSE_OPTIONS: Record<'Malacky' | 'Bratislava', { value: string; label: string }[]> = {
  Malacky: [
    { value: 'B',         label: 'B – Osobné vozidlo do 3,5 t.' },
    { value: 'A1',        label: 'A1 – Motocykel do 125 cm³ / 11 kW' },
    { value: 'A2',        label: 'A2 – Motocykel do 35 kW' },
    { value: 'A',         label: 'A – Motocykel bez výkonového obmedzenia (35 kW a viac)' },
    { value: 'Kondičné',  label: 'Kondičné jazdy' },
    { value: 'Osobitný',  label: 'Osobitný výcvik' },
  ],
  Bratislava: [
    { value: 'B',         label: 'B – Osobné vozidlo do 3,5 t.' },
    { value: 'Kondičné',  label: 'Kondičné jazdy' },
    { value: 'Osobitný',  label: 'Osobitný výcvik' },
  ],
}

const BLANK: FormState = {
  email: '', phone: '', courseType: 'B',
  meno: '', priezvisko: '', rodnePriezvisko: '',
  datumNarodenia: '', miestoNarodenia: '', rodneCislo: '',
  ulica: '', mesto: '', psc: '',
  drzitelSkupiny: '', drzitelPreukazu: '',
  zakladNa: 'kurzSkuska',
  podpisVMeste: '',
  isMinor: false,
  zakonnyZastupcaMeno: '', zakonnyZastupcaPriezvisko: '',
  zakonnyZastupcaRodneCislo: '', zakonnyZastupcaSkupina: '',
  hasFirstAid: false, firstAidDate: '', preferredStartDate: '', notes: '',
}

// ── Input components ──────────────────────────────────────────────────────────
const Input = ({
  label, name, value, onChange, required = false, type = 'text', placeholder = '',
}: {
  label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; type?: string; placeholder?: string;
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <input
      type={type} name={name} value={value} onChange={onChange}
      required={required} placeholder={placeholder}
      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white transition-all"
    />
  </div>
)

function formToPdfRegistration(
  form: FormState,
  loc: 'Malacky' | 'Bratislava',
  podpisDna: string,
): Registration {
  return {
    id: 'local',
    email: form.email,
    phone: form.phone,
    location: loc,
    courseType: form.courseType,
    hasFirstAid: form.hasFirstAid,
    firstAidDate: form.firstAidDate || undefined,
    preferredStartDate: form.preferredStartDate || undefined,
    notes: form.notes || undefined,
    status: 'pending',
    createdAt: new Date().toISOString().split('T')[0],
    meno: form.meno,
    priezvisko: form.priezvisko,
    rodnePriezvisko: form.rodnePriezvisko,
    datumNarodenia: form.datumNarodenia,
    miestoNarodenia: form.miestoNarodenia,
    rodneCislo: form.rodneCislo,
    ulica: form.ulica,
    mesto: form.mesto,
    psc: form.psc,
    drzitelSkupiny: form.drzitelSkupiny,
    drzitelPreukazu: form.drzitelPreukazu,
    ziadamSkupiny: form.courseType,
    zakladNa: form.zakladNa,
    podpisVMeste: form.podpisVMeste,
    podpisDna,
    isMinor: form.isMinor,
    zakonnyZastupcaMeno: form.isMinor ? form.zakonnyZastupcaMeno : undefined,
    zakonnyZastupcaPriezvisko: form.isMinor ? form.zakonnyZastupcaPriezvisko : undefined,
    zakonnyZastupcaRodneCislo: form.isMinor ? form.zakonnyZastupcaRodneCislo : undefined,
    zakonnyZastupcaSkupina: form.isMinor ? form.zakonnyZastupcaSkupina : undefined,
  }
}

function triggerPdfDownload(blob: Blob, priezvisko: string) {
  const safe = (priezvisko || 'ziadost').replace(/[^\w\u00C0-\u024f-]/gi, '_').slice(0, 80)
  const filename = `ziadost-vodicke-opravnenie-${safe}.pdf`
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const SectionTitle = ({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-sky-50 flex-shrink-0">{icon}</div>
    <div>
      <h3 className="font-bold text-gray-900">{title}</h3>
      {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
    </div>
  </div>
)

// ── Main component ────────────────────────────────────────────────────────────
const Registracia = ({ location }: Props) => {
  const [searchParams] = useSearchParams()
  const { addRegistration } = useCourseData()

  const kurzParam = searchParams.get('kurz') || 'B'
  const allowedCourses = COURSE_OPTIONS[location].map(o => o.value)
  const initialCourse = allowedCourses.includes(kurzParam) ? kurzParam : 'B'
  const [form, setForm] = useState<FormState>({ ...BLANK, courseType: initialCourse, podpisVMeste: location })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)
  /** Dátum podpisu pri odoslaní — rovnaký pri opakovanom stiahnutí PDF */
  const [submittedPodpisDna, setSubmittedPodpisDna] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const allowed = COURSE_OPTIONS[location].map(o => o.value)
    setForm(prev => {
      if (allowed.includes(prev.courseType)) return prev
      const kurz = searchParams.get('kurz') || 'B'
      const next = allowed.includes(kurz) ? kurz : 'B'
      return { ...prev, courseType: next, podpisVMeste: location }
    })
  }, [location, searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n })
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    const required = ['email', 'phone', 'meno', 'priezvisko', 'rodnePriezvisko',
      'datumNarodenia', 'miestoNarodenia', 'rodneCislo', 'ulica', 'mesto', 'psc', 'podpisVMeste']
    required.forEach(f => {
      if (!form[f as keyof FormState]) errs[f] = 'Povinné pole'
    })
    if (form.isMinor) {
      if (!form.zakonnyZastupcaMeno)        errs.zakonnyZastupcaMeno        = 'Povinné'
      if (!form.zakonnyZastupcaPriezvisko)  errs.zakonnyZastupcaPriezvisko  = 'Povinné'
      if (!form.zakonnyZastupcaRodneCislo)  errs.zakonnyZastupcaRodneCislo  = 'Povinné'
    }
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); window.scrollTo({ top: 0, behavior: 'smooth' }); return }

    setSubmitting(true)
    const podpisDna = new Date().toLocaleDateString('sk-SK')
    try {
      await addRegistration({
        email: form.email,
        phone: form.phone,
        location,
        courseType: form.courseType,
        hasFirstAid: form.hasFirstAid,
        firstAidDate: form.firstAidDate || undefined,
        preferredStartDate: form.preferredStartDate || undefined,
        notes: form.notes || undefined,
        meno: form.meno,
        priezvisko: form.priezvisko,
        rodnePriezvisko: form.rodnePriezvisko,
        datumNarodenia: form.datumNarodenia,
        miestoNarodenia: form.miestoNarodenia,
        rodneCislo: form.rodneCislo,
        ulica: form.ulica,
        mesto: form.mesto,
        psc: form.psc,
        drzitelSkupiny: form.drzitelSkupiny,
        drzitelPreukazu: form.drzitelPreukazu,
        ziadamSkupiny: form.courseType,
        zakladNa: form.zakladNa,
        podpisVMeste: form.podpisVMeste,
        podpisDna,
        isMinor: form.isMinor,
        zakonnyZastupcaMeno:       form.isMinor ? form.zakonnyZastupcaMeno       : undefined,
        zakonnyZastupcaPriezvisko: form.isMinor ? form.zakonnyZastupcaPriezvisko : undefined,
        zakonnyZastupcaRodneCislo: form.isMinor ? form.zakonnyZastupcaRodneCislo : undefined,
        zakonnyZastupcaSkupina:    form.isMinor ? form.zakonnyZastupcaSkupina    : undefined,
      })
      try {
        const reg = formToPdfRegistration(form, location, podpisDna)
        const blob = await fillZiadostPDF(reg)
        triggerPdfDownload(blob, form.priezvisko)
      } catch (pdfErr) {
        console.error('PDF generation failed:', pdfErr)
      }
      setSubmittedPodpisDna(podpisDna)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Nastala chyba pri odosielaní. Skúste to znova.'
      setErrors({ submit: msg })
    } finally {
      setSubmitting(false)
    }
  }

  const baseHref = location === 'Malacky' ? '/malacky' : '/bratislava'
  const accent = '#00AEEF'

  const handleDownloadPdfAgain = async () => {
    setPdfLoading(true)
    try {
      const podpisDna = submittedPodpisDna ?? new Date().toLocaleDateString('sk-SK')
      const reg = formToPdfRegistration(form, location, podpisDna)
      const blob = await fillZiadostPDF(reg)
      triggerPdfDownload(blob, form.priezvisko)
    } catch (e) {
      console.error(e)
      alert('Nepodarilo sa vygenerovať PDF. Skúste znova.')
    } finally {
      setPdfLoading(false)
    }
  }

  // ── Success screen ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-8 sm:p-10 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl"
            style={{ backgroundColor: '#e0f7ff' }}>✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Prihlásenie odoslané!</h2>
          <p className="text-gray-500 text-sm mb-2">
            Vaša žiadosť o kurz <strong>{form.courseType}</strong> v <strong>{location}</strong> bola úspešne odoslaná.
          </p>
          <p className="text-gray-400 text-xs mb-6">
            Budeme Vás kontaktovať na <strong>{form.email}</strong> alebo telefonicky s ďalšími informáciami k kurzu.
          </p>

          <div
            className="mb-6 text-left rounded-2xl overflow-hidden ring-2 ring-amber-400/90 border border-amber-500 shadow-md"
          >
            <div className="bg-amber-500 px-3 py-2 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/95 text-amber-600 shrink-0" aria-hidden>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-white font-extrabold text-xs sm:text-sm uppercase tracking-wide">Povinné</span>
            </div>
            <p className="px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base font-bold text-gray-900 leading-snug bg-amber-50/90 text-balance">
              Potvrdenie od lekára musí obsahovať{' '}
              <span className="text-amber-800 underline decoration-amber-500 decoration-2 underline-offset-2">5 pečiatok</span> a{' '}
              <span className="text-amber-800 underline decoration-amber-500 decoration-2 underline-offset-2">5 podpisov</span>
            </p>
            <div className="bg-rose-600 px-3 sm:px-4 py-2.5 flex items-center justify-center gap-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/95 text-rose-600 shrink-0" aria-hidden>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </span>
              <p className="text-white font-extrabold text-xs sm:text-sm uppercase tracking-wide text-balance">
                Čestné vyhlásenie <span className="underline decoration-white/90 decoration-2 underline-offset-2">nevyplňať</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              disabled={pdfLoading}
              onClick={handleDownloadPdfAgain}
              className="w-full px-8 py-3 rounded-xl border-2 font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ borderColor: accent, color: accent }}
            >
              {pdfLoading ? 'Pripravujem PDF…' : 'Stiahnuť PDF formulár'}
            </button>
            <Link to={`${baseHref}/kurzy`}
              className="inline-block px-8 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: accent }}>
              Späť na kurzy
            </Link>
            <Link
              to={`${baseHref}/dokumenty`}
              className="text-sm text-amber-700 font-semibold hover:underline"
            >
              Viac o dokumentoch a vzore potvrdenia →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const hasErrors = Object.keys(errors).length > 0
  const courses = COURSE_OPTIONS[location]

  const err = (f: string) => errors[f]
    ? <p className="text-xs text-red-500 mt-1">{errors[f]}</p>
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">

        {/* Page header */}
        <div className="mb-8">
          <Link to={`${baseHref}/kurzy`}
            className="inline-flex items-center gap-1.5 text-sm font-medium mb-5 hover:opacity-80 transition-opacity"
            style={{ color: accent }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Späť na kurzy
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-inter mb-2">
            Prihlásiť sa na kurz
          </h1>
          <p className="text-gray-500 text-sm">
            Autoškola Zvyky · {location} — Vyplňte formulár podľa Žiadosti o udelenie vodičského oprávnenia
          </p>
        </div>

        {/* Error banner */}
        {hasErrors && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <span className="text-red-500 text-lg mt-0.5">⚠</span>
            <div>
              <p className="text-sm font-semibold text-red-700">Prosím, vyplňte všetky povinné polia.</p>
              <p className="text-xs text-red-500 mt-0.5">Polia označené * sú povinné.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          {/* ── 1. Kontaktné údaje ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <SectionTitle icon="📋" title="Kontaktné údaje a výber kurzu" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  E-mail<span className="text-red-500 ml-0.5">*</span>
                </label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required
                  placeholder="vas@email.sk"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white" />
                {err('email')}
              </div>
              <Input label="Telefón" name="phone" value={form.phone} onChange={handleChange}
                required type="tel" placeholder="0900 000 000" />
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Kurz<span className="text-red-500 ml-0.5">*</span>
                </label>
                <select name="courseType" value={form.courseType} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white">
                  {courses.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ── 2. Osobné údaje (PDF žiadosť) ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <SectionTitle icon="🪪" title="Osobné údaje"
              subtitle="Podľa Žiadosti o udelenie vodičského oprávnenia" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input label="Meno" name="meno" value={form.meno} onChange={handleChange} required />
                {err('meno')}
              </div>
              <div>
                <Input label="Priezvisko" name="priezvisko" value={form.priezvisko} onChange={handleChange} required />
                {err('priezvisko')}
              </div>
              <div className="sm:col-span-2">
                <Input label="Rodné priezvisko" name="rodnePriezvisko" value={form.rodnePriezvisko}
                  onChange={handleChange} required />
                {err('rodnePriezvisko')}
              </div>
              <div>
                <Input label="Dátum narodenia" name="datumNarodenia" value={form.datumNarodenia}
                  onChange={handleChange} required type="date" />
                {err('datumNarodenia')}
              </div>
              <div>
                <Input label="Miesto narodenia" name="miestoNarodenia" value={form.miestoNarodenia}
                  onChange={handleChange} required />
                {err('miestoNarodenia')}
              </div>
              <div className="sm:col-span-2">
                <Input label="Rodné číslo" name="rodneCislo" value={form.rodneCislo}
                  onChange={handleChange} required placeholder="XXXXXXYYYYY" />
                {err('rodneCislo')}
              </div>
            </div>
          </div>

          {/* ── 3. Adresa ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <SectionTitle icon="🏠" title="Adresa trvalého pobytu" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Input label="Ulica a číslo" name="ulica" value={form.ulica}
                  onChange={handleChange} required placeholder="Hlavná 5" />
                {err('ulica')}
              </div>
              <div>
                <Input label="Mesto / obec" name="mesto" value={form.mesto}
                  onChange={handleChange} required placeholder="Malacky" />
                {err('mesto')}
              </div>
              <div>
                <Input label="PSČ" name="psc" value={form.psc}
                  onChange={handleChange} required placeholder="90101" />
                {err('psc')}
              </div>
            </div>
          </div>

          {/* ── 4. Vodičský preukaz ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <SectionTitle icon="🚗" title="Vodičský preukaz" subtitle="Vyplňte len ak ste držiteľom (voliteľné)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Som držiteľom oprávnenia skupiny" name="drzitelSkupiny"
                value={form.drzitelSkupiny} onChange={handleChange} placeholder="napr. AM, B1..." />
              <Input label="Číslo preukazu a štát vydania" name="drzitelPreukazu"
                value={form.drzitelPreukazu} onChange={handleChange} placeholder="napr. AB123456 – SK" />
            </div>
          </div>

          {/* ── 5. Typ žiadosti ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <SectionTitle icon="📝" title="Základ žiadosti" subtitle="Na základe čoho žiadate o oprávnenie" />
            <div className="space-y-3">
              {[
                { key: 'kurzSkuska',     label: 'Vodičský kurz a skúška z odbornej spôsobilosti' },
                { key: 'osobitnaSkuska', label: 'Osobitná skúška' },
                { key: 'osobitnyVycvik', label: 'Osobitný výcvik' },
              ].map(opt => (
                <label key={opt.key}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    form.zakladNa === opt.key
                      ? 'border-sky-400 bg-sky-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  <input type="radio" name="zakladNa" value={opt.key}
                    checked={form.zakladNa === opt.key} onChange={handleChange}
                    className="accent-sky-500 w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-800">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ── 6. Zákonný zástupca ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <SectionTitle icon="👨‍👧" title="Zákonný zástupca"
                subtitle="Len ak žiadateľ nedosiahol 18 rokov" />
            </div>
            <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-sky-300 transition-all mb-4">
              <input type="checkbox" name="isMinor" checked={form.isMinor} onChange={handleChange}
                className="accent-sky-500 w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-800">Žiadateľ má menej ako 18 rokov</span>
            </label>
            {form.isMinor && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div>
                  <Input label="Meno zákonného zástupcu" name="zakonnyZastupcaMeno"
                    value={form.zakonnyZastupcaMeno} onChange={handleChange} required />
                  {err('zakonnyZastupcaMeno')}
                </div>
                <div>
                  <Input label="Priezvisko zákonného zástupcu" name="zakonnyZastupcaPriezvisko"
                    value={form.zakonnyZastupcaPriezvisko} onChange={handleChange} required />
                  {err('zakonnyZastupcaPriezvisko')}
                </div>
                <div>
                  <Input label="Rodné číslo zákonného zástupcu" name="zakonnyZastupcaRodneCislo"
                    value={form.zakonnyZastupcaRodneCislo} onChange={handleChange} required />
                  {err('zakonnyZastupcaRodneCislo')}
                </div>
                <Input label="Súhlas s udelením skupiny" name="zakonnyZastupcaSkupina"
                  value={form.zakonnyZastupcaSkupina} onChange={handleChange}
                  placeholder="napr. B" />
              </div>
            )}
          </div>

          {/* ── 7. Ďalšie informácie ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <SectionTitle icon="ℹ️" title="Ďalšie informácie" subtitle="Voliteľné" />
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-sky-300 transition-all">
                <input type="checkbox" name="hasFirstAid" checked={form.hasFirstAid} onChange={handleChange}
                  className="accent-sky-500 w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">Mám platný kurz prvej pomoci</span>
              </label>
              {form.hasFirstAid && (
                <Input label="Dátum kurzu prvej pomoci" name="firstAidDate" value={form.firstAidDate}
                  onChange={handleChange} type="date" />
              )}
              <Input label="Preferovaný termín začiatku kurzu" name="preferredStartDate"
                value={form.preferredStartDate} onChange={handleChange} type="date" />
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Poznámky</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
                  placeholder="Prípadné otázky alebo poznámky..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white resize-none" />
              </div>
            </div>
          </div>

          {/* ── 8. Miesto podpisu ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <SectionTitle icon="✍️" title="Miesto odovzdania žiadosti" />
            <div>
              <Input label="Mesto / obec" name="podpisVMeste" value={form.podpisVMeste}
                onChange={handleChange} required placeholder="Malacky" />
              {err('podpisVMeste')}
            </div>
          </div>

          {/* ── GDPR notice ── */}
          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 text-xs text-sky-700 leading-relaxed">
            <strong>Ochrana osobných údajov:</strong> Vaše osobné údaje sú spracúvané výlučne za účelom prihlásenia
            na vodičský kurz v súlade s GDPR. Údaje nebudú poskytnuté tretím stranám. Odoslaním registrácie
            súhlasíte so spracovaním osobných údajov.
          </div>

          {/* ── Submit error ── */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-red-500 text-lg mt-0.5">⚠</span>
              <p className="text-sm font-semibold text-red-700">{errors.submit}</p>
            </div>
          )}

          {/* ── Submit ── */}
          <button type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all hover:opacity-90 shadow-lg active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: accent }}>
            {submitting ? 'Odosielam…' : 'Odoslať prihlášku →'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Registracia

