export type Theme = 'travel' | 'food' | 'nature' | 'animals' | 'town' | 'time' | 'actions' | 'order' | 'staff' | 'climb'
/** A vocabulary word; `id` is stable so saved progress survives edits to the other fields. */
/** `phrase`: a short sentence you say, or one staff say to you (played Japanese first, at full speed). */
export type Vocab = { id: string; jp: string; en: string; emoji: string; theme: Theme; hook: string; phrase?: 'say' | 'hear' }

/** A Prep cheat sheet: what to say and order at one place. `jp` lines are furigana markup. */
export type PrepLine = { jp: string; en: string; price?: string; note?: string }
export type Prep = { id: string; emoji: string; title: string; jpTitle: string; where: string; goal: string; sections: { title: string; note?: string; lines: PrepLine[] }[] }
