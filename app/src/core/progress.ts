import { grade as gradeWords, hardIn, type Session, type WordCard } from './vocab'

// Days are integers (local days since the epoch), passed in by the caller.

/** `words` are vocabulary cards (see vocab.ts); `hard` lists words to study in a sentence. */
export type Progress = { xp: number; streak: number; lastDay: number; words: Record<string, WordCard>; hard: string[] }

export const XP_WORD = 2

export const empty = (): Progress => ({ xp: 0, streak: 0, lastDay: -1, words: {}, hard: [] })

/** The streak as of `day`: zero once a whole day passes without study. */
export const streak = (p: Progress, day: number) => (p.lastDay >= day - 1 ? p.streak : 0)

function studied(p: Progress, day: number): Pick<Progress, 'streak' | 'lastDay'> {
  if (p.lastDay === day) return { streak: p.streak, lastDay: day }
  return { streak: p.lastDay === day - 1 ? p.streak + 1 : 1, lastDay: day }
}

/** Records a vocabulary session: SM-2 grades each word's first answer. Hard words join `hard`; a hard word known first try leaves it. */
export function finishWords(p: Progress, s: Session, day: number): Progress {
  const known = Object.values(s.first).filter(Boolean).length
  const hard = [...new Set([...p.hard, ...hardIn(s)])].filter((id) => !s.first[id])
  return { ...p, ...studied(p, day), xp: p.xp + known * XP_WORD, words: gradeWords(p.words, s, day), hard }
}

export const unmarkHard = (p: Progress, id: string): Progress => ({ ...p, hard: p.hard.filter((h) => h !== id) })
