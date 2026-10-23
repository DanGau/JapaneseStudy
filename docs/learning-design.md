# Learning design

The learner knows kana and basic sentences, and wants grammar that sticks.

1. **Story first.** Each chapter is one scene of a continuing story. The grammar point appears in context, highlighted, before it is explained.
2. **One grammar point per chapter.** Story → grammar spotlight → quiz.
3. **Hear everything.** Every Japanese line has a 🔊 button (device Japanese voice).
4. **English on demand.** Translations stay hidden until tapped, so the learner reads the Japanese first.
5. **Furigana on every kanji**, with a global toggle to hide it.
6. **Active recall.** Quizzes mix fill-the-blank (with a reason on each answer) and sentence building with decoy tiles.
7. **Spaced review.** Each quiz question becomes a Leitner card; missed cards return the same day.
8. **Rewards.** Stars per chapter unlock the next; XP and a daily streak.

## Content

Chapters live in `app/src/content/chapters.ts`. Japanese text uses furigana markup: `{漢字|かんじ}` for readings, `[[...]]` to highlight the grammar.
