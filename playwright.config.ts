import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    testMatch: '**/*.spec.ts',
    timeout: 30_000,
    workers: 1,
    retries: process.env.CI ? 2 : 1,
    snapshotPathTemplate: '{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}{-projectName}{ext}',
    expect: {
        timeout: 10_000,
        toHaveScreenshot: {
            threshold: 0.1,
            maxDiffPixelRatio: 0.01,
        },
    },
    use: {
        baseURL: 'http://127.0.0.1:6106',
        trace: 'retain-on-failure',
    },
    webServer: {
        command: 'npm run storybook:test',
        url: 'http://127.0.0.1:6106',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
    ],
});
