import { FlatCompat } from '@eslint/eslintrc'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      import: {},
    },
    rules: {
      // Import sorting
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Node.js builtins prefixed with `node:`
            ['^node:'],
            // Node.js builtins without `node:` prefix
            [
              '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*)?$',
            ],
            // External packages
            ['^@?\\\\w'],
            // Internal packages (@/)
            ['^@/'],
            // Parent imports (..)
            ['^\\\\.\\\\.(?!/|$)', '^\\\\.\\\\./?$'],
            // Other relative imports (.)
            ['^\\\\./(?=.*/)(?!/?$)', '^\\\\.(?!/?$)', '^\\\\./?$'],
            // Style imports
            ['^.+\\\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // Additional import rules
      'import/first': 'error', // Ensure imports are at the top
      'import/newline-after-import': 'error', // Ensure line break after import
      'import/no-duplicates': 'error', // No duplicate imports
      'import/no-mutable-exports': 'error', // No mutable exports

      // Spacing between import groups
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'import', next: 'const' },
        { blankLine: 'always', prev: 'import', next: 'expression' },
        { blankLine: 'always', prev: 'import', next: 'function' },
        { blankLine: 'never', prev: 'import', next: 'import' },
      ],

      // Additional TypeScript rules
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
    },
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
]

export default eslintConfig
