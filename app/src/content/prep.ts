import type { Prep } from '../core/types'

/** Prep sheets: short-term cheat sheets for a specific place, newest first. */
export const PREPS: Prep[] = [
  {
    id: 'choku',
    emoji: '🍜',
    title: 'CHOKU (Vietnamese)',
    jpTitle: 'ベトナム {料理|りょうり} {直|ちょく}',
    where: 'Oizumi, Hokuto, Yamanashi · opens 11:00 · order on your phone, water is self-serve',
    goal: 'Order something tasty with lots of protein, with extra meat.',
    sections: [
      {
        title: '⭐ The order',
        note: 'Lunch: the beef pho set, plus a grilled-pork bun cha if you are hungry. Dinner: the beef fried rice plus the fried chicken cartilage. Some dishes are lunch-only or dinner-only. You order by scanning a QR code, so just ask about extra meat if the app doesn’t offer it.',
        lines: [
          { jp: 'お{肉|にく} を {多|おお}め に できます か？', en: 'Can I get extra meat?' },
          { jp: 'お{肉|にく} {大盛|おおも}り は あります か？', en: 'Is there a large-meat option?' },
          { jp: 'ブンチャー は ありますか？', en: 'Do you have bun cha (grilled pork with noodles)?' },
          { jp: 'パクチー {多|おお}め で お{願|ねが}い します。', en: 'Extra coriander, please.' },
          { jp: 'パクチー {抜|ぬ}き で お{願|ねが}い します。', en: 'No coriander, please.' },
        ],
      },
      {
        title: '🍜 Seen on the menu',
        lines: [
          { jp: '{出汁|だし} {自慢|じまん} の {牛肉|ぎゅうにく} の フォー セット', en: 'Beef pho set (phở bò), with our signature broth', price: '¥1,600', note: 'Lunch only. Beef, noodles, herbs, side salad.' },
          { jp: '{牛肉|ぎゅうにく} と {高菜|たかな} の チャーハン', en: 'Beef and pickled mustard-greens fried rice (cơm chiên dưa bò)', price: '¥1,200', note: 'Dinner only. Solid protein.' },
          { jp: '{鶏軟骨|とりなんこつ} の {甘辛揚|あまからあ}げ', en: 'Sweet-spicy fried chicken cartilage (sụn gà chiên mắm)', price: '¥680', note: 'Dinner only. Crunchy, great with beer.' },
        ],
      },
      {
        title: '📸 From reviews (prices not seen)',
        lines: [
          { jp: 'ブンチャー', en: 'Bun cha: grilled pork, rice noodles, dipping broth, fried spring roll', note: 'Best protein pick if it’s on.' },
          { jp: 'ブン ボー フエ', en: 'Bún bò Huế: spicy beef noodle soup with pork balls' },
          { jp: 'バインミー', en: 'Banh mi: Vietnamese baguette sandwich', note: 'Reviewers love it. Add the table chili sauce.' },
          { jp: '{生春巻|なまはるま}き', en: 'Fresh spring rolls (with shrimp)' },
          { jp: '{揚|あ}げ{春巻|はるま}き', en: 'Fried spring rolls' },
          { jp: 'レモングラス ティー', en: 'Fresh lemongrass tea', note: 'A reviewer favorite. Lightly sweet.' },
        ],
      },
      {
        title: '💬 At the table',
        lines: [
          { jp: 'スマホ で {注文|ちゅうもん} です か？', en: 'Do I order on my phone?' },
          { jp: 'お{水|みず} は セルフ です か？', en: 'Is water self-serve?' },
          { jp: 'どこ に {座|すわ}って も いい です か？', en: 'Can I sit anywhere?' },
          { jp: 'おすすめ は {何|なん} です か？', en: 'What do you recommend?' },
          { jp: 'お{会計|かいけい} お{願|ねが}い します。', en: 'Check, please.' },
          { jp: 'ごちそうさま でした。', en: 'Thank you for the meal.' },
        ],
      },
    ],
  },
  {
    id: 'fujimoto',
    emoji: '🥩',
    title: 'Yakiniku Fujimoto',
    jpTitle: '{焼肉|やきにく} ふじもと',
    where: 'Kawakami, Nagano · 11:30–13:30, 17:00–19:30 · cash likely',
    goal: 'Order something tasty with lots of protein, with extra meat.',
    sections: [
      {
        title: '⭐ The order',
        note: 'The yakiniku set gives you grilled meat, rice, wakame soup, salad and kimchi. Add one extra plate of kalbi and one of salted tongue, plus an egg soup. That’s three plates of meat, about ¥3,900.',
        lines: [
          { jp: '{焼肉定食|やきにくていしょく} {一|ひと}つ と、カルビー {一|ひと}つ と、タン{塩|しお} {一|ひと}つ ください。', en: 'One yakiniku set, one kalbi and one salted tongue, please.' },
          { jp: '{玉子|たまご} スープ も {一|ひと}つ ください。', en: 'One egg soup too, please.' },
          { jp: 'お{肉|にく} を {追加|ついか} できます か？', en: 'Can I add more meat?' },
          { jp: 'ハラミ は あります か？', en: 'Do you have harami (skirt steak)?', note: 'Their online shop sells it, but it isn’t on the dine-in menu.' },
          { jp: 'ライス {大盛|おおも}り に できます か？', en: 'Can I get a large rice?' },
        ],
      },
      {
        title: '🥩 Meat (grill it yourself)',
        lines: [
          { jp: 'ロース', en: 'Loin: lean, tender beef', price: '¥1,100', note: 'Best protein-to-fat ratio.' },
          { jp: 'カルビー', en: 'Kalbi: marbled short rib', price: '¥1,100', note: 'The tastiest. Fattier.' },
          { jp: 'タン{塩|しお}', en: 'Salted beef tongue', price: '¥1,000', note: 'Lean and very high protein. Grill fast, squeeze lemon.' },
          { jp: 'ミノ', en: 'Beef tripe (first stomach)', price: '¥900', note: 'Chewy, lean, high protein.' },
          { jp: 'ホルモン', en: 'Offal (intestine)', price: '¥900', note: 'Rich and fatty. Grill well.' },
          { jp: 'レバー', en: 'Liver', price: '¥600', note: 'Cheapest protein. Cook through.' },
          { jp: '{焼肉定食|やきにくていしょく}', en: 'Yakiniku set: meat, rice, soup, salad, kimchi', price: '¥1,400' },
        ],
      },
      {
        title: '🍚 Rice and bowls',
        lines: [
          { jp: 'ビビンバ', en: 'Bibimbap: rice with egg and vegetables', price: '¥700' },
          { jp: 'カルビ クッパ', en: 'Kalbi gukbap: rice soup with short rib', price: '¥800', note: 'Good extra protein as a finisher.' },
          { jp: 'クッパ', en: 'Gukbap: rice in spicy soup', price: '¥600' },
          { jp: 'ライス', en: 'Rice', price: '¥200' },
          { jp: 'お{茶漬|ちゃづ}け', en: 'Ochazuke: rice in tea broth', price: '¥300' },
        ],
      },
      {
        title: '🥣 Soups and sides',
        lines: [
          { jp: '{玉子|たまご} スープ', en: 'Egg soup', price: '¥400' },
          { jp: '{激辛|げきから} スープ', en: 'Extra-spicy soup', price: '¥500' },
          { jp: 'ワカメ スープ', en: 'Seaweed soup', price: '¥400' },
          { jp: '{野菜|やさい} スープ', en: 'Vegetable soup', price: '¥400' },
          { jp: 'ナムル', en: 'Namul: seasoned vegetables', price: '¥600' },
          { jp: 'キムチ', en: 'Kimchi', price: '¥300' },
          { jp: '{焼|や}き{野菜|やさい}', en: 'Vegetables to grill', price: 'market price' },
          { jp: '{生野菜|なまやさい}', en: 'Green salad', price: 'market price' },
        ],
      },
      {
        title: '💬 At the table',
        lines: [
          { jp: '{二人|ふたり} です。', en: 'Two people.' },
          { jp: 'すみません！', en: 'Excuse me! (to call staff)' },
          { jp: 'これ を もう {一|ひと}つ ください。', en: 'One more of this, please.' },
          { jp: 'お{会計|かいけい} お{願|ねが}い します。', en: 'Check, please.' },
          { jp: 'カード は {使|つか}えます か？', en: 'Can I use a card?', note: 'Small country place: bring cash.' },
          { jp: 'ごちそうさま でした。', en: 'Thank you for the meal. (say it as you leave)' },
        ],
      },
    ],
  },
]
