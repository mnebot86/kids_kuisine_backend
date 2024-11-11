const config = [
	{
		files: ['**/*.ts'],
		ignores: ['dist/**'],
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: 'module',
			globals: {
				node: true,
			},
			parser: require('@typescript-eslint/parser'),
		},
		plugins: {
			'@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
			prettier: require('eslint-plugin-prettier'),
			'simple-import-sort': require('eslint-plugin-simple-import-sort'),
		},
		rules: {
			'prettier/prettier': 'error',
			indent: ['error', 'tab', { SwitchCase: 1 }],
			quotes: ['error', 'single', { avoidEscape: true }],
			semi: ['error', 'always'],
			'arrow-body-style': ['error', 'as-needed'],
			'prefer-arrow-callback': ['error'],
			'func-style': ['error', 'expression'],
			'padding-line-between-statements': [
				'error',
				{ blankLine: 'always', prev: '*', next: 'return' },
			],
			'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
			'object-curly-spacing': ['error', 'always'],
			'no-trailing-spaces': ['error'],
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						['^node:', '^@?\\w'],
						['^(@|config|controllers|middleware|models|routes|services|utils|types)/'],
						['^\\u0000'],
						['^\\.'],
					],
				},
			],
			'eol-last': ['error', 'always'],
		},
	},
];

module.exports = config;
