import { expect, test } from 'vitest'
import { due, empty, finishChapter, finishReview, streak, unlocked } from './progress'

test('a chapter awards stars, xp, cards, and keeps the best stars', () => {
  let p = finishChapter(empty(), 'a', [true, false], 100)
  expect(p.stars.a).toBe(1)
  expect(p.xp).toBe(10)
  expect(due(p, 100)).toEqual(['a:1'])
  expect(due(p, 101)).toEqual(['a:1', 'a:0'])
  p = finishChapter(p, 'a', [true, true], 100)
  expect(p.stars.a).toBe(3)
  p = finishChapter(p, 'a', [false, false], 100)
  expect(p.stars.a).toBe(3)
})

test('review grades cards and a wrong answer resets the box', () => {
  let p = finishChapter(empty(), 'a', [true], 0)
  p = finishReview(p, { 'a:0': true }, 1)
  expect(p.cards['a:0']).toEqual({ box: 2, due: 4 })
  p = finishReview(p, { 'a:0': false }, 4)
  expect(p.cards['a:0']).toEqual({ box: 0, due: 4 })
})

test('streak grows on consecutive days and lapses after a gap', () => {
  let p = finishChapter(empty(), 'a', [true], 10)
  p = finishReview(p, {}, 11)
  p = finishReview(p, {}, 11)
  expect(streak(p, 12)).toBe(2)
  expect(streak(p, 13)).toBe(0)
  expect(finishReview(p, {}, 14).streak).toBe(1)
})

test('a chapter unlocks after the previous one has a star', () => {
  const ids = ['a', 'b']
  expect(unlocked(ids, empty(), 0)).toBe(true)
  expect(unlocked(ids, empty(), 1)).toBe(false)
  expect(unlocked(ids, finishChapter(empty(), 'a', [false], 0), 1)).toBe(true)
})
