import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { clientsApi, dealsApi, metaApi } from '../../api/crm';
import type { Client, Deal, User } from '../../types/crm.types';
import styles from './DealsPage.module.css';
import { useNotifications } from '../../components/feedback/Notifications';

const STAGES = ['Первичный контакт', 'Пробный урок', 'Выбор курса', 'Оформление договора', 'Оплата', 'Учеба'];
const STATUS_OPTIONS = [
  { value: 'active', label: 'Активная' },
  { value: 'won', label: 'Успешная' },
  { value: 'lost', label: 'Потеряна' },
  { value: 'paused', label: 'Пауза' },
];
const LAST_STAGE = STAGES[STAGES.length - 1];

export const DealsPage = () => {
  const { notify } = useNotifications();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [updatingDealId, setUpdatingDealId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [managerFilter, setManagerFilter] = useState('');
  const [clientSearch, setClientSearch] = useState('');
  const [clientSearchOpen, setClientSearchOpen] = useState(false);
  const [form, setForm] = useState({ client_id: '', manager_id: '', amount: '' });
  const [currentUser] = useState<User | null>(() => {
    const raw = localStorage.getItem('user');
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  });

  const roleRaw = typeof currentUser?.role === 'string' ? currentUser.role : currentUser?.role?.name ?? '';
  const roleName = roleRaw.toLowerCase();
  const isManager = roleName.includes('менеджер') || roleName.includes('manager');
  const currentManagerId = isManager ? currentUser?.id ?? null : null;

  const load = async () => {
    setLoading(true);
    try {
      const [dealsRes, clientsRes, usersRes] = await Promise.all([dealsApi.list(), clientsApi.list(), metaApi.users()]);
      setDeals(dealsRes.data);
      setClients(clientsRes.data);
      setUsers(usersRes.data);
      setError('');
    } catch (e: any) {
      setError(e?.response?.data?.detail ?? 'Не удалось загрузить сделки');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load().catch(console.error);
  }, []);

  const createDeal = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.client_id) {
      return;
    }
    if (!window.confirm('Создать новую сделку?')) {
      return;
    }

    try {
      setSubmitting(true);
      const response = await dealsApi.create({
        client_id: Number(form.client_id),
        manager_id: currentManagerId ?? (form.manager_id ? Number(form.manager_id) : undefined),
        amount: Number(form.amount || 0),
        stage: STAGES[0],
        status: 'active',
      });
      setForm({ client_id: '', manager_id: '', amount: '' });
      setClientSearch('');
      setClientSearchOpen(false);
      await load();
      setShowCreateForm(false);
      notify('success', 'Сделка создана', 'Сделка успешно добавлена в воронку.', { href: `/deals#deal-${response.data.id}` });
    } catch {
      notify('error', 'Ошибка', 'Не удалось создать сделку.');
    } finally {
      setSubmitting(false);
    }
  };

  const updateDeal = async (dealId: number, payload: Partial<Pick<Deal, 'stage' | 'amount' | 'status' | 'deadline'>>, confirmText: string) => {
    if (!window.confirm(confirmText)) {
      return;
    }
    try {
      setUpdatingDealId(dealId);
      const currentDeal = deals.find((deal) => deal.id === dealId);
      const nextPayload: Partial<Pick<Deal, 'stage' | 'amount' | 'status' | 'deadline'>> = { ...payload };
      if (currentDeal) {
        if (nextPayload.stage && !nextPayload.status) {
          if (nextPayload.stage === LAST_STAGE) {
            nextPayload.status = 'won';
          } else if (currentDeal.status === 'won') {
            nextPayload.status = 'active';
          }
        }
        if (nextPayload.status === 'won' && !nextPayload.stage) {
          nextPayload.stage = LAST_STAGE;
        }
      }
      await dealsApi.patch(dealId, nextPayload);
      await load();
      notify('info', 'Сделка обновлена', 'Изменения сохранены.', { href: `/deals#deal-${dealId}` });
    } catch {
      notify('error', 'Ошибка', 'Не удалось обновить сделку.');
    } finally {
      setUpdatingDealId(null);
    }
  };

  const moveStage = async (deal: Deal) => {
    const currentIndex = STAGES.findIndex((stage) => stage === deal.stage);
    const nextIndex = currentIndex === -1 ? 0 : Math.min(currentIndex + 1, STAGES.length - 1);
    const nextStage = STAGES[nextIndex];
    if (nextStage === deal.stage) {
      return;
    }
    await updateDeal(deal.id, { stage: nextStage }, `Перевести сделку на этап "${nextStage}"?`);
  };

  const closeDeal = async (deal: Deal, status: 'won' | 'lost') => {
    const label = status === 'won' ? 'успешную' : 'потерянную';
    await updateDeal(deal.id, { status }, `Закрыть сделку как ${label}?`);
  };

  const archiveDeal = async (dealId: number) => {
    if (!window.confirm('Архивировать сделку?')) {
      return;
    }
    try {
      await dealsApi.remove(dealId);
      await load();
      notify('info', 'Сделка архивирована', 'Сделка перенесена в архив.', { href: '/archive' });
    } catch {
      notify('error', 'Ошибка', 'Не удалось архивировать сделку.');
    }
  };

  const clientsMap = useMemo(
    () => new Map(clients.map((client) => [client.id, `${client.second_name} ${client.first_name} ${client.patronymic ?? ''}`.trim()])),
    [clients],
  );

  const managersMap = useMemo(
    () => new Map(users.map((user) => [user.id, `${user.second_name} ${user.first_name}`.trim()])),
    [users],
  );

  const filteredDeals = useMemo(() => {
    const term = query.trim().toLowerCase();
    return deals.filter((deal) => {
      if (currentManagerId && deal.manager_id !== currentManagerId) {
        return false;
      }
      if (stageFilter && deal.stage !== stageFilter) {
        return false;
      }
      if (!isManager && statusFilter && deal.status !== statusFilter) {
        return false;
      }
      if (!isManager && managerFilter && String(deal.manager_id ?? '') !== managerFilter) {
        return false;
      }
      if (!term) {
        return true;
      }
      const clientName = (clientsMap.get(deal.client_id) ?? '').toLowerCase();
      const managerName = (deal.manager_id ? managersMap.get(deal.manager_id) : '')?.toLowerCase() ?? '';
      return (
        String(deal.id).includes(term) ||
        clientName.includes(term) ||
        managerName.includes(term) ||
        deal.stage.toLowerCase().includes(term) ||
        (!isManager && deal.status.toLowerCase().includes(term)) ||
        String(deal.amount).includes(term)
      );
    });
  }, [deals, query, stageFilter, statusFilter, managerFilter, clientsMap, managersMap, currentManagerId, isManager]);

  const clientOptions = useMemo(() => {
    const term = clientSearch.trim().toLowerCase();
    if (!term) {
      return clients.slice(0, 12);
    }
    return clients
      .filter((client) => {
        const fullName = `${client.second_name} ${client.first_name} ${client.patronymic ?? ''}`.toLowerCase();
        return fullName.includes(term) || String(client.id).includes(term);
      })
      .slice(0, 12);
  }, [clients, clientSearch]);

  const stageGroups = useMemo(
    () =>
      STAGES.map((stage) => ({
        stage,
        deals: filteredDeals.filter((deal) => deal.stage === stage),
      })),
    [filteredDeals],
  );

  const visibleDeals = useMemo(
    () => stageGroups.flatMap((group) => group.deals),
    [stageGroups],
  );

  const stats = useMemo(() => {
    const statsSource = visibleDeals;
    const totalAmount = statsSource.reduce((sum, deal) => sum + deal.amount, 0);
    const active = statsSource.filter((deal) => deal.status === 'active').length;
    const closed = statsSource.filter((deal) => deal.status === 'won' || deal.status === 'lost').length;
    return {
      total: statsSource.length,
      active,
      closed,
      totalAmount,
      avgAmount: statsSource.length ? totalAmount / statsSource.length : 0,
    };
  }, [visibleDeals]);

  const formatAmount = (value: number) =>
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(value || 0);

  const formatDate = (value: string | null) => (value ? new Date(value).toLocaleDateString('ru-RU') : 'не задан');

  const getStatusLabel = (status: string) => STATUS_OPTIONS.find((item) => item.value === status)?.label ?? status;

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Сделки</h1>
          <p>Воронка продаж с быстрым управлением этапами и статусами.</p>
        </div>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => setShowCreateForm((prev) => !prev)}
        >
          {showCreateForm ? 'Скрыть форму' : 'Новая сделка'}
        </button>
      </header>

      <div className={styles.statsGrid}>
        <article className={styles.statCard}><span>Сделок в выборке</span><strong>{stats.total}</strong></article>
        <article className={styles.statCard}><span>Активные</span><strong>{stats.active}</strong></article>
        <article className={styles.statCard}><span>Закрытые</span><strong>{stats.closed}</strong></article>
        <article className={styles.statCard}><span>Сумма</span><strong>{formatAmount(stats.totalAmount)}</strong><small>Средний чек: {formatAmount(stats.avgAmount)}</small></article>
      </div>

      <div className={`${styles.toolbar} ${isManager ? styles.toolbarManager : ''}`}>
        <input
          className={styles.search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isManager ? 'Поиск: ID, клиент, этап, сумма' : 'Поиск: ID, клиент, менеджер, этап, сумма'}
        />
        <select className={styles.select} value={stageFilter} onChange={(e) => setStageFilter(e.target.value)}>
          <option value="">Все этапы</option>
          {STAGES.map((stage) => (
            <option key={stage} value={stage}>{stage}</option>
          ))}
        </select>
        {!isManager ? (
          <select className={styles.select} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Все статусы</option>
            {STATUS_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        ) : null}
        {!isManager ? (
          <select className={styles.select} value={managerFilter} onChange={(e) => setManagerFilter(e.target.value)}>
            <option value="">Все менеджеры</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.second_name} {user.first_name}</option>
            ))}
          </select>
        ) : null}
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}

      {showCreateForm && (
        <form className={styles.form} onSubmit={createDeal}>
          <h2>Создание сделки</h2>
          <div className={styles.formGrid}>
            <label>
              Клиент
              <div className={styles.clientPicker}>
                <input
                  className={styles.input}
                  placeholder="Начните вводить ФИО или ID клиента"
                  value={clientSearch}
                  onFocus={() => setClientSearchOpen(true)}
                  onBlur={() => window.setTimeout(() => setClientSearchOpen(false), 120)}
                  onChange={(e) => {
                    setClientSearch(e.target.value);
                    setClientSearchOpen(true);
                    if (form.client_id) {
                      setForm((prev) => ({ ...prev, client_id: '' }));
                    }
                  }}
                />
                {clientSearchOpen ? (
                  <div className={styles.clientDropdown}>
                    {clientOptions.length > 0 ? (
                      clientOptions.map((client) => {
                        const fullName = `${client.second_name} ${client.first_name} ${client.patronymic ?? ''}`.trim();
                        return (
                          <button
                            key={client.id}
                            type="button"
                            className={styles.clientOption}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => {
                              setForm((prev) => ({ ...prev, client_id: String(client.id) }));
                              setClientSearch(fullName);
                              setClientSearchOpen(false);
                            }}
                          >
                            <span>{fullName}</span>
                            <small>#{client.id}</small>
                          </button>
                        );
                      })
                    ) : (
                      <p className={styles.clientEmpty}>Ничего не найдено</p>
                    )}
                  </div>
                ) : null}
              </div>
            </label>

            {!isManager ? (
              <label>
                Менеджер
                <select className={styles.select} value={form.manager_id} onChange={(e) => setForm({ ...form, manager_id: e.target.value })}>
                  <option value="">Не назначен</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.second_name} {user.first_name}</option>
                  ))}
                </select>
              </label>
            ) : null}

            <label>
              Сумма
              <input
                className={styles.input}
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="0"
                min={0}
              />
            </label>
          </div>
          <div className={styles.formActions}>
            <button type="button" className={styles.secondaryBtn} onClick={() => setShowCreateForm(false)}>Отмена</button>
            <button className={styles.primaryBtn} type="submit" disabled={submitting}>{submitting ? 'Сохранение...' : 'Создать сделку'}</button>
          </div>
        </form>
      )}

      {loading ? (
        <p className={styles.empty}>Загрузка сделок...</p>
      ) : (
        <div className={styles.pipeline}>
          {stageGroups.map((group) => (
            <section className={styles.stageColumn} key={group.stage}>
              <header className={styles.stageHead}>
                <h3>{group.stage}</h3>
                <span>{group.deals.length}</span>
              </header>
              {group.deals.length === 0 ? (
                <p className={styles.stageEmpty}>Нет сделок</p>
              ) : (
                <div className={styles.stageCards}>
                  {group.deals.map((deal) => (
                    <article className={styles.card} key={deal.id} id={`deal-${deal.id}`}>
                      <div className={styles.cardHead}>
                        <strong>Сделка #{deal.id}</strong>
                        <span className={`${styles.statusBadge} ${styles[`status-${deal.status}`] ?? ''}`}>{getStatusLabel(deal.status)}</span>
                      </div>
                      <p className={styles.line}>
                        <span>Клиент:</span>{' '}
                        <Link to={`/clients/${deal.client_id}`} className={styles.clientLink}>
                          {clientsMap.get(deal.client_id) ?? `ID ${deal.client_id}`}
                        </Link>
                      </p>
                      <p className={styles.line}><span>Менеджер:</span> {deal.manager_id ? managersMap.get(deal.manager_id) ?? `ID ${deal.manager_id}` : 'не назначен'}</p>
                      <p className={styles.line}><span>Сумма:</span> {formatAmount(deal.amount)}</p>
                      <p className={styles.line}><span>Дедлайн:</span> {formatDate(deal.deadline)}</p>

                      <div className={styles.cardControls}>
                        <label>
                          Этап
                          <select
                            className={styles.select}
                            value={deal.stage}
                            disabled={updatingDealId === deal.id}
                            onChange={(e) => {
                              if (e.target.value === deal.stage) {
                                return;
                              }
                              const nextStatus = e.target.value === LAST_STAGE ? 'успешная' : 'активная';
                              updateDeal(
                                deal.id,
                                { stage: e.target.value },
                                `Сменить этап сделки на "${e.target.value}"? Статус будет обновлен на "${nextStatus}" автоматически.`,
                              ).catch(console.error);
                            }}
                          >
                            {STAGES.map((stage) => (
                              <option key={stage} value={stage}>{stage}</option>
                            ))}
                          </select>
                        </label>
                        <label>
                          Статус
                          <select
                            className={styles.select}
                            value={deal.status}
                            disabled={updatingDealId === deal.id}
                            onChange={(e) => {
                              if (e.target.value === deal.status) {
                                return;
                              }
                              const willMoveToLastStage = e.target.value === 'won' && deal.stage !== LAST_STAGE;
                              updateDeal(
                                deal.id,
                                { status: e.target.value },
                                willMoveToLastStage
                                  ? `Обновить статус на "${getStatusLabel(e.target.value)}"? Сделка будет автоматически перенесена на этап "${LAST_STAGE}".`
                                  : `Обновить статус сделки на "${getStatusLabel(e.target.value)}"?`,
                              ).catch(console.error);
                            }}
                          >
                            {STATUS_OPTIONS.map((item) => (
                              <option key={item.value} value={item.value}>{item.label}</option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <div className={styles.cardActions}>
                        <button
                          className={styles.secondaryBtn}
                          onClick={() => moveStage(deal)}
                          disabled={updatingDealId === deal.id || STAGES.indexOf(deal.stage) === STAGES.length - 1}
                          title="Перевести на следующий этап"
                        >
                          Далее
                        </button>
                        <button
                          className={styles.dangerBtn}
                          onClick={() => archiveDeal(deal.id)}
                          disabled={updatingDealId === deal.id}
                          title="Перенести сделку в архив"
                        >
                          В архив
                        </button>
                        {deal.status !== 'won' ? (
                          <button
                            className={styles.successBtn}
                            onClick={() => closeDeal(deal, 'won')}
                            disabled={updatingDealId === deal.id}
                            title="Закрыть сделку как успешную"
                          >
                            Успех
                          </button>
                        ) : null}
                        {deal.status !== 'lost' ? (
                          <button
                            className={styles.warningBtn}
                            onClick={() => closeDeal(deal, 'lost')}
                            disabled={updatingDealId === deal.id}
                            title="Закрыть сделку как потерянную"
                          >
                            Потеря
                          </button>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      )}

      {!loading && filteredDeals.length === 0 ? (
        <p className={styles.empty}>По текущим фильтрам сделки не найдены.</p>
      ) : null}
    </section>
  );
};
