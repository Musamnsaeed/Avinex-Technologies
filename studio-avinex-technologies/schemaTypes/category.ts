import { defineArrayMember, defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Category Icon',
      description: 'Choose an icon representing this category (or None)',
      type: 'string',
      options: {
        list: [
          { title: 'None (No Icon)', value: 'none' },
          { title: 'Radio (Two-Way Radios / Wireless / LMR)', value: 'Radio' },
          { title: 'Plane (Aviation / Avionics / Flight)', value: 'Plane' },
          { title: 'Server (Enterprise IT / Computing / Servers)', value: 'Server' },
          { title: 'Zap (Power / UPS / Energy)', value: 'Zap' },
          { title: 'Shield (Defense / Tactical / Security)', value: 'Shield' },
          { title: 'Camera (Surveillance / CCTV)', value: 'Camera' },
          { title: 'RadioTower (ATC / Telecom / Radar)', value: 'RadioTower' },
          { title: 'Network (Networking / Switches / Routing)', value: 'Network' },
          { title: 'Cpu (Microchips / Electronics)', value: 'Cpu' },
          { title: 'Settings (Integration / Systems / Hardware)', value: 'Settings' },
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'image',
      title: 'Category Image / Icon',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'subcategories',
      title: 'Subcategories / Line Items',
      description: 'e.g. Handheld Radio, Mobile Radio, Repeaters (displayed in header mega menu)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
    }),
  ],
})
