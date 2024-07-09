import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import svgr from "vite-plugin-svgr";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), 
    tsconfigPaths(), 
    visualizer(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
       include: "**/*.svg",
      }),],
  build: {
    outDir: 'build',
  },
  preview: {
    port: 5002,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    reporters: ['default', 'vitest-sonar-reporter'],
    outputFile: 'test-report.xml',
    testTimeout: 50000,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['json', 'lcov', 'text', 'clover', 'html'],
      exclude: [
        'src/setupTests.tsx',
        'src/shared/testsUtils/**/*.{ts,tsx}',
        'src/**/index.{ts,tsx}',
        'src/**/*.test.{js,ts}',
        'src/**/__tests__/*.{ts,tsx}',
        'src/**/constants.ts',
        'scripts/**',
        'src/templates/**',
        'src/**/*.d.ts',
        '*.cjs',
        'build/*',
      ],
      thresholds: {
        100: true,
      },
    },
  },
});
