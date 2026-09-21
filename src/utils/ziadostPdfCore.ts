import { PDFPage, PDFFont, rgb } from 'pdf-lib'

/** Fields required to draw on the official žiadosť PDF (browser download). */
export interface ZiadostPdfFields {
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
  ziadamSkupiny: string
  zakladNa: 'kurzSkuska' | 'osobitnaSkuska' | 'osobitnyVycvik'
  studujeNaSlovensku?: boolean | null
  podpisVMeste: string
  podpisDna: string
  isMinor: boolean
  zakonnyZastupcaMeno?: string
  zakonnyZastupcaPriezvisko?: string
  zakonnyZastupcaRodneCislo?: string
  zakonnyZastupcaSkupina?: string
}

/** HTML date inputs save YYYY-MM-DD; official forms expect DD.MM.YYYY. */
export function formatSkDate(value: string): string {
  const iso = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!iso) return value
  return `${iso[3]}.${iso[2]}.${iso[1]}`
}

export function toSafeAscii(text: string): string {
  return text
    .replace(/[šŠ]/g, c => (c === 'š' ? 's' : 'S'))
    .replace(/[čČ]/g, c => (c === 'č' ? 'c' : 'C'))
    .replace(/[žŽ]/g, c => (c === 'ž' ? 'z' : 'Z'))
    .replace(/[ľĽ]/g, c => (c === 'ľ' ? 'l' : 'L'))
    .replace(/[ŕŔ]/g, c => (c === 'ŕ' ? 'r' : 'R'))
    .replace(/[ňŇ]/g, c => (c === 'ň' ? 'n' : 'N'))
    .replace(/[ťŤ]/g, c => (c === 'ť' ? 't' : 'T'))
    .replace(/[ďĎ]/g, c => (c === 'ď' ? 'd' : 'D'))
    .replace(/[ĺĹ]/g, c => (c === 'ĺ' ? 'l' : 'L'))
}

/**
 * Field positions measured from the official form (A4, 595.32 × 841.92 pt).
 * `y` is the distance from the top of the page down to the printed dotted line;
 * `w` is the usable width of that line.
 */
const F = {
  meno:              { x: 116, y: 289.1, w: 160 },
  priezvisko:        { x: 332, y: 289.1, w: 213 },
  rodnePriezvisko:   { x: 164, y: 306.6, w: 380 },
  datumNarodenia:    { x: 166, y: 324.1, w: 110 },
  miestoNarodenia:   { x: 363, y: 324.1, w: 183 },
  rodneCislo:        { x: 139, y: 341.6, w: 215 },
  adresa1:           { x: 354, y: 359.2, w: 188 },
  adresa2:           { x: 90,  y: 376.7, w: 455 },
  drzitelSkupiny:    { x: 287, y: 394.1, w: 258 },
  drzitelPreukazu:   { x: 359, y: 411.6, w: 186 },
  ziadamSkupiny:     { x: 313, y: 443.5, w: 233 },
  podpisVMeste:      { x: 100, y: 566.4, w: 140 },
  podpisDna:         { x: 267, y: 566.4, w: 100 },
  zzMeno:            { x: 117, y: 635.2, w: 140 },
  zzPriezvisko:      { x: 313, y: 635.2, w: 225 },
  zzRodneCislo:      { x: 149, y: 655.6, w: 160 },
  zzSkupina:         { x: 431, y: 670.9, w: 106 },
  zzPodpisVMeste:    { x: 100, y: 714.1, w: 140 },
  zzPodpisDna:       { x: 267, y: 714.1, w: 100 },
} as const

/** Centres of the tick boxes: `cx` is the box centre, `y` the baseline for the „X". */
const BOXES = {
  kurzSkuska:     { cx: 98.1,  y: 490.2 },
  osobitnaSkuska: { cx: 340.9, y: 490.2 },
  osobitnyVycvik: { cx: 444.8, y: 490.2 },
  studujeAno:     { cx: 374.4, y: 524.2 },
  studujeNie:     { cx: 450.8, y: 524.2 },
} as const

const BASE_SIZE = 9.5
const MIN_SIZE = 6.5

/**
 * Draw žiadosť field overlays on the first page. Caller loads PDF + embeds font.
 */
export function drawZiadostOnFirstPage(
  page: PDFPage,
  font: PDFFont,
  reg: ZiadostPdfFields,
  hasUnicodeFont: boolean,
): void {
  const { height } = page.getSize()
  const safe = (s: string) => (hasUnicodeFont ? s || '' : toSafeAscii(s || ''))

  /** Shrink the text until it fits the printed line rather than running over the next field. */
  const fitSize = (text: string, maxWidth?: number) => {
    let size = BASE_SIZE
    if (!maxWidth) return size
    while (size > MIN_SIZE && font.widthOfTextAtSize(text, size) > maxWidth) size -= 0.25
    return size
  }

  const draw = (text: string, field: { x: number; y: number; w?: number }) => {
    const str = safe(text)
    if (!str.trim()) return
    // Sit just above the dotted line instead of striking through it.
    page.drawText(str, {
      x: field.x,
      y: height - field.y + 1.5,
      font,
      size: fitSize(str, field.w),
      color: rgb(0, 0, 0),
    })
  }

  const tick = (box: { cx: number; y: number }) => {
    const size = 10
    page.drawText('X', {
      x: box.cx - font.widthOfTextAtSize('X', size) / 2,
      y: height - box.y,
      font,
      size,
      color: rgb(0, 0, 0),
    })
  }

  draw(reg.meno, F.meno)
  draw(reg.priezvisko, F.priezvisko)
  draw(reg.rodnePriezvisko, F.rodnePriezvisko)
  draw(formatSkDate(reg.datumNarodenia), F.datumNarodenia)
  draw(reg.miestoNarodenia, F.miestoNarodenia)
  draw(reg.rodneCislo, F.rodneCislo)

  // The address line is short; fall back to the full-width line underneath it.
  const adresa = [reg.ulica, `${reg.psc} ${reg.mesto}`.trim()].filter(Boolean).join(', ')
  if (font.widthOfTextAtSize(safe(adresa), BASE_SIZE) <= F.adresa1.w) {
    draw(adresa, F.adresa1)
  } else {
    draw(reg.ulica, F.adresa1)
    draw(`${reg.psc} ${reg.mesto}`.trim(), F.adresa2)
  }

  draw(reg.drzitelSkupiny, F.drzitelSkupiny)
  draw(reg.drzitelPreukazu, F.drzitelPreukazu)
  draw(reg.ziadamSkupiny, F.ziadamSkupiny)

  tick(BOXES[reg.zakladNa] ?? BOXES.kurzSkuska)

  if (reg.studujeNaSlovensku === true) tick(BOXES.studujeAno)
  else if (reg.studujeNaSlovensku === false) tick(BOXES.studujeNie)

  draw(reg.podpisVMeste, F.podpisVMeste)
  draw(reg.podpisDna, F.podpisDna)

  if (reg.isMinor) {
    draw(reg.zakonnyZastupcaMeno || '', F.zzMeno)
    draw(reg.zakonnyZastupcaPriezvisko || '', F.zzPriezvisko)
    draw(reg.zakonnyZastupcaRodneCislo || '', F.zzRodneCislo)
    draw(reg.zakonnyZastupcaSkupina || '', F.zzSkupina)
    draw(reg.podpisVMeste, F.zzPodpisVMeste)
    draw(reg.podpisDna, F.zzPodpisDna)
  }
}
