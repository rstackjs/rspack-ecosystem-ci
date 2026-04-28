import { defineConfig, ts } from '@rslint/core'

export default defineConfig([
	{
		ignores: ['node_modules/**', 'rspack/**', 'workspace/**'],
	},
	ts.configs.recommended,
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-expressions': 'off',
			'prefer-const': 'warn',
			'no-empty': 'warn',
		},
	},
])
