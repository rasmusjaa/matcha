module.exports = {
	extends: [
	  'airbnb-typescript',
	  'airbnb/hooks',
	  'plugin:@typescript-eslint/recommended',
	  'plugin:jest/recommended',
	  'prettier',
	  'prettier/react',
	  'prettier/@typescript-eslint',
	  'plugin:prettier/recommended'
	],
	plugins: ['react', '@typescript-eslint', 'jest'],
	env: {
	  node: true,
	  es6: true,
	  jest: true,
	  browser: true
	},
	globals: {
	  Atomics: 'readonly',
	  SharedArrayBuffer: 'readonly',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
	  ecmaFeatures: {
		jsx: true,
	  },
	  ecmaVersion: 2018,
	  sourceType: 'module',
	  project: './tsconfig.eslint.json',
	},
	rules: {
		"no-console": 0,
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
				singleQuote: true,
				semi: false,
				useTabs: true
			},
		],
		'indent': [
			'error',
			'tab',
			{ 'SwitchCase': 1 }
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'@typescript-eslint/camelcase': 'off',
		'no-expplcit-any': 'off', // poist,
		"@typescript-eslint/ban-types": ["error",
			{
				"types": {
					"String": true,
					"Boolean": false,
					"Number": true,
					"Symbol": true,
					"{}": true,
					"Object": true,
					"object": true,
					"Function": false,
				},
				"extendDefaults": true
			}
		]
	},
	overrides: [
		{
			'files': ['*.ts', '*.tsx'],
			'rules': {
				'@typescript-eslint/explicit-module-boundary-types': ['off']
			}
		},
	],
};
