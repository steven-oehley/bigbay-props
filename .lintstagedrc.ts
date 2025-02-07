const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  // Lint & Prettify TS and JS files
  '**/*.{js,jsx,ts,tsx}': [buildEslintCommand, 'prettier --write'],

  // Prettify only Markdown and JSON files
  '**/*.{md,json}': ['prettier --write'],

  // Lint & Prettify CSS files
  '**/*.css': ['prettier --write'],
}
