import { PREPS } from '../content/prep'
import { el, esc, jp, say } from './html'
import { speak } from './speak'

/** Prep: cheat sheets for a place you are about to go. Tap a line to hear it. */
export function prepList(root: HTMLElement) {
  root.replaceChildren(el(`<div class="screen deck">
    <header class="bar"><a class="close" href="#/">✕</a></header>
    <p class="kicker">Prep</p>
    <h1>Cheat sheets</h1>
    <p class="goal">Short lists for somewhere you are about to go. Tap any line to hear it, or show the screen to staff.</p>
    <div class="hard-list">${PREPS.map((p) => `<a class="hard-row" href="#/prep/${p.id}"><span class="emoji">${p.emoji}</span><span><b>${esc(p.title)}</b><br>${esc(p.goal)}</span><span class="go">▶</span></a>`).join('')}</div>
  </div>`))
}

export function prepSheet(root: HTMLElement, id: string) {
  const p = PREPS.find((x) => x.id === id)
  if (!p) return prepList(root)
  const lines = p.sections.flatMap((s) => s.lines)
  const screen = el(`<div class="screen deck prep">
    <header class="bar"><a class="close" href="#/prep">✕</a></header>
    <p class="kicker">${esc(p.where)}</p>
    <h1>${p.emoji} ${esc(p.title)}</h1>
    <p class="jp-title">${jp(p.jpTitle)}</p>
    <p class="goal">${esc(p.goal)}</p>
    ${p.sections.map((s) => `<section><h2>${esc(s.title)}</h2>${s.note ? `<p class="hint">${esc(s.note)}</p>` : ''}
      ${s.lines.map((l) => `<button class="prep-line" data-i="${lines.indexOf(l)}">
        <span class="prep-jp">${say(l.jp)}</span>
        <span class="prep-en">${esc(l.en)}${l.price ? ` <b>${esc(l.price)}</b>` : ''}</span>
        ${l.note ? `<span class="prep-note">${esc(l.note)}</span>` : ''}
      </button>`).join('')}</section>`).join('')}
  </div>`)
  for (const b of screen.querySelectorAll<HTMLElement>('.prep-line')) b.addEventListener('click', () => speak(lines[+b.dataset.i!].jp, 0.9))
  root.replaceChildren(screen)
}
