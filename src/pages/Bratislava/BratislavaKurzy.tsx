import { Link } from 'react-router-dom'
import { useCourseData } from '../../context/CourseDataContext'

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' })

const courseColors: Record<string, string> = {
  B: '#00AEEF',
}

const courseDetailLinks: Record<string, string> = {
  B: '/bratislava/kurzy/b',
}

const BratislavaKurzy = () => {
  const { prices, dates } = useCourseData()

  // Active upcoming dates for Bratislava, sorted by date
  const upcomingDates = dates
    .filter(d => d.location === 'Bratislava' && d.isActive)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 md:mb-12 font-inter">NAŠE KURZY</h1>
        
        {/* Featured Course - B Card - Horizontal Layout */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all border-2 border-zvyky-blue/10">
            <div className="md:flex">
              {/* Image Section */}
              <div className="md:w-2/5 h-64 md:h-auto bg-gray-300 overflow-hidden">
                <img 
                  src="/images/B_picture.JPG" 
                  alt="B Kurz" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content Section */}
              <div className="md:w-3/5 p-8 lg:p-10">
                <div className="flex items-start gap-3 mb-4">
                  <h2 className="text-5xl md:text-6xl font-extrabold text-zvyky-blue font-inter">B</h2>
                  <span className="bg-zvyky-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mt-2">Najpopulárnejší</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 font-inter text-gray-800">Osobné vozidlo do 3,5 t.</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Cena nezahŕňa správny poplatok za skúšku (kolok 50€) a poplatok za kurz prvej pomoci
                </p>

                {/* Welcome Price Offer */}
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-3 sm:p-4 text-white shadow-lg relative overflow-hidden">
                    {/* Mobile: Stacked Layout */}
                    <div className="flex flex-col sm:hidden gap-2 text-center">
                      <span className="text-xs font-bold uppercase opacity-90">⚡ Limitovaná ponuka</span>
                      <h3 className="text-base font-bold uppercase">Uvítacia cena</h3>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <div className="text-lg font-bold line-through opacity-75">{prices.bratislava_B_standard} €</div>
                        <div className="text-2xl font-extrabold">{prices.bratislava_B_welcome} €</div>
                      </div>
                    </div>
                    
                    {/* Desktop: Horizontal Layout */}
                    <div className="hidden sm:flex items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase mb-1 opacity-90">⚡ Limitovaná ponuka</span>
                        <h3 className="text-lg font-bold uppercase">Uvítacia cena</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-xl font-bold line-through opacity-75">{prices.bratislava_B_standard} €</div>
                        <div className="text-3xl font-extrabold">{prices.bratislava_B_welcome} €</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Link
                    to="/bratislava/kurzy/b"
                    className="flex-1 bg-zvyky-blue hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all font-semibold uppercase text-sm font-albert shadow-lg hover:shadow-xl text-center block"
                  >
                    Viac informácií
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Kondičné jazdy */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
            <div className="h-48 bg-gray-300 overflow-hidden relative">
              <img 
                src="/images/KondičneJ_photo.JPG" 
                alt="Kondičné jazdy" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-extrabold mb-2 font-inter">Kondičné jazdy</h2>
              <p className="text-sm font-bold mb-3 font-inter">Pre držiteľa vodičského oprávnenia B (60min)</p>
              <div className="flex-grow"></div>
              <div className="flex gap-2 mb-3">
                <Link
                  to="/bratislava/kontakt"
                  className="border-2 border-zvyky-blue text-zvyky-blue hover:bg-zvyky-blue hover:text-white px-3 py-1 rounded-lg transition-all font-semibold uppercase text-xs font-albert inline-block"
                >
                  Viac informácií
                </Link>
              </div>
              <div className="text-2xl font-bold text-black">{prices.bratislava_kondicne} €</div>
            </div>
          </div>

          {/* Osobitný výcvik */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
            <div className="h-48 bg-gray-300 overflow-hidden">
              <img 
                src="/images/B_picture.JPG" 
                alt="Osobitný výcvik" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-extrabold mb-2 font-inter">Osobitný výcvik</h2>
              <h3 className="text-sm font-bold mb-3 font-inter">Osobitný prístup</h3>
              <p className="text-gray-600 mb-4 text-xs leading-relaxed flex-grow">
              Cena nezahŕňa správny poplatok za skúšku (kolok 50€) a poplatok za kurz prvej pomoci
              </p>
              <div className="flex gap-2 mb-3">
                <Link
                  to="/bratislava/kontakt"
                  className="border-2 border-zvyky-blue text-zvyky-blue hover:bg-zvyky-blue hover:text-white px-3 py-1 rounded-lg transition-all font-semibold uppercase text-xs font-albert inline-block"
                >
                  Viac informácií
                </Link>
              </div>
              <div className="text-2xl font-bold text-black">{prices.bratislava_osobitny} €</div>
            </div>
          </div>
        </div>

        {/* ── Upcoming Course Start Dates Section ── */}
        {upcomingDates.length > 0 && (
          <div className="max-w-5xl mx-auto mt-20">
            {/* Section header */}
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black font-inter">
                Najbližšie začiatky kurzov
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcomingDates.map(d => (
                <div
                  key={d.id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Coloured top bar */}
                  <div className="h-1.5 w-full" style={{ backgroundColor: courseColors[d.courseType] ?? '#00AEEF' }} />

                  <div className="p-5">
                    {/* Course badge + label */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-extrabold text-base flex-shrink-0"
                        style={{ backgroundColor: courseColors[d.courseType] ?? '#00AEEF' }}
                      >
                        {d.courseType}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm leading-tight">
                          Kurz {d.courseType}
                        </p>
                        {d.description && (
                          <p className="text-xs text-gray-400 mt-0.5">{d.description}</p>
                        )}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        style={{ color: courseColors[d.courseType] ?? '#00AEEF' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-700">
                        {formatDate(d.startDate)}
                      </span>
                    </div>

                    {/* CTAs */}
                    <div className="mt-4 flex gap-2">
                      <Link
                        to={courseDetailLinks[d.courseType] ?? '/bratislava/kurzy'}
                        className="flex-1 text-center block text-xs font-semibold uppercase py-2.5 rounded-xl border-2 transition-all hover:text-white"
                        style={{ borderColor: courseColors[d.courseType] ?? '#00AEEF', color: courseColors[d.courseType] ?? '#00AEEF' }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLElement
                          el.style.backgroundColor = courseColors[d.courseType] ?? '#00AEEF'
                          el.style.color = '#fff'
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLElement
                          el.style.backgroundColor = 'transparent'
                          el.style.color = courseColors[d.courseType] ?? '#00AEEF'
                        }}
                      >
                        Info
                      </Link>
                      <Link
                        to={`/bratislava/registracia?kurz=${d.courseType}`}
                        className="flex-1 text-center block text-xs font-semibold uppercase py-2.5 rounded-xl text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: courseColors[d.courseType] ?? '#00AEEF' }}
                      >
                        Prihlásiť
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BratislavaKurzy
