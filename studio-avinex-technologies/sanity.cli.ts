import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ofu7di82',
    dataset: 'production',
  },
  deployment: {
    studioHost: 'avinex-technologies',
  },
  typegen: {
    enabled: true,
    path: '../src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../src/sanity.types.ts',
    overloadClientMethods: true,
  },
})
