import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const sentinelFeature = defineType({
  name: 'sentinelFeature',
  title: 'Sentinel Feature',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'summary', type: 'text', title: 'Summary' }),
    defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
    defineField({ name: 'order', type: 'number', title: 'Order' }),
    defineField({ name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true }),
  ],
  preview: { select: { title: 'title', media: 'image' } }
})
