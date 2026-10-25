import { expect, test } from 'vitest'
import { answer, grade, hardIn, MISS_LIMIT, sm2, startSession, strength, type Session } from './vocab'

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
  const ids = ['a', 'b', 'c', 'd', 'e', 'p1', 'p2']
  const isPhrase = (id: string) => id.startsWith('p')
  const s = startSession(ids, cards, 1, { size: 10, words: 2, phrases: 1 }, isPhrase, 7)
  expect([...s.queue].sort()).toEqual(['a', 'c', 'd', 'p1'])
  expect(startSession(ids, cards, 1, { size: 4, words: 2, phrases: 1 }, isPhrase, 7).queue.sort()).toEqual(['a', 'c', 'd', 'p1'])
  expect(startSession(ids, cards, 1, { size: 3, words: 2, phrases: 1 }, isPhrase, 7).queue.sort()).toEqual(['c', 'd', 'p1'])
})

test('a word missed MISS_LIMIT times leaves the loop as hard', () => {
  let s: Session = { queue: ['a', 'b'], first: {}, misses: {} }
  while (s.queue.length) s = answer(s, s.queue[0] === 'b')
  expect(s.queue).toEqual([])
  expect(hardIn(s)).toEqual(['a'])
  expect(s.misses.a).toBe(MISS_LIMIT)
})

test('a missed word loops to the back and is graded by its first answer', () => {
  let s: Session = { queue: ['a', 'b', 'c', 'd', 'e'], first: {}, misses: {} }
  s = answer(s, false)
  expect(s.queue).toEqual(['b', 'c', 'd', 'e', 'a'])
  s = answer(answer(answer(s, true), true), true)
  expect(s.queue).toEqual(['e', 'a'])
  s = answer(answer(answer(s, false), true), true)
  expect(s.queue).toEqual([])
  expect(s.first).toEqual({ a: false, b: true, c: true, d: true, e: false })
  const cards = grade({}, s, 0)
  expect(strength(cards.a)).toBe('learning')
  expect(strength(cards.b)).toBe('known')
  expect(strength(undefined)).toBe('new')
})
