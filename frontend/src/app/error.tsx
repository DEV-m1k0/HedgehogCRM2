'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: '1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <h2 style={{ color: '#1e293b', fontSize: '1.25rem' }}>Произошла ошибка</h2>
      <p style={{ color: '#64748b' }}>{error.message}</p>
      <button
        onClick={reset}
        style={{
          padding: '0.5rem 1.5rem',
          background: '#01b8e0',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '0.875rem',
        }}
      >
        Попробовать снова
      </button>
    </div>
  );
}
