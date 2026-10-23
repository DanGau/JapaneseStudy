import { kana } from '../core/furigana'

function utter(text: string, lang: 'ja' | 'en', rate: number) {
  if (!('speechSynthesis' in window)) return
  speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = lang === 'ja' ? 'ja-JP' : 'en-US'
  u.rate = rate
  const voice = speechSynthesis.getVoices().find((v) => v.lang.replace('_', '-').startsWith(lang))
  if (voice) u.voice = voice
  speechSynthesis.speak(u)
}

/** Reads furigana markup aloud with the device's Japanese voice, if it has one. */
export const speak = (markup: string, rate = 0.9) => utter(kana(markup).replace(/[＿]/g, ''), 'ja', rate)

export const speakEnglish = (text: string) => utter(text, 'en', 1)
