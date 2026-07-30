import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const oldUrl = process.env.OLD_DATABASE_URL
if (!oldUrl) {
  console.error('OLD_DATABASE_URL is not set in .env')
  process.exit(1)
}

const oldDb = new PrismaClient({ datasources: { db: { url: oldUrl } } })
const newDb = new PrismaClient()

async function main() {
  const [oldPrices, oldDates, oldRegs] = await Promise.all([
    oldDb.coursePrice.findMany(),
    oldDb.courseDate.findMany(),
    oldDb.registration.findMany(),
  ])

  console.log('Source database:', {
    prices: oldPrices.length,
    dates: oldDates.length,
    registrations: oldRegs.length,
  })

  await newDb.registration.deleteMany()
  await newDb.courseDate.deleteMany()
  await newDb.coursePrice.deleteMany()

  for (const row of oldPrices) {
    await newDb.coursePrice.create({ data: row })
  }
  for (const row of oldDates) {
    await newDb.courseDate.create({ data: row })
  }
  for (const row of oldRegs) {
    await newDb.registration.create({ data: row })
  }

  const [prices, dates, registrations] = await Promise.all([
    newDb.coursePrice.count(),
    newDb.courseDate.count(),
    newDb.registration.count(),
  ])

  console.log('Target database:', { prices, dates, registrations })
  console.log('Migration complete.')
}

main()
  .catch((err) => {
    console.error('Migration failed:', err)
    process.exit(1)
  })
  .finally(async () => {
    await oldDb.$disconnect()
    await newDb.$disconnect()
  })
