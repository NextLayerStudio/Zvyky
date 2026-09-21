export const CONSENT_KEY = 'zvyky_cookie_consent'

/** Fired once the visitor answers the cookie bar, so other bottom-pinned notices can appear. */
export const COOKIE_CONSENT_EVENT = 'zvyky:cookie-consent'

export const hasCookieConsent = () => localStorage.getItem(CONSENT_KEY) !== null
