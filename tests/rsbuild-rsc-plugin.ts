import { runInRepo, $ } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'rstackjs/rsbuild-plugin-rsc',
		beforeTest: async () => {
			await $`pnpm run build`
			await $`npx playwright install`
		},
		test: ['test'],
	})
}
