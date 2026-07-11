import React from 'react';
import { useLocation } from 'react-router-dom';

export default function DocPlaceholder() {
  const location = useLocation();
  // Get clean path name for display
  const pathName = location.pathname
    .split('/')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' › ');

  return (
    <div style={{
      padding: '40px 20px',
      maxWidth: '800px',
      margin: '0 auto',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        background: 'rgba(138, 69, 178, 0.1)',
        color: '#8A45B2',
        padding: '16px 24px',
        borderRadius: '50%',
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '24px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80px',
        height: '80px'
      }}>
        ℹ️
      </div>
      <h2 style={{ color: '#1A1A24', marginBottom: '12px', fontWeight: '700' }}>
        Section Coming Soon
      </h2>
      <p style={{ color: '#6A7282', fontSize: '15px', lineHeight: '1.6', maxWidth: '480px', marginBottom: '24px' }}>
        The documentation for <strong style={{ color: '#8A45B2' }}>{pathName || 'this page'}</strong> is currently being prepared. Check back shortly for details on configuring and utilizing this feature.
      </p>
      <button 
        onClick={() => window.history.back()}
        style={{
          background: 'linear-gradient(to right, #3D1B6A, #4E3074, #8A45B2)',
          color: 'white',
          border: 'none',
          padding: '10px 24px',
          borderRadius: '8px',
          fontWeight: '500',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(138, 69, 178, 0.2)',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        Go Back
      </button>
    </div>
  );
}
