import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import { useSEO } from '../utils/useSEO';

export default function NotFound() {
  useSEO({
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist or has been moved.',
    canonical: '/404',
  });

  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        background: 'var(--bg-light)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          background: '#ffffff',
          borderRadius: '20px',
          padding: '48px 32px',
          border: '1px solid var(--gray-200)',
          boxShadow: '0 12px 40px rgba(10, 27, 61, 0.08)',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(200, 150, 46, 0.1)',
            border: '1.5px solid rgba(200, 150, 46, 0.3)',
            color: 'var(--gold)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <Compass size={32} />
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '3rem',
            fontWeight: 800,
            color: 'var(--navy-deep)',
            margin: '0 0 12px',
            lineHeight: 1.1,
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: '1.35rem',
            fontWeight: 700,
            color: 'var(--navy)',
            margin: '0 0 16px',
          }}
        >
          Page Not Found
        </h2>
        <p
          style={{
            fontSize: '0.9375rem',
            color: 'var(--gray-600)',
            lineHeight: 1.6,
            marginBottom: '32px',
          }}
        >
          The page or system component you requested could not be located. It may have been moved, renamed, or is temporarily offline.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '8px',
              background: 'var(--gold-gradient)',
              color: 'var(--navy-deep)',
              fontWeight: 700,
              fontSize: '0.875rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(212, 175, 55, 0.35)',
            }}
          >
            <Home size={16} /> Return to Home
          </Link>
          <Link
            to="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '8px',
              background: '#ffffff',
              border: '1.5px solid var(--gray-300)',
              color: 'var(--navy-deep)',
              fontWeight: 600,
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} /> View Catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}

