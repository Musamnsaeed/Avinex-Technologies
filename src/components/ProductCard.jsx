import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';
import { urlFor } from '../sanity/image';

export default function ProductCard({ product }) {
  const categorySlug =
    product.category?.slug ||
    (typeof product.category === 'string' ? product.category : product.categorySlug) ||
    'products';
  const productSlug = product.slug || product.id || product._id;
  const categoryLabel =
    product.category?.title ||
    product.categoryName ||
    (typeof product.category === 'string' ? product.category : '') ||
    '';
  const model = product.model || '';

  let imageUrl = null;
  try {
    if (product.image && typeof product.image === 'string') {
      imageUrl = product.image;
    } else if (product.image && urlFor(product.image).url()) {
      imageUrl = urlFor(product.image).width(600).height(450).fit('max').auto('format').url();
    }
  } catch {
    imageUrl = null;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        padding: '24px 20px',
        height: '100%',
        boxSizing: 'border-box',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow =
          '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
      }}
    >
      {/* 1. Product Name (bold, max 2 lines, centered) */}
      <h3
        style={{
          fontFamily: 'var(--font-heading, Inter, sans-serif)',
          fontSize: '1.05rem',
          fontWeight: 800,
          color: '#111827',
          textAlign: 'center',
          lineHeight: 1.3,
          margin: '0 0 10px 0',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '2.6em',
          width: '100%',
        }}
      >
        {product.name}
      </h3>

      {/* 2. Two small pill tags (category and model) */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '14px',
        }}
      >
        {categoryLabel && (
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: '#4b5563',
              background: '#f3f4f6',
              padding: '3px 10px',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              whiteSpace: 'nowrap',
              maxWidth: '160px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {categoryLabel}
          </span>
        )}
        {model && (
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: '#4b5563',
              background: '#f3f4f6',
              padding: '3px 10px',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              whiteSpace: 'nowrap',
            }}
          >
            {model}
          </span>
        )}
      </div>

      {/* 3. Image in a fixed-height frame (white background, object-fit: contain, padding) */}
      <div
        style={{
          width: '100%',
          height: '210px',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px',
          boxSizing: 'border-box',
          marginBottom: '16px',
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
        ) : (
          <div
            style={{
              color: '#9ca3af',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Layers size={32} />
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>No Image</span>
          </div>
        )}
      </div>

      {/* 4. "View Details >" link in the accent color */}
      <div style={{ marginTop: 'auto', textAlign: 'center', paddingTop: '4px' }}>
        <Link
          to={`/products/${categorySlug}/${productSlug}`}
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#0284c7',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          View Details &gt;
        </Link>
      </div>
    </div>
  );
}
