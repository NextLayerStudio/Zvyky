import React, { createContext, useContext, useState, useEffect } from 'react'

/* Context pattern: types, constants, provider, and useCourseData hook in one module. */
/* eslint-disable react-refresh/only-export-components -- see above */
// ─── Price types ───────────────────────────────────────────────────────────────
export interface Prices {
  // Malacky
  malacky_B_standard: number
  malacky_B_friend:   number
  malacky_B_student:  number
  malacky_A1:         number
  malacky_A2:         number
  malacky_A:          number
  malacky_kondicne:   number
  malacky_osobitny:   number
  // Bratislava
  bratislava_B_standard: number
  bratislava_B_welcome:  number
  bratislava_kondicne:   number
  bratislava_osobitny:   number
}

export const DEFAULT_PRICES: Prices = {
  malacky_B_standard:    1111,
  malacky_B_friend:      1061,
  malacky_B_student:     1050,
  malacky_A1:             999,
  malacky_A2:             999,
  malacky_A:              999,
  malacky_kondicne:        45,
  malacky_osobitny:      1555,
  bratislava_B_standard: 1111,
  bratislava_B_welcome:   999,
  bratislava_kondicne:     45,
  bratislava_osobitny:   1555,
}

// ─── Course date types ─────────────────────────────────────────────────────────
export interface CourseDate {
  id:          string
  location:    string
  courseType:  string
  startDate:   string
  description: string
  isActive:    boolean
}

// ─── Registration types ────────────────────────────────────────────────────────
export interface Registration {
  id:            string
  email:         string
  phone:         string
  location:      string
  courseType:    string
  hasFirstAid:   boolean
  firstAidDate?: string
  preferredStartDate?: string
  notes?:        string
  status:        'pending' | 'approved' | 'rejected'
  createdAt:     string
  // PDF žiadosť fields
  meno:              string
  priezvisko:        string
  rodnePriezvisko:   string
  datumNarodenia:    string
  miestoNarodenia:   string
  rodneCislo:        string
  ulica:             string
  mesto:             string
  psc:               string
  drzitelSkupiny:    string
  drzitelPreukazu:   string
  ziadamSkupiny:     string
  zakladNa:          'kurzSkuska' | 'osobitnaSkuska' | 'osobitnyVycvik'
  /** Null for registrations made before this question was added to the form. */
  studujeNaSlovensku?: boolean | null
  podpisVMeste:      string
  podpisDna:         string
  isMinor:           boolean
  zakonnyZastupcaMeno?:       string
  zakonnyZastupcaPriezvisko?: string
  zakonnyZastupcaRodneCislo?: string
  zakonnyZastupcaSkupina?:    string
}

// ─── Auth helper ───────────────────────────────────────────────────────────────
function authHeader(): Record<string, string> {
  const token = localStorage.getItem('admin_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// ─── Context interface ─────────────────────────────────────────────────────────
interface CourseDataContextValue {
  prices:    Prices
  setPrices: (p: Prices) => Promise<void>

  dates:       CourseDate[]
  addDate:     (d: Omit<CourseDate, 'id'>) => Promise<void>
  updateDate:  (id: string, d: Partial<Omit<CourseDate, 'id'>>) => Promise<void>
  deleteDate:  (id: string) => Promise<void>

  registrations:            Registration[]
  addRegistration:          (r: Omit<Registration, 'id' | 'createdAt' | 'status'>) => Promise<void>
  updateRegistrationStatus: (id: string, status: Registration['status']) => Promise<void>
  refetchRegistrations:     () => Promise<void>

  loading: boolean
}

const CourseDataContext = createContext<CourseDataContextValue | null>(null)

// ─── Provider ──────────────────────────────────────────────────────────────────
export const CourseDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [prices,        setPricesState]        = useState<Prices>(DEFAULT_PRICES)
  const [dates,         setDatesState]         = useState<CourseDate[]>([])
  const [registrations, setRegistrationsState] = useState<Registration[]>([])
  const [loading,       setLoading]            = useState(true)

  // ── Fetch public data on mount ─────────────────────────────────────────────
  useEffect(() => {
    Promise.all([
      fetch('/api/prices').then(r => r.json()).catch(() => DEFAULT_PRICES),
      fetch('/api/dates').then(r => r.json()).catch(() => []),
    ])
      .then(([pricesData, datesData]: [Partial<Prices>, unknown]) => {
        setPricesState({ ...DEFAULT_PRICES, ...(pricesData as Prices) })
        setDatesState(Array.isArray(datesData) ? datesData : [])
      })
      .finally(() => setLoading(false))
  }, [])

  // ── Registrations (admin only) ─────────────────────────────────────────────
  const refetchRegistrations = async () => {
    try {
      const res = await fetch('/api/registrations', { headers: authHeader() })
      if (res.ok) {
        const data = (await res.json()) as Registration[]
        setRegistrationsState(data)
      }
    } catch (err) {
      console.error('Failed to fetch registrations:', err)
    }
  }

  // ── Prices ─────────────────────────────────────────────────────────────────
  const setPrices = async (p: Prices) => {
    setPricesState(p) // optimistic update
    const res = await fetch('/api/prices', {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body:    JSON.stringify(p),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({})) as { error?: string; detail?: string }
      throw new Error(body.detail ?? body.error ?? `Server error ${res.status}`)
    }
  }

  // ── Dates ──────────────────────────────────────────────────────────────────
  const addDate = async (d: Omit<CourseDate, 'id'>) => {
    const res = await fetch('/api/dates', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body:    JSON.stringify(d),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({})) as { error?: string; detail?: string }
      throw new Error(body.detail ?? body.error ?? `Server error ${res.status}`)
    }
    const newDate = (await res.json()) as CourseDate
    setDatesState(prev => [...prev, newDate])
  }

  const updateDate = async (id: string, d: Partial<Omit<CourseDate, 'id'>>) => {
    // Optimistic
    setDatesState(prev => prev.map(date => date.id === id ? { ...date, ...d } : date))
    const res = await fetch(`/api/dates/${id}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body:    JSON.stringify(d),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({})) as { error?: string; detail?: string }
      throw new Error(body.detail ?? body.error ?? `Server error ${res.status}`)
    }
  }

  const deleteDate = async (id: string) => {
    setDatesState(prev => prev.filter(d => d.id !== id)) // optimistic
    const res = await fetch(`/api/dates/${id}`, {
      method:  'DELETE',
      headers: authHeader(),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({})) as { error?: string; detail?: string }
      throw new Error(body.detail ?? body.error ?? `Server error ${res.status}`)
    }
  }

  // ── Registrations ──────────────────────────────────────────────────────────
  const addRegistration = async (r: Omit<Registration, 'id' | 'createdAt' | 'status'>) => {
    const podpisDna = r.podpisDna ?? new Date().toLocaleDateString('sk-SK')
    const res = await fetch('/api/registrations', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ ...r, podpisDna }),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({})) as { error?: string; detail?: string }
      throw new Error(body.detail ?? body.error ?? 'Registration failed')
    }
  }

  const updateRegistrationStatus = async (id: string, status: Registration['status']) => {
    // Optimistic
    setRegistrationsState(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    await fetch(`/api/registrations/${id}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body:    JSON.stringify({ status }),
    })
  }

  return (
    <CourseDataContext.Provider value={{
      prices,    setPrices,
      dates,     addDate, updateDate, deleteDate,
      registrations, addRegistration, updateRegistrationStatus, refetchRegistrations,
      loading,
    }}>
      {children}
    </CourseDataContext.Provider>
  )
}

export const useCourseData = () => {
  const ctx = useContext(CourseDataContext)
  if (!ctx) throw new Error('useCourseData must be used inside CourseDataProvider')
  return ctx
}
