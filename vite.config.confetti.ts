import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import packageJson from './package.json' with { type: 'json' };

const { name } = packageJson;

console.info(' ---> Starting Confetti Content Script Build 🤞 <---');

export default defineConfig({
    plugins: [react()],

    build: {
        outDir: 'dist',
        emptyOutDir: false,

        lib: {
            entry: 'src/utils/throwConfetti.ts',
            name: name,
            formats: ['iife'],
        },

        rollupOptions: {
            output: {
                entryFileNames: 'confetti_script.js',
                extend: true,
            },
        },
    },

    publicDir: false,
});
