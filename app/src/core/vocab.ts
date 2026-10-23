import { shuffle } from './rng'

/** SM-2 state for one word (SuperMemo 2: an easiness factor stretches each successful interval). */
export type WordCard = { ease: number; interval: number; reps: number; lapses: number; due: number }

/** A study session: `queue[0]` is showing; `first` holds each word's first answer, which is what SM-2 grades. */
export type Session = { queue: string[]; first: Record<string, boolean> }

const MIN_EASE = 1.3
const START_EASE = 2.5
/** How many cards later a missed word comes back within the session. */
export const RETRY_GAP = 3

export function sm2(card: WordCard | undefined, knew: boolean, day: number): WordCard {
  const c = card ?? { ease: START_EASE, interval: 0, reps: 0, lapses: 0, due: day }
  if (!knew) return { ...c, reps: 0, interval: 0, lapses: c.lapses + 1, ease: Math.max(MIN_EASE, c.ease - 0.2), due: day + 1 }
  const reps = c.reps + 1
  const interval = reps === 1 ? 1 : reps === 2 ? 3 : Math.round(c.interval * c.ease)
  return { ...c, reps, interval, ease: c.ease + 0.1, due: day + interval }
}

/** Due words first (most overdue first), then up to `newLimit` unseen words, in random order. */
export function startSession(ids: string[], cards: Record<string, WordCard>, day: number, newLimit: number, seed: number): Session {
  const due = ids.filter((id) => cards[id] && cards[id].due <= day)
  const fresh = ids.filter((id) => !cards[id]).slice(0, newLimit)
  return { queue: shuffle([...due, ...fresh], seed), first: {} }
}

/** Answers the showing word. Known words leave the queue; others return RETRY_GAP cards later. */
export function answer(s: Session, knew: boolean): Session {
  const [id, ...rest] = s.queue
  const first = id in s.first ? s.first : { ...s.first, [id]: knew }
  if (knew) return { queue: rest, first }
  const at = Math.min(RETRY_GAP, rest.length)
  return { queue: [...rest.slice(0, at), id, ...rest.slice(at)], first }
}

/** Applies a finished session's first answers to the saved cards. */
export const grade = (cards: Record<string, WordCard>, s: Session, day: number): Record<string, WordCard> => ({
  ...cards,
  ...Object.fromEntries(Object.entries(s.first).map(([id, knew]) => [id, sm2(cards[id], knew, day)])),
})

/** A word counts as learned once its interval reaches three weeks. */
export const strength = (c: WordCard | undefined): 'new' | 'learning' | 'known' | 'learned' =>
  !c ? 'new' : c.interval >= 21 ? 'learned' : c.reps > 0 ? 'known' : 'learning'
