import { scene } from '../art/scene'
import { due, finishChapter, finishReview, starsFor, streak, unlocked, XP_CORRECT, XP_PERFECT, XP_REVIEW } from '../core/progress'
import type { Chapter, Question } from '../core/types'
import { CHAPTERS } from '../content/chapters'
import { el, esc, ruby, stars } from './html'
import { quiz } from './quiz'
import { load, save, today } from './store'
import { speak } from './speak'

const REVIEW_SIZE = 10
const IDS = CHAPTERS.map((c) => c.id)

let saved = load()

const commit = () => (save(saved), document.body.classList.toggle('no-furigana', !saved.furigana))

export function start(root: HTMLElement) {
  commit()
  const route = () => {
    const [, page, id] = location.hash.split('/')
    const chapter = CHAPTERS.find((c) => c.id === id)
    window.scrollTo(0, 0)
    if (page === 'story' && chapter) story(root, chapter)
    else if (page === 'grammar' && chapter) grammar(root, chapter)
    else if (page === 'quiz' && chapter) chapterQuiz(root, chapter)
    else if (page === 'review') review(root)
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
    <div class="actions">
      <a class="review ${dueCount ? '' : 'idle'}" href="${dueCount ? '#/review' : '#/'}">🃏 Review ${dueCount ? `<b>${dueCount} due</b>` : '— all caught up'}</a>
      <button class="toggle">${saved.furigana ? 'ふりがな ON' : 'ふりがな OFF'}</button>
    </div>
    <ol class="path">${CHAPTERS.map((c, i) => {
      const open = unlocked(IDS, p, i)
      const s = p.stars[c.id] ?? 0
      return `<li><a class="chapter ${open ? '' : 'locked'}" href="${open ? `#/story/${c.id}` : '#/'}">
        <div class="thumb">${scene(c.story[0].scene)}</div>
        <div class="info"><span class="num">${i + 1}</span><h2 class="jp">${ruby(c.jpTitle)}</h2><p>${esc(c.title)}</p>
        <p class="pattern">${open ? esc(c.grammar.pattern) : '🔒 Finish the last chapter'}</p><p class="stars">${stars(s)}</p></div>
      </a></li>`
    }).join('')}</ol>
  </div>`)
  screen.querySelector('.toggle')!.addEventListener('click', () => {
    saved = { ...saved, furigana: !saved.furigana }
    commit()
    map(root)
  })
  root.replaceChildren(screen)
}

function story(root: HTMLElement, c: Chapter) {
  let i = 0
  const screen = el(`<div class="screen story">
    <div class="stage"></div>
    <header class="bar over"><a class="close" href="#/">✕</a><div class="dots">${c.story.map(() => '<i></i>').join('')}</div></header>
    <section class="dialogue">
      <p class="speaker"></p><p class="jp line"></p><p class="en hidden"></p><div class="words"></div>
      <div class="controls"><button class="icon say">🔊</button><button class="icon en-btn">EN</button><button class="primary next">Next ▶</button></div>
    </section>
  </div>`)
  const $ = <T extends HTMLElement>(s: string) => screen.querySelector<T>(s)!
  const show = () => {
    const p = c.story[i]
    $('.stage').innerHTML = scene(p.scene)
    $('.speaker').textContent = p.speaker
    $('.line').innerHTML = ruby(p.jp)
    $('.en').textContent = p.en
    $('.en').classList.add('hidden')
    $('.words').innerHTML = (p.words ?? []).map((w) => `<span class="word"><span class="jp">${ruby(w.jp)}</span> ${esc(w.en)}</span>`).join('')
    screen.querySelectorAll('.dots i').forEach((d, j) => d.classList.toggle('on', j <= i))
    $('.next').textContent = i === c.story.length - 1 ? 'Grammar ▶' : 'Next ▶'
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
    <p class="kicker">Grammar spotlight</p>
    <h1 class="pattern jp">${esc(g.pattern)}</h1>
    <p class="meaning">${esc(g.meaning)}</p>
    <p class="how">${esc(g.how)}</p>
    <ul class="examples">${g.examples.map((e, i) => `<li><button class="icon say" data-i="${i}">🔊</button><div><p class="jp">${ruby(e.jp)}</p><p class="en">${esc(e.en)}</p></div></li>`).join('')}</ul>
    <a class="primary" href="#/quiz/${c.id}">Start quiz ▶</a>
    <a class="secondary" href="#/story/${c.id}">↺ Replay story</a>
  </div>`)
  for (const b of screen.querySelectorAll<HTMLElement>('.say')) b.addEventListener('click', () => speak(g.examples[Number(b.dataset.i)].jp))
  root.replaceChildren(screen)
}

function chapterQuiz(root: HTMLElement, c: Chapter) {
  quiz(root, c.grammar.pattern, c.quiz, Date.now(), (results) => {
    const correct = results.filter(Boolean).length
    saved = { ...saved, progress: finishChapter(saved.progress, c.id, results, today()) }
    commit()
    const xp = correct * XP_CORRECT + (correct === results.length ? XP_PERFECT : 0)
    const next = CHAPTERS[IDS.indexOf(c.id) + 1]
    finish(root, stars(starsFor(correct, results.length)), `${correct}/${results.length} correct · +${xp} XP`,
      next ? `<a class="primary" href="#/story/${next.id}">Next: ${esc(next.title)} ▶</a>` : '<p class="end">You finished every chapter. More coming soon!</p>',
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
