import { runInRepo, $, cd, execa } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'toeverything/AFFiNE',
		branch: process.env.AFFINE_REF ?? 'canary',
		// AFFiNE uses yarn@4 (node-modules linker); @rspack/core is a direct dependency
		// of @affine-tools/cli (pinned to 2.1.x), so the package overrides inject the
		// locally-built rspack. We run the backend-free `affine-local` Playwright e2e:
		// its config auto-starts `affine dev -p @affine/web` (RspackDevServer), so the
		// locally-built rspack is exercised at runtime in a real browser. Local-first
		// mode needs no server/DB (cloud GraphQL calls fail gracefully). Note `yarn test`
		// is vitest-on-vite and does NOT touch rspack, which is why we use the e2e here.
		verify: false,
		beforeTest: async () => {
			cd('tests/affine-local')
			await $`yarn playwright install chromium`
			cd('../..')
		},
		test: async () => {
			await execa('yarn affine @affine-test/affine-local e2e --forbid-only', {
				env: {
					...process.env,
					CI: 'true',
					BUILD_TYPE: 'canary',
					NODE_OPTIONS: '--max-old-space-size=8192',
				},
				shell: true,
			})
		},
	})
}
