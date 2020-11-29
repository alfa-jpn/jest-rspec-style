module.exports = {
  root: true,
  env:  {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'google',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'block-spacing':                      ['error', 'always'],
    'comma-dangle':                       ['error', {
      'arrays':    'always-multiline',
      'objects':   'always-multiline',
      'imports':   'always-multiline',
      'exports':   'always-multiline',
      'functions': 'never',
    }],
    'indent':      ['error', 2],
    'key-spacing': ['error', {
      'align': 'value',
    }],
    'max-len': ['error', {
      'code':                   100,
      'ignoreComments':         true,
      'ignoreStrings':          true,
      'ignoreTemplateLiterals': true,
    }],
    'no-multi-spaces': ['error', {
      'exceptions': {
        'ImportDeclaration':  true,
        'VariableDeclarator': true,
      },
    }],
    'object-shorthand':       'off',
    'prefer-template':        ['error'],
    'quotes':                 ['error', 'single'],
    'template-curly-spacing': ['error', 'never'],
  },
};
