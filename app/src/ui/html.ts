import { parse } from '../core/furigana'
import { romaji } from '../core/romaji'

export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

/** How Japanese is shown; app.ts sets it from the saved settings. */
export const display = { romaji: true, kanji: false }

const marked = (pieces: { html: string; mark: boolean }[]) =>
  pieces.map((p, i) => {
    const open = p.mark && !pieces[i - 1]?.mark ? '<mark>' : ''
    const close = p.mark && !pieces[i + 1]?.mark ? '</mark>' : ''
    return open + p.html + close
  }).join('')

/** Japanese script: kanji with furigana (no word spaces), or kana with word spaces. */
export const jp = (markup: string) =>
  marked(parse(markup).map((s) => ({
    mark: s.mark,
    html: display.kanji
      ? s.reading ? `<ruby>${esc(s.text)}<rt>${esc(s.reading)}</rt></ruby>` : esc(s.text.replaceAll(' ', ''))
      : esc(s.reading ?? s.text),
  })))

export const ro = (markup: string) => marked(romaji(markup).map((p) => ({ html: esc(p.text), mark: p.mark })))

/** Romaji on top (when enabled), Japanese script beneath. */
export const say = (markup: string) =>
  `${display.romaji ? `<span class="ro">${ro(markup)}</span>` : ''}<span class="jp">${jp(markup)}</span>`

export function el(html: string): HTMLElement {
  const t = document.createElement('template')
  t.innerHTML = html.trim()
  return t.content.firstElementChild as HTMLElement
}
