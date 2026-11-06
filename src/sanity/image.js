import createImageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = (typeof createImageUrlBuilder === 'function' ? createImageUrlBuilder : createImageUrlBuilder.default)(client)

function createSafeBuilder(fallbackUrl = '') {
  const chain = {
    width: () => chain,
    height: () => chain,
    fit: () => chain,
    crop: () => chain,
    auto: () => chain,
    quality: () => chain,
    format: () => chain,
    url: () => fallbackUrl,
  }
  return chain
}

export function urlFor(source) {
  if (!source) return createSafeBuilder('')

  if (typeof source === 'string') {
    return createSafeBuilder(source)
  }

  // Check if source has valid asset reference
  const hasAsset =
    Boolean(source._ref) ||
    Boolean(source.asset?._ref) ||
    Boolean(source.asset?._id) ||
    Boolean(source.asset?.url)

  if (!hasAsset) {
    return createSafeBuilder('')
  }

  try {
    const b = builder.image(source)
    return {
      width: (...args) => wrapBuilder(b.width(...args)),
      height: (...args) => wrapBuilder(b.height(...args)),
      fit: (...args) => wrapBuilder(b.fit(...args)),
      crop: (...args) => wrapBuilder(b.crop(...args)),
      auto: (...args) => wrapBuilder(b.auto(...args)),
      quality: (...args) => wrapBuilder(b.quality(...args)),
      format: (...args) => wrapBuilder(b.format(...args)),
      url: () => {
        try {
          return b.url() || ''
        } catch {
          return ''
        }
      },
    }
  } catch (err) {
    console.warn('urlFor error:', err)
    return createSafeBuilder('')
  }
}

function wrapBuilder(b) {
  if (!b) return createSafeBuilder('')
  return {
    width: (...args) => wrapBuilder(b.width?.(...args) || b),
    height: (...args) => wrapBuilder(b.height?.(...args) || b),
    fit: (...args) => wrapBuilder(b.fit?.(...args) || b),
    crop: (...args) => wrapBuilder(b.crop?.(...args) || b),
    auto: (...args) => wrapBuilder(b.auto?.(...args) || b),
    quality: (...args) => wrapBuilder(b.quality?.(...args) || b),
    format: (...args) => wrapBuilder(b.format?.(...args) || b),
    url: () => {
      try {
        return b.url?.() || ''
      } catch {
        return ''
      }
    },
  }
}
