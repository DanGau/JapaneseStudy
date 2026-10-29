import { empty, type Progress } from '../core/progress'

export type Saved = { progress: Progress; romaji: boolean; kanji: boolean }

const KEY = 'japanese-study'

const pick = (p: Progress): Progress => ({ xp: p.xp, streak: p.streak, lastDay: p.lastDay, words: p.words, hard: p.hard })

/** Fills fields added since the data was saved and drops retired ones. Throws on data that isn't a save. */
export function parseSaved(raw: string): Saved {
  const data = JSON.parse(raw)
  if (typeof data?.progress?.xp !== 'number') throw new Error('Not a Kitsune Road backup')
  return { romaji: true, kanji: false, ...data, progress: pick({ ...empty(), ...data.progress }) }
}

export function load(): Saved {
  const fresh = { progress: empty(), romaji: true, kanji: false }
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? parseSaved(raw) : fresh
  } catch {
    return fresh
  }
}

export function save(s: Saved) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    // Storage blocked (private mode); progress lasts for this visit only.
  }
}

/** Local days since the epoch. */
export const today = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000)
