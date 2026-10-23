import { finishWords, XP_WORD } from '../core/progress'
import { answer, startSession, strength, type Session } from '../core/vocab'
import type { Vocab } from '../core/types'
import { THEME_COLORS, WORDS } from '../content/words'
import { el, esc, jp, ro } from './html'
import { speak, speakEnglish } from './speak'
import { parseSaved, today, type Saved } from './store'

const NEW_PER_SESSION = 8
/** Autoplay timing: prompt, then the answer, then the next card if the learner doesn't tap. */
const REVEAL_MS = 2800
const ADVANCE_MS = 3800
const BY_ID = new Map(WORDS.map((w) => [w.id, w]))
const IDS = WORDS.map((w) => w.id)

type Store = { get: () => Saved; set: (s: Saved) => void }

export function deck(root: HTMLElement, store: Store) {
  const saved = store.get()
  const day = today()
  const cards = saved.progress.words
  const counts = { new: 0, learning: 0, known: 0, learned: 0 }
  for (const id of IDS) counts[strength(cards[id])]++
  const dueNow = IDS.filter((id) => cards[id] && cards[id].due <= day).length
  const fresh = Math.min(NEW_PER_SESSION, counts.new)
  const screen = el(`<div class="screen deck">
    <header class="bar"><a class="close" href="#/">✕</a></header>
    <p class="kicker">Vocabulary</p>
    <h1>Words</h1>
    <p class="goal">Pictures and sounds that play on their own. Tap <b>I knew it</b> when you remember a word. Words you miss come back until you know them, then again over the next days and weeks at the best time to remember them.</p>
    <div class="tally">
      <span><b>${dueNow}</b> due today</span><span><b>${counts.known + counts.learned}</b> known</span><span><b>${counts.learned}</b> long-term</span>
    </div>
    ${dueNow + fresh ? `<button class="primary go">Start: ${dueNow} review + ${fresh} new ▶</button>` : '<p class="end">All done for today. Come back tomorrow!</p>'}
    <p class="legend"><i class="new"></i>new <i class="learning"></i>learning <i class="known"></i>known <i class="learned"></i>long-term</p>
    <div class="grid">${WORDS.map((w) => `<button class="cell ${strength(cards[w.id])}" data-id="${w.id}" title="${esc(w.en)}">${w.emoji}</button>`).join('')}</div>
    <p class="hint">Tap a picture to hear it. Your progress is saved on this device.</p>
    <div class="backup"><button class="secondary save">⬇ Save backup</button><label class="secondary">⬆ Restore<input type="file" accept="application/json" hidden></label></div>
  </div>`)
  screen.querySelector('.go')?.addEventListener('click', () => play(root, store, startSession(IDS, cards, day, NEW_PER_SESSION, Date.now())))
  for (const b of screen.querySelectorAll<HTMLElement>('.cell')) {
    b.addEventListener('click', () => {
      const w = BY_ID.get(b.dataset.id!)!
      b.title = `${w.en} = ${ro(w.jp).replace(/<[^>]+>/g, '')}`
      speak(w.jp)
    })
  }
  screen.querySelector('.save')!.addEventListener('click', () => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([JSON.stringify(store.get())], { type: 'application/json' }))
    a.download = `kitsune-road-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
  })
  screen.querySelector('input')!.addEventListener('change', async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return
    try {
      store.set(parseSaved(await file.text()))
      deck(root, store)
    } catch {
      alert('That file is not a Kitsune Road backup.')
    }
  })
  root.replaceChildren(screen)
}

function play(root: HTMLElement, store: Store, start: Session) {
  let session = start
  const total = start.queue.length
  let timers: number[] = []
  let paused = false
  const screen = el(`<div class="screen play">
    <header class="bar"><a class="close" href="#/words">✕</a><div class="meter"><div></div></div><button class="icon pause">⏸</button></header>
    <div class="card"></div>
    <div class="answers"><button class="secondary again">↺ Again</button><button class="primary knew">✓ I knew it</button></div>
  </div>`)
  const card = screen.querySelector<HTMLElement>('.card')!
  const clear = () => (timers.forEach(clearTimeout), (timers = []))
  const later = (ms: number, f: () => void) => timers.push(window.setTimeout(() => screen.isConnected && f(), ms))

  const show = () => {
    clear()
    if (!session.queue.length) return done()
    const w = BY_ID.get(session.queue[0])!
    const [a, b] = THEME_COLORS[w.theme]
    screen.querySelector<HTMLElement>('.meter div')!.style.width = `${((total - new Set(session.queue).size) / total) * 100}%`
    card.style.background = `radial-gradient(circle at 50% 35%, ${b}, ${a})`
    card.innerHTML = `<div class="sparkles">${'<i></i>'.repeat(8)}</div><div class="emoji">${w.emoji}</div>
      <p class="prompt-en">${esc(w.en)} is…</p><div class="reveal-word hidden">${wordHtml(w)}</div>`
    speakEnglish(`${w.en} is`)
    if (!paused) later(REVEAL_MS, reveal)
  }
  const reveal = () => {
    card.querySelector('.reveal-word')!.classList.remove('hidden')
    speak(BY_ID.get(session.queue[0])!.jp, 0.8)
    if (!paused) later(ADVANCE_MS, () => next(false))
  }
  const next = (knew: boolean) => {
    if (!knew || card.querySelector('.reveal-word.hidden')) card.querySelector('.reveal-word')!.classList.remove('hidden')
    session = answer(session, knew)
    card.classList.add(knew ? 'out-good' : 'out-again')
    clear()
    later(knew ? 350 : 900, () => (card.classList.remove('out-good', 'out-again'), show()))
  }
  const done = () => {
    const day = today()
    const saved = store.get()
    store.set({ ...saved, progress: finishWords(saved.progress, session, day) })
    const firstTry = Object.values(session.first).filter(Boolean).length
    root.replaceChildren(el(`<div class="screen results">
      <div class="burst">${'<i></i>'.repeat(24)}</div>
      <p class="big-stars">🎴</p>
      <p class="detail">${total} words practiced · ${firstTry} known on the first try · +${firstTry * XP_WORD} XP</p>
      <p class="hint">Missed words come back tomorrow. Known words come back later and later.</p>
      <a class="primary" href="#/words">Back to words</a>
      <a class="secondary" href="#/">Map</a>
    </div>`))
  }

  screen.querySelector('.knew')!.addEventListener('click', () => next(true))
  screen.querySelector('.again')!.addEventListener('click', () => next(false))
  screen.querySelector('.pause')!.addEventListener('click', (e) => {
    paused = !paused
    ;(e.target as HTMLElement).textContent = paused ? '▶' : '⏸'
    clear()
    if (paused) return
    if (card.querySelector('.reveal-word.hidden')) later(800, reveal)
    else later(1500, () => next(false))
  })
  card.addEventListener('click', () => {
    if (!card.querySelector('.reveal-word.hidden')) return speak(BY_ID.get(session.queue[0])!.jp, 0.8)
    clear()
    reveal()
  })
  root.replaceChildren(screen)
  show()
}

const wordHtml = (w: Vocab) => `<p class="word-ro">${ro(w.jp)}</p><p class="word-jp">${jp(w.jp)}</p>`
