import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	compilerOptions: {
		experimental: {
			async: true
		}
	},
	vitePlugin: {
		disableDependencyReinclusion: ['@node-rs']
	},
	preprocess: vitePreprocess(),
	kit: {
		alias: {
			$routes: 'src/routes'
		},
		adapter: adapter(),
		experimental: {
			remoteFunctions: true
		}
	}
};

export default config;
