import { MakeupsPage } from '@/views/Makeups/MakeupsPage';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <MakeupsPage />
    </Suspense>
  );
}
