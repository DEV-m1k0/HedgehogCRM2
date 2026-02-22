import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bell, Search, User, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Header.module.css';
import type { UserType } from '../../types/User.types';
import { useNotifications } from '../feedback/Notifications';
import { clientsApi, coursesApi, dealsApi, groupsApi, scheduleApi, tasksApi } from '../../api/crm';
import type { Client, Course, Deal, Group, Lesson, Task } from '../../types/crm.types';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  isMobileMenuOpen?: boolean;
}

interface SearchResultItem {
  id: string;
  label: string;
  hint: string;
  href: string;
  section: string;
}

const emptyUser: UserType = {
  id: 0,
  email: '',
  first_name: '',
  second_name: '',
  patronymic: null,
  income_per_hour: 0,
  phone: null,
  is_accepted: false,
  created_at: new Date().toISOString(),
  role: { id: 0, name: '' },
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarCollapsed, isMobileMenuOpen = false }) => {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isMobile, setIsMobile] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [user, setUser] = useState<UserType>(emptyUser);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const roleName = user.role?.name?.toLowerCase() ?? '';
  const isTeacher = roleName.includes('преподаватель') || roleName.includes('teacher');
  const isAdmin = roleName.includes('администратор') || roleName.includes('admin');
  const isManager = roleName.includes('менеджер') || roleName.includes('manager');

  const pageResults = useMemo(() => {
    const pages: SearchResultItem[] = [
      { id: 'page-account', label: 'Профиль', hint: 'Личный кабинет', href: '/account', section: 'Страницы' },
      { id: 'page-calendar', label: 'Календарь', hint: 'Расписание занятий', href: '/calendar', section: 'Страницы' },
      { id: 'page-analytics', label: 'Аналитика', hint: 'Отчеты и показатели', href: '/analytics', section: 'Страницы' },
      { id: 'page-settings', label: 'Настройки', hint: 'Параметры аккаунта', href: '/settings', section: 'Страницы' },
    ];
    if (isTeacher) {
      pages.push({ id: 'page-my-students', label: 'Мои ученики', hint: 'Список учеников преподавателя', href: '/my-students', section: 'Страницы' });
    } else {
      pages.push(
        { id: 'page-clients', label: 'Клиенты', hint: 'База учеников и клиентов', href: '/clients', section: 'Страницы' },
        { id: 'page-deals', label: 'Сделки', hint: 'Работа с воронкой', href: '/deals', section: 'Страницы' },
        { id: 'page-tasks', label: 'Задачи', hint: 'Текущие задачи команды', href: '/tasks', section: 'Страницы' },
      );
      if (isAdmin || isManager) {
        pages.push({ id: 'page-makeups', label: 'Отработки', hint: 'Назначение и контроль отработок', href: '/makeups', section: 'Страницы' });
      }
    }
    if (isAdmin) {
      pages.push({ id: 'page-admin-activity', label: 'Активность пользователей', hint: 'Админ панель', href: '/admin/activity', section: 'Страницы' });
    }
    return pages;
  }, [isAdmin, isManager, isTeacher]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (isNotificationsOpen && notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (isSearchOpen && searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isNotificationsOpen, isSearchOpen]);

  useEffect(() => {
    const term = searchQuery.trim().toLowerCase();
    if (term.length < 2) {
      setSearchResults(term.length === 0 ? [] : pageResults.filter((item) => item.label.toLowerCase().includes(term)));
      setSearchError(null);
      return;
    }

    let isCancelled = false;
    const timeoutId = setTimeout(async () => {
      setIsSearchLoading(true);
      setSearchError(null);
      try {
        const dataRequests = isTeacher
          ? [
            clientsApi.myStudents(),
            scheduleApi.lessons(user.id),
            groupsApi.list(),
            coursesApi.list(),
          ]
          : [
            clientsApi.list(),
            scheduleApi.lessons(),
            groupsApi.list(),
            coursesApi.list(),
            dealsApi.list(),
            tasksApi.list(),
          ];

        const responses = await Promise.all(dataRequests);
        if (isCancelled) return;

        let clients: Client[] = [];
        let lessons: Lesson[] = [];
        let groups: Group[] = [];
        let courses: Course[] = [];
        let deals: Deal[] = [];
        let tasks: Task[] = [];

        if (isTeacher) {
          clients = responses[0].data as Client[];
          lessons = responses[1].data as Lesson[];
          groups = (responses[2].data as Group[]).filter((group) => group.teacher_id === user.id);
          courses = responses[3].data as Course[];
        } else {
          clients = responses[0].data as Client[];
          lessons = responses[1].data as Lesson[];
          groups = responses[2].data as Group[];
          courses = responses[3].data as Course[];
          deals = responses[4].data as Deal[];
          tasks = responses[5].data as Task[];
        }

        const groupMap = new Map(groups.map((group) => [group.id, group]));
        const courseMap = new Map(courses.map((course) => [course.id, course]));

        const studentResults = clients
          .filter((client) => (`${client.second_name} ${client.first_name} ${client.patronymic ?? ''}`).toLowerCase().includes(term))
          .slice(0, 6)
          .map((client) => ({
            id: `client-${client.id}`,
            label: `${client.second_name} ${client.first_name} ${client.patronymic ?? ''}`.trim(),
            hint: 'Ученик',
            href: `/clients/${client.id}`,
            section: 'Ученики',
          }));

        const lessonResults = lessons
          .filter((lesson) => lesson.topic.toLowerCase().includes(term))
          .slice(0, 6)
          .map((lesson) => {
            const group = groupMap.get(lesson.group_id);
            const courseName = group ? (courseMap.get(group.course_id)?.name ?? 'Без курса') : 'Без группы';
            return {
              id: `lesson-${lesson.id}`,
              label: lesson.topic,
              hint: `${courseName} • ${new Date(lesson.start_at).toLocaleString()}`,
              href: `/calendar/${lesson.id}/edit`,
              section: 'Занятия',
            };
          });

        const groupResults = groups
          .filter((group) => group.name.toLowerCase().includes(term))
          .slice(0, 4)
          .map((group) => ({
            id: `group-${group.id}`,
            label: group.name,
            hint: 'Учебная группа',
            href: '/calendar',
            section: 'Группы',
          }));

        const courseResults = courses
          .filter((course) => course.name.toLowerCase().includes(term))
          .slice(0, 4)
          .map((course) => ({
            id: `course-${course.id}`,
            label: course.name,
            hint: 'Курс',
            href: '/calendar',
            section: 'Курсы',
          }));

        const dealResults = deals
          .filter((deal) => `${deal.stage} ${deal.status}`.toLowerCase().includes(term))
          .slice(0, 4)
          .map((deal) => ({
            id: `deal-${deal.id}`,
            label: `Сделка #${deal.id}`,
            hint: `${deal.stage} • ${deal.status}`,
            href: `/deals#deal-${deal.id}`,
            section: 'Сделки',
          }));

        const taskResults = tasks
          .filter((task) => `${task.title} ${task.description ?? ''}`.toLowerCase().includes(term))
          .slice(0, 4)
          .map((task) => ({
            id: `task-${task.id}`,
            label: task.title,
            hint: `Задача • ${task.status}`,
            href: `/tasks#task-${task.id}`,
            section: 'Задачи',
          }));

        const staticPageMatches = pageResults
          .filter((item) => `${item.label} ${item.hint}`.toLowerCase().includes(term))
          .slice(0, 6);

        setSearchResults([
          ...staticPageMatches,
          ...studentResults,
          ...lessonResults,
          ...groupResults,
          ...courseResults,
          ...dealResults,
          ...taskResults,
        ]);
      } catch (error) {
        console.error(error);
        if (!isCancelled) {
          setSearchError('Ошибка поиска. Попробуйте еще раз.');
          setSearchResults([]);
        }
      } finally {
        if (!isCancelled) {
          setIsSearchLoading(false);
        }
      }
    }, 280);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [isTeacher, pageResults, searchQuery, user.id]);

  return (
    <header className={`${styles.header} ${isSidebarCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.leftSection}>
        <button className={styles.sidebarToggle} onClick={toggleSidebar} aria-label="Toggle sidebar">
          {isMobile ? (isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />) : isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <div className={styles.search} ref={searchRef}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
            value={searchQuery}
            onFocus={() => setIsSearchOpen(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
          />
          {isSearchOpen && (
            <div className={styles.searchPanel}>
              {searchQuery.trim().length < 2 ? (
                <p className={styles.searchHint}>Введите минимум 2 символа для поиска по системе.</p>
              ) : isSearchLoading ? (
                <p className={styles.searchHint}>Поиск...</p>
              ) : searchError ? (
                <p className={styles.searchError}>{searchError}</p>
              ) : searchResults.length === 0 ? (
                <p className={styles.searchHint}>Ничего не найдено.</p>
              ) : (
                <div className={styles.searchResults}>
                  {searchResults.slice(0, 20).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={styles.searchResultItem}
                      onClick={() => {
                        navigate(item.href);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                    >
                      <span className={styles.searchResultTop}>
                        <strong>{item.label}</strong>
                        <em>{item.section}</em>
                      </span>
                      <span className={styles.searchResultHint}>{item.hint}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.notificationsWrap} ref={notificationsRef}>
          <button
            className={styles.iconButton}
            onClick={() => {
              const nextOpen = !isNotificationsOpen;
              setIsNotificationsOpen(nextOpen);
              if (nextOpen) {
                markAllAsRead();
              }
            }}
            aria-label="Открыть уведомления"
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className={styles.badge}>{unreadCount > 99 ? '99+' : unreadCount}</span>}
          </button>

          {isNotificationsOpen && (
            <div className={styles.notificationsPanel}>
              <div className={styles.notificationsHeader}>
                <strong>Уведомления</strong>
                <button type="button" className={styles.linkButton} onClick={markAllAsRead}>
                  Прочитать все
                </button>
              </div>

              <div className={styles.notificationsList}>
                {notifications.length === 0 ? (
                  <p className={styles.notificationsEmpty}>Пока уведомлений нет</p>
                ) : (
                  notifications.slice(0, 50).map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      className={`${styles.notificationItem} ${!item.read ? styles.unread : ''}`}
                      onClick={() => {
                        markAsRead(item.id);
                        if (item.href) {
                          navigate(item.href);
                          setIsNotificationsOpen(false);
                        }
                      }}
                    >
                      <div className={styles.notificationTop}>
                        <span className={styles.notificationTitle}>{item.title}</span>
                        <span className={styles.notificationTime}>
                          {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <span className={styles.notificationText}>{item.message}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          className={styles.userMenu}
          onClick={() => navigate('/account')}
          aria-label="Открыть профиль"
        >
          <div className={styles.avatar}>
            <User size={24} />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.second_name} {user.first_name}</span>
            <span className={styles.userRole}>{user.role.name}</span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
