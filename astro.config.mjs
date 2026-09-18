// @ts-check
import { defineConfig } from 'astro/config';

// "astro dev" moet lokaal op localhost:4321/ draaien, maar de build voor
// GitHub Pages heeft de subpad-prefix nodig (repo-naam matcht niet de account-naam).
const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
	site: 'https://shemar-126662.github.io',
	base: isDev ? '/' : '/ShemarBraafheid.github.io/',
});
