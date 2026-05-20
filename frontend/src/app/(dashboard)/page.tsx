'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardPage } from '@/views/Dashboard/DashboardPage';
import type { User } from '@/types/crm.types';

export default function Page() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

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
        setIsTeacher(true);
        router.replace('/calendar');
        return;
      }
    } catch {
      router.replace('/login');
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready || isTeacher) return null;

  return <DashboardPage />;
}
