import { Link } from 'react-router-dom'
import { useCourseData } from '../../context/CourseDataContext'
import VzdelanieNotice from '../../components/VzdelanieNotice'

const KurzBDetail = () => {
  const { prices } = useCourseData()
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 max-w-5xl">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 font-inter">Kurz B</h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-4xl leading-relaxed mb-8">
              Štandardný kurz skupiny B obsahuje teoretickú prípravu a praktické jazdy.
            </p>
            
            {/* Key Info Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-zvyky-blue">
                <div className="text-sm font-semibold uppercase tracking-wide mb-2 text-gray-600">Teória</div>
                <div className="text-3xl md:text-4xl font-bold text-black">32 hodín</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="text-sm font-semibold uppercase tracking-wide mb-2 text-gray-600">Prax</div>
                <div className="text-3xl md:text-4xl font-bold text-black">38 hodín</div>
              </div>
              <div className="bg-gradient-to-br from-zvyky-blue to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="text-sm font-semibold uppercase tracking-wide mb-2 text-white/90">Cena</div>
                <div className="text-3xl md:text-4xl font-bold">{prices.malacky_B_standard} €</div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 md:mb-12 font-inter">Podrobnosti kurzu</h2>
          
          {/* Introduction */}
          <div className="space-y-6 mb-12">
            <p className="text-xl md:text-2xl font-semibold text-gray-800">
              Chceš vodičák na auto zvládnuť pokojne a bez zbytočného stresu?
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Štandardný kurz skupiny B obsahuje teoretickú prípravu, praktické jazdy aj kurz prvej pomoci. Všetko potrebné máš zahrnuté v cene. Naši skúsení inštruktori ťa prevedú každým krokom tak, aby si sa na skúšku pripravil optimálne a bez obáv.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Náš kurz ťa pripraví na získanie vodičského oprávnenia skupiny B, ktoré ti umožní riadiť osobné vozidlá do 3,5 tony.
            </p>
          </div>

          {/* Vehicle Categories */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-4 font-inter">Pre ktoré vozidlá získavaš oprávnenie</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-zvyky-blue font-bold mt-1">•</span>
                <span><strong className="text-black">BI</strong> - ťažké štvorkolky (L7e)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-zvyky-blue font-bold mt-1">•</span>
                <span><strong className="text-black">B</strong> - osobné vozidlá do 3,5 t</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-zvyky-blue font-bold mt-1">•</span>
                <span><strong className="text-black">AM</strong> - malé motocykle do 50 cm³</span>
              </li>
            </ul>
          </div>

          {/* Phase 1: Theoretical Preparation */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-2 font-inter">1. fáza: Teoretická príprava</h3>
            <p className="text-sm text-gray-600 mb-6">(spolu 32 hodín)</p>
            <p className="text-sm text-gray-600 mb-6 italic">(1 vyučovacia hodina = 45 minút)</p>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <ul className="space-y-4">
                <li className="flex justify-between items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <span className="text-gray-700 flex-1">Predpisy o cestnej premávke</span>
                  <span className="font-bold text-black text-right">20 hod.</span>
                </li>
                <li className="flex justify-between items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <span className="text-gray-700 flex-1">Náuka o vozidlách a údržba</span>
                  <span className="font-bold text-black text-right">2 hod.</span>
                </li>
                <li className="flex justify-between items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <span className="text-gray-700 flex-1">Teória vedenia vozidla</span>
                  <span className="font-bold text-black text-right">3 hod.</span>
                </li>
                <li className="flex justify-between items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <span className="text-gray-700 flex-1">Zásady bezpečnej jazdy</span>
                  <span className="font-bold text-black text-right">4 hod.</span>
                </li>
                <li className="flex justify-between items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <span className="text-gray-700 flex-1">Opakovanie a súhrn</span>
                  <span className="font-bold text-black text-right">3 hod.</span>
                </li>
                <li className="flex justify-between items-start gap-4 pt-4 border-t-2 border-zvyky-blue">
                  <span className="text-gray-900 font-bold flex-1">Spolu</span>
                  <span className="font-bold text-zvyky-blue text-xl text-right">32 hodín</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Phase 2: Practical Training */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-2 font-inter">2. fáza: Praktický výcvik</h3>
            <p className="text-sm text-gray-600 mb-6">(spolu 38 hodín / 1710 minút)</p>
            
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
              Praktické jazdy absolvuješ na našich vozidlách z vozového parku.
            </p>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <ul className="space-y-4">
                <li className="flex justify-between items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <span className="text-gray-700 flex-1">Cvičisko</span>
                  <span className="font-bold text-black text-right">4 hod.</span>
                </li>
                <li className="flex justify-between items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <span className="text-gray-700 flex-1">Jazda v premávke</span>
                  <span className="font-bold text-black text-right">28 hod.</span>
                </li>
                <li className="flex justify-between items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <span className="text-gray-700 flex-1">Flexi čas na zdokonalenie</span>
                  <span className="font-bold text-black text-right">6 hod.</span>
                </li>
                <li className="flex justify-between items-start gap-4 pt-4 border-t-2 border-zvyky-blue">
                  <span className="text-gray-900 font-bold flex-1">Spolu</span>
                  <span className="font-bold text-zvyky-blue text-xl text-right">38 hodín</span>
                </li>
              </ul>
            </div>
          </div>

          {/* First Aid Course */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg p-6 md:p-8 mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-4 font-inter">Kurz prvej pomoci</h3>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Pred skúškou musíš absolvovať aj kurz prvej pomoci s ktorým ti radi pomôžeme.
            </p>
          </div>

          {/* Education requirement */}
          <div className="mb-12">
            <VzdelanieNotice />
          </div>

          {/* Administrative Fee */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl shadow-lg p-6 md:p-8 mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-4 font-inter">Správny poplatok (kolok)</h3>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              Správny poplatok (kolok) nie je zahrnutý v cene kurzu a hradíš ho na konci kurzu. Pre skupinu B je správny poplatok <strong className="text-black">50 €</strong>.
            </p>
            <p className="text-sm text-gray-600">
              * Správny poplatok sa môže meniť podľa aktuálnych predpisov
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Link
              to="/malacky/kontakt"
              className="bg-zvyky-blue hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-all font-semibold uppercase text-center font-albert shadow-lg hover:shadow-xl"
            >
              Prihlásiť sa na kurz
            </Link> */}
            <Link
              to="/malacky/kurzy"
              className="border-2 border-zvyky-blue text-zvyky-blue hover:bg-zvyky-blue hover:text-white px-8 py-4 rounded-xl transition-all font-semibold uppercase text-center font-albert"
            >
              Späť na kurzy
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default KurzBDetail

