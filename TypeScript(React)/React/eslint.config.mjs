//eslint.config.mjs
module.exports = {
  parser: '@typescript-eslint/parser',  // TypeScriptパーサーを使用
  extends: [
    'eslint:recommended',  // 推奨設定
    'plugin:react/recommended',  // Reactの推奨設定
    'plugin:@typescript-eslint/recommended',  // TypeScriptの推奨設定
  ],
  parserOptions: {
    ecmaVersion: 2020,  // ECMAScriptのバージョンを指定
    sourceType: 'module',  // ESモジュールを使用
    ecmaFeatures: {
      jsx: true,  // JSXを使用
    },
  },
  settings: {
    react: {
      version: 'detect',  // インストールされているReactのバージョンを自動検出
    },
  },
  rules: {
    'semi': ['error', 'always'],
  },
};
