# Architecture

TypeScript (strict), Vite, Vitest, ESLint, Playwright. No UI framework: screens render HTML strings. Versions: `app/package.json`.

## Layers

Imports point down this list only. ESLint enforces it.

| Layer | Owns | May import |
|---|---|---|
| `ui/` | Screens, routing, storage, speech | `content/`, `core/` |
| `content/` | Words, phrases, sentences, Prep sheets | `core/` |
| `core/` | Types, furigana markup, romaji, progress and spaced repetition | nothing |

`core/` is pure: no DOM, `Math.random`, `Date.now`, or module-level mutable state. It compiles without the DOM lib. Callers pass in the day number and shuffle seed.

## Rules

1. **Keep complexity in the smallest box.** One component owns the hard part and exposes something simple.
2. **Code is unsurprising.** A name tells you what the code does.
3. **Don't duplicate information.** When two places must agree, derive one from the other.
