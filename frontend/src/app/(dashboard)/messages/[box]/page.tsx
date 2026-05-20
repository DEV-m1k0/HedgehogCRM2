'use client';

import { useParams } from 'next/navigation';
import { MessagesPage } from '@/views/Messages/MessagesPage';

export default function Page() {
  const params = useParams();
  const box = (params?.box as 'inbox' | 'sent' | 'drafts') ?? 'inbox';
  return <MessagesPage box={box} />;
}
