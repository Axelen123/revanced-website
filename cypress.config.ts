import { defineConfig } from "cypress";

import cytest from './cytest.config.js';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "svelte",
      bundler: "vite",
      viteConfig: cytest,
    },
  },
});
