import { useEffect, useMemo, useState } from 'react';
import { clientsApi, dealsApi, groupsApi, scheduleApi, tasksApi } from '../../api/crm';
import type { AttendanceRecord, Deal, Lesson, Task, User } from '../../types/crm.types';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styles from '../shared/PageLayout.module.css';
import './AnalyticsPage.css';

interface TeacherGroupStats {
  groupId: number;
  groupName: string;
  studentCount: number;
  lessonsTotal: number;
  lessonsConducted: number;
}
type AnalyticsRange = '7d' | '30d' | 'all';

const getCurrentUser = (): User | null => {
  const raw = localStorage.getItem('user');
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

export const AnalyticsPage = () => {
  const currentUser = getCurrentUser();
  const isTeacher = Boolean(currentUser?.role?.name?.toLowerCase().includes('преподаватель') || currentUser?.role?.name?.toLowerCase().includes('teacher'));

  const [teacherLessons, setTeacherLessons] = useState<Lesson[]>([]);
  const [teacherAttendance, setTeacherAttendance] = useState<AttendanceRecord[]>([]);
  const [teacherGroupsStats, setTeacherGroupsStats] = useState<TeacherGroupStats[]>([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [range, setRange] = useState<AnalyticsRange>('30d');

  const [deals, setDeals] = useState<Deal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (isTeacher && currentUser?.id) {
      setAnalyticsLoading(true);

      Promise.all([
        scheduleApi.lessons(currentUser.id),
        groupsApi.list(),
        clientsApi.myStudentsGrouped(),
      ])
        .then(async ([lessonsRes, groupsRes, groupedStudentsRes]) => {
          const lessons = lessonsRes.data;
          setTeacherLessons(lessons);

          const attendanceByLesson = await Promise.all(
            lessons.map((lesson) =>
              scheduleApi.attendance(lesson.id)
                .then((res) => res.data)
                .catch(() => [] as AttendanceRecord[]),
            ),
          );
          const flattenedAttendance = attendanceByLesson.flat();
          setTeacherAttendance(flattenedAttendance);

          const teacherGroups = groupsRes.data.filter((group) => group.teacher_id === currentUser.id);
          const studentsByGroup = new Map(
            groupedStudentsRes.data.map((group) => [group.group_id, group.students.length]),
          );

          const nextGroupStats: TeacherGroupStats[] = teacherGroups.map((group) => {
            const groupLessons = lessons.filter((lesson) => lesson.group_id === group.id);
            return {
              groupId: group.id,
              groupName: group.name,
              studentCount: studentsByGroup.get(group.id) ?? 0,
              lessonsTotal: groupLessons.length,
              lessonsConducted: groupLessons.filter((lesson) => lesson.is_conducted && !lesson.is_cancelled).length,
            };
          });
          setTeacherGroupsStats(nextGroupStats);
        })
        .catch(console.error)
        .finally(() => setAnalyticsLoading(false));
      return;
    }

    Promise.all([dealsApi.list(), tasksApi.list()])
      .then(([dealsRes, tasksRes]) => {
        setDeals(dealsRes.data);
        setTasks(tasksRes.data);
      })
      .catch(console.error);
  }, [currentUser?.id, isTeacher]);

  const rangeStartTimestamp = useMemo(() => {
    if (range === 'all') {
      return null;
    }
    const days = range === '7d' ? 7 : 30;
    return Date.now() - days * 24 * 60 * 60 * 1000;
  }, [range]);

  const filteredTeacherLessons = useMemo(() => {
    if (!rangeStartTimestamp) {
      return teacherLessons;
    }
    return teacherLessons.filter((lesson) => new Date(lesson.start_at).getTime() >= rangeStartTimestamp);
  }, [rangeStartTimestamp, teacherLessons]);

  const filteredTeacherAttendance = useMemo(() => {
    const lessonIds = new Set(filteredTeacherLessons.map((lesson) => lesson.id));
    return teacherAttendance.filter((row) => lessonIds.has(row.lesson_id));
  }, [filteredTeacherLessons, teacherAttendance]);

  const filteredDeals = useMemo(() => {
    if (!rangeStartTimestamp) {
      return deals;
    }
    return deals.filter((deal) => new Date(deal.created_at).getTime() >= rangeStartTimestamp);
  }, [deals, rangeStartTimestamp]);

  const filteredTasks = useMemo(() => {
    if (!rangeStartTimestamp) {
      return tasks;
    }
    return tasks.filter((task) => new Date(task.created_at).getTime() >= rangeStartTimestamp);
  }, [rangeStartTimestamp, tasks]);

  const totalRevenueFiltered = useMemo(() => filteredDeals.reduce((sum, deal) => sum + deal.amount, 0), [filteredDeals]);
  const closedTasksFiltered = useMemo(() => filteredTasks.filter((task) => task.status === 'done').length, [filteredTasks]);

  const teacherMetrics = useMemo(() => {
    const now = Date.now();
    const totalLessons = filteredTeacherLessons.length;
    const cancelledLessons = filteredTeacherLessons.filter((lesson) => lesson.is_cancelled).length;
    const conductedLessons = filteredTeacherLessons.filter((lesson) => lesson.is_conducted && !lesson.is_cancelled).length;
    const upcomingLessons = filteredTeacherLessons.filter((lesson) => !lesson.is_cancelled && new Date(lesson.start_at).getTime() > now).length;

    const presentCount = filteredTeacherAttendance.filter((row) => row.status === 'present').length;
    const lateCount = filteredTeacherAttendance.filter((row) => row.status === 'late').length;
    const absentCount = filteredTeacherAttendance.filter((row) => row.status === 'absent').length;
    const totalAttendanceMarks = filteredTeacherAttendance.length;
    const attendanceRate = totalAttendanceMarks > 0
      ? Math.round(((presentCount + lateCount) / totalAttendanceMarks) * 100)
      : 0;

    const totalHedgehogs = filteredTeacherAttendance.reduce((sum, row) => sum + (row.hedgehogs ?? 0), 0);

    return {
      totalLessons,
      cancelledLessons,
      conductedLessons,
      upcomingLessons,
      presentCount,
      lateCount,
      absentCount,
      attendanceRate,
      totalHedgehogs,
      totalAttendanceMarks,
    };
  }, [filteredTeacherAttendance, filteredTeacherLessons]);

  const teacherWorkload = useMemo(() => {
    const durations = filteredTeacherLessons
      .filter((lesson) => !lesson.is_cancelled)
      .map((lesson) => {
        const start = new Date(lesson.start_at).getTime();
        const end = new Date(lesson.end_at).getTime();
        return Math.max(0, end - start);
      });
    const totalHours = durations.reduce((sum, ms) => sum + ms / (1000 * 60 * 60), 0);
    return {
      totalHours: totalHours.toFixed(1),
      averageLessonMinutes: durations.length > 0
        ? Math.round(durations.reduce((sum, ms) => sum + ms, 0) / durations.length / (1000 * 60))
        : 0,
    };
  }, [filteredTeacherLessons]);

  const attendanceChartData = useMemo(
    () => ([
      { name: 'Присутствовали', value: teacherMetrics.presentCount, color: '#16a34a' },
      { name: 'Опоздали', value: teacherMetrics.lateCount, color: '#f59e0b' },
      { name: 'Отсутствовали', value: teacherMetrics.absentCount, color: '#dc2626' },
    ]),
    [teacherMetrics.absentCount, teacherMetrics.lateCount, teacherMetrics.presentCount],
  );

  const lessonStateChartData = useMemo(
    () => ([
      { name: 'Проведено', value: teacherMetrics.conductedLessons, color: '#16a34a' },
      { name: 'Отменено', value: teacherMetrics.cancelledLessons, color: '#94a3b8' },
      { name: 'Предстоящие', value: teacherMetrics.upcomingLessons, color: '#2563eb' },
    ]),
    [teacherMetrics.cancelledLessons, teacherMetrics.conductedLessons, teacherMetrics.upcomingLessons],
  );

  const weeklyLoadChartData = useMemo(() => {
    const labels = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const hoursByDay = new Array(7).fill(0);

    for (const lesson of filteredTeacherLessons) {
      if (lesson.is_cancelled) {
        continue;
      }
      const start = new Date(lesson.start_at);
      const end = new Date(lesson.end_at);
      const durationHours = Math.max(0, end.getTime() - start.getTime()) / (1000 * 60 * 60);
      hoursByDay[start.getDay()] += durationHours;
    }

    return labels.map((label, index) => ({
      day: label,
      hours: Number(hoursByDay[index].toFixed(1)),
    }));
  }, [filteredTeacherLessons]);

  const groupProgressChartData = useMemo(
    () => teacherGroupsStats.map((group) => {
      const lessonsInRange = filteredTeacherLessons.filter((lesson) => lesson.group_id === group.groupId);
      const lessonsDoneInRange = lessonsInRange.filter((lesson) => lesson.is_conducted && !lesson.is_cancelled).length;
      return {
        name: group.groupName,
        progress: lessonsInRange.length > 0 ? Math.round((lessonsDoneInRange / lessonsInRange.length) * 100) : 0,
        students: group.studentCount,
        total: lessonsInRange.length,
        done: lessonsDoneInRange,
      };
    }),
    [filteredTeacherLessons, teacherGroupsStats],
  );

  const dealsByStatus = useMemo(() => {
    const active = filteredDeals.filter((deal) => deal.status === 'active').length;
    const inactive = filteredDeals.length - active;
    return [
      { name: 'Активные', value: active, color: '#2563eb' },
      { name: 'Неактивные', value: inactive, color: '#94a3b8' },
    ];
  }, [filteredDeals]);

  const tasksByStatus = useMemo(() => {
    const done = filteredTasks.filter((task) => task.status === 'done').length;
    const inProgress = filteredTasks.filter((task) => task.status === 'in_progress').length;
    const open = filteredTasks.filter((task) => task.status === 'open').length;
    return [
      { name: 'Открыты', value: open, color: '#2563eb' },
      { name: 'В работе', value: inProgress, color: '#f59e0b' },
      { name: 'Закрыты', value: done, color: '#16a34a' },
    ];
  }, [filteredTasks]);

  const rangeLabel = range === '7d' ? 'за 7 дней' : range === '30d' ? 'за 30 дней' : 'за весь период';

  const renderRangeControl = (
    <div className="analytics-range">
      <button type="button" className={range === '7d' ? 'active' : ''} onClick={() => setRange('7d')}>7 дней</button>
      <button type="button" className={range === '30d' ? 'active' : ''} onClick={() => setRange('30d')}>30 дней</button>
      <button type="button" className={range === 'all' ? 'active' : ''} onClick={() => setRange('all')}>Все</button>
    </div>
  );

  if (isTeacher) {
    return (
      <section className={styles.page}>
        <div className="analytics-head">
          <div>
            <h1 className={styles.title}>Аналитика преподавателя</h1>
            <p className={styles.muted}>Сводка по занятиям, посещаемости и нагрузке {rangeLabel}.</p>
          </div>
          {renderRangeControl}
        </div>

        {analyticsLoading ? (
          <p className={styles.muted}>Загрузка аналитики...</p>
        ) : (
          <>
            <div className={`${styles.grid} analytics-kpi-grid`}>
              <article className={`${styles.card} analytics-kpi-card`}><h3>Всего занятий</h3><p>{teacherMetrics.totalLessons}</p></article>
              <article className={`${styles.card} analytics-kpi-card`}><h3>Проведено</h3><p>{teacherMetrics.conductedLessons}</p></article>
              <article className={`${styles.card} analytics-kpi-card`}><h3>Отменено</h3><p>{teacherMetrics.cancelledLessons}</p></article>
              <article className={`${styles.card} analytics-kpi-card`}><h3>Предстоящие</h3><p>{teacherMetrics.upcomingLessons}</p></article>
              <article className={`${styles.card} analytics-kpi-card`}><h3>Процент посещаемости</h3><p>{teacherMetrics.attendanceRate}%</p></article>
              <article className={`${styles.card} analytics-kpi-card`}><h3>Всего хечхогов</h3><p>{teacherMetrics.totalHedgehogs}</p></article>
              <article className={`${styles.card} analytics-kpi-card`}><h3>Нагрузка (часы)</h3><p>{teacherWorkload.totalHours}</p></article>
              <article className={`${styles.card} analytics-kpi-card`}><h3>Средняя длительность урока</h3><p>{teacherWorkload.averageLessonMinutes} мин</p></article>
            </div>

            <div className={styles.grid} style={{ marginTop: 12 }}>
              <article className={styles.card}>
                <h3>Посещаемость</h3>
                <p className={styles.muted}>Отмечено посещений: {teacherMetrics.totalAttendanceMarks}</p>
                <div className={styles.row}><span>Присутствовали</span><strong>{teacherMetrics.presentCount}</strong></div>
                <div className={styles.row}><span>Опоздали</span><strong>{teacherMetrics.lateCount}</strong></div>
                <div className={styles.row}><span>Отсутствовали</span><strong>{teacherMetrics.absentCount}</strong></div>
              </article>

              <article className={styles.card}>
                <h3>Группы и прогресс</h3>
                {teacherGroupsStats.length === 0 ? (
                  <p className={styles.muted}>Нет групп для отображения.</p>
                ) : (
                  teacherGroupsStats
                    .sort((a, b) => b.lessonsConducted - a.lessonsConducted)
                    .map((group) => (
                      <div key={group.groupId} className={styles.row} style={{ marginBottom: 8 }}>
                        <span>{group.groupName} ({group.studentCount} уч.)</span>
                        <strong>{group.lessonsConducted}/{group.lessonsTotal}</strong>
                      </div>
                    ))
                )}
              </article>
            </div>

            <div className={styles.grid} style={{ marginTop: 12 }}>
              <article className={`${styles.card} chartCard`}>
                <h3>Распределение посещаемости</h3>
                <div className="chartWrap">
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={attendanceChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={92}
                        innerRadius={52}
                        label
                      >
                        {attendanceChartData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </article>

              <article className={`${styles.card} chartCard`}>
                <h3>Статусы занятий</h3>
                <div className="chartWrap">
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={lessonStateChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {lessonStateChartData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>
            </div>

            <div className={styles.grid} style={{ marginTop: 12 }}>
              <article className={`${styles.card} chartCard`}>
                <h3>Нагрузка по дням недели (часы)</h3>
                <div className="chartWrap">
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={weeklyLoadChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#2563eb" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>

              <article className={`${styles.card} chartCard`}>
                <h3>Прогресс групп (%)</h3>
                <div className="chartWrap">
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={groupProgressChartData} layout="vertical" margin={{ left: 12, right: 12 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" width={90} />
                      <Tooltip formatter={(value) => `${Number(value ?? 0)}%`} />
                      <Bar dataKey="progress" fill="#0ea5e9" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>
            </div>
          </>
        )}
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className="analytics-head">
        <div>
          <h1 className={styles.title}>Аналитика</h1>
          <p className={styles.muted}>Сводные показатели отдела {rangeLabel}.</p>
        </div>
        {renderRangeControl}
      </div>

      <div className={`${styles.grid} analytics-kpi-grid`}>
        <article className={`${styles.card} analytics-kpi-card`}><h3>Сумма сделок</h3><p>{totalRevenueFiltered}</p></article>
        <article className={`${styles.card} analytics-kpi-card`}><h3>Всего сделок</h3><p>{filteredDeals.length}</p></article>
        <article className={`${styles.card} analytics-kpi-card`}><h3>Всего задач</h3><p>{filteredTasks.length}</p></article>
        <article className={`${styles.card} analytics-kpi-card`}><h3>Закрыто задач</h3><p>{closedTasksFiltered}</p></article>
      </div>

      <div className={styles.grid} style={{ marginTop: 12 }}>
        <article className={`${styles.card} chartCard`}>
          <h3>Сделки по статусу</h3>
          <div className="chartWrap">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={dealsByStatus} dataKey="value" nameKey="name" outerRadius={90} label>
                  {dealsByStatus.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className={`${styles.card} chartCard`}>
          <h3>Задачи по статусу</h3>
          <div className="chartWrap">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={tasksByStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {tasksByStatus.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>
    </section>
  );
};
