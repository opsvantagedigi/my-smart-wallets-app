import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const heroContent = defineType({
  name: 'heroContent',
  title: 'Hero Content',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Subtitle' }),
    defineField({
      name: 'ctas',
      title: 'Call To Actions',
      type: 'array',
      of: [defineArrayMember({ type: 'object', fields: [
        defineField({ name: 'label', type: 'string', title: 'Label' }),
        defineField({ name: 'href', type: 'url', title: 'URL' })
      ] })]
    }),
    defineField({ name: 'backgroundImage', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'title', media: 'backgroundImage' } }
})
