'use client';

export default function DashboardError({
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
      padding: '3rem',
      minHeight: '50vh',
      gap: '1rem',
    }}>
      <h2 style={{ color: '#1e293b', fontSize: '1.25rem' }}>Ошибка загрузки страницы</h2>
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
