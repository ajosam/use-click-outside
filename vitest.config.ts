
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        setupFiles: [],
        globals: true, // optional, allows using describe/it without importing
    },
});
