import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,        // Buggy Cars es lento
  expect: { timeout: 15000 },
  retries: 0,
  workers: 1,            // sitio compartido: no saturarlo
  use: {
    baseURL: 'https://buggy.justtestit.org',
    screenshot: 'on',    // evidencia de cada test
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'reportes/html-report' }]],
});