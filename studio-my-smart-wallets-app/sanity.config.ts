import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'My Smart Wallets App',

  projectId: 'ny9kxnq1',
  dataset: 'production',

  plugins: [visionTool()],

  schema: {
    types: schemaTypes,
  },
})
