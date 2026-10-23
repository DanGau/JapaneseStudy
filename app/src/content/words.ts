import type { Theme, Vocab } from '../core/types'

const w = (theme: Theme) => (id: string, emoji: string, en: string, jp: string): Vocab => ({ id, emoji, en, jp, theme })
const travel = w('travel')
const food = w('food')
const nature = w('nature')
const animals = w('animals')
const town = w('town')
const time = w('time')
const actions = w('actions')

// Ordered roughly by usefulness: new words are introduced in this order.
export const WORDS: Vocab[] = [
  travel('train', '🚃', 'Train', '{電車|でんしゃ}'),
  travel('station', '🚉', 'Station', '{駅|えき}'),
  food('water', '💧', 'Water', '{水|みず}'),
  town('toilet', '🚻', 'Toilet', 'トイレ'),
  food('ramen', '🍜', 'Ramen', 'ラーメン'),
  travel('ticket', '🎫', 'Ticket', '{切符|きっぷ}'),
  food('rice', '🍚', 'Rice', 'ご{飯|はん}'),
  town('money', '💴', 'Money', 'お{金|かね}'),
  nature('mountain', '🗻', 'Mountain', '{山|やま}'),
  animals('fox', '🦊', 'Fox', 'きつね'),
  food('tea', '🍵', 'Tea', 'お{茶|ちゃ}'),
  travel('hotel', '🏨', 'Hotel', 'ホテル'),
  town('shrine', '⛩️', 'Shrine', '{神社|じんじゃ}'),
  nature('rain', '🌧️', 'Rain', '{雨|あめ}'),
  time('morning', '🌅', 'Morning', '{朝|あさ}'),
  time('night', '🌙', 'Night', '{夜|よる}'),
  actions('eat', '🍽️', 'To eat', '{食|た}べる'),
  actions('drink', '🥤', 'To drink', '{飲|の}む'),
  actions('go', '🚶', 'To go', '{行|い}く'),
  food('sushi', '🍣', 'Sushi', 'すし'),
  animals('cat', '🐈', 'Cat', '{猫|ねこ}'),
  animals('dog', '🐕', 'Dog', '{犬|いぬ}'),
  travel('airport', '🛫', 'Airport', '{空港|くうこう}'),
  travel('taxi', '🚕', 'Taxi', 'タクシー'),
  travel('map', '🗺️', 'Map', '{地図|ちず}'),
  travel('bag', '🧳', 'Suitcase', 'スーツケース'),
  town('shop', '🏪', 'Shop', '{店|みせ}'),
  town('temple', '🛕', 'Temple', 'お{寺|てら}'),
  town('house', '🏠', 'House, home', '{家|いえ}'),
  town('school', '🏫', 'School', '{学校|がっこう}'),
  town('hospital', '🏥', 'Hospital', '{病院|びょういん}'),
  food('coffee', '☕', 'Coffee', 'コーヒー'),
  food('beer', '🍺', 'Beer', 'ビール'),
  food('fish', '🐟', 'Fish', '{魚|さかな}'),
  food('egg', '🥚', 'Egg', '{卵|たまご}'),
  food('apple', '🍎', 'Apple', 'りんご'),
  food('bread', '🍞', 'Bread', 'パン'),
  food('delicious', '😋', 'Delicious', 'おいしい'),
  nature('sea', '🌊', 'Sea', '{海|うみ}'),
  nature('river', '🏞️', 'River', '{川|かわ}'),
  nature('sky', '🌤️', 'Sky', '{空|そら}'),
  nature('moon', '🌕', 'Moon', '{月|つき}'),
  nature('star', '⭐', 'Star', '{星|ほし}'),
  nature('sakura', '🌸', 'Cherry blossom', '{桜|さくら}'),
  nature('tree', '🌳', 'Tree', '{木|き}'),
  nature('flower', '🌼', 'Flower', '{花|はな}'),
  nature('snow', '❄️', 'Snow', '{雪|ゆき}'),
  animals('bird', '🐦', 'Bird', '{鳥|とり}'),
  animals('frog', '🐸', 'Frog', 'カエル'),
  animals('tanuki', '🦝', 'Tanuki (raccoon dog)', 'タヌキ'),
  time('today', '📅', 'Today', '{今日|きょう}'),
  time('tomorrow', '⏭️', 'Tomorrow', '{明日|あした}'),
  time('now', '⏰', 'Now', '{今|いま}'),
  actions('sleep', '😴', 'To sleep', '{寝|ね}る'),
  actions('read', '📖', 'To read', '{読|よ}む'),
  actions('run', '🏃', 'To run', '{走|はし}る'),
  actions('buy', '🛍️', 'To buy', '{買|か}う'),
  actions('see', '👀', 'To see, watch', '{見|み}る'),
  actions('wait', '⏳', 'To wait', '{待|ま}つ'),
  actions('sing', '🎤', 'To sing', '{歌|うた}う'),
]

export const THEME_COLORS: Record<Theme, [string, string]> = {
  travel: ['#2b4bd6', '#7aa2ff'],
  food: ['#d6532b', '#ffb36b'],
  nature: ['#1f8a5b', '#7ae0b0'],
  animals: ['#a3407a', '#ff9ccf'],
  town: ['#6b3fd6', '#b9a4ff'],
  time: ['#20345e', '#e0889a'],
  actions: ['#b8860b', '#ffe08a'],
}
