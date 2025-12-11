import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { default as heroContent } from './schemas/heroContent'

export default defineConfig({
  name: 'default',
  title: 'My Smart Wallets App',

  projectId: 'ny9kxnq1',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [heroContent],
  },
})
