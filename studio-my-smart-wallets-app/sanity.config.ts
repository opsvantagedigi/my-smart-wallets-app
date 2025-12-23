import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'My Smart Wallets App',

  projectId: 'ayo78gin',
  dataset: 'public',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
