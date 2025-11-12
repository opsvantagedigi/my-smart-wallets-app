import {RocketIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const tokenDrop = defineType({
  name: 'tokenDrop',
  title: 'Token Drop',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({ name: 'startDate', type: 'datetime', title: 'Start Date' }),
    defineField({ name: 'endDate', type: 'datetime', title: 'End Date' }),
    defineField({ name: 'tokenAddress', type: 'string', title: 'Token Address' }),
    defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
    defineField({ name: 'active', type: 'boolean', title: 'Active', initialValue: false }),
  ],
  preview: { select: { title: 'title', media: 'image' } }
})
