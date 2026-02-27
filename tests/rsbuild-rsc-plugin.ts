import { runInRepo, $ } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'rstackjs/rsbuild-plugin-rsc',
		branch: process.env.RSBUILD_REF ?? 'main',
		beforeTest: async () => {
			await $`npx playwright install`
		},
		test: ['test'],
	})
}
