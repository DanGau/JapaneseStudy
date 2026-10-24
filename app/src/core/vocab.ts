import { shuffle } from './rng'

/** SM-2 state for one word (SuperMemo 2: an easiness factor stretches each successful interval). */
export type WordCard = { ease: number; interval: number; reps: number; lapses: number; due: number }

/** A study session: `queue[0]` is showing; `first` holds each word's first answer, which is what SM-2 grades; `misses` counts misses. */
export type Session = { queue: string[]; first: Record<string, boolean>; misses: Record<string, number> }

/** A word missed this many times in one session leaves the loop and goes to the Hard words list. */
export const MISS_LIMIT = 4

const MIN_EASE = 1.3
const START_EASE = 2.5

export function sm2(card: WordCard | undefined, knew: boolean, day: number): WordCard {
  const c = card ?? { ease: START_EASE, interval: 0, reps: 0, lapses: 0, due: day }
  if (!knew) return { ...c, reps: 0, interval: 0, lapses: c.lapses + 1, ease: Math.max(MIN_EASE, c.ease - 0.2), due: day + 1 }
  const reps = c.reps + 1
  const interval = reps === 1 ? 1 : reps === 2 ? 3 : Math.round(c.interval * c.ease)
  return { ...c, reps, interval, ease: c.ease + 0.1, due: day + interval }
}

export type Limits = { size: number; words: number; phrases: number }

/** Up to `size` cards: due ones first (most overdue first), topped up with unseen words and phrases within their limits, in random order. */
export function startSession(ids: string[], cards: Record<string, WordCard>, day: number, limits: Limits, isPhrase: (id: string) => boolean, seed: number): Session {
  const due = ids.filter((id) => cards[id] && cards[id].due <= day).sort((a, b) => cards[a].due - cards[b].due).slice(0, limits.size)
  const unseen = ids.filter((id) => !cards[id])
  const fresh = [...unseen.filter(isPhrase).slice(0, limits.phrases), ...unseen.filter((id) => !isPhrase(id)).slice(0, limits.words)]
  return { queue: shuffle([...due, ...fresh.slice(0, limits.size - due.length)], seed), first: {}, misses: {} }
}

/** Answers the showing word. Known words leave the queue; others go to the back until `MISS_LIMIT` misses, when they leave as hard. */
export function answer(s: Session, knew: boolean): Session {
  const [id, ...rest] = s.queue
  const first = id in s.first ? s.first : { ...s.first, [id]: knew }
  const misses = knew ? s.misses : { ...s.misses, [id]: (s.misses[id] ?? 0) + 1 }
  return { queue: knew || misses[id] >= MISS_LIMIT ? rest : [...rest, id], first, misses }
}

/** Words that hit `MISS_LIMIT` this session. */
export const hardIn = (s: Session) => Object.keys(s.misses).filter((id) => s.misses[id] >= MISS_LIMIT)

/** Applies a finished session's first answers to the saved cards. */
export const grade = (cards: Record<string, WordCard>, s: Session, day: number): Record<string, WordCard> => ({
  ...cards,
  ...Object.fromEntries(Object.entries(s.first).map(([id, knew]) => [id, sm2(cards[id], knew, day)])),
})

/** A word counts as learned once its interval reaches three weeks. */
export const strength = (c: WordCard | undefined): 'new' | 'learning' | 'known' | 'learned' =>
  !c ? 'new' : c.interval >= 21 ? 'learned' : c.reps > 0 ? 'known' : 'learning'
