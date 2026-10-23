import { expect, test } from 'vitest'
import { parse } from '../core/furigana'
import { BLANK } from '../core/types'
import { CHAPTERS } from './chapters'

const markups = CHAPTERS.flatMap((c) => [
  c.jpTitle,
  ...c.grammar.examples.map((e) => e.jp),
  ...c.story.flatMap((p) => [p.jp, ...(p.words ?? []).map((w) => w.jp)]),
  ...c.quiz.flatMap((q) => (q.kind === 'choice' ? [q.jp, ...q.options] : [...q.tiles, ...(q.decoys ?? [])])),
])

test.each(markups)('furigana parses: %s', (m) => expect(() => parse(m)).not.toThrow())

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
