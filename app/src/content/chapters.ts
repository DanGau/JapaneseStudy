import type { Chapter, Panel, Scene, Word } from '../core/types'

const YOU = 'あなた'
const KIKO = 'キコ 🦊'

const panel = (scene: Scene, speaker: string, jp: string, en: string, words?: Word[]): Panel => ({ scene, speaker, jp, en, words })

const station: Scene = { sky: 'night', props: ['stars', 'moon', 'city', 'train'], actors: ['🧳'] }
const gate: Scene = { sky: 'night', props: ['stars', 'moon', 'mountains', 'torii', 'lanterns'], actors: ['🧳', '🦊'] }
const market: Scene = { sky: 'dusk', props: ['mountains', 'shrine', 'lanterns'], actors: ['🧳', '🦊', '🐸'] }
const stall: Scene = { sky: 'night', props: ['stars', 'bamboo', 'ramen', 'lanterns'], actors: ['🧳', '🦝', '🦊'] }
const oni: Scene = { sky: 'rain', props: ['mountains', 'torii', 'shrine'], actors: ['🧳', '👹', '🦊'] }
const starTrain: Scene = { sky: 'night', props: ['stars', 'milkyway', 'moon', 'train'], actors: ['🧳', '🐈', '🦊'] }
const dawn: Scene = { sky: 'dawn', props: ['mountains', 'sakura', 'torii'], actors: ['🧳', '🦊'] }

export const CHAPTERS: Chapter[] = [
  {
    id: 'te-kudasai',
    title: 'The Last Train',
    jpTitle: '{終電|しゅうでん}',
    grammar: {
      pattern: '〜てください',
      meaning: 'Please do ~',
      how: 'Put the verb in its て-form and add ください. It is the everyday polite request.',
      examples: [
        { jp: 'ちょっと[[{待|ま}ってください]]。', en: 'Please wait a moment.' },
        { jp: 'ゆっくり[[{話|はな}してください]]。', en: 'Please speak slowly.' },
        { jp: 'これを[[{見|み}てください]]。', en: 'Please look at this.' },
      ],
    },
    story: [
      panel(station, '📢 アナウンス', '{終電|しゅうでん}はもう{出|で}ました。', 'The last train has already left.', [
        { jp: '{終電|しゅうでん}', en: 'last train' },
        { jp: 'もう', en: 'already' },
      ]),
      panel(station, YOU, 'えっ！どうしよう…', 'What?! What do I do…', [{ jp: 'どうしよう', en: 'what should I do' }]),
      panel(gate, KIKO, 'こんばんは。{私|わたし}はキコです。', 'Good evening. I’m Kiko.'),
      panel(gate, KIKO, '{夜明|よあ}けまでに{帰|かえ}れるよ。[[ついて{来|き}てください]]。', 'You can get home before dawn. Please follow me.', [
        { jp: '{夜明|よあ}け', en: 'dawn' },
        { jp: 'ついて{来|く}る', en: 'to follow (come along)' },
      ]),
      panel(gate, YOU, 'ちょっと[[{待|ま}ってください]]！{誰|だれ}ですか？', 'Please wait a moment! Who are you?', [{ jp: '{誰|だれ}', en: 'who' }]),
      panel(gate, KIKO, '{狐|きつね}です。この{鳥居|とりい}を[[くぐってください]]。', 'I’m a fox. Please pass through this torii gate.', [
        { jp: '{狐|きつね}', en: 'fox' },
        { jp: '{鳥居|とりい}', en: 'shrine gate' },
        { jp: 'くぐる', en: 'to pass under' },
      ]),
      panel(gate, KIKO, '{目|め}を[[{閉|と}じてください]]…', 'Please close your eyes…', [{ jp: '{閉|と}じる', en: 'to close' }]),
    ],
    quiz: [
      { kind: 'choice', jp: 'ちょっと＿＿ください。', en: 'Please wait a moment.', options: ['{待|ま}って', '{待|ま}ち', '{待|ま}つ', '{待|ま}った'], why: 'つ-verbs: つ → って.' },
      { kind: 'choice', jp: '{目|め}を＿＿ください。', en: 'Please close your eyes.', options: ['{閉|と}じて', '{閉|と}じる', '{閉|と}じた', '{閉|と}じり'], why: 'る-verbs: drop る, add て.' },
      { kind: 'choice', jp: 'ここに{名前|なまえ}を＿＿ください。', en: 'Please write your name here.', options: ['{書|か}いて', '{書|か}きて', '{書|か}って', '{書|か}くて'], why: 'く-verbs: く → いて.' },
      { kind: 'choice', jp: 'もう{一度|いちど}＿＿ください。', en: 'Please say it once more.', options: ['{言|い}って', '{言|い}いて', '{言|い}んで', '{言|い}して'], why: 'う-verbs: う → って.' },
      { kind: 'build', en: 'Please speak slowly.', tiles: ['ゆっくり', '{話|はな}して', 'ください'], decoys: ['{話|はな}す'] },
      { kind: 'build', en: 'Please look at this torii.', tiles: ['この', '{鳥居|とりい}を', '{見|み}て', 'ください'], decoys: ['{見|み}る'] },
    ],
  },
  {
    id: 'te-iru',
    title: 'The Spirit Market',
    jpTitle: '{妖怪|ようかい}の{町|まち}',
    grammar: {
      pattern: '〜ています',
      meaning: 'Is ~ing, or a state that continues',
      how: 'て-form + います. It describes an action in progress, or the lasting result of one (住んでいます: I live there). Casual speech shortens it to 〜てる.',
      examples: [
        { jp: '{雨|あめ}が[[{降|ふ}っています]]。', en: 'It is raining.' },
        { jp: '{京都|きょうと}に[[{住|す}んでいます]]。', en: 'I live in Kyoto.' },
        { jp: '{今|いま}、{何|なに}を[[していますか]]？', en: 'What are you doing now?' },
      ],
    },
    story: [
      panel(market, YOU, 'わあ…ここはどこですか？', 'Whoa… where is this?'),
      panel(market, KIKO, '{妖怪|ようかい}の{町|まち}です。みんな{祭|まつ}りの{準備|じゅんび}を[[しています]]。', 'It’s the yokai town. Everyone is getting ready for the festival.', [
        { jp: '{妖怪|ようかい}', en: 'yokai, spirit creature' },
        { jp: '{祭|まつ}り', en: 'festival' },
        { jp: '{準備|じゅんび}', en: 'preparation' },
      ]),
      panel(market, '🐸 カエル', 'ケロケロ♪ {歌|うた}を[[{歌|うた}っています]]！', 'Ribbit ♪ I’m singing a song!', [{ jp: '{歌|うた}う', en: 'to sing' }]),
      panel(market, YOU, '{提灯|ちょうちん}が{空|そら}を[[{飛|と}んでいます]]！', 'The lanterns are flying through the sky!', [
        { jp: '{提灯|ちょうちん}', en: 'paper lantern' },
        { jp: '{飛|と}ぶ', en: 'to fly' },
      ]),
      panel(market, YOU, '{誰|だれ}かが{私|わたし}を[[{見|み}ています]]…', 'Someone is watching me…', [{ jp: '{誰|だれ}か', en: 'someone' }]),
      panel(market, KIKO, '{大丈夫|だいじょうぶ}。タヌキが{屋台|やたい}で[[{待|ま}っています]]よ。', 'It’s fine. A tanuki is waiting at his food stall.', [
        { jp: '{大丈夫|だいじょうぶ}', en: 'okay, all right' },
        { jp: '{屋台|やたい}', en: 'food stall' },
      ]),
    ],
    quiz: [
      { kind: 'choice', jp: 'カエルが{歌|うた}を＿＿。', en: 'The frog is singing a song.', options: ['{歌|うた}っています', '{歌|うた}います', '{歌|うた}いています', '{歌|うた}ってです'], why: 'う → って, then います.' },
      { kind: 'choice', jp: '{雨|あめ}が＿＿。', en: 'It is raining.', options: ['{降|ふ}っています', '{降|ふ}りています', '{降|ふ}るています', '{降|ふ}っていです'], why: '降る is a う-verb: る → って.' },
      { kind: 'choice', jp: '{京都|きょうと}に＿＿。', en: 'I live in Kyoto.', options: ['{住|す}んでいます', '{住|す}みています', '{住|す}むています', '{住|す}っています'], why: 'む-verbs: む → んで. 〜ています here is a lasting state.' },
      { kind: 'choice', jp: '{今|いま}、{何|なに}を＿＿か。', en: 'What are you doing now?', options: ['しています', 'するています', 'しりています', 'さています'], why: 'する → して.' },
      { kind: 'build', en: 'The lanterns are flying.', tiles: ['{提灯|ちょうちん}が', '{飛|と}んで', 'います'], decoys: ['{飛|と}びて'] },
      { kind: 'build', en: 'Someone is watching me.', tiles: ['{誰|だれ}かが', '{私|わたし}を', '{見|み}て', 'います'] },
    ],
  },
  {
    id: 'tai',
    title: 'Midnight Ramen',
    jpTitle: '{真夜中|まよなか}のラーメン',
    grammar: {
      pattern: '〜たい',
      meaning: 'Want to ~',
      how: 'Verb stem (the ます-form without ます) + たい. It conjugates like an い-adjective: 〜たくない (don’t want to), 〜たかった (wanted to). Add です to be polite.',
      examples: [
        { jp: '{日本|にほん}に[[{行|い}きたい]]です。', en: 'I want to go to Japan.' },
        { jp: '{今日|きょう}は{何|なに}も[[したくない]]。', en: 'I don’t want to do anything today.' },
        { jp: '{子供|こども}のころ、{先生|せんせい}に[[なりたかった]]。', en: 'As a kid, I wanted to become a teacher.' },
      ],
    },
    story: [
      panel(stall, '🦝 ポン', 'いらっしゃい！{何|なに}が[[{食|た}べたい]]？', 'Welcome! What do you want to eat?', [{ jp: 'いらっしゃい', en: 'welcome (to a shop)' }]),
      panel(stall, YOU, 'ラーメンが[[{食|た}べたいです]]！', 'I want to eat ramen!'),
      panel(stall, KIKO, '{私|わたし}はきつねうどんが[[{食|た}べたい]]な。', 'I want kitsune udon.', [{ jp: 'きつねうどん', en: '“fox udon”, topped with fried tofu' }]),
      panel(stall, '🦝 ポン', '{冷|つめ}たいお{茶|ちゃ}も[[{飲|の}みたい]]？', 'Want some cold tea too?', [
        { jp: '{冷|つめ}たい', en: 'cold (to the touch)' },
        { jp: '{飲|の}む', en: 'to drink' },
      ]),
      panel(stall, YOU, 'はい！でも…{早|はや}く{家|いえ}に[[{帰|かえ}りたい]]です。', 'Yes! But… I want to get home soon.', [{ jp: '{帰|かえ}る', en: 'to go home' }]),
      panel(stall, '🦝 ポン', 'じゃあ、{山|やま}の{門|もん}を{通|とお}ってください。', 'Then go through the mountain gate.', [
        { jp: '{門|もん}', en: 'gate' },
        { jp: '{通|とお}る', en: 'to pass through' },
      ]),
    ],
    quiz: [
      { kind: 'choice', jp: 'ラーメンが＿＿です。', en: 'I want to eat ramen.', options: ['{食|た}べたい', '{食|た}べてたい', '{食|た}べるたい', '{食|た}べった'], why: '食べます → 食べ + たい.' },
      { kind: 'choice', jp: '{家|いえ}に＿＿。', en: 'I want to go home.', options: ['{帰|かえ}りたいです', '{帰|かえ}たいです', '{帰|かえ}るたいです', '{帰|かえ}ってたいです'], why: '帰る is a う-verb: 帰ります → 帰り + たい.' },
      { kind: 'choice', jp: '{今日|きょう}は{何|なに}も＿＿。', en: 'I don’t want to do anything today.', options: ['したくない', 'したいない', 'しないたい', 'したくだ'], why: 'たい → たくない, like an い-adjective.' },
      { kind: 'choice', jp: '{子供|こども}のころ、{医者|いしゃ}に＿＿。', en: 'As a kid, I wanted to become a doctor.', options: ['なりたかった', 'なりたいだった', 'なるたかった', 'なりたくた'], why: 'たい → たかった for the past.' },
      { kind: 'build', en: 'I want to drink cold tea.', tiles: ['{冷|つめ}たい', 'お{茶|ちゃ}が', '{飲|の}みたい', 'です'], decoys: ['{飲|の}むたい'] },
      { kind: 'build', en: 'I want to go to Japan.', tiles: ['{日本|にほん}に', '{行|い}きたい', 'です'], decoys: ['{行|い}くたい'] },
    ],
  },
  {
    id: 'temo-ii',
    title: 'The Oni at the Gate',
    jpTitle: '{門|もん}の{鬼|おに}',
    grammar: {
      pattern: '〜てもいい / 〜てはいけない',
      meaning: 'May ~ / must not ~',
      how: 'て-form + もいい(です) gives permission; add か to ask for it. て-form + はいけない(いけません) forbids. In casual speech ては becomes ちゃ: 見ちゃだめ.',
      examples: [
        { jp: 'ここに{座|すわ}って[[もいいですか]]？', en: 'May I sit here?' },
        { jp: '{写真|しゃしん}を{撮|と}って[[もいいですよ]]。', en: 'You may take photos.' },
        { jp: 'ここで{泳|およ}いで[[はいけません]]。', en: 'You must not swim here.' },
      ],
    },
    story: [
      panel(oni, '👹 オニ', '{止|と}まれ！ここを{通|とお}って[[はいけない]]！', 'Halt! You must not pass here!', [
        { jp: '{止|と}まれ', en: 'stop! (command)' },
        { jp: '{鬼|おに}', en: 'oni, ogre' },
      ]),
      panel(oni, YOU, 'すみません、{通|とお}って[[もいいですか]]？', 'Excuse me, may I pass?'),
      panel(oni, '👹 オニ', '{人間|にんげん}は{通|とお}って[[はいけません]]。', 'Humans may not pass.', [{ jp: '{人間|にんげん}', en: 'human' }]),
      panel(oni, KIKO, 'オニさん、このお{団子|だんご}を{食|た}べて[[もいいですよ]]。', 'Mister Oni, you may eat these dumplings.', [{ jp: '{団子|だんご}', en: 'sweet rice dumplings' }]),
      panel(oni, '👹 オニ', 'おお、{団子|だんご}！…{通|とお}って[[もいい]]。でも{後|うし}ろを{見|み}て[[はいけない]]よ。', 'Ooh, dumplings! …You may pass. But you must not look back.', [{ jp: '{後|うし}ろ', en: 'behind' }]),
      panel(oni, YOU, 'わかりました。{絶対|ぜったい}に{見|み}ません！', 'Understood. I absolutely won’t look!', [{ jp: '{絶対|ぜったい}に', en: 'absolutely' }]),
    ],
    quiz: [
      { kind: 'choice', jp: 'ここに＿＿もいいですか。', en: 'May I sit here?', options: ['{座|すわ}って', '{座|すわ}り', '{座|すわ}る', '{座|すわ}った'], why: 'Permission takes the て-form: 座る → 座って.' },
      { kind: 'choice', jp: '{後|うし}ろを{見|み}て＿＿。', en: 'You must not look back.', options: ['はいけません', 'もいいです', 'ください', 'います'], why: 'てはいけません forbids.' },
      { kind: 'choice', jp: '{写真|しゃしん}を{撮|と}って＿＿。', en: 'You may take photos.', options: ['もいいですよ', 'はいけません', 'います', 'たいです'], why: 'てもいい gives permission.' },
      { kind: 'choice', jp: 'ここで{泳|およ}いで＿＿。', en: 'You must not swim here.', options: ['はいけません', 'もいいです', 'ください', 'います'], why: 'ぐ-verbs take で: 泳ぐ → 泳いで, so ては becomes では.' },
      { kind: 'build', en: 'May I pass?', tiles: ['{通|とお}って', 'も', 'いい', 'ですか'], decoys: ['は'] },
      { kind: 'build', en: 'Humans must not pass.', tiles: ['{人間|にんげん}は', '{通|とお}っては', 'いけません'], decoys: ['いいです'] },
    ],
  },
  {
    id: 'ta-koto',
    title: 'The Star Train',
    jpTitle: '{星|ほし}の{電車|でんしゃ}',
    grammar: {
      pattern: '〜たことがある',
      meaning: 'Have done ~ before (experience)',
      how: 'た-form + ことがある(あります). Use ことがない(ありません) for “have never”. Ask with ことがありますか.',
      examples: [
        { jp: '{寿司|すし}を{食|た}べた[[ことがあります]]。', en: 'I have eaten sushi.' },
        { jp: '{飛行機|ひこうき}に{乗|の}った[[ことがない]]。', en: 'I have never ridden a plane.' },
        { jp: '{京都|きょうと}に{行|い}った[[ことがありますか]]？', en: 'Have you ever been to Kyoto?' },
      ],
    },
    story: [
      panel(starTrain, '🐈 車掌', '{星|ほし}の{電車|でんしゃ}へようこそ。', 'Welcome aboard the star train.', [{ jp: '{車掌|しゃしょう}', en: 'conductor' }]),
      panel(starTrain, KIKO, '{天|あま}の{川|がわ}を{見|み}た[[ことがありますか]]？', 'Have you ever seen the Milky Way?', [{ jp: '{天|あま}の{川|がわ}', en: 'the Milky Way (“river of heaven”)' }]),
      panel(starTrain, YOU, '{本物|ほんもの}は{見|み}た[[ことがありません]]。きれい…', 'I’ve never seen the real thing. Beautiful…', [{ jp: '{本物|ほんもの}', en: 'the real thing' }]),
      panel(starTrain, '🐈 車掌', '{私|わたし}は{月|つき}に{行|い}った[[ことがあります]]よ。', 'I’ve been to the moon, you know.', [{ jp: '{月|つき}', en: 'moon' }]),
      panel(starTrain, YOU, '{本当|ほんとう}？{私|わたし}は{富士山|ふじさん}に{登|のぼ}った[[ことがあります]]！', 'Really? I’ve climbed Mt. Fuji!', [{ jp: '{登|のぼ}る', en: 'to climb' }]),
      panel(starTrain, KIKO, '{人間|にんげん}と{電車|でんしゃ}に{乗|の}るのは{初|はじ}めて。{楽|たの}しい！', 'It’s my first time riding a train with a human. This is fun!', [{ jp: '{初|はじ}めて', en: 'for the first time' }]),
    ],
    quiz: [
      { kind: 'choice', jp: '{富士山|ふじさん}に＿＿ことがあります。', en: 'I have climbed Mt. Fuji.', options: ['{登|のぼ}った', '{登|のぼ}る', '{登|のぼ}って', '{登|のぼ}りた'], why: 'Experience takes the た-form: 登る → 登った.' },
      { kind: 'choice', jp: '{天|あま}の{川|がわ}を{見|み}たことが＿＿。', en: 'I have never seen the Milky Way.', options: ['ありません', 'あります', 'いません', 'しません'], why: 'ことがありません = have never.' },
      { kind: 'choice', jp: '{京都|きょうと}に＿＿ことがありますか。', en: 'Have you ever been to Kyoto?', options: ['{行|い}った', '{行|い}きた', '{行|い}いた', '{行|い}って'], why: '行く is irregular: 行った, not 行いた.' },
      { kind: 'choice', jp: '{納豆|なっとう}を＿＿ことがない。', en: 'I have never eaten natto.', options: ['{食|た}べた', '{食|た}べる', '{食|た}べて', '{食|た}べない'], why: 'Still the た-form; the negative goes on ある → ない.' },
      { kind: 'build', en: 'I have been to the moon.', tiles: ['{月|つき}に', '{行|い}った', 'ことが', 'あります'], decoys: ['{行|い}く'] },
      { kind: 'build', en: 'Have you ever ridden a plane?', tiles: ['{飛行機|ひこうき}に', '{乗|の}った', 'ことが', 'ありますか'] },
    ],
  },
  {
    id: 'tara',
    title: 'Before Sunrise',
    jpTitle: '{夜明|よあ}け',
    grammar: {
      pattern: '〜たら',
      meaning: 'If / when ~, then …',
      how: 'た-form + ら. “Once X happens, Y.” When the sentence ends in the past, it means “when I did X, I found Y”.',
      examples: [
        { jp: '{雨|あめ}が{降|ふ}っ[[たら]]、{行|い}きません。', en: 'If it rains, I won’t go.' },
        { jp: '{駅|えき}に{着|つ}い[[たら]]、{電話|でんわ}してください。', en: 'When you reach the station, please call.' },
        { jp: '{窓|まど}を{開|あ}け[[たら]]、{富士山|ふじさん}が{見|み}えた。', en: 'When I opened the window, I could see Mt. Fuji.' },
      ],
    },
    story: [
      panel(starTrain, '🐈 車掌', '{次|つぎ}は{終点|しゅうてん}です。', 'Next stop is the last stop.', [{ jp: '{終点|しゅうてん}', en: 'last stop' }]),
      panel(dawn, KIKO, '{電車|でんしゃ}を{降|お}り[[たら]]、まっすぐ{走|はし}って！', 'When you get off the train, run straight ahead!', [
        { jp: '{降|お}りる', en: 'to get off' },
        { jp: 'まっすぐ', en: 'straight' },
      ]),
      panel(dawn, KIKO, '{太陽|たいよう}が{出|で}[[たら]]、この{道|みち}は{消|き}えるよ。', 'Once the sun comes up, this path will vanish.', [
        { jp: '{太陽|たいよう}', en: 'sun' },
        { jp: '{消|き}える', en: 'to disappear' },
      ]),
      panel(dawn, YOU, 'また{会|あ}え[[たら]]…うれしいな。', 'If we could meet again… I’d be happy.', [{ jp: '{会|あ}える', en: 'can meet' }]),
      panel(dawn, KIKO, '{稲荷山|いなりやま}に{来|き}[[たら]]、{私|わたし}を{呼|よ}んでね。', 'If you come to Mt. Inari, call for me.', [
        { jp: '{稲荷山|いなりやま}', en: 'Mt. Inari, home of the fox shrine' },
        { jp: '{呼|よ}ぶ', en: 'to call' },
      ]),
      panel({ sky: 'day', props: ['city', 'train', 'sakura'], actors: ['🧳'] }, 'ナレーション', '{気|き}がつい[[たら]]、{駅|えき}のベンチにいました。', 'When I came to, I was on a station bench.', [
        { jp: '{気|き}がつく', en: 'to come to, notice' },
      ]),
    ],
    quiz: [
      { kind: 'choice', jp: '{雨|あめ}が＿＿、{行|い}きません。', en: 'If it rains, I won’t go.', options: ['{降|ふ}ったら', '{降|ふ}るたら', '{降|ふ}りたら', '{降|ふ}ってたら'], why: 'た-form 降った + ら.' },
      { kind: 'choice', jp: '{駅|えき}に＿＿、{電話|でんわ}してください。', en: 'When you reach the station, please call.', options: ['{着|つ}いたら', '{着|つ}きたら', '{着|つ}ったら', '{着|つ}くたら'], why: 'く-verbs: 着く → 着いた → 着いたら.' },
      { kind: 'choice', jp: '{太陽|たいよう}が{出|で}たら、{道|みち}が＿＿。', en: 'Once the sun comes up, the path will vanish.', options: ['{消|き}えます', '{消|き}えたら', '{消|き}えて', '{消|き}えたい'], why: 'The result clause ends normally.' },
      { kind: 'choice', jp: 'お{金|かね}が＿＿、{日本|にほん}に{住|す}みたい。', en: 'If I had money, I’d want to live in Japan.', options: ['あったら', 'あるたら', 'いたら', 'あたら'], why: 'ある → あった → あったら. Things use ある, not いる.' },
      { kind: 'build', en: 'If you come to Mt. Inari, call me.', tiles: ['{稲荷山|いなりやま}に', '{来|き}たら', '{呼|よ}んで', 'ください'], decoys: ['{来|く}るたら'] },
      { kind: 'build', en: 'When I opened the window, I could see Mt. Fuji.', tiles: ['{窓|まど}を', '{開|あ}けたら', '{富士山|ふじさん}が', '{見|み}えた'] },
    ],
  },
]
