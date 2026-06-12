import { defineConfig, devices, expect } from '@playwright/test';
//import { trace } from 'node:console';

const config = ({
  testDir: './tests',
  retries: 1,
  workers: 3,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        //viewport: {width: 780,height: 720},
        ...devices[['iphone 16']],
      },
    },
    {
      name: 'firefox',

      use: {
        browserName: 'firefox',
        headless: true,
        screenshot: 'off',
        trace: 'retain-on-failure',
        //...devices['iphone 12'],
      }
    },
  ]

});

module.exports = config

