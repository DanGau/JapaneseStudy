import { expect, test } from 'vitest'
import { answer, grade, sm2, startSession, strength } from './vocab'

test('sm2 stretches intervals on success and resets on a miss', () => {
  let c = sm2(undefined, true, 0)
  expect(c).toMatchObject({ reps: 1, interval: 1, due: 1 })
  c = sm2(c, true, 1)
  expect(c).toMatchObject({ reps: 2, interval: 3, due: 4 })
  c = sm2(c, true, 4)
  expect(c.interval).toBe(Math.round(3 * 2.7))
  c = sm2(c, false, 12)
  expect(c).toMatchObject({ reps: 0, interval: 0, lapses: 1, due: 13 })
  expect(c.ease).toBeCloseTo(2.6)
})

test('session takes due words and a limited number of new ones', () => {
  const cards = { a: sm2(undefined, true, 0), b: sm2(undefined, true, 5) }
  const s = startSession(['a', 'b', 'c', 'd', 'e'], cards, 1, 2, 7)
  expect([...s.queue].sort()).toEqual(['a', 'c', 'd'])
})

test('a missed word returns later and is graded by its first answer', () => {
  let s = { queue: ['a', 'b', 'c', 'd', 'e'], first: {} }
  s = answer(s, false)
  expect(s.queue).toEqual(['b', 'c', 'd', 'a', 'e'])
  s = answer(answer(answer(answer(s, true), true), true), true)
  expect(s.queue).toEqual(['e'])
  s = answer(answer(s, false), true)
  expect(s.queue).toEqual([])
  expect(s.first).toEqual({ a: false, b: true, c: true, d: true, e: false })
  const cards = grade({}, s, 0)
  expect(strength(cards.a)).toBe('learning')
  expect(strength(cards.b)).toBe('known')
  expect(strength(undefined)).toBe('new')
})
