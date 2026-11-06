import { defineField, defineType } from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons'

export const manufacturer = defineType({
  name: 'manufacturer',
  title: 'Manufacturer / Brand',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Manufacturer Name',
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
      name: 'partnershipLevel',
      title: 'Partnership / Dealership Level',
      type: 'string',
      description: 'e.g. Authorized Dealer, Official Distributor, Technology Partner',
      options: {
        list: [
          { title: 'Authorized Dealer', value: 'Authorized Dealer' },
          { title: 'Authorized Distributor', value: 'Authorized Distributor' },
          { title: 'Direct Partner', value: 'Direct Partner' },
          { title: 'Certified Reseller', value: 'Certified Reseller' },
        ],
      },
    }),
    defineField({
      name: 'logo',
      title: 'Manufacturer Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'website',
      title: 'Official Website URL',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Description / Overview',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'partnershipLevel',
      media: 'logo',
    },
  },
})
