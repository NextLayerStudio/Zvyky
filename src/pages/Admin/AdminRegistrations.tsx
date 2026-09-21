import React, { useEffect } from 'react'
import AdminLayout from './components/AdminLayout'
import { useCourseData, Registration } from '../../context/CourseDataContext'
import { fillZiadostPDF } from '../../utils/fillZiadostPDF'
import { formatSkDate } from '../../utils/ziadostPdfCore'

const statusConfig = {
  pending:  { label: 'Čakajúce',   bg: 'bg-amber-100', text: 'text-amber-700',  dot: 'bg-amber-400' },
  approved: { label: 'Schválené',  bg: 'bg-green-100', text: 'text-green-700',  dot: 'bg-green-500' },
  rejected: { label: 'Zamietnuté', bg: 'bg-red-100',   text: 'text-red-700',    dot: 'bg-red-500'   },
}

// ── HTML print/PDF generator ──────────────────────────────────────────────────
const printZiadost = (r: Registration) => {
  const checked = (key: string) => r.zakladNa === key
    ? '<span style="font-weight:bold;">X</span>' : '&nbsp;'

  const v = (val: string | undefined) =>
    (val || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const html = `<!DOCTYPE html>
<html lang="sk">
<head>
  <meta charset="UTF-8">
  <title>Žiadosť – ${v(r.meno)} ${v(r.priezvisko)}</title>
  <style>
    @page { size: A4; margin: 2cm; }
    * { box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; font-size: 10pt; color: #000; margin: 0; padding: 0; }
    .police-box { border: 1px solid #bbb; padding: 8px; margin-bottom: 14px; background: #f7f7f7; }
    .police-note { font-size: 7.5pt; color: #555; font-style: italic; margin: 0 0 5px; }
    .police-row { display: flex; align-items: flex-end; gap: 8px; }
    .police-lbl { font-size: 8.5pt; white-space: nowrap; }
    .police-line { flex: 1; border-bottom: 1px solid #000; height: 16px; }
    h1 { text-align: center; font-size: 13pt; letter-spacing: 0.5px; margin: 0 0 3px; font-weight: bold; }
    .title-bar { border-bottom: 1.5px solid #333; margin: 0 25px 14px; }
    .sec-lbl { font-size: 7.5pt; color: #555; font-style: italic; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 12px; }
    .row2 { display: flex; gap: 18px; margin-bottom: 9px; }
    .col { flex: 1; }
    .field { margin-bottom: 9px; }
    .fl { font-size: 7.5pt; color: #555; margin-bottom: 2px; }
    .fv { font-size: 10pt; border-bottom: 1px solid #000; padding-bottom: 2px; min-height: 16px; }
    .na-lbl { font-size: 8.5pt; margin-bottom: 5px; }
    .cb-row { display: flex; align-items: center; gap: 7px; margin-bottom: 4px; }
    .cb { width: 12px; height: 12px; border: 1px solid #000; display: inline-flex; align-items: center; justify-content: center; font-size: 9pt; flex-shrink: 0; }
    .cb-lbl { font-size: 8.5pt; }
    .sign-row { display: flex; gap: 16px; margin-top: 18px; align-items: flex-end; }
    .sign-sm { flex: 1; }
    .sign-sm-lbl { font-size: 7.5pt; margin-bottom: 2px; }
    .sign-sm-line { border-bottom: 1px solid #000; padding-bottom: 2px; font-size: 10pt; min-height: 16px; }
    .sign-big { flex: 2; text-align: center; }
    .sign-big-line { border-bottom: 1px solid #000; height: 22px; }
    .sign-big-lbl { font-size: 7.5pt; color: #555; margin-top: 2px; }
    .fn { font-size: 7pt; color: #777; margin-top: 5px; }
    .guardian { border: 1px solid #bbb; padding: 12px; margin-top: 16px; }
    .consent { display: flex; align-items: flex-end; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
    .consent-txt { font-size: 8.5pt; }
    .consent-line { width: 60px; border-bottom: 1px solid #000; font-size: 10pt; min-height: 14px; padding-bottom: 2px; }
    .print-hint { display: none; }
    @media print { .print-hint { display: none; } }
  </style>
</head>
<body>
  <div class="police-box">
    <p class="police-note">(Vyplňuje orgán Policajného zboru)</p>
    <div class="police-row">
      <span class="police-lbl">Poradové číslo v protokole vodičských oprávnení:</span>
      <div class="police-line"></div>
    </div>
  </div>

  <h1>ŽIADOSŤ O UDELENIE VODIČSKÉHO OPRÁVNENIA</h1>
  <div class="title-bar"></div>

  <p class="sec-lbl">(Vyplňuje žiadateľ)</p>

  <div class="row2">
    <div class="col"><div class="fl">Meno</div><div class="fv">${v(r.meno)}</div></div>
    <div class="col"><div class="fl">priezvisko</div><div class="fv">${v(r.priezvisko)}</div></div>
  </div>

  <div class="field"><div class="fl">rodné priezvisko</div><div class="fv">${v(r.rodnePriezvisko)}</div></div>

  <div class="row2">
    <div class="col"><div class="fl">dátum narodenia</div><div class="fv">${v(formatSkDate(r.datumNarodenia))}</div></div>
    <div class="col"><div class="fl">miesto narodenia</div><div class="fv">${v(r.miestoNarodenia)}</div></div>
  </div>

  <div class="field"><div class="fl">rodné číslo</div><div class="fv">${v(r.rodneCislo)}</div></div>
  <div class="field"><div class="fl">adresa pobytu alebo miesta zdržiavania sa</div><div class="fv">${v(r.ulica)}, ${v(r.mesto)} ${v(r.psc)}</div></div>
  <div class="field"><div class="fl">Som držiteľom vodičského oprávnenia skupiny</div><div class="fv">${v(r.drzitelSkupiny)}</div></div>
  <div class="field"><div class="fl">Som držiteľom vodičského preukazu (uviesť číslo a štát vydania)</div><div class="fv">${v(r.drzitelPreukazu)}</div></div>
  <div class="field"><div class="fl">Žiadam o udelenie vodičského oprávnenia skupiny</div><div class="fv">${v(r.ziadamSkupiny)}</div></div>

  <div class="field">
    <div class="na-lbl">na základe:*</div>
    <div class="cb-row"><div class="cb">${checked('kurzSkuska')}</div><span class="cb-lbl">vodičského kurzu a skúšky z odbornej spôsobilosti</span></div>
    <div class="cb-row"><div class="cb">${checked('osobitnaSkuska')}</div><span class="cb-lbl">osobitnej skúšky</span></div>
    <div class="cb-row"><div class="cb">${checked('osobitnyVycvik')}</div><span class="cb-lbl">osobitného výcviku</span></div>
  </div>

  <div class="field">
    <div class="na-lbl">Študujem na území Slovenskej republiky aspoň šesť mesiacov*</div>
    <div class="cb-row">
      <div class="cb">${r.studujeNaSlovensku === true ? '<span style="font-weight:bold;">X</span>' : '&nbsp;'}</div><span class="cb-lbl">áno</span>
      <div class="cb">${r.studujeNaSlovensku === false ? '<span style="font-weight:bold;">X</span>' : '&nbsp;'}</div><span class="cb-lbl">nie</span>
    </div>
  </div>

  <div class="sign-row">
    <div class="sign-sm"><div class="sign-sm-lbl">V</div><div class="sign-sm-line">${v(r.podpisVMeste)}</div></div>
    <div class="sign-sm"><div class="sign-sm-lbl">dňa</div><div class="sign-sm-line">${v(r.podpisDna)}</div></div>
    <div class="sign-big"><div class="sign-big-line"></div><div class="sign-big-lbl">podpis žiadateľa</div></div>
  </div>
  <p class="fn">* Relevantné označte znakom „X".</p>

  <div class="guardian">
    <p class="sec-lbl">(Vyplňuje zákonný zástupca žiadateľa, ak žiadateľ v deň podania žiadosti o udelenie vodičského oprávnenia nedosiahol vek 18 rokov)</p>
    <div class="row2">
      <div class="col"><div class="fl">Meno</div><div class="fv">${r.isMinor ? v(r.zakonnyZastupcaMeno) : ''}</div></div>
      <div class="col"><div class="fl">priezvisko</div><div class="fv">${r.isMinor ? v(r.zakonnyZastupcaPriezvisko) : ''}</div></div>
    </div>
    <div class="field"><div class="fl">rodné číslo **</div><div class="fv">${r.isMinor ? v(r.zakonnyZastupcaRodneCislo) : ''}</div></div>
    <div class="consent">
      <span class="consent-txt">ako zákonný zástupca žiadateľa súhlasím s udelením vodičského oprávnenia skupiny</span>
      <div class="consent-line">${r.isMinor ? v(r.zakonnyZastupcaSkupina) : ''}</div>
    </div>
    <div class="sign-row">
      <div class="sign-sm"><div class="sign-sm-lbl">V</div><div class="sign-sm-line">${r.isMinor ? v(r.podpisVMeste) : ''}</div></div>
      <div class="sign-sm"><div class="sign-sm-lbl">dňa</div><div class="sign-sm-line">${r.isMinor ? v(r.podpisDna) : ''}</div></div>
      <div class="sign-big"><div class="sign-big-line"></div><div class="sign-big-lbl">podpis zákonného zástupcu</div></div>
    </div>
    <p class="fn">** Ak rodné číslo nie je pridelené, uveďte dátum narodenia.</p>
  </div>

  <script>window.onload = () => window.print();` + '</script>' + `
</body>
</html>`

  const win = window.open('', '_blank', 'width=900,height=1200')
  if (win) {
    win.document.write(html)
    win.document.close()
  }
}

// ── Core download logic ───────────────────────────────────────────────────────
const downloadFilledPDF = async (reg: Registration, setLoading: (v: boolean) => void) => {
  setLoading(true)
  try {
    const blob = await fillZiadostPDF(reg)
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `ziadost-${reg.priezvisko.toLowerCase()}-${reg.meno.toLowerCase()}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('PDF overlay failed, falling back to print:', err)
    printZiadost(reg) // fallback: print/save via browser
  } finally {
    setLoading(false)
  }
}

// ── PDF Download button (table row) ──────────────────────────────────────────
const PdfButton = ({ reg }: { reg: Registration }) => {
  const [loading, setLoading] = React.useState(false)
  return (
    <button
      onClick={() => downloadFilledPDF(reg, setLoading)}
      disabled={loading}
      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:cursor-wait"
      style={loading
        ? { backgroundColor: '#f3f4f6', color: '#9ca3af' }
        : { backgroundColor: '#e0f2fe', color: '#0369a1' }}
      title="Stiahnuť vyplnenú žiadosť (originálny formulár)"
    >
      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
      {loading ? '…' : 'PDF'}
    </button>
  )
}

// ── Modal PDF button (larger, blue) ──────────────────────────────────────────
const ModalPdfButton = ({ reg }: { reg: Registration }) => {
  const [loading, setLoading] = React.useState(false)
  return (
    <button
      onClick={() => downloadFilledPDF(reg, setLoading)}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors hover:opacity-90 disabled:cursor-wait"
      style={loading
        ? { backgroundColor: '#f3f4f6', color: '#9ca3af' }
        : { backgroundColor: '#0369a1', color: '#fff' }}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      {loading ? 'Generujem…' : 'Stiahnuť vyplnenú žiadosť PDF'}
    </button>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
const AdminRegistrations = () => {
  const { registrations, updateRegistrationStatus, refetchRegistrations } = useCourseData()
  const [selected, setSelected]           = React.useState<Registration | null>(null)

  // Load registrations from database on mount
  useEffect(() => { refetchRegistrations() }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const [filterStatus, setFilterStatus]   = React.useState<string>('all')
  const [filterLocation, setFilterLocation] = React.useState<string>('all')
  const [search, setSearch]               = React.useState('')

  const filtered = registrations.filter(r => {
    const matchStatus   = filterStatus   === 'all' || r.status   === filterStatus
    const matchLocation = filterLocation === 'all' || r.location === filterLocation
    const matchSearch   = search === '' ||
      `${r.meno} ${r.priezvisko} ${r.email}`.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchLocation && matchSearch
  })

  const updateStatus = (id: string, status: Registration['status']) => {
    updateRegistrationStatus(id, status)
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null)
  }

  const counts = {
    all:      registrations.length,
    pending:  registrations.filter(r => r.status === 'pending').length,
    approved: registrations.filter(r => r.status === 'approved').length,
    rejected: registrations.filter(r => r.status === 'rejected').length,
  }

  return (
    <AdminLayout>
      <div className="space-y-6 font-inter">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Všetky registrácie</h2>
            <p className="text-sm text-gray-500 mt-0.5">Spravujte prihlásenia záujemcov o kurzy</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-white px-4 py-2 rounded-xl font-semibold"
            style={{ backgroundColor: '#00AEEF' }}>
            Celkom: {counts.all}
          </div>
        </div>

        {/* Empty state */}
        {registrations.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Zatiaľ žiadne registrácie</h3>
            <p className="text-gray-400 text-sm">
              Keď sa záujemcovia prihlásia cez web, registrácie sa zobrazia tu.
            </p>
          </div>
        )}

        {registrations.length > 0 && (
          <>
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {(['all', 'pending', 'approved', 'rejected'] as const).map(s => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                    filterStatus === s
                      ? 'text-white border-transparent shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                  style={filterStatus === s ? { backgroundColor: '#00AEEF', borderColor: '#00AEEF' } : {}}>
                  {s === 'all' ? 'Všetky' : statusConfig[s].label}
                  <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                    filterStatus === s ? 'bg-white/30 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>{counts[s]}</span>
                </button>
              ))}
            </div>

            {/* Search + location filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Hľadať podľa mena alebo emailu..."
                  value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 bg-white" />
              </div>
              <select value={filterLocation} onChange={e => setFilterLocation(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 text-gray-700">
                <option value="all">Všetky miesta</option>
                <option value="Malacky">Malacky</option>
                <option value="Bratislava">Bratislava</option>
              </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Meno</th>
                      <th className="text-left px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Kurz</th>
                      <th className="text-left px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Miesto</th>
                      <th className="text-left px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden xl:table-cell">Dátum</th>
                      <th className="text-left px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Stav</th>
                      <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Akcie</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-gray-400 text-sm">
                          Žiadne registrácie nenájdené
                        </td>
                      </tr>
                    )}
                    {filtered.map(reg => {
                      const st = statusConfig[reg.status]
                      return (
                        <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                                style={{ backgroundColor: '#116584' }}>
                                {reg.meno[0]}{reg.priezvisko[0]}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800">{reg.meno} {reg.priezvisko}</p>
                                <p className="text-xs text-gray-400">{reg.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 hidden md:table-cell">
                            <span className="font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg">
                              {reg.courseType}
                            </span>
                          </td>
                          <td className="px-4 py-4 hidden lg:table-cell text-gray-600">{reg.location}</td>
                          <td className="px-4 py-4 hidden xl:table-cell text-gray-400 text-xs">{reg.createdAt}</td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${st.bg} ${st.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                              {st.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <PdfButton reg={reg} />
                              <button onClick={() => setSelected(reg)}
                                className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                                Detail
                              </button>
                              {reg.status === 'pending' && (
                                <>
                                  <button onClick={() => updateStatus(reg.id, 'approved')}
                                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors">
                                    ✓
                                  </button>
                                  <button onClick={() => updateStatus(reg.id, 'rejected')}
                                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors">
                                    ✕
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: '#116584' }}>
                  {selected.meno[0]}{selected.priezvisko[0]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{selected.meno} {selected.priezvisko}</h3>
                  <p className="text-xs text-gray-400">Registrácia #{selected.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* PDF download in modal */}
                <ModalPdfButton reg={selected} />
                <button onClick={() => setSelected(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Status + course */}
              <div className="flex flex-wrap gap-3">
                <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full
                  ${statusConfig[selected.status].bg} ${statusConfig[selected.status].text}`}>
                  <span className={`w-2 h-2 rounded-full ${statusConfig[selected.status].dot}`} />
                  {statusConfig[selected.status].label}
                </span>
                <span className="text-sm font-bold bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                  Kurz {selected.courseType}
                </span>
                <span className="text-sm bg-sky-50 text-sky-700 px-3 py-1.5 rounded-full">
                  {selected.location}
                </span>
              </div>

              {/* Info grid */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Kontakt</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Email',    value: selected.email },
                    { label: 'Telefón',  value: selected.phone },
                  ].map(item => (
                    <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 font-medium mb-0.5">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Osobné údaje (žiadosť)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Meno',                      value: selected.meno },
                    { label: 'Priezvisko',                value: selected.priezvisko },
                    { label: 'Rodné priezvisko',          value: selected.rodnePriezvisko },
                    { label: 'Dátum narodenia',           value: formatSkDate(selected.datumNarodenia) },
                    { label: 'Miesto narodenia',          value: selected.miestoNarodenia },
                    { label: 'Rodné číslo',               value: selected.rodneCislo },
                    { label: 'Ulica',                     value: selected.ulica },
                    { label: 'Mesto',                     value: selected.mesto },
                    { label: 'PSČ',                       value: selected.psc },
                    { label: 'Držiteľ skupiny',           value: selected.drzitelSkupiny || '—' },
                    { label: 'Číslo preukazu',            value: selected.drzitelPreukazu || '—' },
                    { label: 'Žiadam skupiny',            value: selected.ziadamSkupiny },
                    { label: 'Základ žiadosti',           value: {
                        kurzSkuska: 'Vodičský kurz a skúška',
                        osobitnaSkuska: 'Osobitná skúška',
                        osobitnyVycvik: 'Osobitný výcvik',
                      }[selected.zakladNa] },
                    { label: 'Štúdium na Slovensku 6+ mes.', value: selected.studujeNaSlovensku == null
                        ? '—'
                        : selected.studujeNaSlovensku ? 'Áno' : 'Nie' },
                    { label: 'Prvá pomoc',                value: selected.hasFirstAid ? `Áno${selected.firstAidDate ? ` (${selected.firstAidDate})` : ''}` : 'Nie' },
                    { label: 'Preferovaný termín',        value: selected.preferredStartDate || '—' },
                  ].map(item => (
                    <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 font-medium mb-0.5">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-800">{item.value as string}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Minor info */}
              {selected.isMinor && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Zákonný zástupca</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: 'Meno',          value: selected.zakonnyZastupcaMeno || '—' },
                      { label: 'Priezvisko',    value: selected.zakonnyZastupcaPriezvisko || '—' },
                      { label: 'Rodné číslo',   value: selected.zakonnyZastupcaRodneCislo || '—' },
                      { label: 'Súhlas skupiny',value: selected.zakonnyZastupcaSkupina || '—' },
                    ].map(item => (
                      <div key={item.label} className="bg-purple-50 rounded-xl p-3">
                        <p className="text-xs text-purple-400 font-medium mb-0.5">{item.label}</p>
                        <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selected.notes && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <p className="text-xs font-semibold text-amber-700 mb-1">Poznámky</p>
                  <p className="text-sm text-amber-800">{selected.notes}</p>
                </div>
              )}

              {/* Action buttons */}
              {selected.status === 'pending' && (
                <div className="flex gap-3 pt-2">
                  <button onClick={() => updateStatus(selected.id, 'approved')}
                    className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90"
                    style={{ backgroundColor: '#10b981' }}>
                    ✓ Schváliť registráciu
                  </button>
                  <button onClick={() => updateStatus(selected.id, 'rejected')}
                    className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors">
                    ✕ Zamietnuť
                  </button>
                </div>
              )}
              {selected.status !== 'pending' && (
                <button onClick={() => updateStatus(selected.id, 'pending')}
                  className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                  Vrátiť na čakajúce
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default AdminRegistrations
