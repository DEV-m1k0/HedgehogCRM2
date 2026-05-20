'use client';

import dynamic from 'next/dynamic';

const SchedulePage = dynamic(
  () => import('@/views/Schedule/SchedulePage').then((m) => ({ default: m.SchedulePage })),
  {
    ssr: false,
    loading: () => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <p>Загрузка календаря...</p>
      </div>
    ),
  },
);

export default function Page() {
  return <SchedulePage />;
}
