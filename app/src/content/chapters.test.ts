import { expect, test } from 'vitest'
import { parse } from '../core/furigana'
import { romanizable } from '../core/romaji'
import { BLANK } from '../core/types'
import { CHAPTERS } from './chapters'
import { PREPS } from './prep'
import { SENTENCES } from './sentences'
import { PHRASES, WORDS } from './words'

const markups = CHAPTERS.flatMap((c) => [
  c.jpTitle,
  ...c.grammar.examples.map((e) => e.jp),
  ...c.story.flatMap((p) => [p.jp, ...(p.words ?? []).map((w) => w.jp)]),
  ...c.quiz.flatMap((q) => (q.kind === 'choice' ? q.options.map((o) => q.jp.replace(BLANK, o)) : [...q.tiles, ...(q.decoys ?? [])])),
  ...[...WORDS, ...PHRASES].map((w) => w.jp),
  ...Object.values(SENTENCES).map(([jp]) => jp),
  ...PREPS.flatMap((p) => [p.jpTitle, ...p.sections.flatMap((s) => s.lines.map((l) => l.jp))]),
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

test('word ids are unique and every word has a memory hook', () => {
  expect(new Set(WORDS.map((w) => w.id)).size).toBe(WORDS.length)
  for (const w of WORDS) expect(w.hook, w.id).toBeTruthy()
})

test('phrase ids are unique and differ from word ids', () => {
  const ids = [...WORDS, ...PHRASES].map((w) => w.id)
  expect(new Set(ids).size).toBe(ids.length)
})

test('every word has one highlighted example sentence', () => {
  expect(Object.keys(SENTENCES).sort()).toEqual(WORDS.map((w) => w.id).sort())
  for (const [jp] of Object.values(SENTENCES)) expect(jp).toMatch(/\[\[.+\]\]/)
})
