import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { COOKIE_CONSENT_EVENT, hasCookieConsent } from '../utils/cookieConsent'

const DISMISSED_KEY = 'zvyky_hiring_notice_v1'

const HiringBanner = () => {
  const location = useLocation()
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(DISMISSED_KEY) === '1')
  const [cookiesDone, setCookiesDone] = useState(hasCookieConsent)

  useEffect(() => {
    const onConsent = () => setCookiesDone(true)
    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent)
  }, [])

  const close = () => {
    localStorage.setItem(DISMISSED_KEY, '1')
    setDismissed(true)
  }

  if (dismissed) return null
  if (location.pathname.startsWith('/admin') || location.pathname === '/tree') return null

  const kontaktPath = location.pathname.startsWith('/bratislava')
    ? '/bratislava/kontakt'
    : '/malacky/kontakt'

  return (
    <div
      className={`fixed z-40 pointer-events-none right-3 sm:right-4 left-auto w-[min(calc(100%-1.5rem),23rem)] ${
        cookiesDone ? 'bottom-4 sm:bottom-5' : 'bottom-36 sm:bottom-40'
      }`}
    >
      <div
        role="status"
        className="pointer-events-auto relative flex items-center gap-3.5 rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg ring-1 ring-zvyky-blue/20 border border-zvyky-blue/15 pl-3.5 pr-10 py-3.5 sm:py-4"
      >
        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-zvyky-blue text-white shrink-0"
          aria-hidden
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v1m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm sm:text-[15px] font-bold text-gray-900 leading-tight">
            Hľadáme nového lektora
          </p>
          <Link
            to={kontaktPath}
            className="text-xs sm:text-[13px] font-semibold text-zvyky-blue hover:underline"
          >
            Ozvi sa nám →
          </Link>
        </div>

        <button
          type="button"
          onClick={close}
          aria-label="Zavrieť oznam"
          className="absolute top-1 right-1 p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default HiringBanner
