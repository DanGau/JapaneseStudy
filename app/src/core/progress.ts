import { grade as gradeWords, type Session, type WordCard } from './vocab'

// Days are integers (local days since the epoch), passed in by the caller.

/** A Leitner card: box 0 is due again the same day; each correct answer moves it up a box. */
export type Card = { box: number; due: number }
/** `cards` are grammar quiz questions; `words` are vocabulary (see vocab.ts). */
export type Progress = { xp: number; stars: Record<string, number>; streak: number; lastDay: number; cards: Record<string, Card>; words: Record<string, WordCard> }

const INTERVALS = [0, 1, 3, 7, 14, 30]
export const XP_CORRECT = 10
export const XP_PERFECT = 20
export const XP_REVIEW = 5
export const XP_WORD = 2

export const empty = (): Progress => ({ xp: 0, stars: {}, streak: 0, lastDay: -1, cards: {}, words: {} })

export const cardKey = (chapterId: string, question: number) => `${chapterId}:${question}`

export const starsFor = (correct: number, total: number) => (correct === total ? 3 : correct / total >= 0.7 ? 2 : 1)

export function grade(card: Card, ok: boolean, day: number): Card {
  const box = ok ? Math.min(card.box + 1, INTERVALS.length - 1) : 0
  return { box, due: day + INTERVALS[box] }
}

/** The streak as of `day`: zero once a whole day passes without study. */
export const streak = (p: Progress, day: number) => (p.lastDay >= day - 1 ? p.streak : 0)

function studied(p: Progress, day: number): Pick<Progress, 'streak' | 'lastDay'> {
  if (p.lastDay === day) return { streak: p.streak, lastDay: day }
  return { streak: p.lastDay === day - 1 ? p.streak + 1 : 1, lastDay: day }
}

/** Records a chapter quiz; `results[i]` says whether question i was right. */
export function finishChapter(p: Progress, id: string, results: boolean[], day: number): Progress {
  const correct = results.filter(Boolean).length
  const cards = { ...p.cards }
  results.forEach((ok, i) => {
    const key = cardKey(id, i)
    cards[key] = grade(cards[key] ?? { box: 0, due: day }, ok, day)
  })
  return {
    ...p,
    ...studied(p, day),
    xp: p.xp + correct * XP_CORRECT + (correct === results.length ? XP_PERFECT : 0),
    stars: { ...p.stars, [id]: Math.max(p.stars[id] ?? 0, starsFor(correct, results.length)) },
    cards,
  }
}

export function finishReview(p: Progress, results: Record<string, boolean>, day: number): Progress {
  const cards = { ...p.cards }
  for (const [key, ok] of Object.entries(results)) cards[key] = grade(cards[key], ok, day)
  const correct = Object.values(results).filter(Boolean).length
  return { ...p, ...studied(p, day), xp: p.xp + correct * XP_REVIEW, cards }
}

/** Records a vocabulary session: SM-2 grades each word's first answer. */
export function finishWords(p: Progress, s: Session, day: number): Progress {
  const known = Object.values(s.first).filter(Boolean).length
  return { ...p, ...studied(p, day), xp: p.xp + known * XP_WORD, words: gradeWords(p.words, s, day) }
}

/** Keys of grammar cards due by `day`, most overdue first. */
export const due = (p: Progress, day: number) =>
  Object.keys(p.cards).filter((k) => p.cards[k].due <= day).sort((a, b) => p.cards[a].due - p.cards[b].due)

export const unlocked = (ids: string[], p: Progress, i: number) => i === 0 || (p.stars[ids[i - 1]] ?? 0) > 0
