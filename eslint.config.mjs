import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'], // Define os arquivos que serão verificados
    ignores: ['dist/**'], // Ignora a pasta dist
    languageOptions: {
      globals: globals.browser, // Configura os globais
    },
    rules: {
      quotes: ['error', 'single', { avoidEscape: true }], // Define aspas simples
    },
  },
  prettier,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
