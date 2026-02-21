import { useEffect, useMemo, useState } from 'react';
import { adminApi } from '../../api/crm';
import { useNotifications } from '../../components/feedback/Notifications';
import type { AdminUserActivity, AuditLogItem, UserSessionInfo } from '../../types/crm.types';
import styles from './AdminActivityPage.module.css';

export const AdminActivityPage = () => {
  const { notify } = useNotifications();
  const [users, setUsers] = useState<AdminUserActivity[]>([]);
  const [sessions, setSessions] = useState<UserSessionInfo[]>([]);
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | 'all'>('all');
  const [logAction, setLogAction] = useState('');
  const [logPath, setLogPath] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedUser = useMemo(
    () => users.find((u) => u.user_id === selectedUserId) ?? null,
    [users, selectedUserId],
  );

  const loadAll = async () => {
    setLoading(true);
    try {
      const [usersRes, sessionsRes, logsRes] = await Promise.all([
        adminApi.usersActivity(),
        adminApi.sessions({
          user_id: selectedUserId === 'all' ? undefined : selectedUserId,
          active_only: false,
        }),
        adminApi.logs({
          user_id: selectedUserId === 'all' ? undefined : selectedUserId,
          action: logAction || undefined,
          path: logPath || undefined,
          limit: 400,
        }),
      ]);
      setUsers(usersRes.data);
      setSessions(sessionsRes.data);
      setLogs(logsRes.data);
    } catch {
      notify('error', 'Ошибка загрузки', 'Не удалось загрузить данные активности пользователей.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadAll().catch(console.error);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [selectedUserId, logAction, logPath]);

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Активность сотрудников</h1>
          <p>Сессии, логи, IP-адреса, user-agent и управление доступом в реальном времени.</p>
        </div>
        <button className={styles.refreshBtn} type="button" onClick={() => loadAll()}>
          Обновить
        </button>
      </header>

      <div className={styles.filters}>
        <select
          className={styles.select}
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
        >
          <option value="all">Все сотрудники</option>
          {users.map((user) => (
            <option key={user.user_id} value={user.user_id}>
              {user.full_name} ({user.role})
            </option>
          ))}
        </select>
        <input
          className={styles.input}
          value={logAction}
          onChange={(e) => setLogAction(e.target.value)}
          placeholder="Фильтр action (например: auth_login)"
        />
        <input
          className={styles.input}
          value={logPath}
          onChange={(e) => setLogPath(e.target.value)}
          placeholder="Фильтр path (например: /schedule)"
        />
      </div>

      {selectedUser && (
        <section className={styles.stats}>
          <div className={styles.statCard}>
            <span>Сотрудник</span>
            <strong>{selectedUser.full_name}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Активных сессий</span>
            <strong>{selectedUser.active_sessions}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Всего действий</span>
            <strong>{selectedUser.total_actions}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Последняя активность</span>
            <strong>{selectedUser.last_activity_at ? new Date(selectedUser.last_activity_at).toLocaleString() : 'Нет данных'}</strong>
          </div>
        </section>
      )}

      <section className={styles.panel}>
        <h2>Сессии</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Session ID</th>
                <th>User ID</th>
                <th>IP</th>
                <th>User-Agent</th>
                <th>Начало</th>
                <th>Последняя активность</th>
                <th>Статус</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.session_id}>
                  <td>{session.session_id.slice(0, 12)}...</td>
                  <td>{session.user_id}</td>
                  <td>{session.ip_address ?? '-'}</td>
                  <td className={styles.ellipsis}>{session.user_agent ?? '-'}</td>
                  <td>{new Date(session.started_at).toLocaleString()}</td>
                  <td>{new Date(session.last_seen_at).toLocaleString()}</td>
                  <td>{session.is_active ? 'Активна' : 'Завершена'}</td>
                  <td>
                    {session.is_active && (
                      <button
                        className={styles.dangerBtn}
                        type="button"
                        onClick={async () => {
                          if (!window.confirm('Завершить эту сессию пользователя?')) return;
                          try {
                            await adminApi.terminateSession(session.session_id);
                            notify('info', 'Сессия завершена', 'Доступ пользователя по этой сессии прекращен.');
                            await loadAll();
                          } catch {
                            notify('error', 'Ошибка', 'Не удалось завершить сессию.');
                          }
                        }}
                      >
                        Завершить
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.panel}>
        <h2>Логи</h2>
        {loading && <p className={styles.loading}>Загрузка...</p>}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Время</th>
                <th>User</th>
                <th>Action</th>
                <th>Method</th>
                <th>Path</th>
                <th>Status</th>
                <th>IP</th>
                <th>User-Agent</th>
                <th>Примечание</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{new Date(log.created_at).toLocaleString()}</td>
                  <td>{log.user_id ?? '-'}</td>
                  <td>{log.action}</td>
                  <td>{log.method ?? '-'}</td>
                  <td>{log.path ?? '-'}</td>
                  <td>{log.status_code ?? '-'}</td>
                  <td>{log.ip_address ?? '-'}</td>
                  <td className={styles.ellipsis}>{log.user_agent ?? '-'}</td>
                  <td className={styles.ellipsis}>{log.review_note ?? '-'}</td>
                  <td>
                    <button
                      className={styles.secondaryBtn}
                      type="button"
                      onClick={async () => {
                        const note = window.prompt('Комментарий к логу (опционально):', log.review_note ?? '');
                        try {
                          await adminApi.reviewLog(log.id, { is_reviewed: !log.is_reviewed, review_note: note ?? null });
                          await loadAll();
                        } catch {
                          notify('error', 'Ошибка', 'Не удалось обновить лог.');
                        }
                      }}
                    >
                      {log.is_reviewed ? 'Снять review' : 'Отметить review'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};
