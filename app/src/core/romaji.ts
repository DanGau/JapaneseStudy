import { parse } from './furigana'

// Hepburn romaji from furigana markup. Spaces in the markup separate words.
export type Piece = { text: string; mark: boolean }

const BASE: Record<string, string> = {
  あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
  か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko', が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
  さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so', ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo',
  た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to', だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do',
  な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no',
  は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho', ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo',
  ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po',
  ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo', や: 'ya', ゆ: 'yu', よ: 'yo',
  ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro', わ: 'wa', を: 'o', ん: 'n', ゔ: 'vu',
  ぁ: 'a', ぃ: 'i', ぅ: 'u', ぇ: 'e', ぉ: 'o',
  '。': '.', '、': ',', '！': '!', '？': '?', '…': '...', '〜': '~', '～': '~', '♪': '♪', ' ': ' ',
}
const SMALL_Y: Record<string, string> = { ゃ: 'a', ゅ: 'u', ょ: 'o' }
const SMALL_VOWELS = 'ぁぃぅぇぉ'
const WORD_END = /^[ 。、！？…]?$/

const hiragana = (c: string) => (c >= 'ァ' && c <= 'ヶ' ? String.fromCharCode(c.charCodeAt(0) - 0x60) : c)

/** True if every character of the markup's reading has a romaji spelling. */
export const romanizable = (markup: string) =>
  [...parse(markup).map((s) => s.reading ?? s.text).join('')].every((c) => hiragana(c) in BASE || c === 'っ' || c === 'ッ' || c === 'ー' || hiragana(c) in SMALL_Y)

export function romaji(markup: string): Piece[] {
  const units = parse(markup).flatMap((s) => [...(s.reading ?? s.text)].map((c) => ({ c: hiragana(c), mark: s.mark })))
  const pieces: Piece[] = []
  let double = false
  let vowel = ''
  let out = ''
  const emit = (text: string, mark: boolean) => {
    if (double && /^[a-z]/.test(text)) text = (text.startsWith('ch') ? 't' : text[0]) + text
    double = false
    if (/^[a-z]/.test(text) && (out === '' || /[.!?] ?$/.test(out))) text = text[0].toUpperCase() + text.slice(1)
    if (/^[a-zA-Z]/.test(text) && /[.,!?]$/.test(out)) text = ' ' + text
    out += text
    vowel = /[aiueo]$/.test(text) ? text.at(-1)! : vowel
    const last = pieces.at(-1)
    if (last && last.mark === mark) last.text += text
    else pieces.push({ text, mark })
  }
  for (let i = 0; i < units.length; i++) {
    const { c, mark } = units[i]
    const next = units[i + 1]?.c ?? ''
    const prev = units[i - 1]?.c ?? ''
    if (c === 'っ') double = true
    else if (c === 'ー') emit(vowel, mark)
    else if (SMALL_Y[next] && BASE[c]) {
      const stem = BASE[c].slice(0, -1)
      emit((/(sh|ch|j)$/.test(stem) ? stem : stem + 'y') + SMALL_Y[next], mark)
      i++
    } else if (next && SMALL_VOWELS.includes(next) && BASE[c] && !SMALL_VOWELS.includes(c)) {
      emit(BASE[c].slice(0, -1) + BASE[next], mark)
      i++
    } else if (c === 'ん') emit(/^[aiueoy]/.test(BASE[next] ?? '') ? "n'" : 'n', mark)
    else if (c === 'は' && WORD_END.test(next)) emit('wa', mark)
    else if (c === 'へ' && WORD_END.test(next) && WORD_END.test(prev)) emit('e', mark)
    else emit(BASE[c] ?? c, mark)
  }
  return pieces
}

export const romajiText = (markup: string) => romaji(markup).map((p) => p.text).join('')
