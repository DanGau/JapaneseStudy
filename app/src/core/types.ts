export type Sky = 'day' | 'dusk' | 'night' | 'dawn' | 'rain'
export type Prop =
  | 'stars' | 'moon' | 'milkyway' | 'mountains' | 'city' | 'bamboo'
  | 'shrine' | 'torii' | 'sakura' | 'train' | 'ramen' | 'lanterns'
/** Actors are emoji, standing left to right. */
export type Scene = { sky: Sky; props: Prop[]; actors: string[] }

/** Japanese fields use furigana markup; see furigana.ts. */
export type Word = { jp: string; en: string }
export type Panel = { scene: Scene; speaker: string; jp: string; en: string; words?: Word[] }
export type Example = { jp: string; en: string }
export type Grammar = { pattern: string; meaning: string; how: string; examples: Example[] }

/** `jp` holds ＿＿ where the answer goes; `options[0]` is the answer. */
export type Choice = { kind: 'choice'; jp: string; en: string; options: string[]; why: string }
/** `tiles` in answer order; `decoys` are wrong tiles mixed in. */
export type Build = { kind: 'build'; en: string; tiles: string[]; decoys?: string[] }
export type Question = Choice | Build

export type Chapter = { id: string; title: string; jpTitle: string; grammar: Grammar; story: Panel[]; quiz: Question[] }

export const BLANK = '＿＿'

export type Theme = 'travel' | 'food' | 'nature' | 'animals' | 'town' | 'time' | 'actions' | 'order' | 'staff' | 'climb'
/** A vocabulary word; `id` is stable so saved progress survives edits to the other fields. */
/** `phrase`: a short sentence you say, or one staff say to you (played Japanese first, at full speed). */
export type Vocab = { id: string; jp: string; en: string; emoji: string; theme: Theme; hook: string; phrase?: 'say' | 'hear' }

/** A Prep cheat sheet: what to say and order at one place. `jp` lines are furigana markup. */
export type PrepLine = { jp: string; en: string; price?: string; note?: string }
export type Prep = { id: string; emoji: string; title: string; jpTitle: string; where: string; goal: string; sections: { title: string; note?: string; lines: PrepLine[] }[] }
