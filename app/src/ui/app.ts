import { scene } from '../art/scene'
import { due, finishChapter, finishReview, starsFor, streak, unlocked, XP_CORRECT, XP_PERFECT, XP_REVIEW } from '../core/progress'
import type { Chapter, Question } from '../core/types'
import { CHAPTERS } from '../content/chapters'
import { display, el, esc, jp, ro, say, stars } from './html'
import { quiz } from './quiz'
import { load, save, today } from './store'
import { speak } from './speak'
import { prepList, prepSheet } from './prep'
import { deck, hardWords } from './words'

const REVIEW_SIZE = 10
const IDS = CHAPTERS.map((c) => c.id)

let saved = load()

const commit = () => (save(saved), Object.assign(display, { romaji: saved.romaji, kanji: saved.kanji }))

export function start(root: HTMLElement) {
  commit()
  const words = { get: () => saved, set: (s: typeof saved) => ((saved = s), commit()) }
  const route = () => {
    const [, page, id] = location.hash.split('/')
    const chapter = CHAPTERS.find((c) => c.id === id)
    window.scrollTo(0, 0)
    if (page === 'intro' && chapter) intro(root, chapter)
    else if (page === 'story' && chapter) story(root, chapter)
    else if (page === 'grammar' && chapter) grammar(root, chapter)
    else if (page === 'quiz' && chapter) chapterQuiz(root, chapter)
    else if (page === 'review') review(root)
    else if (page === 'words') deck(root, words)
    else if (page === 'hard') hardWords(root, words)
    else if (page === 'prep' && id) prepSheet(root, id)
    else if (page === 'prep') prepList(root)
    else map(root)
  }
  addEventListener('hashchange', route)
  route()
}

function map(root: HTMLElement) {
  const p = saved.progress
  const day = today()
  const dueCount = due(p, day).length
  const screen = el(`<div class="screen map">
    <header class="hud">
      <div><h1>狐の道</h1><p class="sub">Kitsune Road</p></div>
      <div class="stats"><span title="Streak">🔥 ${streak(p, day)}</span><span title="XP">✨ ${p.xp}</span></div>
    </header>
    <a class="words-tile" href="#/words"><span class="emoji">🎴</span><span><b>Words</b><br>Picture flashcards that play on their own</span><span class="go">▶</span></a>
    <a class="words-tile prep-tile" href="#/prep"><span class="emoji">📋</span><span><b>Prep</b><br>Cheat sheets for where you’re about to go</span><span class="go">▶</span></a>
    <div class="actions">
      <a class="review ${dueCount ? '' : 'idle'}" href="${dueCount ? '#/review' : '#/'}">🃏 Review ${dueCount ? `<b>${dueCount} due</b>` : '— all caught up'}</a>
    </div>
    <div class="settings">
      <button class="toggle" data-key="romaji">Romaji: <b>${saved.romaji ? 'on' : 'off'}</b></button>
      <button class="toggle" data-key="kanji">Japanese: <b>${saved.kanji ? 'kanji' : 'kana'}</b></button>
    </div>
    <ol class="path">${CHAPTERS.map((c, i) => {
      const open = unlocked(IDS, p, i)
      const s = p.stars[c.id] ?? 0
      return `<li><a class="chapter ${open ? '' : 'locked'}" href="${open ? `#/intro/${c.id}` : '#/'}">
        <div class="thumb">${scene(c.story[0].scene)}</div>
        <div class="info"><span class="num">${i + 1}</span><h2>${esc(c.title)}</h2><p>${say(c.jpTitle)}</p>
        <p class="pattern">${open ? esc(c.grammar.pattern) : '🔒 Finish the last chapter'}</p><p class="stars">${stars(s)}</p></div>
      </a></li>`
    }).join('')}</ol>
  </div>`)
  for (const b of screen.querySelectorAll<HTMLElement>('.toggle')) {
    b.addEventListener('click', () => {
      const key = b.dataset.key as 'romaji' | 'kanji'
      saved = { ...saved, [key]: !saved[key] }
      commit()
      map(root)
    })
  }
  root.replaceChildren(screen)
}

function intro(root: HTMLElement, c: Chapter) {
  root.replaceChildren(el(`<div class="screen intro">
    <header class="bar"><a class="close" href="#/">✕</a></header>
    <div class="thumb big-thumb">${scene(c.story[0].scene)}</div>
    <p class="kicker">Chapter ${IDS.indexOf(c.id) + 1}</p>
    <h1>${esc(c.title)}</h1>
    <p class="goal">You will learn how to say: <b>${esc(c.grammar.meaning)}</b></p>
    <ol class="steps">
      <li><b>Read the story.</b> Each line is a short Japanese sentence. Tap 🔊 to hear it and EN to see the English.</li>
      <li><b>Learn the pattern.</b> A short explanation with examples.</li>
      <li><b>Practice.</b> ${c.quiz.length} questions. Get one right to unlock the next chapter.</li>
    </ol>
    <a class="primary" href="#/story/${c.id}">Start the story ▶</a>
  </div>`))
}

function story(root: HTMLElement, c: Chapter) {
  let i = 0
  const screen = el(`<div class="screen story">
    <div class="stage"></div>
    <header class="bar over"><a class="close" href="#/">✕</a><div class="dots">${c.story.map(() => '<i></i>').join('')}</div></header>
    <section class="dialogue">
      <p class="speaker"></p><p class="spoken"></p><p class="en hidden"></p><div class="words"></div>
      <p class="hint">🔊 hear it · EN shows the English · Next to continue</p>
      <div class="controls"><button class="icon say">🔊</button><button class="icon en-btn">EN</button><button class="primary next">Next ▶</button></div>
    </section>
  </div>`)
  const $ = <T extends HTMLElement>(s: string) => screen.querySelector<T>(s)!
  const show = () => {
    const p = c.story[i]
    $('.stage').innerHTML = scene(p.scene)
    $('.speaker').textContent = p.speaker
    $('.spoken').innerHTML = say(p.jp)
    $('.en').textContent = p.en
    $('.en').classList.add('hidden')
    $('.words').innerHTML = (p.words ?? []).map((w) => `<span class="word"><b>${ro(w.jp)}</b> ${jp(w.jp)} = ${esc(w.en)}</span>`).join('')
    screen.querySelectorAll('.dots i').forEach((d, j) => d.classList.toggle('on', j <= i))
    $('.next').textContent = i === c.story.length - 1 ? 'Learn the pattern ▶' : 'Next ▶'
    $('.dialogue').classList.remove('pop')
    void $('.dialogue').offsetWidth
    $('.dialogue').classList.add('pop')
  }
  const next = () => (i === c.story.length - 1 ? (location.hash = `#/grammar/${c.id}`) : (i++, show()))
  $('.next').addEventListener('click', next)
  $('.stage').addEventListener('click', next)
  $('.say').addEventListener('click', () => speak(c.story[i].jp))
  $('.en-btn').addEventListener('click', () => $('.en').classList.toggle('hidden'))
  root.replaceChildren(screen)
  show()
}

function grammar(root: HTMLElement, c: Chapter) {
  const g = c.grammar
  const screen = el(`<div class="screen grammar">
    <header class="bar"><a class="close" href="#/">✕</a></header>
    <p class="kicker">Step 2 of 3 · Learn the pattern</p>
    <h1 class="pattern">${ro(g.pattern)}</h1><p class="pattern-jp">${jp(g.pattern)}</p>
    <p class="meaning">${esc(g.meaning)}</p>
    <p class="how">${esc(g.how)}</p>
    <ul class="examples">${g.examples.map((e, i) => `<li><button class="icon say" data-i="${i}">🔊</button><div><p class="said">${say(e.jp)}</p><p class="en">${esc(e.en)}</p></div></li>`).join('')}</ul>
    <a class="primary" href="#/quiz/${c.id}">Practice: ${c.quiz.length} questions ▶</a>
    <a class="secondary" href="#/story/${c.id}">↺ Replay story</a>
  </div>`)
  for (const b of screen.querySelectorAll<HTMLElement>('.say')) b.addEventListener('click', () => speak(g.examples[Number(b.dataset.i)].jp))
  root.replaceChildren(screen)
}

function chapterQuiz(root: HTMLElement, c: Chapter) {
  quiz(root, 'Step 3 of 3 · Practice', c.quiz, Date.now(), (results) => {
    const correct = results.filter(Boolean).length
    saved = { ...saved, progress: finishChapter(saved.progress, c.id, results, today()) }
    commit()
    const xp = correct * XP_CORRECT + (correct === results.length ? XP_PERFECT : 0)
    const next = CHAPTERS[IDS.indexOf(c.id) + 1]
    finish(root, stars(starsFor(correct, results.length)), `${correct}/${results.length} correct · +${xp} XP`,
      next ? `<a class="primary" href="#/intro/${next.id}">Next: ${esc(next.title)} ▶</a>` : '<p class="end">You finished every chapter. More coming soon!</p>',
      () => chapterQuiz(root, c))
  })
}

function review(root: HTMLElement) {
  const keys = due(saved.progress, today()).slice(0, REVIEW_SIZE)
  const questions = keys.map((k): Question => {
    const [id, n] = k.split(':')
    return CHAPTERS.find((c) => c.id === id)!.quiz[Number(n)]
  })
  if (!questions.length) return void (location.hash = '#/')
  quiz(root, 'Review', questions, Date.now(), (results) => {
    const graded = Object.fromEntries(keys.map((k, i) => [k, results[i]]))
    saved = { ...saved, progress: finishReview(saved.progress, graded, today()) }
    commit()
    const correct = results.filter(Boolean).length
    finish(root, '🃏', `${correct}/${results.length} remembered · +${correct * XP_REVIEW} XP`, '', () => review(root))
  })
}

function finish(root: HTMLElement, headline: string, detail: string, next: string, retry: () => void) {
  const screen = el(`<div class="screen results">
    <div class="burst">${'<i></i>'.repeat(24)}</div>
    <p class="big-stars">${headline}</p>
    <p class="detail">${esc(detail)}</p>
    ${next}
    <button class="secondary retry">↺ Try again</button>
    <a class="secondary" href="#/">Map</a>
  </div>`)
  screen.querySelector('.retry')!.addEventListener('click', retry)
  root.replaceChildren(screen)
}
