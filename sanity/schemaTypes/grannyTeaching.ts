import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const grannyTeaching = defineType({
  name: 'grannyTeaching',
  title: "Granny's Teaching",
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'quote', type: 'text', title: 'Quote' }),
    defineField({ name: 'source', type: 'string', title: 'Source' }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], title: 'Tags' }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published At' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'source' }
  }
})
