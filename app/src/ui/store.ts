import { empty, type Progress } from '../core/progress'

export type Saved = { progress: Progress; furigana: boolean }

const KEY = 'japanese-study'

export function load(): Saved {
  const fresh = { progress: empty(), furigana: true }
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...fresh, ...JSON.parse(raw) } : fresh
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
