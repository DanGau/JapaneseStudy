import { expect, test } from 'vitest'
import { parse } from '../core/furigana'
import { romanizable } from '../core/romaji'
import { PREPS } from './prep'
import { SENTENCES } from './sentences'
import { PHRASES, WORDS } from './words'

const markups = [
  ...[...WORDS, ...PHRASES].map((w) => w.jp),
  ...Object.values(SENTENCES).map(([jp]) => jp),
  ...PREPS.flatMap((p) => [p.jpTitle, ...p.sections.flatMap((s) => s.lines.map((l) => l.jp))]),
]

test.each(markups)('parses and has romaji: %s', (m) => {
  expect(() => parse(m)).not.toThrow()
  expect(romanizable(m)).toBe(true)
})

test('prep ids are unique', () => {
  expect(new Set(PREPS.map((p) => p.id)).size).toBe(PREPS.length)
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
