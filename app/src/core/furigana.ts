// Markup: {漢字|かんじ} adds a reading; [[...]] marks the grammar point.
export type Segment = { text: string; reading?: string; mark: boolean }

const TOKEN = /\[\[|\]\]|\{([^|{}]+)\|([^|{}]+)\}|[^[\]{}]+/gy

export function parse(markup: string): Segment[] {
  const segments: Segment[] = []
  let mark = false
  let end = 0
  for (const m of markup.matchAll(TOKEN)) {
    end = m.index + m[0].length
    if (m[0] === '[[' || m[0] === ']]') {
      if (mark === (m[0] === '[[')) throw new Error(`Unbalanced [[ ]] in "${markup}"`)
      mark = m[0] === '[['
    } else if (m[1]) segments.push({ text: m[1], reading: m[2], mark })
    else segments.push({ text: m[0], mark })
  }
  if (end !== markup.length || mark) throw new Error(`Bad markup at ${end} in "${markup}"`)
  return segments
}

/** The text as written, with kanji. */
export const plain = (markup: string) => parse(markup).map((s) => s.text).join('')

/** The text in kana only; speech synthesis reads this to get readings right. */
export const kana = (markup: string) => parse(markup).map((s) => s.reading ?? s.text).join('')
