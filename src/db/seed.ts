import { client, db } from '.'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db.insert(goals).values([
      { title: 'Acordar Cedo', desireWeeklyFrequency: 5 },
      { title: 'Academia', desireWeeklyFrequency: 3 },
      { title: 'Estudar', desireWeeklyFrequency: 4 },
      { title: 'Meditar', desireWeeklyFrequency: 1 },
    ]).returning()

  const StartOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createAt: StartOfWeek.toDate() },
    { goalId: result[1].id, createAT: StartOfWeek.add(1, 'day').toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
