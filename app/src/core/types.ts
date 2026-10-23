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

export type Theme = 'travel' | 'food' | 'nature' | 'animals' | 'town' | 'time' | 'actions'
/** A vocabulary word; `id` is stable so saved progress survives edits to the other fields. */
export type Vocab = { id: string; jp: string; en: string; emoji: string; theme: Theme }
