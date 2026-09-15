import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'extension-js/extension.js',
		branch: process.env.EXTENSION_JS ?? 'main',
		test: ['ci:test:rspack'],
	})
}
