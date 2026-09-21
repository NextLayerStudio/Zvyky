import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { CONSENT_KEY, COOKIE_CONSENT_EVENT } from '../utils/cookieConsent'

type CookiePreferences = {
  necessary: true
  analytics: boolean
  marketing: boolean
}

const saveConsent = (preferences: CookiePreferences) => {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(preferences))
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT))
}

const CookieConsent = () => {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  const isBratislava = location.pathname.startsWith('/bratislava')
  const hasLocation = location.pathname.startsWith('/bratislava') || location.pathname.startsWith('/malacky')
  const basePath = isBratislava ? '/bratislava' : '/malacky'
  const cookiesPath = hasLocation ? `${basePath}/cookies` : '/malacky/cookies'
  const gdprPath = hasLocation ? `${basePath}/gdpr` : '/malacky/gdpr'

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const close = (preferences: CookiePreferences) => {
    saveConsent(preferences)
    setVisible(false)
  }

  const rejectAll = () => {
    close({ necessary: true, analytics: false, marketing: false })
  }

  const acceptAll = () => {
    close({ necessary: true, analytics: true, marketing: true })
  }

  const saveSettings = () => {
    close({ necessary: true, analytics, marketing })
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
      role="dialog"
      aria-label="Súhlas s cookies"
      aria-modal="true"
    >
      <div className="container mx-auto max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8 font-inter">
        <h2 className="text-lg sm:text-xl font-bold text-black mb-3">
          Tento web používa cookies
        </h2>

        {!showSettings ? (
          <>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">
              Nevyhnutné cookies používame na chod webu. So súhlasom použijeme aj analytické
              a marketingové cookies, aby sme web zlepšovali a ukazovali relevantnejší obsah.
              Viac v{' '}
              <Link to={cookiesPath} className="text-zvyky-blue hover:text-teal-600 font-semibold">
                zásadách cookies
              </Link>{' '}
              a{' '}
              <Link to={gdprPath} className="text-zvyky-blue hover:text-teal-600 font-semibold">
                GDPR
              </Link>
              .
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={rejectAll}
                className="order-2 sm:order-1 px-6 py-2.5 border-2 border-gray-300 text-black font-semibold rounded-full hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Odmietnuť
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="order-1 sm:order-2 px-6 py-2.5 bg-zvyky-blue hover:bg-teal-600 text-white font-semibold rounded-full transition-colors text-sm sm:text-base"
              >
                Prijať všetko
              </button>
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="order-3 sm:ml-auto text-black font-semibold hover:text-zvyky-blue transition-colors text-sm sm:text-base py-2.5"
              >
                Nastavenia
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm sm:text-base text-gray-600 mb-5">
              Vyberte, ktoré cookies chcete povoliť. Nevyhnutné cookies sú vždy aktívne.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-black text-sm sm:text-base">Nevyhnutné</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                    Potrebné na základné fungovanie stránky.
                  </p>
                </div>
                <span className="text-xs font-semibold text-gray-500 uppercase shrink-0">Vždy aktívne</span>
              </div>

              <label className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer">
                <div>
                  <p className="font-semibold text-black text-sm sm:text-base">Analytické</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                    Pomáhajú nám pochopiť, ako návštevníci používajú web.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="w-5 h-5 accent-zvyky-blue shrink-0"
                />
              </label>

              <label className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer">
                <div>
                  <p className="font-semibold text-black text-sm sm:text-base">Marketingové</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                    Používajú sa na meranie efektivity reklám.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="w-5 h-5 accent-zvyky-blue shrink-0"
                />
              </label>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="px-6 py-2.5 border-2 border-gray-300 text-black font-semibold rounded-full hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Späť
              </button>
              <button
                type="button"
                onClick={saveSettings}
                className="px-6 py-2.5 bg-zvyky-blue hover:bg-teal-600 text-white font-semibold rounded-full transition-colors text-sm sm:text-base"
              >
                Uložiť nastavenia
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CookieConsent
