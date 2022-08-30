import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

    },
  },
  env: {
    baseUrl: "https://programmersit.github.io/opendelivery-api-schema-validator/"
  }

});
