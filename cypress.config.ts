import { defineConfig } from 'cypress';
import viteConfig from './vite.config';

export default defineConfig({
  component: {
    port: 5173,
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig,
    },
    specPattern: "cypress/component/**/*.cy.{js,ts,jsx,tsx}",
    supportFile: false
  },

  e2e: {
    baseUrl: 'http://localhost:3001',

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false
  },
});
