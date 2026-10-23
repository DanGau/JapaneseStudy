import { parse } from '../core/furigana'

export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

/** Furigana markup as HTML: <ruby> for readings, <mark> for the grammar point. */
export const ruby = (markup: string) =>
  parse(markup)
    .map((s, i, all) => {
      const text = s.reading ? `<ruby>${esc(s.text)}<rt>${esc(s.reading)}</rt></ruby>` : esc(s.text)
      const open = s.mark && !all[i - 1]?.mark ? '<mark>' : ''
      const close = s.mark && !all[i + 1]?.mark ? '</mark>' : ''
      return open + text + close
    })
    .join('')

export function el(html: string): HTMLElement {
  const t = document.createElement('template')
  t.innerHTML = html.trim()
  return t.content.firstElementChild as HTMLElement
}

export const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(3 - n)
