import VzdelanieNotice from '../../components/VzdelanieNotice'

const MalackyDokumenty = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 font-inter text-center">DOKUMENTY</h1>
        <p className="text-center text-gray-600 text-lg mb-12 md:mb-16 max-w-3xl mx-auto">
          Stiahnite si potrebné tlačivá pre žiadosť o vodičské oprávnenie
        </p>
        
        {/* Download Section */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 border border-gray-100">
            <div className="p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Text Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block bg-zvyky-blue/10 rounded-full px-4 py-2 mb-4">
                  <span className="text-zvyky-blue font-semibold text-sm uppercase tracking-wide">Dôležité tlačivo</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 font-inter leading-tight">
                  Žiadosť o udelenie VO + Potvrdenie od lekára
                </h2>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-lg md:text-xl font-bold text-amber-600">
                    Nutné tlačiť obojstranne!
                  </p>
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  Strany 1 a 2 vytlačte obojstranne na jeden list papiera. 3. strana je len poučenie pre lekára.
                </p>
              </div>

              {/* Download Button */}
              <a 
                href="/images/zvyky_tlaciva.pdf" 
                download
                className="flex-shrink-0 bg-gradient-to-br from-zvyky-blue to-teal-600 hover:from-zvyky-blue hover:to-teal-700 text-white rounded-2xl p-8 md:p-10 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex flex-col items-center justify-center gap-3 min-w-[140px] md:min-w-[160px] group"
              >
                {/* Document Icon */}
                <svg 
                  className="w-14 h-14 md:w-16 md:h-16 group-hover:scale-110 transition-transform" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" 
                    clipRule="evenodd" 
                  />
                </svg>

                {/* Download Icon */}
                <svg 
                  className="w-12 h-12 md:w-14 md:h-14 group-hover:translate-y-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={3} 
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                  />
                </svg>

                <span className="text-sm font-bold uppercase tracking-wider">Stiahnuť</span>
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-gray-100">
              <div className="w-12 h-12 bg-zvyky-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-zvyky-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-black mb-2">PDF formát</h3>
              <p className="text-sm text-gray-600">Univerzálne čitateľný súbor</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-gray-100">
              <div className="w-12 h-12 bg-zvyky-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-zvyky-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </div>
              <h3 className="font-bold text-black mb-2">Obojstranná tlač</h3>
              <p className="text-sm text-gray-600">Strany 1 a 2 na jeden list</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-gray-100">
              <div className="w-12 h-12 bg-zvyky-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-zvyky-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-black mb-2">Aktuálny formulár</h3>
              <p className="text-sm text-gray-600">Platný pre rok 2026</p>
            </div>
          </div>

          <div className="mt-12 max-w-2xl mx-auto">
            <VzdelanieNotice />
          </div>

          {/* Potvrdenie od lekára — povinné požiadavky (výrazne zvýraznené) */}
          <div className="mt-16 flex justify-center px-1">
            <div
              className="w-full max-w-2xl rounded-3xl overflow-hidden text-center
                ring-4 ring-amber-400/80 shadow-2xl shadow-amber-900/15
                border-2 border-amber-500 bg-gradient-to-b from-amber-50 to-white"
            >
              <div className="bg-amber-500 px-4 py-3 sm:py-3.5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/95 text-amber-600 shadow-sm shrink-0" aria-hidden>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </span>
                <p className="text-white font-extrabold text-sm sm:text-base uppercase tracking-wide text-balance">
                  Povinné – skontrolujte pred odovzdaním
                </p>
              </div>
              <div className="p-4 sm:p-6 bg-amber-50/60">
                <img
                  src="/images/dokument.webp"
                  alt="Príklad: potvrdenie od lekára"
                  className="w-full h-auto max-h-[70vh] object-contain mx-auto rounded-lg ring-1 ring-amber-200/80 shadow-md"
                />
              </div>
              <div className="px-4 sm:px-8 py-6 sm:py-7 border-t-2 border-amber-200 bg-amber-100/50">
                <p className="text-gray-900 text-base sm:text-lg md:text-xl font-bold leading-snug text-balance">
                  Potvrdenie od lekára musí obsahovať <span className="text-amber-800 underline decoration-amber-500 decoration-2 underline-offset-2">5 pečiatok</span> a <span className="text-amber-800 underline decoration-amber-500 decoration-2 underline-offset-2">4 podpisy</span>
                </p>
              </div>
              <div className="bg-rose-600 px-4 py-3 sm:py-3.5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/95 text-rose-600 shadow-sm shrink-0" aria-hidden>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </span>
                <p className="text-white font-extrabold text-sm sm:text-base uppercase tracking-wide text-balance">
                  Čestné vyhlásenie <span className="underline decoration-white/90 decoration-2 underline-offset-2">nevyplňať</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MalackyDokumenty

