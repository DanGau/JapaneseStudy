import type { Chapter, Panel, Scene, Word } from '../core/types'

const YOU = 'You'
const KIKO = 'Kiko 🦊'

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
      pattern: '〜て ください',
      meaning: 'Please do something.',
      how: 'To ask someone politely to do something, put the verb in its te-form and add kudasai. Matsu (to wait) becomes matte kudasai (please wait).',
      examples: [
        { jp: 'ちょっと [[{待|ま}って ください]]。', en: 'Please wait a moment.' },
        { jp: 'ゆっくり [[{話|はな}して ください]]。', en: 'Please speak slowly.' },
        { jp: 'これ を [[{見|み}て ください]]。', en: 'Please look at this.' },
      ],
    },
    story: [
      panel(station, 'Announcement 📢', '{終電|しゅうでん} は もう {出|で}ました。', 'The last train has already left.', [
        { jp: '{終電|しゅうでん}', en: 'last train' },
        { jp: 'もう', en: 'already' },
      ]),
      panel(station, YOU, 'えっ！ どう しよう…', 'Oh no! What do I do?'),
      panel(gate, KIKO, 'こんばんは。 {私|わたし} は キコ です。', 'Good evening. I am Kiko.'),
      panel(gate, KIKO, '{私|わたし} に [[ついて きて ください]]。', 'Please follow me.', [{ jp: 'ついて くる', en: 'to follow' }]),
      panel(gate, YOU, 'ちょっと [[{待|ま}って ください]]！ {誰|だれ} です か？', 'Please wait a moment! Who are you?', [{ jp: '{誰|だれ}', en: 'who' }]),
      panel(gate, KIKO, '{私|わたし} は きつね です。 この {鳥居|とりい} を [[くぐって ください]]。', 'I am a fox. Please walk through this gate.', [
        { jp: 'きつね', en: 'fox' },
        { jp: '{鳥居|とりい}', en: 'shrine gate' },
      ]),
      panel(gate, KIKO, '{目|め} を [[{閉|と}じて ください]]。', 'Please close your eyes.', [{ jp: '{目|め}', en: 'eyes' }]),
    ],
    quiz: [
      { kind: 'choice', jp: 'ちょっと ＿＿ ください。', en: 'Please wait a moment.', options: ['{待|ま}って', '{待|ま}ち', '{待|ま}つ', '{待|ま}った'], why: 'Matsu (to wait) becomes matte before kudasai.' },
      { kind: 'choice', jp: '{目|め} を ＿＿ ください。', en: 'Please close your eyes.', options: ['{閉|と}じて', '{閉|と}じる', '{閉|と}じた', '{閉|と}じり'], why: 'For verbs ending in iru or eru, drop ru and add te: tojiru becomes tojite.' },
      { kind: 'choice', jp: 'ここ に {名前|なまえ} を ＿＿ ください。', en: 'Please write your name here.', options: ['{書|か}いて', '{書|か}きて', '{書|か}って', '{書|か}くて'], why: 'Verbs ending in ku change to ite: kaku becomes kaite.' },
      { kind: 'choice', jp: 'もう {一度|いちど} ＿＿ ください。', en: 'Please say it one more time.', options: ['{言|い}って', '{言|い}いて', '{言|い}んで', '{言|い}して'], why: 'Verbs ending in u change to tte: iu becomes itte.' },
      { kind: 'build', en: 'Please speak slowly.', tiles: ['ゆっくり', '{話|はな}して', 'ください'], decoys: ['{話|はな}す'] },
      { kind: 'build', en: 'Please look at this gate.', tiles: ['この', '{鳥居|とりい}', 'を', '{見|み}て', 'ください'], decoys: ['{見|み}る'] },
    ],
  },
  {
    id: 'te-iru',
    title: 'The Spirit Market',
    jpTitle: '{妖怪|ようかい} の {町|まち}',
    grammar: {
      pattern: '〜て います',
      meaning: 'Someone is doing something right now.',
      how: 'To say what someone is doing right now, use the te-form of the verb and add imasu. Utau (to sing) becomes utatte imasu (is singing). It also describes a lasting state: Kyoto ni sunde imasu means I live in Kyoto.',
      examples: [
        { jp: '{雨|あめ} が [[{降|ふ}って います]]。', en: 'It is raining.' },
        { jp: '{京都|きょうと} に [[{住|す}んで います]]。', en: 'I live in Kyoto.' },
        { jp: '{今|いま} {何|なに} を [[して います]] か？', en: 'What are you doing now?' },
      ],
    },
    story: [
      panel(market, YOU, 'わあ！ ここ は どこ です か？', 'Wow! Where is this?'),
      panel(market, KIKO, 'お{化|ば}け の {町|まち} です。', 'This is the town of spirits.', [{ jp: 'お{化|ば}け', en: 'spirit, ghost' }]),
      panel(market, KIKO, 'みんな {祭|まつ}り の {準備|じゅんび} を [[して います]]。', 'Everyone is getting ready for the festival.', [
        { jp: '{祭|まつ}り', en: 'festival' },
        { jp: '{準備|じゅんび}', en: 'getting ready' },
      ]),
      panel(market, 'Frog 🐸', 'ケロケロ♪ {私|わたし} は {歌|うた} を [[{歌|うた}って います]]！', 'Ribbit! I am singing a song!', [{ jp: '{歌|うた}', en: 'song' }]),
      panel(market, YOU, 'ちょうちん が [[{飛|と}んで います]]！', 'The lanterns are flying!', [
        { jp: 'ちょうちん', en: 'paper lantern' },
        { jp: '{飛|と}ぶ', en: 'to fly' },
      ]),
      panel(market, KIKO, 'タヌキ が {店|みせ} で [[{待|ま}って います]]。', 'A tanuki is waiting at his shop.', [{ jp: '{店|みせ}', en: 'shop' }]),
    ],
    quiz: [
      { kind: 'choice', jp: 'カエル が {歌|うた} を ＿＿ います。', en: 'The frog is singing a song.', options: ['{歌|うた}って', '{歌|うた}い', '{歌|うた}う', '{歌|うた}った'], why: 'Utau becomes utatte, then add imasu.' },
      { kind: 'choice', jp: '{雨|あめ} が ＿＿ います。', en: 'It is raining.', options: ['{降|ふ}って', '{降|ふ}り', '{降|ふ}る', '{降|ふ}った'], why: 'Furu (to fall, for rain) becomes futte, then add imasu.' },
      { kind: 'choice', jp: '{京都|きょうと} に ＿＿ います。', en: 'I live in Kyoto.', options: ['{住|す}んで', '{住|す}みて', '{住|す}むて', '{住|す}って'], why: 'Verbs ending in mu change to nde: sumu becomes sunde.' },
      { kind: 'choice', jp: '{今|いま} {何|なに} を ＿＿ います か？', en: 'What are you doing now?', options: ['して', 'する', 'した', 'さて'], why: 'Suru (to do) becomes shite.' },
      { kind: 'build', en: 'The lanterns are flying.', tiles: ['ちょうちん', 'が', '{飛|と}んで', 'います'], decoys: ['{飛|と}びて'] },
      { kind: 'build', en: 'The fox is waiting.', tiles: ['きつね', 'が', '{待|ま}って', 'います'], decoys: ['{待|ま}つ'] },
    ],
  },
  {
    id: 'tai',
    title: 'Midnight Ramen',
    jpTitle: '{夜|よる} の ラーメン',
    grammar: {
      pattern: '〜たい です',
      meaning: 'I want to do something.',
      how: 'To say you want to do something, take the polite masu verb, drop masu, and add tai. Tabemasu (eat) becomes tabetai (want to eat). Add desu to be polite. To say you do not want to, use takunai.',
      examples: [
        { jp: '{日本|にほん} に [[{行|い}きたい]] です。', en: 'I want to go to Japan.' },
        { jp: 'すし が [[{食|た}べたい]] です。', en: 'I want to eat sushi.' },
        { jp: '{今日|きょう} は [[{働|はたら}きたくない]] です。', en: 'I do not want to work today.' },
      ],
    },
    story: [
      panel(stall, 'Pon 🦝', 'いらっしゃい！ {何|なに} が [[{食|た}べたい]] です か？', 'Welcome! What do you want to eat?', [{ jp: 'いらっしゃい', en: 'welcome (to a shop)' }]),
      panel(stall, YOU, 'ラーメン が [[{食|た}べたい]] です！', 'I want to eat ramen!'),
      panel(stall, KIKO, '{私|わたし} は うどん が [[{食|た}べたい]] です。', 'I want to eat udon.'),
      panel(stall, 'Pon 🦝', 'お{茶|ちゃ} も [[{飲|の}みたい]] です か？', 'Do you want to drink tea too?', [
        { jp: 'お{茶|ちゃ}', en: 'tea' },
        { jp: '{飲|の}む', en: 'to drink' },
      ]),
      panel(stall, YOU, 'はい。 でも {早|はや}く {家|いえ} に [[{帰|かえ}りたい]] です。', 'Yes. But I want to go home soon.', [
        { jp: '{家|いえ}', en: 'home' },
        { jp: '{帰|かえ}る', en: 'to go home' },
      ]),
      panel(stall, 'Pon 🦝', 'じゃあ、 {山|やま} の {門|もん} に {行|い}って ください。', 'Then please go to the mountain gate.', [{ jp: '{門|もん}', en: 'gate' }]),
    ],
    quiz: [
      { kind: 'choice', jp: 'ラーメン が ＿＿ です。', en: 'I want to eat ramen.', options: ['{食|た}べたい', '{食|た}べるたい', '{食|た}べてたい', '{食|た}べった'], why: 'Tabemasu → tabe + tai.' },
      { kind: 'choice', jp: '{家|いえ} に ＿＿ です。', en: 'I want to go home.', options: ['{帰|かえ}りたい', '{帰|かえ}たい', '{帰|かえ}るたい', '{帰|かえ}ってたい'], why: 'Kaerimasu → kaeri + tai.' },
      { kind: 'choice', jp: 'お{茶|ちゃ} が ＿＿ です。', en: 'I want to drink tea.', options: ['{飲|の}みたい', '{飲|の}むたい', '{飲|の}んたい', '{飲|の}みたく'], why: 'Nomimasu → nomi + tai.' },
      { kind: 'choice', jp: '{今日|きょう} は ＿＿ です。', en: 'I do not want to work today.', options: ['{働|はたら}きたくない', '{働|はたら}きたいない', '{働|はたら}かないたい', '{働|はたら}きない'], why: 'Tai becomes takunai to mean “do not want to.”' },
      { kind: 'build', en: 'I want to go to Japan.', tiles: ['{日本|にほん}', 'に', '{行|い}きたい', 'です'], decoys: ['{行|い}くたい'] },
      { kind: 'build', en: 'I want to eat sushi.', tiles: ['すし', 'が', '{食|た}べたい', 'です'], decoys: ['{食|た}べる'] },
    ],
  },
  {
    id: 'temo-ii',
    title: 'The Oni at the Gate',
    jpTitle: '{門|もん} の {鬼|おに}',
    grammar: {
      pattern: '〜ても いい / 〜ては いけません',
      meaning: 'You may do something. / You must not do something.',
      how: 'To give permission, use the te-form of the verb and add mo ii desu. Add ka at the end to ask for permission. To say something is not allowed, use the te-form and add wa ikemasen.',
      examples: [
        { jp: 'ここ に {座|すわ}って [[も いい]] です か？', en: 'May I sit here?' },
        { jp: '{写真|しゃしん} を {撮|と}って [[も いい]] です。', en: 'You may take photos.' },
        { jp: 'ここ で {食|た}べて [[は いけません]]。', en: 'You must not eat here.' },
      ],
    },
    story: [
      panel(oni, 'Oni 👹', '{止|と}まれ！ ここ を {通|とお}って [[は いけません]]！', 'Stop! You must not pass here!', [
        { jp: '{止|と}まれ', en: 'stop!' },
        { jp: '{通|とお}る', en: 'to pass through' },
      ]),
      panel(oni, YOU, 'すみません。 {通|とお}って [[も いい]] です か？', 'Excuse me. May I pass?'),
      panel(oni, 'Oni 👹', 'だめ！ {人間|にんげん} は {通|とお}って [[は いけません]]。', 'No! Humans must not pass.', [{ jp: '{人間|にんげん}', en: 'human' }]),
      panel(oni, KIKO, 'オニ さん、 この だんご を {食|た}べて [[も いい]] です よ。', 'Mister Oni, you may eat these dumplings.', [{ jp: 'だんご', en: 'sweet rice dumplings' }]),
      panel(oni, 'Oni 👹', 'わあ、 だんご！ {通|とお}って [[も いい]] です。', 'Wow, dumplings! You may pass.'),
      panel(oni, 'Oni 👹', 'でも {後|うし}ろ を {見|み}て [[は いけません]]。', 'But you must not look back.', [{ jp: '{後|うし}ろ', en: 'behind' }]),
    ],
    quiz: [
      { kind: 'choice', jp: 'ここ に {座|すわ}って ＿＿ です か？', en: 'May I sit here?', options: ['も いい', 'は いけません', 'ください', 'います'], why: 'Te-form + mo ii desu ka asks for permission.' },
      { kind: 'choice', jp: '{後|うし}ろ を {見|み}て ＿＿。', en: 'You must not look back.', options: ['は いけません', 'も いい です', 'ください', 'います'], why: 'Te-form + wa ikemasen means you must not.' },
      { kind: 'choice', jp: '{写真|しゃしん} を {撮|と}って ＿＿ です。', en: 'You may take photos.', options: ['も いい', 'は いけません', 'たい', 'います'], why: 'Te-form + mo ii desu gives permission.' },
      { kind: 'choice', jp: 'ここ で ＿＿ は いけません。', en: 'You must not eat here.', options: ['{食|た}べて', '{食|た}べる', '{食|た}べた', '{食|た}べたい'], why: 'Wa ikemasen follows the te-form: tabete.' },
      { kind: 'build', en: 'May I pass?', tiles: ['{通|とお}って', 'も', 'いい', 'です', 'か'], decoys: ['は'] },
      { kind: 'build', en: 'Humans must not pass.', tiles: ['{人間|にんげん}', 'は', '{通|とお}って', 'は', 'いけません'], decoys: ['いい'] },
    ],
  },
  {
    id: 'ta-koto',
    title: 'The Star Train',
    jpTitle: '{星|ほし} の {電車|でんしゃ}',
    grammar: {
      pattern: '〜た こと が あります',
      meaning: 'I have done something before.',
      how: 'To talk about something you have done before, use the ta-form (the casual past) of the verb and add koto ga arimasu. To say you have never done it, use koto ga arimasen. Add ka to ask.',
      examples: [
        { jp: 'すし を {食|た}べた [[こと が あります]]。', en: 'I have eaten sushi before.' },
        { jp: '{富士山|ふじさん} に {登|のぼ}った [[こと が ありません]]。', en: 'I have never climbed Mt. Fuji.' },
        { jp: '{京都|きょうと} に {行|い}った [[こと が あります]] か？', en: 'Have you ever been to Kyoto?' },
      ],
    },
    story: [
      panel(starTrain, 'Conductor 🐈', '{星|ほし} の {電車|でんしゃ} へ ようこそ。', 'Welcome to the star train.', [{ jp: 'ようこそ', en: 'welcome' }]),
      panel(starTrain, KIKO, '{天|あま}の{川|がわ} を {見|み}た [[こと が あります]] か？', 'Have you ever seen the Milky Way?', [{ jp: '{天|あま}の{川|がわ}', en: 'the Milky Way' }]),
      panel(starTrain, YOU, 'いいえ、 {見|み}た [[こと が ありません]]。 きれい！', 'No, I have never seen it. It is beautiful!', [{ jp: 'きれい', en: 'beautiful' }]),
      panel(starTrain, 'Conductor 🐈', '{私|わたし} は {月|つき} に {行|い}った [[こと が あります]]。', 'I have been to the moon.', [{ jp: '{月|つき}', en: 'moon' }]),
      panel(starTrain, YOU, 'すごい！ {私|わたし} は {富士山|ふじさん} に {登|のぼ}った [[こと が あります]]。', 'Amazing! I have climbed Mt. Fuji.', [{ jp: '{登|のぼ}る', en: 'to climb' }]),
      panel(starTrain, KIKO, '{人間|にんげん} と {電車|でんしゃ} に {乗|の}った [[こと が ありません]]。 {楽|たの}しい！', 'I have never ridden a train with a human. This is fun!', [{ jp: '{楽|たの}しい', en: 'fun' }]),
    ],
    quiz: [
      { kind: 'choice', jp: '{富士山|ふじさん} に ＿＿ こと が あります。', en: 'I have climbed Mt. Fuji.', options: ['{登|のぼ}った', '{登|のぼ}る', '{登|のぼ}って', '{登|のぼ}りた'], why: 'Use the ta-form: noboru becomes nobotta.' },
      { kind: 'choice', jp: '{天|あま}の{川|がわ} を {見|み}た こと が ＿＿。', en: 'I have never seen the Milky Way.', options: ['ありません', 'あります', 'いません', 'しません'], why: 'Koto ga arimasen means “have never.”' },
      { kind: 'choice', jp: '{京都|きょうと} に ＿＿ こと が あります か？', en: 'Have you ever been to Kyoto?', options: ['{行|い}った', '{行|い}きた', '{行|い}いた', '{行|い}って'], why: 'Iku (to go) is special: its ta-form is itta.' },
      { kind: 'choice', jp: 'すし を ＿＿ こと が あります。', en: 'I have eaten sushi before.', options: ['{食|た}べた', '{食|た}べる', '{食|た}べて', '{食|た}べない'], why: 'Use the ta-form: taberu becomes tabeta.' },
      { kind: 'build', en: 'I have been to the moon.', tiles: ['{月|つき}', 'に', '{行|い}った', 'こと', 'が', 'あります'], decoys: ['{行|い}く'] },
      { kind: 'build', en: 'I have never ridden a train.', tiles: ['{電車|でんしゃ}', 'に', '{乗|の}った', 'こと', 'が', 'ありません'], decoys: ['あります'] },
    ],
  },
  {
    id: 'tara',
    title: 'Before Sunrise',
    jpTitle: '{朝|あさ} の {前|まえ}',
    grammar: {
      pattern: '〜たら',
      meaning: 'If or when something happens, then…',
      how: 'To say “if” or “when,” use the ta-form of the verb and add ra. Then say what happens next. Ame ga futtara means “if it rains.”',
      examples: [
        { jp: '{雨|あめ} が {降|ふ}っ[[たら]]、 {行|い}きません。', en: 'If it rains, I will not go.' },
        { jp: '{駅|えき} に {着|つ}い[[たら]]、 {電話|でんわ} して ください。', en: 'When you get to the station, please call me.' },
        { jp: '{家|いえ} に {帰|かえ}っ[[たら]]、 {寝|ね}ます。', en: 'When I get home, I will sleep.' },
      ],
    },
    story: [
      panel(starTrain, 'Conductor 🐈', 'つぎ は {最後|さいご} の {駅|えき} です。', 'The next stop is the last station.', [{ jp: '{最後|さいご}', en: 'last' }]),
      panel(dawn, KIKO, '{電車|でんしゃ} を {降|お}り[[たら]]、 {走|はし}って ください！', 'When you get off the train, please run!', [
        { jp: '{降|お}りる', en: 'to get off' },
        { jp: '{走|はし}る', en: 'to run' },
      ]),
      panel(dawn, KIKO, '{朝|あさ} に なっ[[たら]]、 この {道|みち} は {消|き}えます。', 'When morning comes, this road will disappear.', [
        { jp: '{道|みち}', en: 'road' },
        { jp: '{消|き}える', en: 'to disappear' },
      ]),
      panel(dawn, YOU, 'また {会|あ}え[[たら]]、 うれしい です。', 'If we can meet again, I will be happy.', [{ jp: 'うれしい', en: 'happy' }]),
      panel(dawn, KIKO, '{京都|きょうと} に {来|き}[[たら]]、 {私|わたし} を {呼|よ}んで ください。', 'When you come to Kyoto, please call me.', [{ jp: '{呼|よ}ぶ', en: 'to call' }]),
      panel({ sky: 'day', props: ['city', 'train', 'sakura'], actors: ['🧳'] }, 'Narrator', '{目|め} を {開|あ}け[[たら]]、 {駅|えき} に いました。', 'When I opened my eyes, I was at the station.', [{ jp: '{開|あ}ける', en: 'to open' }]),
    ],
    quiz: [
      { kind: 'choice', jp: '{雨|あめ} が ＿＿、 {行|い}きません。', en: 'If it rains, I will not go.', options: ['{降|ふ}ったら', '{降|ふ}るたら', '{降|ふ}りたら', '{降|ふ}って'], why: 'Futta + ra = futtara.' },
      { kind: 'choice', jp: '{駅|えき} に ＿＿、 {電話|でんわ} して ください。', en: 'When you get to the station, please call me.', options: ['{着|つ}いたら', '{着|つ}きたら', '{着|つ}ったら', '{着|つ}くたら'], why: 'Tsuku becomes tsuita, then add ra.' },
      { kind: 'choice', jp: '{家|いえ} に ＿＿、 {寝|ね}ます。', en: 'When I get home, I will sleep.', options: ['{帰|かえ}ったら', '{帰|かえ}りたら', '{帰|かえ}るたら', '{帰|かえ}たら'], why: 'Kaeru becomes kaetta, then add ra.' },
      { kind: 'choice', jp: 'お{金|かね} が ＿＿、 {日本|にほん} に {行|い}きたい です。', en: 'If I have money, I want to go to Japan.', options: ['あったら', 'あるたら', 'いたら', 'あたら'], why: 'Aru becomes atta, then add ra.' },
      { kind: 'build', en: 'When you come to Kyoto, please call me.', tiles: ['{京都|きょうと}', 'に', '{来|き}たら', '{呼|よ}んで', 'ください'], decoys: ['{来|く}るたら'] },
      { kind: 'build', en: 'If it rains, I will not go.', tiles: ['{雨|あめ}', 'が', '{降|ふ}ったら', '{行|い}きません'], decoys: ['{降|ふ}る'] },
    ],
  },
]
