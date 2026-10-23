import { expect, test } from 'vitest'
import { parse } from '../core/furigana'
import { romanizable } from '../core/romaji'
import { BLANK } from '../core/types'
import { CHAPTERS } from './chapters'
import { WORDS } from './words'

const markups = CHAPTERS.flatMap((c) => [
  c.jpTitle,
  ...c.grammar.examples.map((e) => e.jp),
  ...c.story.flatMap((p) => [p.jp, ...(p.words ?? []).map((w) => w.jp)]),
  ...c.quiz.flatMap((q) => (q.kind === 'choice' ? q.options.map((o) => q.jp.replace(BLANK, o)) : [...q.tiles, ...(q.decoys ?? [])])),
  ...WORDS.map((w) => w.jp),
])

test.each(markups)('parses and has romaji: %s', (m) => {
  expect(() => parse(m)).not.toThrow()
  expect(romanizable(m)).toBe(true)
})

test('chapter ids are unique', () => {
  expect(new Set(CHAPTERS.map((c) => c.id)).size).toBe(CHAPTERS.length)
})

test.each(CHAPTERS)('$id: story highlights the grammar and quiz is well formed', (c) => {
  expect(c.story.some((p) => parse(p.jp).some((s) => s.mark))).toBe(true)
  expect(c.grammar.examples.every((e) => parse(e.jp).some((s) => s.mark))).toBe(true)
  for (const q of c.quiz) {
    if (q.kind === 'choice') {
      expect(q.jp.split(BLANK)).toHaveLength(2)
      expect(new Set(q.options).size).toBe(q.options.length)
    } else {
      expect(q.tiles.length).toBeGreaterThan(1)
      for (const d of q.decoys ?? []) expect(q.tiles).not.toContain(d)
    }
  }
})

test('word ids are unique', () => {
  expect(new Set(WORDS.map((w) => w.id)).size).toBe(WORDS.length)
})
