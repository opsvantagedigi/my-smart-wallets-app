import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {grannyTeaching} from './grannyTeaching'
import {sentinelFeature} from './sentinelFeature'
import {tokenDrop} from './tokenDrop'
import {heroContent} from './heroContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    grannyTeaching,
    sentinelFeature,
    tokenDrop,
    heroContent,
  ],
}
