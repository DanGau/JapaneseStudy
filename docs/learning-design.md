# Learning design

The learner knows kana and basic sentences, and wants grammar that sticks.

1. **Clear steps.** Each chapter opens with what you will learn and its three steps: story, pattern, practice.
2. **Story first.** Each chapter is one scene of a continuing story. The grammar point appears in context, highlighted, before it is explained.
3. **One grammar point per chapter.** Story → grammar spotlight → quiz.
4. **Hear everything.** Every Japanese line has a 🔊 button (device Japanese voice).
5. **English on demand.** Translations stay hidden until tapped, so the learner reads the Japanese first.
6. **Romaji first.** Every line shows romaji, then kana with spaces between words. Kanji with furigana is an opt-in setting.
7. **Active recall.** Quizzes mix picking the right full sentence (with a reason on each answer) and sentence building with decoy tiles.
8. **Spaced review.** Each quiz question becomes a Leitner card; missed cards return the same day.
9. **Rewards.** Stars per chapter unlock the next; XP and a daily streak.
10. **Plain English.** Explanations are short, full sentences. Quiz answers are whole simple sentences, never fragments.

## Words

Picture flashcards in `app/src/content/words.ts`. A card shows the picture and says "Train is… densha", then moves on by itself.

**Word choice:** every word must be one an adult actually uses in Japan, out and about: on trains, in restaurants and in shops. Use the polite adult form (お手洗い, not トイレ). No textbook filler (tree, bird, apple) and no childish words. Before adding a word, check real usage with a web search.

- **Random order**, due words first, then up to 8 new words per session.
- **Loop until all are got.** One button, **Got it**. A word you don't tap goes to the back of the line; the session ends when every word is got.
- **SM-2 scheduling** (the SuperMemo/Anki method) grades each word by your first answer that session: intervals of 1 day, 3 days, then growing by the word's ease factor. A miss resets the word to tomorrow.
- **Recall first, aloud.** A 3-second countdown with a "say it out loud" cue comes before the reveal (testing effect, production effect).
- **Memory hooks.** Each word has a keyword-method hook: an English sound-alike tied to the meaning. `chapters.test.ts` requires one per word.
- **Both directions.** Words got twice in a row sometimes play Japanese first, with the picture hidden until the reveal.
- **Saved on the device**, with a JSON backup and restore on the Words screen. Word ids stay fixed so saves survive content edits.

## Content

Chapters live in `app/src/content/chapters.ts`. Japanese text uses furigana markup: `{漢字|かんじ}` for readings, `[[...]]` to highlight the grammar, and spaces between words (romaji and kana display use them).
