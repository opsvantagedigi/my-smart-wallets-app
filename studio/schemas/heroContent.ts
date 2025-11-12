export default {
  name: 'heroContent',
  title: 'Hero Content',
  type: 'document',
  fields: [
    { name: 'headline', title: 'Headline', type: 'string' },
    { name: 'subtext', title: 'Subtext', type: 'string' },
    { name: 'ctaLabel', title: 'CTA Label', type: 'string' },
    { name: 'ctaLink', title: 'CTA Link', type: 'string' },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    },
    { name: 'visible', title: 'Visible', type: 'boolean' },
  ],
}
