import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
// import phaser from '@phaser';
export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    // phaser(),
  ],
});