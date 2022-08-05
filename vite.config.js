import { sveltekit } from '@sveltejs/kit/vite';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	clearScreen: false,
	server: {
		strictPort: true
	},
	envPrefix: ['VITE_', 'TAURI_'],
	build: {
		target: ['es2021', 'chrome100', 'safari13'],
		minify: !process.env.TAURI_DEBUG ? 'esbuild' :false,
		sourcemap: !!process.env.TAURI_DEBUG,
		rollupOptions: {
			plugins: [
				rollupNodePolyFill()
			]
		}
	},
	resolve: {
		alias: {
			events: 'rollup-plugin-node-polyfills/polyfills/events'
		}
	},
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis'
			},
			plugins: [
				NodeModulesPolyfillPlugin()
			]
		}
	}
};

export default config;
