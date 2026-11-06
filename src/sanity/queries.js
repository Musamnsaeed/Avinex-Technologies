export const PRODUCTS_QUERY = `*[_type == "product"] | order(featured desc, name asc) {
  _id,
  name,
  "slug": slug.current,
  model,
  category->{
    _id,
    title,
    "slug": slug.current
  },
  manufacturer->{
    _id,
    name,
    "slug": slug.current,
    partnershipLevel,
    logo,
    website
  },
  tagline,
  classification,
  featured,
  leadTime,
  image,
  gallery,
  compliance,
  specs,
  tenderNotes,
  "brochureUrl": brochure.asset->url
}`

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  model,
  category->{
    _id,
    title,
    "slug": slug.current
  },
  manufacturer->{
    _id,
    name,
    "slug": slug.current,
    partnershipLevel,
    logo,
    website
  },
  tagline,
  classification,
  featured,
  leadTime,
  image,
  gallery,
  compliance,
  specs,
  tenderNotes,
  "brochureUrl": brochure.asset->url
}`

export const CATEGORIES_QUERY = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  image,
  icon,
  subcategories
}`

export const MANUFACTURERS_QUERY = `*[_type == "manufacturer"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  partnershipLevel,
  logo,
  website,
  description
}`
