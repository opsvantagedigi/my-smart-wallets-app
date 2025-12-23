import { defineCliConfig } from 'sanity/cli'

// Explicit CLI config for this Studio
export default defineCliConfig({
  api: {
    projectId: 'ayo78gin',
    dataset: 'public',
  },
  deployment: {
    appId: 'x75dfotkwxi8vkb1htzh6zjc',
  },
})
