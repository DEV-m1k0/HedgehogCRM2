'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClientsPage } from '@/views/Clients/ClientsPage';
import type { User } from '@/types/crm.types';

export default function Page() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (!raw) {
      router.replace('/login');
      return;
    }
    try {
      const user = JSON.parse(raw) as User;
      const roleName = user.role?.name?.toLowerCase() ?? '';
      if (roleName.includes('преподаватель') || roleName.includes('teacher')) {
        router.replace('/my-students');
        return;
      }
    } catch {
      router.replace('/login');
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return null;

  return <ClientsPage />;
}
