import { kana } from '../core/furigana'

/** Reads furigana markup aloud with the device's Japanese voice, if it has one. */
export function speak(markup: string, rate = 0.9) {
  if (!('speechSynthesis' in window)) return
  speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(kana(markup).replace(/[＿]/g, ''))
  u.lang = 'ja-JP'
  u.rate = rate
  const voice = speechSynthesis.getVoices().find((v) => v.lang.replace('_', '-').startsWith('ja'))
  if (voice) u.voice = voice
  speechSynthesis.speak(u)
}
