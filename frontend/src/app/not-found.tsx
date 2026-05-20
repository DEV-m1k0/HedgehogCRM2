'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '16px' }}>
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link href="/" style={{ color: 'var(--primary)' }}>На главную</Link>
    </div>
  );
}
