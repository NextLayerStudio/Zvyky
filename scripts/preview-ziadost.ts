/**
 * Dev helper: fill the official žiadosť template with sample data and write
 * /tmp/ziadost-preview.pdf so the overlay positions can be checked visually.
 *
 *   npx tsx scripts/preview-ziadost.ts
 */
import { PDFDocument, StandardFonts } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import fs from 'node:fs'
import { drawZiadostOnFirstPage, type ZiadostPdfFields } from '../src/utils/ziadostPdfCore.js'

const sample: ZiadostPdfFields = {
  meno: 'Jozef',
  priezvisko: 'Mrkvička-Szabó',
  rodnePriezvisko: 'Mrkvička',
  datumNarodenia: '12.03.2007',
  miestoNarodenia: 'Bratislava',
  rodneCislo: '070312/1234',
  ulica: 'Hlavná 1234/56',
  mesto: 'Malacky',
  psc: '90101',
  drzitelSkupiny: 'AM, B1',
  drzitelPreukazu: 'AB123456 – SK',
  ziadamSkupiny: 'B',
  zakladNa: 'kurzSkuska',
  studujeNaSlovensku: true,
  podpisVMeste: 'Malacky',
  podpisDna: '21.9.2026',
  isMinor: true,
  zakonnyZastupcaMeno: 'Mária',
  zakonnyZastupcaPriezvisko: 'Mrkvičková',
  zakonnyZastupcaRodneCislo: '805612/9876',
  zakonnyZastupcaSkupina: 'B',
}

const formBytes = fs.readFileSync('public/images/zvyky_tlaciva.pdf')
const pdfDoc = await PDFDocument.load(formBytes)
pdfDoc.registerFontkit(fontkit)

let font
let hasUnicodeFont = false
try {
  font = await pdfDoc.embedFont(fs.readFileSync('src/assets/arial.ttf'))
  hasUnicodeFont = true
} catch {
  font = await pdfDoc.embedFont(StandardFonts.Helvetica)
}

drawZiadostOnFirstPage(pdfDoc.getPages()[0], font, sample, hasUnicodeFont)
fs.writeFileSync('/tmp/ziadost-preview.pdf', await pdfDoc.save())
console.log('pages:', pdfDoc.getPageCount(), '→ /tmp/ziadost-preview.pdf')
