import { defineArrayMember, defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'model',
      title: 'Model Number / Code',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'manufacturer',
      title: 'Manufacturer / Brand',
      type: 'reference',
      to: [{ type: 'manufacturer' }],
      description: 'e.g. Kenwood, Icom, Motorola, etc.',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline / Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'classification',
      title: 'Classification',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'leadTime',
      title: 'Lead Time',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Product Gallery / Additional Images',
      type: 'array',
      description: 'Upload multiple product photos, alternate angles, diagrams, or close-ups.',
      options: {
        layout: 'grid',
      },
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption / Label',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'compliance',
      title: 'Compliance & Standards',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'specs',
      title: 'Technical Specifications',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'specItem',
          title: 'Specification Item',
          fields: [
            defineField({
              name: 'key',
              title: 'Specification Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Specification Value',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'key',
              subtitle: 'value',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'tenderNotes',
      title: 'Tender & Procurement Notes',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'brochure',
      title: 'Datasheet / Brochure (PDF)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'model',
      media: 'image',
    },
  },
})
