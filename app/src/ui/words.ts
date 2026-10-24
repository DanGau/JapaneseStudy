import { finishWords, unmarkHard, XP_WORD } from '../core/progress'
import { answer, hardIn, MISS_LIMIT, startSession, strength, type Session } from '../core/vocab'
import type { Vocab } from '../core/types'
import { SENTENCES } from '../content/sentences'
import { PHRASES, THEME_COLORS, WORDS } from '../content/words'
import { el, esc, jp, ro, say } from './html'
import { speak, speakEnglish } from './speak'
import { parseSaved, today, type Saved } from './store'

/** A session is at most `size` cards; new ones are at most `words` words and `phrases` phrases. */
const LIMITS = { size: 12, words: 4, phrases: 1 }
/** Autoplay timing: “Train is…”, a pause to recall and say it aloud, “densha”, then the next card if the learner doesn't tap Got it. */
const REVEAL_MS = 3000
const ADVANCE_MS = 4500
/** Words answered right this many times in a row sometimes play reversed (Japanese first). */
const REVERSE_AFTER = 2
const ALL = [...WORDS, ...PHRASES]
const BY_ID = new Map(ALL.map((w) => [w.id, w]))
const IDS = ALL.map((w) => w.id)
const isPhrase = (id: string) => !!BY_ID.get(id)!.phrase

type Store = { get: () => Saved; set: (s: Saved) => void }

export function deck(root: HTMLElement, store: Store) {
  const saved = store.get()
  const day = today()
  const cards = saved.progress.words
  const counts = { new: 0, learning: 0, known: 0, learned: 0 }
  for (const id of IDS) counts[strength(cards[id])]++
  const dueNow = IDS.filter((id) => cards[id] && cards[id].due <= day).length
  const reviews = Math.min(dueNow, LIMITS.size)
  const unseen = IDS.filter((id) => !cards[id])
  const fresh = Math.min(LIMITS.size - reviews, Math.min(LIMITS.phrases, unseen.filter(isPhrase).length) + Math.min(LIMITS.words, unseen.filter((id) => !isPhrase(id)).length))
  const hard = saved.progress.hard
  const screen = el(`<div class="screen deck">
    <header class="bar"><a class="close" href="#/">✕</a></header>
    <p class="kicker">Vocabulary</p>
    <h1>Words</h1>
    <p class="goal">Each card plays by itself: “Train is… densha.” Each session adds up to 4 new words and 1 short phrase for shops and restaurants. Phrases staff say to you play in Japanese first, at full speed. Tap <b>Got it</b> when you knew the word. Words you don’t tap loop around. A word missed ${MISS_LIMIT} times moves to <b>Hard words</b>, where you learn it in a sentence instead. Then they come back over the next days and weeks, right when you’re about to forget.</p>
    <div class="tally">
      <span><b>${dueNow}</b> due today</span><span><b>${counts.known + counts.learned}</b> known</span><span><b>${counts.learned}</b> long-term</span>
    </div>
    ${reviews + fresh ? `<button class="primary go">Start: ${reviews} review + ${fresh} new ▶</button>` : '<p class="end">All done for today. Come back tomorrow!</p>'}
    ${hard.length ? `<a class="secondary hard-link" href="#/hard">🧩 Hard words (${hard.length}): learn them in sentences</a>` : ''}
    <p class="legend"><i class="new"></i>new <i class="learning"></i>learning <i class="known"></i>known <i class="learned"></i>long-term</p>
    <details class="science"><summary>🧠 Why this works</summary><ul>
      <li><b>Recall first.</b> Trying to remember before the answer shows builds memory far better than rereading (the testing effect).</li>
      <li><b>Say it out loud.</b> Speaking a word makes it stick better than reading it silently (the production effect).</li>
      <li><b>Memory hooks.</b> A silly English sound-alike linked to the meaning, like “dense crowds pack the densha”, is a proven shortcut for new words (the keyword method).</li>
      <li><b>Picture + sound + text.</b> The same word stored in several ways is easier to find again (dual coding).</li>
      <li><b>Both directions.</b> Known words sometimes play Japanese first, so you can recognize them as well as recall them.</li>
      <li><b>Spaced repetition.</b> Each word comes back just before you would forget it, at longer and longer gaps (SM-2, the method behind Anki).</li>
    </ul></details>
    <div class="grid">${ALL.map((w) => `<button class="cell ${strength(cards[w.id])}" data-id="${w.id}" title="${esc(w.en)}">${w.emoji}</button>`).join('')}</div>
    <p class="hint">Tap a picture to hear it. Your progress is saved on this device.</p>
    <div class="backup"><button class="secondary save">⬇ Save backup</button><label class="secondary">⬆ Restore<input type="file" accept="application/json" hidden></label></div>
  </div>`)
  screen.querySelector('.go')?.addEventListener('click', () => play(root, store, startSession(IDS, cards, day, LIMITS, isPhrase, Date.now())))
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
    <header class="bar"><a class="close" href="#/words">✕</a><div class="meter"><div></div></div><span class="count"></span><button class="icon pause">⏸</button></header>
    <div class="card"></div>
    <button class="primary knew">✓ Got it</button>
  </div>`)
  const card = screen.querySelector<HTMLElement>('.card')!
  const clear = () => (timers.forEach(clearTimeout), (timers = []))
  const later = (ms: number, f: () => void) => timers.push(window.setTimeout(() => screen.isConnected && f(), ms))

  const show = () => {
    clear()
    if (!session.queue.length) return done()
    const w = BY_ID.get(session.queue[0])!
    const [a, b] = THEME_COLORS[w.theme]
    const got = total - session.queue.length
    screen.querySelector<HTMLElement>('.meter div')!.style.width = `${(got / total) * 100}%`
    screen.querySelector<HTMLElement>('.count')!.textContent = `${got}/${total}`
    card.style.background = `radial-gradient(circle at 50% 35%, ${b}, ${a})`
    const reversed = w.phrase === 'hear' || ((store.get().progress.words[w.id]?.reps ?? 0) >= REVERSE_AFTER && (hash(w.id) + today()) % 2 === 1)
    const cue = `<p class="cue">🗣 Say it out loud</p><div class="timer"><div style="animation-duration:${REVEAL_MS}ms"></div></div>`
    card.innerHTML = `<div class="sparkles">${'<i></i>'.repeat(8)}</div>` + (reversed
      ? `<div class="emoji veiled">${w.emoji}</div><div class="prompt-jp">${wordHtml(w)}</div><p class="prompt-en small">${w.phrase === 'hear' ? 'What did they say?' : '…is what in English?'}</p>${cue}
         <div class="reveal-word hidden"><p class="word-ro">${esc(w.en)}</p>${hookHtml(w)}</div>`
      : `<div class="emoji">${w.emoji}</div><p class="prompt-en">${w.phrase ? `How do you say: “${esc(w.en)}”` : `${esc(w.en)} is…`}</p>${cue}
         <div class="reveal-word hidden">${wordHtml(w)}${hookHtml(w)}</div>`)
    card.classList.toggle('looped', w.id in session.first)
    card.classList.toggle('reversed', reversed)
    if (reversed) speak(w.jp, rate(w))
    else speakEnglish(w.phrase ? w.en : `${w.en} is`)
    if (!paused) later(REVEAL_MS, reveal)
  }
  const reveal = () => {
    card.querySelector('.reveal-word')!.classList.remove('hidden')
    card.classList.add('revealed')
    const w = BY_ID.get(session.queue[0])!
    if (card.classList.contains('reversed')) speakEnglish(w.en)
    else speak(w.jp, rate(w))
    if (!paused) later(ADVANCE_MS, () => next(false))
  }
  const next = (knew: boolean) => {
    if (!knew || card.querySelector('.reveal-word.hidden')) card.querySelector('.reveal-word')!.classList.remove('hidden')
    session = answer(session, knew)
    card.classList.add(knew ? 'out-good' : 'out-next')
    clear()
    later(350, () => (card.classList.remove('out-good', 'out-next'), show()))
  }
  const done = () => {
    const day = today()
    const saved = store.get()
    store.set({ ...saved, progress: finishWords(saved.progress, session, day) })
    const firstTry = Object.values(session.first).filter(Boolean).length
    const hard = hardIn(session)
    root.replaceChildren(el(`<div class="screen results">
      <div class="burst">${'<i></i>'.repeat(24)}</div>
      <p class="big-stars">🎴</p>
      <p class="detail">${hard.length ? `You got ${total - hard.length} of ${total} words.` : `You got all ${total} words!`} ${firstTry} on the first try · +${firstTry * XP_WORD} XP</p>
      ${hard.length ? `<p class="hint">Moved to Hard words, to learn in a sentence: ${hard.map((id) => BY_ID.get(id)!.emoji + ' ' + esc(BY_ID.get(id)!.en)).join(', ')}</p>` : ''}
      <p class="hint">Words that took a few loops come back tomorrow. The rest come back later and later.</p>
      <a class="primary" href="#/words">Back to words</a>
      <a class="secondary" href="#/">Map</a>
    </div>`))
  }

  screen.querySelector('.knew')!.addEventListener('click', () => next(true))
  screen.querySelector('.pause')!.addEventListener('click', (e) => {
    paused = !paused
    ;(e.target as HTMLElement).textContent = paused ? '▶' : '⏸'
    clear()
    if (paused) return
    if (card.querySelector('.reveal-word.hidden')) later(800, reveal)
    else later(1500, () => next(false))
  })
  card.addEventListener('click', () => {
    if (!card.querySelector('.reveal-word.hidden')) return speak(BY_ID.get(session.queue[0])!.jp, rate(BY_ID.get(session.queue[0])!))
    clear()
    reveal()
  })
  root.replaceChildren(screen)
  show()
}

/** Hard words: each one taught in a sentence. Try to say it in Japanese, then hear it. */
export function hardWords(root: HTMLElement, store: Store) {
  const ids = store.get().progress.hard
  const screen = el(`<div class="screen deck">
    <header class="bar"><a class="close" href="#/words">✕</a></header>
    <p class="kicker">Vocabulary</p>
    <h1>Hard words</h1>
    <p class="goal">These words didn’t stick on flashcards. Learn each one in a real sentence: read the English, try to say it in Japanese, then listen. Tap <b>I know it now</b> when it sticks.</p>
    ${ids.length ? `<div class="hard-list">${ids.map((id) => BY_ID.get(id)!).map((w) => `<button class="hard-row" data-id="${w.id}"><span class="emoji">${w.emoji}</span><span><b>${esc(w.en)}</b><br>${ro(w.jp)}</span><span class="go">▶</span></button>`).join('')}</div>`
      : '<p class="end">No hard words. Nice!</p>'}
  </div>`)
  for (const b of screen.querySelectorAll<HTMLElement>('.hard-row')) b.addEventListener('click', () => sentence(root, store, ids.indexOf(b.dataset.id!)))
  root.replaceChildren(screen)
}

function sentence(root: HTMLElement, store: Store, i: number) {
  const ids = store.get().progress.hard
  if (!ids.length) return hardWords(root, store)
  const w = BY_ID.get(ids[i % ids.length])!
  const [jpLine, en] = SENTENCES[w.id] ?? [`[[${w.jp}]]`, w.en]
  const [a, b] = THEME_COLORS[w.theme]
  const screen = el(`<div class="screen play">
    <header class="bar"><a class="close" href="#/hard">✕</a><span class="count">${(i % ids.length) + 1}/${ids.length}</span></header>
    <div class="card sentence-card" style="background:radial-gradient(circle at 50% 35%, ${b}, ${a})">
      <div class="emoji">${w.emoji}</div>
      <p class="prompt-en">“${esc(en)}”</p>
      <p class="cue">🗣 Try saying it in Japanese</p><div class="timer"><div style="animation-duration:${REVEAL_MS}ms"></div></div>
      <div class="reveal-word hidden"><div class="sentence">${say(jpLine)}</div><p class="small">${esc(w.en)} = <b>${ro(w.jp)}</b></p>${hookHtml(w)}</div>
    </div>
    <div class="row"><button class="secondary again">🔊 Again</button><button class="secondary next">Next ▶</button></div>
    <button class="primary knew">✓ I know it now</button>
  </div>`)
  const card = screen.querySelector<HTMLElement>('.card')!
  const reveal = () => {
    card.querySelector('.reveal-word')!.classList.remove('hidden')
    card.classList.add('revealed')
    speak(jpLine, 0.8)
  }
  const timer = window.setTimeout(() => screen.isConnected && reveal(), REVEAL_MS)
  card.addEventListener('click', () => (clearTimeout(timer), reveal()))
  screen.querySelector('.again')!.addEventListener('click', () => (clearTimeout(timer), reveal()))
  screen.querySelector('.next')!.addEventListener('click', () => (clearTimeout(timer), sentence(root, store, i + 1)))
  screen.querySelector('.knew')!.addEventListener('click', () => {
    clearTimeout(timer)
    const saved = store.get()
    store.set({ ...saved, progress: unmarkHard(saved.progress, w.id) })
    sentence(root, store, i)
  })
  root.replaceChildren(screen)
  speakEnglish(en)
}

/** Single words play slowly; phrases play at the speed staff actually talk. */
const rate = (w: Vocab) => (w.phrase ? 1.1 : 0.8)
const wordHtml = (w: Vocab) => `<p class="word-ro">${ro(w.jp)}</p><p class="word-jp">${jp(w.jp)}</p>`
// Hooks are trusted content with <i> markup, so they are not escaped.
const hookHtml = (w: Vocab) => `<p class="hook">💡 ${w.hook}</p>`
const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)
