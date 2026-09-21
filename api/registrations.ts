import type { VercelRequest, VercelResponse } from '@vercel/node'
import { withPrisma } from './lib/prisma.js'
import { requireAuth, setCors } from './lib/auth.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()

  // GET — admin only, list all registrations
  if (req.method === 'GET') {
    return requireAuth(req, res, async () => {
      const registrations = await withPrisma(prisma =>
        prisma.registration.findMany({ orderBy: { createdAt: 'desc' } })
      )
      return res.json(
        registrations.map(r => ({
          ...r,
          createdAt: r.createdAt.toISOString().split('T')[0],
        }))
      )
    })
  }

  // POST — public, submit a new registration from the website form
  if (req.method === 'POST') {
    try {
      const d = req.body as Record<string, unknown>

      const registration = await withPrisma(prisma => prisma.registration.create({
        data: {
          email:             String(d.email),
          phone:             String(d.phone),
          location:          String(d.location),
          courseType:        String(d.courseType),
          hasFirstAid:       Boolean(d.hasFirstAid ?? false),
          firstAidDate:      d.firstAidDate ? String(d.firstAidDate) : null,
          preferredStartDate: d.preferredStartDate ? String(d.preferredStartDate) : null,
          notes:             d.notes ? String(d.notes) : null,
          meno:              String(d.meno),
          priezvisko:        String(d.priezvisko),
          rodnePriezvisko:   String(d.rodnePriezvisko),
          datumNarodenia:    String(d.datumNarodenia),
          miestoNarodenia:   String(d.miestoNarodenia),
          rodneCislo:        String(d.rodneCislo),
          ulica:             String(d.ulica),
          mesto:             String(d.mesto),
          psc:               String(d.psc),
          drzitelSkupiny:    d.drzitelSkupiny ? String(d.drzitelSkupiny) : '',
          drzitelPreukazu:   d.drzitelPreukazu ? String(d.drzitelPreukazu) : '',
          ziadamSkupiny:     String(d.ziadamSkupiny),
          zakladNa:          String(d.zakladNa),
          studujeNaSlovensku: typeof d.studujeNaSlovensku === 'boolean' ? d.studujeNaSlovensku : null,
          podpisVMeste:      String(d.podpisVMeste),
          podpisDna:         String(d.podpisDna),
          isMinor:           Boolean(d.isMinor ?? false),
          zakonnyZastupcaMeno:       d.zakonnyZastupcaMeno ? String(d.zakonnyZastupcaMeno) : null,
          zakonnyZastupcaPriezvisko: d.zakonnyZastupcaPriezvisko ? String(d.zakonnyZastupcaPriezvisko) : null,
          zakonnyZastupcaRodneCislo: d.zakonnyZastupcaRodneCislo ? String(d.zakonnyZastupcaRodneCislo) : null,
          zakonnyZastupcaSkupina:    d.zakonnyZastupcaSkupina ? String(d.zakonnyZastupcaSkupina) : null,
          status: 'pending',
        },
      }))
      return res.status(201).json({ id: registration.id })
    } catch (err) {
      console.error('POST registration error:', err)
      const detail = err instanceof Error ? err.message : String(err)
      return res.status(500).json({ error: 'Failed to save registration', detail })
    }
  }

  return res.status(405).end()
}
