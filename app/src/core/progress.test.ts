import { expect, test } from 'vitest'
import { empty, finishWords, streak, unmarkHard } from './progress'
import { MISS_LIMIT } from './vocab'

const session = (first: Record<string, boolean>, misses: Record<string, number> = {}) => ({ queue: [], first, misses })

test('streak grows on consecutive days and lapses after a gap', () => {
  let p = finishWords(empty(), session({}), 10)
  p = finishWords(p, session({}), 11)
  p = finishWords(p, session({}), 11)
  expect(streak(p, 12)).toBe(2)
  expect(streak(p, 13)).toBe(0)
  expect(finishWords(p, session({}), 14).streak).toBe(1)
})

test('words award xp; hard words join the list and leave when known', () => {
  const p = finishWords(empty(), session({ a: true, b: false }, { b: MISS_LIMIT }), 0)
  expect(p.xp).toBe(2)
  expect(p.hard).toEqual(['b'])
  expect(finishWords(p, session({ b: true }), 1).hard).toEqual([])
  expect(unmarkHard(p, 'b').hard).toEqual([])
})
