const DOKLADY = [
  'vysvedčenie o nižšom strednom vzdelaní',
  'vysvedčenie zo strednej školy',
  'vysokoškolský diplom',
  'potvrdenie o štúdiu na strednej alebo vysokej škole',
] as const

type Variant = 'card' | 'compact'

const VzdelanieNotice = ({ variant = 'card' }: { variant?: Variant }) => {
  if (variant === 'compact') {
    return (
      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-left">
        <p className="text-sm font-bold text-sky-900 mb-1.5">
          Kurz B — doklad o vzdelaní
        </p>
        <p className="text-xs sm:text-sm text-sky-800 leading-relaxed">
          Do kurzu skupiny B ťa môžeme zaradiť len s <strong>najmenej nižším stredným vzdelaním</strong>.
          Pred začiatkom kurzu nám ukáž vysvedčenie, diplom alebo potvrdenie o štúdiu.
          Bez dokladu ťa do kurzu <strong>nezaradíme</strong>. Za pravdivosť dokladu zodpovedáš ty.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-sky-100 overflow-hidden text-left">
      <div className="bg-zvyky-blue px-5 py-3 flex items-center gap-2.5">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/95 text-zvyky-blue shrink-0" aria-hidden>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        </span>
        <p className="text-white font-extrabold text-sm sm:text-base uppercase tracking-wide">
          Kurz B — doklad o vzdelaní
        </p>
      </div>
      <div className="p-5 sm:p-6 space-y-3">
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          Do kurzu skupiny B ťa môžeme zaradiť len ak máš najmenej{' '}
          <strong className="text-gray-900">nižšie stredné vzdelanie</strong>.
          Pred začiatkom kurzu nám predlož jeden z týchto dokladov:
        </p>
        <ul className="space-y-1.5 text-sm text-gray-700">
          {DOKLADY.map(item => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-zvyky-blue font-bold mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm sm:text-base text-gray-800 font-semibold leading-snug">
          Bez dokladu ťa do kurzu nezaradíme. Za pravdivosť dokladu zodpovedáš ty.
        </p>
        <p className="text-[11px] text-gray-400 leading-relaxed">
          Podľa § 16 ods. 3 písm. b) zákona č. 245/2008 Z. z. a § 2b ods. 2 zákona č. 93/2005 Z. z.
        </p>
      </div>
    </div>
  )
}

export default VzdelanieNotice
