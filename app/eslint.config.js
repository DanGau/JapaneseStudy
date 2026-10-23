import tseslint from 'typescript-eslint'

// Each layer may import only what its regex allows; see docs/architecture/design.md.
const layer = (dir, allowed, message) => ({
  files: [`src/${dir}/**/*.ts`],
  ignores: ['**/*.test.ts'],
  rules: {
    'no-restricted-imports': ['error', { patterns: [{ regex: `^(?!${allowed})`, message }] }],
  },
})

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'screenshots'] },
  ...tseslint.configs.recommended,
  layer('core', '\./', 'core/ imports only core/. Pass data in instead.'),
  layer('content', '\./|\.\./core/', 'content/ imports only content/ and core/.'),
  layer('art', '\./|\.\./core/', 'art/ imports only art/ and core/.'),
  layer('ui', '\./|\.\./(core|content|art)/', 'ui/ imports only ui/, content/, art/ and core/.'),
  {
    files: ['src/core/**/*.ts'],
    ignores: ['**/*.test.ts'],
    rules: {
      'no-restricted-properties': ['error',
        { object: 'Math', property: 'random', message: 'Use rng.ts so shuffles replay from a seed.' },
        { object: 'Date', property: 'now', message: 'core/ takes the day number as an argument.' },
      ],
      'no-restricted-syntax': ['error', {
        selector: ':matches(Program, ExportNamedDeclaration) > VariableDeclaration[kind="let"]',
        message: 'No module-level mutable state in core/.',
      }],
    },
  },
)
