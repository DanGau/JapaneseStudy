# Learning design

The learner knows kana and basic sentences, and learns best from flashcards.

1. **Flashcards first.** Study is picture flashcards with spaced repetition, plus Prep cheat sheets for real places.
2. **Hear everything.** Every Japanese line can be played aloud (device Japanese voice).
3. **Romaji first.** Every line shows romaji, then kana with spaces between words. Kanji with furigana is an opt-in setting.
4. **Practical adult Japanese.** See Word choice below.
5. **Rewards.** XP and a daily streak.

## Words

Picture flashcards in `app/src/content/words.ts`. A card shows the picture and says "Train is… densha", then moves on by itself.

A session is at most 12 cards. New ones are at most 4 words and 1 phrase. Phrases (`PHRASES` in `words.ts`) are short shop and restaurant sentences: ones you say, and ones staff say to you. Staff ones play Japanese first at full speed, to train fast listening. A word missed 4 times in one session leaves the loop and goes to **Hard words**, where it is taught in one example sentence (`content/sentences.ts`): English first, try saying it, then hear the Japanese. A word leaves Hard words when you tap "I know it now", or when you get it right first try in a later session.

**Word choice:** every word must be one an adult actually uses in Japan, out and about: on trains, in restaurants and in shops. Use the polite adult form (お手洗い, not トイレ). No textbook filler (tree, bird, apple) and no childish words. Before adding a word, check real usage with a web search.

- **Random order**, with new cards always getting their slots and due ones filling the rest.
- **Loop until all are got.** One button, **Got it**. A word you don't tap goes to the back of the line; the session ends when every word is got.
- **SM-2 scheduling** (the SuperMemo/Anki method) grades each word by your first answer that session: intervals of 1 day, 3 days, then growing by the word's ease factor. A miss resets the word to tomorrow.
- **Recall first, aloud.** A 3-second countdown with a "say it out loud" cue comes before the reveal (testing effect, production effect).
- **Memory hooks.** Each word has a keyword-method hook: an English sound-alike tied to the meaning. `content.test.ts` requires one per word.
- **Both directions.** Words got twice in a row sometimes play Japanese first, with the picture hidden until the reveal.
- **Saved on the device**, with a JSON backup and restore on the Words screen. Word ids stay fixed so saves survive content edits.

## Content

Japanese text uses furigana markup: `{漢字|かんじ}` for readings, `[[...]]` to highlight, and spaces between words (romaji and kana display use them).

## Prep

Cheat sheets for a specific place the learner is about to visit (`app/src/content/prep.ts`). They hold the real menu or situation translated into English, a recommended order, and the exact phrases, each one tap-to-hear. Every sheet also has a **What you’ll hear** section: what staff are likely to say back. Build them from the place's real menu, not guesses.
