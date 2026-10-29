# JapaneseStudy

Kitsune Road: a phone-first Japanese study app: picture flashcards with spaced repetition, and Prep cheat sheets for places you're about to go. Learning principles: [docs/learning-design.md](docs/learning-design.md).

Architecture rules: [docs/architecture/CLAUDE.md](docs/architecture/CLAUDE.md). Read before designing or writing code.

## Rules

1. **Agent first.** The agent does all the work: code, content, tests, setup, debugging. The human supplies judgment and taste only.
2. **Brevity.** Code, comments, docs, commits, and replies follow the [brevity skill](.claude/skills/brevity/SKILL.md).
3. **Enforce mechanically.** If a linter, type, test, or hook can enforce a rule, it does. Content is validated by `src/content/content.test.ts`.
4. **No memorial to the old way.** When behavior changes, the old behavior is absent. History lives in git.
5. **Progressive disclosure.** This file stays under 50 lines. Detail goes in `docs/`, linked from here.
6. **Commit and push after every change**, straight onto `main`.
7. **End every finished piece of work with the live link**, https://dangau.github.io/JapaneseStudy/, so the human can tap it and see the change.

## Commands

Run in `app/`.

- `npm run check` — lint, typecheck, tests (content validation included).
- `npm run -s eye -- <#hash> <name> [selectors to click...]` — screenshot the app at phone size into `app/screenshots/`.
- `npm run dev` — serve for a human (`--host`, so a phone on the same Wi-Fi can open it). Each push to `main` deploys to https://dangau.github.io/JapaneseStudy/.
