'use client';

import styles from '../shared/PageLayout.module.css';

interface MessagesPageProps {
  box: 'inbox' | 'sent' | 'drafts';
}

const labels: Record<MessagesPageProps['box'], string> = {
  inbox: 'Входящие',
  sent: 'Отправленные',
  drafts: 'Черновики',
};

export const MessagesPage = ({ box }: MessagesPageProps) => {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Сообщения: {labels[box]}</h1>
      <p className={styles.muted}>Интеграции Telegram/WhatsApp/email можно подключить в этом модуле на следующем этапе.</p>
    </section>
  );
};
