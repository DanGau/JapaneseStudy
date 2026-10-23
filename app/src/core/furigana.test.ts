import { expect, test } from 'vitest'
import { kana, parse, plain } from './furigana'

test('parses readings and marks', () => {
  expect(parse('{待|ま}って[[ください]]')).toEqual([
    { text: '待', reading: 'ま', mark: false },
    { text: 'って', mark: false },
    { text: 'ください', mark: true },
  ])
  expect(plain('{日本|にほん}に[[{行|い}きたい]]')).toBe('日本に行きたい')
  expect(kana('{日本|にほん}に[[{行|い}きたい]]')).toBe('にほんにいきたい')
})

test('rejects broken markup', () => {
  expect(() => parse('{待|ま って')).toThrow()
  expect(() => parse('[[ください')).toThrow()
  expect(() => parse('ください]]')).toThrow()
})
