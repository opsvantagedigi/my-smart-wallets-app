// Sanity schema for the landing hero content
import {defineType, defineField} from 'sanity'

export default defineType({
	name: 'heroContent',
	title: 'Hero Content',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required().max(120),
		}),
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'text',
			rows: 3,
		}),
		defineField({
			name: 'ctaText',
			title: 'CTA Text',
			type: 'string',
		}),
		defineField({
			name: 'ctaHref',
			title: 'CTA Link',
			type: 'url',
		}),
		defineField({
			name: 'image',
			title: 'Hero Image',
			type: 'image',
			options: {hotspot: true},
			fields: [
				defineField({
					name: 'alt',
					title: 'Alt Text',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),
	],
})
