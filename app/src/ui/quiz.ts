import { shuffle } from '../core/rng'
import { BLANK, type Build, type Choice, type Question } from '../core/types'
import { el, esc, say } from './html'
import { speak } from './speak'

/** Runs the questions in order, then calls `done` with whether each was right. */
export function quiz(root: HTMLElement, title: string, questions: Question[], seed: number, done: (results: boolean[]) => void) {
  const results: boolean[] = []

  const show = () => {
    const i = results.length
    if (i === questions.length) return done(results)
    const q = questions[i]
    const screen = el(`<div class="screen quiz">
      <header class="bar"><a class="close" href="#/">✕</a><div class="meter"><div style="width:${(i / questions.length) * 100}%"></div></div><span class="count">${i + 1}/${questions.length}</span></header>
      <p class="kicker">${esc(title)}</p>
      <div class="body"></div>
      <footer class="feedback"></footer>
    </div>`)
    root.replaceChildren(screen)
    const answer = (ok: boolean, reveal: string, why?: string) => {
      results.push(ok)
      const fb = screen.querySelector<HTMLElement>('.feedback')!
      fb.className = `feedback show ${ok ? 'good' : 'bad'}`
      fb.innerHTML = `<p class="verdict">${ok ? 'Correct!' : 'Not quite. The answer is:'}</p>
        <div class="reveal"><p class="said">${say(reveal)}</p><button class="icon say">🔊</button></div>
        ${why ? `<p class="why">${esc(why)}</p>` : ''}
        <button class="primary next">Continue</button>`
      fb.querySelector('.say')!.addEventListener('click', () => speak(reveal))
      fb.querySelector('.next')!.addEventListener('click', show)
      speak(reveal)
    }
    const body = screen.querySelector<HTMLElement>('.body')!
    if (q.kind === 'choice') choice(body, q, seed + i, answer)
    else build(body, q, seed + i, answer)
  }
  show()
}

type Answer = (ok: boolean, reveal: string, why?: string) => void

/** Shows each option as the whole sentence, so the learner compares complete sentences. */
function choice(body: HTMLElement, q: Choice, seed: number, answer: Answer) {
  const sentence = (option: string) => q.jp.replace(BLANK, option)
  body.innerHTML = `<p class="prompt">Which sentence means:</p>
    <p class="big">“${esc(q.en)}”</p>
    <div class="options">${shuffle(q.options, seed).map((o) => `<button class="option" data-o="${esc(o)}">${say(sentence(o))}</button>`).join('')}</div>`
  for (const b of body.querySelectorAll<HTMLButtonElement>('.option')) {
    b.addEventListener('click', () => {
      const ok = b.dataset.o === q.options[0]
      for (const o of body.querySelectorAll<HTMLButtonElement>('.option')) {
        o.disabled = true
        if (o.dataset.o === q.options[0]) o.classList.add('right')
      }
      if (!ok) b.classList.add('wrong')
      answer(ok, sentence(q.options[0]), q.why)
    })
  }
}

function build(body: HTMLElement, q: Build, seed: number, answer: Answer) {
  body.innerHTML = `<p class="prompt">Tap the words in order to say:</p>
    <p class="big">“${esc(q.en)}”</p>
    <div class="line"></div>
    <p class="hint">Tap a word again to take it back.</p>
    <div class="tiles">${shuffle([...q.tiles, ...(q.decoys ?? [])], seed).map((t) => `<button class="tile" data-t="${esc(t)}">${say(t)}</button>`).join('')}</div>
    <button class="primary check" disabled>Check</button>`
  const line = body.querySelector<HTMLElement>('.line')!
  const bank = body.querySelector<HTMLElement>('.tiles')!
  const check = body.querySelector<HTMLButtonElement>('.check')!
  for (const t of bank.querySelectorAll<HTMLButtonElement>('.tile')) {
    t.addEventListener('click', () => {
      ;(t.parentElement === bank ? line : bank).appendChild(t)
      check.disabled = !line.children.length
    })
  }
  check.addEventListener('click', () => {
    const chosen = [...line.querySelectorAll<HTMLElement>('.tile')].map((t) => t.dataset.t!)
    const ok = chosen.join(' ') === q.tiles.join(' ')
    for (const t of body.querySelectorAll<HTMLButtonElement>('.tile')) t.disabled = true
    line.classList.add(ok ? 'right' : 'wrong')
    check.remove()
    answer(ok, q.tiles.join(' ') + '。')
  })
}
