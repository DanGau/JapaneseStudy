import { expect, test } from 'vitest'
import { romaji, romajiText } from './romaji'

test.each([
  ['ちょっと {待|ま}って ください！', 'Chotto matte kudasai!'],
  ['{私|わたし} は キコ です。', 'Watashi wa kiko desu.'],
  ['こんばんは。', 'Konbanwa.'],
  ['ラーメン が {食|た}べたい です。', 'Raamen ga tabetai desu.'],
  ['{人間|にんげん} は {通|とお}って は いけません。', 'Ningen wa tootte wa ikemasen.'],
  ['{今日|きょう} は しゅっぱつ', "Kyou wa shuppatsu"],
  ['{一度|いちど} も {電車|でんしゃ} に {乗|の}った', 'Ichido mo densha ni notta'],
  ['きんえん です。えっ！ どう しよう…', "Kin'en desu. E! Dou shiyou..."],
  ['{家|いえ} へ {帰|かえ}ります', 'Ie e kaerimasu'],
  ['まっちゃ', 'Matcha'],
])('%s → %s', (markup, expected) => expect(romajiText(markup)).toBe(expected))

test('keeps the grammar mark', () => {
  expect(romaji('ちょっと [[{待|ま}って ください]]。')).toEqual([
    { text: 'Chotto ', mark: false },
    { text: 'matte kudasai', mark: true },
    { text: '.', mark: false },
  ])
})
