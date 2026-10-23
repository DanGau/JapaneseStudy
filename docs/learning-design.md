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

Picture flashcards in `app/src/content/words.ts`. A card shows the picture and says "Train is…", then reveals and speaks the Japanese, then moves on by itself.

- **Random order**, due words first, then up to 8 new words per session.
- **Repeat until known.** A word you don't mark "I knew it" returns 3 cards later in the same session.
- **SM-2 scheduling** (the SuperMemo/Anki method) grades each word by your first answer that session: intervals of 1 day, 3 days, then growing by the word's ease factor. A miss resets the word to tomorrow.
- **Saved on the device**, with a JSON backup and restore on the Words screen. Word ids stay fixed so saves survive content edits.

## Content

Chapters live in `app/src/content/chapters.ts`. Japanese text uses furigana markup: `{漢字|かんじ}` for readings, `[[...]]` to highlight the grammar, and spaces between words (romaji and kana display use them).
