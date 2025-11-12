import {defineType} from 'sanity'

export default defineType({
  name: 'heroContent',
  title: 'Hero Content',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'subtext',
      title: 'Subtext',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {hotspot: true},
      validation: Rule => Rule.required(),
    },
    {
      name: 'visible',
      title: 'Visible',
      type: 'boolean',
      initialValue: true,
      validation: Rule => Rule.required(),
    },
  ],
})
