import { streak } from '../core/progress'
import { display, el } from './html'
import { prepList, prepSheet } from './prep'
import { load, save, today } from './store'
import { deck, hardWords } from './words'

let saved = load()

const commit = () => (save(saved), Object.assign(display, { romaji: saved.romaji, kanji: saved.kanji }))

export function start(root: HTMLElement) {
  commit()
  const words = { get: () => saved, set: (s: typeof saved) => ((saved = s), commit()) }
  const route = () => {
    const [, page, id] = location.hash.split('/')
    window.scrollTo(0, 0)
    if (page === 'words') deck(root, words)
    else if (page === 'hard') hardWords(root, words)
    else if (page === 'prep' && id) prepSheet(root, id)
    else if (page === 'prep') prepList(root)
    else home(root)
  }
  addEventListener('hashchange', route)
  route()
}

function home(root: HTMLElement) {
  const p = saved.progress
  const day = today()
  const screen = el(`<div class="screen home">
    <header class="hud">
      <div><h1>狐の道</h1><p class="sub">Kitsune Road</p></div>
      <div class="stats"><span title="Streak">🔥 ${streak(p, day)}</span><span title="XP">✨ ${p.xp}</span></div>
    </header>
    <a class="words-tile" href="#/words"><span class="emoji">🎴</span><span><b>Words</b><br>Picture flashcards that play on their own</span><span class="go">▶</span></a>
    <a class="words-tile prep-tile" href="#/prep"><span class="emoji">📋</span><span><b>Prep</b><br>Cheat sheets for where you’re about to go</span><span class="go">▶</span></a>
    <div class="settings">
      <button class="toggle" data-key="romaji">Romaji: <b>${saved.romaji ? 'on' : 'off'}</b></button>
      <button class="toggle" data-key="kanji">Japanese: <b>${saved.kanji ? 'kanji' : 'kana'}</b></button>
    </div>
  </div>`)
  for (const b of screen.querySelectorAll<HTMLElement>('.toggle')) {
    b.addEventListener('click', () => {
      const key = b.dataset.key as 'romaji' | 'kanji'
      saved = { ...saved, [key]: !saved[key] }
      commit()
      home(root)
    })
  }
  root.replaceChildren(screen)
}
