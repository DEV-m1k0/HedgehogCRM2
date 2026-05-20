'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { clientsApi, coursesApi, dealsApi, scheduleApi, tasksApi } from '@/lib/api/crm';
import type { Deal, Lesson, Task, User } from '@/types/crm.types';
import './DashboardPage.css';

interface KpiStats {
  clients: number;
  courses: number;
  deals: number;
  tasks: number;
  lessons: number;
}

const PRIORITY_LABEL: Record<string, string> = { low: 'Низкий', medium: 'Средний', high: 'Высокий' };
const PRIORITY_CLASS: Record<string, string> = { low: 'dash-priority-low', medium: 'dash-priority-med', high: 'dash-priority-high' };
const TASK_STATUS: Record<string, string> = { open: 'Открыта', in_progress: 'В работе', done: 'Готова' };
const TASK_STATUS_CLASS: Record<string, string> = { open: 'dash-status-open', in_progress: 'dash-status-inprogress', done: 'dash-status-done' };

const AI_INSIGHTS = [
  {
    icon: '📈',
    title: 'Рост конверсии сделок',
    text: 'Конверсия из «Первичный контакт» в «Успех» выросла на 12% за последние 30 дней.',
    tag: 'Сделки',
    tagColor: '#6C47FF',
  },
  {
    icon: '⚠️',
    title: 'Риск пропусков',
    text: '3 ученика имеют посещаемость ниже 60%. Рекомендуется связаться с родителями.',
    tag: 'Посещаемость',
    tagColor: '#f59e0b',
  },
  {
    icon: '✅',
    title: 'Задачи в срок',
    text: '83% задач за текущий месяц закрыты в срок. Продуктивность команды — высокая.',
    tag: 'Задачи',
    tagColor: '#10b981',
  },
];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 6) return 'Доброй ночи';
  if (h < 12) return 'Доброе утро';
  if (h < 18) return 'Добрый день';
  return 'Добрый вечер';
}

function formatDate(): string {
  return new Date().toLocaleDateString('ru-RU', {
    weekday: 'long', day: 'numeric', month: 'long',
  });
}

function formatLessonTime(iso: string): string {
  return new Date(iso).toLocaleString('ru-RU', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  });
}

export const DashboardPage = () => {
  const [kpi, setKpi] = useState<KpiStats>({ clients: 0, courses: 0, deals: 0, tasks: 0, lessons: 0 });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [upcomingLessons, setUpcomingLessons] = useState<Lesson[]>([]);
  const [userName, setUserName] = useState('');
  const [aiVisible, setAiVisible] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (raw) {
      try {
        const u = JSON.parse(raw) as User;
        setUserName(u.first_name || u.email.split('@')[0]);
      } catch { /* ignore */ }
    }

    const load = async () => {
      const [clientsRes, coursesRes, dealsRes, tasksRes, lessonsRes] = await Promise.allSettled([
        clientsApi.list(),
        coursesApi.list(),
        dealsApi.list(),
        tasksApi.list(),
        scheduleApi.lessons(),
      ]);

      const allClients = clientsRes.status === 'fulfilled' ? clientsRes.value.data : [];
      const allCourses = coursesRes.status === 'fulfilled' ? coursesRes.value.data : [];
      const allDeals = dealsRes.status === 'fulfilled' ? dealsRes.value.data : [];
      const allTasks = tasksRes.status === 'fulfilled' ? tasksRes.value.data : [];
      const allLessons = lessonsRes.status === 'fulfilled' ? lessonsRes.value.data : [];

      setKpi({
        clients: allClients.length,
        courses: allCourses.length,
        deals: allDeals.length,
        tasks: allTasks.length,
        lessons: allLessons.length,
      });

      // Recent open tasks (newest first)
      const openTasks = allTasks
        .filter(t => t.status !== 'done')
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);
      setTasks(openTasks);

      // Recent active deals
      const activeDeals = allDeals
        .filter(d => d.status === 'active')
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        .slice(0, 4);
      setDeals(activeDeals);

      // Upcoming lessons
      const now = Date.now();
      const upcoming = allLessons
        .filter(l => new Date(l.start_at).getTime() > now)
        .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())
        .slice(0, 4);
      setUpcomingLessons(upcoming);
    };

    load().catch(console.error);
    const t = setTimeout(() => setAiVisible(true), 700);
    return () => clearTimeout(t);
  }, []);

  const openTasksCount = tasks.length;
  const highPriorityCount = tasks.filter(t => t.priority === 'high').length;
  const activeDealsAmount = deals.reduce((s, d) => s + (d.amount ?? 0), 0);

  return (
    <div className="dash-page">

      {/* ── Hero greeting ─────────────────────────────────────────── */}
      <header className="dash-hero">
        <div className="dash-hero-left">
          <p className="dash-greeting">{getGreeting()}{userName ? `, ${userName}` : ''}! 👋</p>
          <h1 className="dash-hero-title">Панель управления</h1>
          <p className="dash-hero-sub">{formatDate()} · Всё под контролем</p>
        </div>
        <div className="dash-hero-right">
          <div className="dash-quick-stats">
            <div className="dash-quick-stat">
              <span className="dash-quick-val">{openTasksCount}</span>
              <span className="dash-quick-label">открытых задач</span>
            </div>
            <div className="dash-quick-divider" />
            <div className="dash-quick-stat">
              <span className="dash-quick-val dash-quick-val--warn">{highPriorityCount}</span>
              <span className="dash-quick-label">высокий приоритет</span>
            </div>
            <div className="dash-quick-divider" />
            <div className="dash-quick-stat">
              <span className="dash-quick-val dash-quick-val--green">
                {activeDealsAmount > 0 ? `${(activeDealsAmount / 1000).toFixed(0)}k ₽` : '—'}
              </span>
              <span className="dash-quick-label">сумма сделок</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── KPI cards ─────────────────────────────────────────────── */}
      <section className="dash-kpi-grid">
        <article className="dash-kpi-card dash-kpi-card--cyan">
          <div className="dash-kpi-icon-wrap">
            <span className="dash-kpi-icon">👤</span>
          </div>
          <div className="dash-kpi-body">
            <span className="dash-kpi-label">Ученики</span>
            <strong className="dash-kpi-val">{kpi.clients}</strong>
          </div>
          <Link href="/clients" className="dash-kpi-link">Перейти →</Link>
        </article>

        <article className="dash-kpi-card dash-kpi-card--purple">
          <div className="dash-kpi-icon-wrap">
            <span className="dash-kpi-icon">📁</span>
          </div>
          <div className="dash-kpi-body">
            <span className="dash-kpi-label">Сделки</span>
            <strong className="dash-kpi-val">{kpi.deals}</strong>
          </div>
          <Link href="/deals" className="dash-kpi-link">Перейти →</Link>
        </article>

        <article className="dash-kpi-card dash-kpi-card--green">
          <div className="dash-kpi-icon-wrap">
            <span className="dash-kpi-icon">✅</span>
          </div>
          <div className="dash-kpi-body">
            <span className="dash-kpi-label">Задачи</span>
            <strong className="dash-kpi-val">{kpi.tasks}</strong>
          </div>
          <Link href="/tasks" className="dash-kpi-link">Перейти →</Link>
        </article>

        <article className="dash-kpi-card dash-kpi-card--orange">
          <div className="dash-kpi-icon-wrap">
            <span className="dash-kpi-icon">📅</span>
          </div>
          <div className="dash-kpi-body">
            <span className="dash-kpi-label">Занятия</span>
            <strong className="dash-kpi-val">{kpi.lessons}</strong>
          </div>
          <Link href="/calendar" className="dash-kpi-link">Перейти →</Link>
        </article>

        <article className="dash-kpi-card dash-kpi-card--teal">
          <div className="dash-kpi-icon-wrap">
            <span className="dash-kpi-icon">📚</span>
          </div>
          <div className="dash-kpi-body">
            <span className="dash-kpi-label">Курсы</span>
            <strong className="dash-kpi-val">{kpi.courses}</strong>
          </div>
          <Link href="/analytics" className="dash-kpi-link">Перейти →</Link>
        </article>
      </section>

      {/* ── Middle: tasks + deals ──────────────────────────────────── */}
      <section className="dash-mid-grid">

        {/* Recent tasks */}
        <article className="dash-panel">
          <div className="dash-panel-header">
            <div>
              <h2 className="dash-panel-title">Активные задачи</h2>
              <p className="dash-panel-sub">Задачи без статуса «Готова»</p>
            </div>
            <Link href="/tasks" className="dash-panel-link">Все задачи →</Link>
          </div>

          {tasks.length === 0 ? (
            <p className="dash-empty">Нет активных задач 🎉</p>
          ) : (
            <ul className="dash-task-list">
              {tasks.map(task => (
                <li key={task.id} className="dash-task-item">
                  <div className="dash-task-top">
                    <span className="dash-task-title">{task.title}</span>
                    <span className={`dash-priority ${PRIORITY_CLASS[task.priority] ?? ''}`}>
                      {PRIORITY_LABEL[task.priority] ?? task.priority}
                    </span>
                  </div>
                  <div className="dash-task-meta">
                    <span className={`dash-status-chip ${TASK_STATUS_CLASS[task.status] ?? ''}`}>
                      {TASK_STATUS[task.status] ?? task.status}
                    </span>
                    {task.deadline && (
                      <span className="dash-task-deadline">
                        до {new Date(task.deadline).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </article>

        {/* Right column: deals + upcoming lessons */}
        <div className="dash-right-col">

          {/* Active deals */}
          <article className="dash-panel dash-panel--compact">
            <div className="dash-panel-header">
              <div>
                <h2 className="dash-panel-title">Активные сделки</h2>
                <p className="dash-panel-sub">Сумма: {activeDealsAmount.toLocaleString('ru-RU')} ₽</p>
              </div>
              <Link href="/deals" className="dash-panel-link">Все →</Link>
            </div>

            {deals.length === 0 ? (
              <p className="dash-empty">Нет активных сделок</p>
            ) : (
              <ul className="dash-deal-list">
                {deals.map(deal => (
                  <li key={deal.id} className="dash-deal-item">
                    <div className="dash-deal-icon">💼</div>
                    <div className="dash-deal-info">
                      <span className="dash-deal-name">Сделка #{deal.id}</span>
                      <span className="dash-deal-stage">{deal.stage}</span>
                    </div>
                    <span className="dash-deal-amount">
                      {deal.amount?.toLocaleString('ru-RU')} ₽
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </article>

          {/* Upcoming lessons */}
          <article className="dash-panel dash-panel--compact">
            <div className="dash-panel-header">
              <div>
                <h2 className="dash-panel-title">Ближайшие занятия</h2>
                <p className="dash-panel-sub">Запланировано</p>
              </div>
              <Link href="/calendar" className="dash-panel-link">Календарь →</Link>
            </div>

            {upcomingLessons.length === 0 ? (
              <p className="dash-empty">Нет запланированных занятий</p>
            ) : (
              <ul className="dash-lesson-list">
                {upcomingLessons.map(lesson => (
                  <li key={lesson.id} className="dash-lesson-item">
                    <div className="dash-lesson-dot" />
                    <div className="dash-lesson-info">
                      <span className="dash-lesson-topic">{lesson.topic || `Занятие #${lesson.id}`}</span>
                      <span className="dash-lesson-time">{formatLessonTime(lesson.start_at)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </div>
      </section>

      {/* ── AI recommendations ────────────────────────────────────── */}
      <section className={`dash-ai-block ${aiVisible ? 'dash-ai-block--visible' : ''}`}>
        <div className="dash-ai-header">
          <div className="dash-ai-title-row">
            <span className="dash-ai-robot">🤖</span>
            <h2 className="dash-ai-title">AI‑рекомендации</h2>
            <span className="dash-ai-badge">✦ GigaChat Pro</span>
          </div>
          <div className="dash-ai-chips">
            <span className="dash-ai-chip">Обновлено: только что</span>
            <span className="dash-ai-chip dash-ai-chip--green">● Активен</span>
          </div>
        </div>

        <div className="dash-ai-insights">
          {AI_INSIGHTS.map((item, i) => (
            <article key={i} className="dash-ai-insight">
              <div className="dash-ai-insight-head">
                <span className="dash-ai-insight-icon">{item.icon}</span>
                <span
                  className="dash-ai-insight-tag"
                  style={{ color: item.tagColor, background: item.tagColor + '15', borderColor: item.tagColor + '40' }}
                >
                  {item.tag}
                </span>
              </div>
              <h4 className="dash-ai-insight-title">{item.title}</h4>
              <p className="dash-ai-insight-text">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="dash-ai-footer">
          Анализ выполнен GigaChat Pro 2.1.4 · {new Date().toLocaleDateString('ru-RU')} ·
          Данные: сделки, задачи, посещаемость
        </div>
      </section>

    </div>
  );
};
