import { useEffect, useMemo, useState } from 'react';
import { clientsApi, coursesApi, dealsApi, groupsApi, scheduleApi, tasksApi } from '../../api/crm';
import type { AttendanceRecord, Deal, Lesson, Task, TeacherGroupStudents, User } from '../../types/crm.types';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
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
  plannedLessons: number;
}

interface WeeklyTeacherDynamics {
  week: string;
  lessons: number;
  attendanceRate: number;
  absences: number;
  hedgehogs: number;
}

interface StudentAbsencePoint {
  studentId: number;
  studentName: string;
  absences: number;
  attendanceRate: number;
  marks: number;
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
  const [teacherGroupedStudents, setTeacherGroupedStudents] = useState<TeacherGroupStudents[]>([]);
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
        coursesApi.list(),
        clientsApi.myStudentsGrouped(),
      ])
        .then(async ([lessonsRes, groupsRes, coursesRes, groupedStudentsRes]) => {
          const lessons = lessonsRes.data;
          setTeacherLessons(lessons);
          setTeacherGroupedStudents(groupedStudentsRes.data);

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
          const courseLessonCountById = new Map(coursesRes.data.map((course) => [course.id, course.lesson_count]));
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
              plannedLessons: Math.max(0, courseLessonCountById.get(group.course_id) ?? groupLessons.length),
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

  const teacherMakeupMetrics = useMemo(() => {
    const absentRows = filteredTeacherAttendance.filter((row) => row.status === 'absent');
    const scheduled = absentRows.filter((row) => Boolean(row.makeup_lesson_at)).length;
    const completed = absentRows.filter((row) => row.makeup_completed).length;
    const pending = Math.max(0, scheduled - completed);
    const unscheduled = Math.max(0, absentRows.length - scheduled);
    return { absentRows: absentRows.length, scheduled, completed, pending, unscheduled };
  }, [filteredTeacherAttendance]);

  const studentNameById = useMemo(() => {
    const map = new Map<number, string>();
    for (const group of teacherGroupedStudents) {
      for (const student of group.students) {
        map.set(student.id, `${student.second_name} ${student.first_name}`);
      }
    }
    return map;
  }, [teacherGroupedStudents]);

  const lessonById = useMemo(
    () => new Map(filteredTeacherLessons.map((lesson) => [lesson.id, lesson])),
    [filteredTeacherLessons],
  );

  const weeklyDynamicsData = useMemo<WeeklyTeacherDynamics[]>(() => {
    const weekMap = new Map<string, { lessons: number; marks: number; goodMarks: number; absences: number; hedgehogs: number }>();

    for (const lesson of filteredTeacherLessons) {
      const lessonDate = new Date(lesson.start_at);
      const weekStart = new Date(lessonDate);
      const day = weekStart.getDay();
      const diffToMonday = day === 0 ? -6 : 1 - day;
      weekStart.setDate(weekStart.getDate() + diffToMonday);
      const key = weekStart.toISOString().slice(0, 10);
      if (!weekMap.has(key)) {
        weekMap.set(key, { lessons: 0, marks: 0, goodMarks: 0, absences: 0, hedgehogs: 0 });
      }
      const bucket = weekMap.get(key);
      if (!bucket) {
        continue;
      }
      bucket.lessons += 1;
    }

    for (const row of filteredTeacherAttendance) {
      const lesson = lessonById.get(row.lesson_id);
      if (!lesson) {
        continue;
      }
      const lessonDate = new Date(lesson.start_at);
      const weekStart = new Date(lessonDate);
      const day = weekStart.getDay();
      const diffToMonday = day === 0 ? -6 : 1 - day;
      weekStart.setDate(weekStart.getDate() + diffToMonday);
      const key = weekStart.toISOString().slice(0, 10);
      const bucket = weekMap.get(key);
      if (!bucket) {
        continue;
      }
      bucket.marks += 1;
      if (row.status === 'present' || row.status === 'late') {
        bucket.goodMarks += 1;
      }
      if (row.status === 'absent') {
        bucket.absences += 1;
      }
      bucket.hedgehogs += row.hedgehogs ?? 0;
    }

    return [...weekMap.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([week, stats]) => ({
        week: new Date(`${week}T00:00:00`).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
        lessons: stats.lessons,
        attendanceRate: stats.marks > 0 ? Math.round((stats.goodMarks / stats.marks) * 100) : 0,
        absences: stats.absences,
        hedgehogs: stats.hedgehogs,
      }));
  }, [filteredTeacherAttendance, filteredTeacherLessons, lessonById]);

  const groupRemainingProgressChartData = useMemo(
    () => teacherGroupsStats
      .map((group) => {
        const totalPlanned = Math.max(1, group.plannedLessons);
        const conducted = Math.min(group.lessonsConducted, totalPlanned);
        const remainingLessons = Math.max(0, totalPlanned - conducted);
        const remainingPercent = Math.round((remainingLessons / totalPlanned) * 100);
        const completedPercent = Math.round((conducted / totalPlanned) * 100);
        return {
          name: group.groupName,
          remainingPercent,
          completedPercent,
          remainingLessons,
          totalPlanned,
        };
      })
      .sort((a, b) => b.remainingPercent - a.remainingPercent),
    [teacherGroupsStats],
  );

  const studentAbsenceChartData = useMemo<StudentAbsencePoint[]>(() => {
    const stats = new Map<number, { absences: number; good: number; marks: number }>();
    for (const row of filteredTeacherAttendance) {
      const current = stats.get(row.client_id) ?? { absences: 0, good: 0, marks: 0 };
      current.marks += 1;
      if (row.status === 'absent') {
        current.absences += 1;
      } else {
        current.good += 1;
      }
      stats.set(row.client_id, current);
    }

    return [...stats.entries()]
      .map(([studentId, row]) => ({
        studentId,
        studentName: studentNameById.get(studentId) ?? `Ученик #${studentId}`,
        absences: row.absences,
        attendanceRate: row.marks > 0 ? Math.round((row.good / row.marks) * 100) : 0,
        marks: row.marks,
      }))
      .filter((row) => row.absences > 0)
      .sort((a, b) => b.absences - a.absences)
      .slice(0, 8);
  }, [filteredTeacherAttendance, studentNameById]);

  const criticalStudents = useMemo(
    () => studentAbsenceChartData.filter((student) => student.marks >= 4 && student.attendanceRate < 75),
    [studentAbsenceChartData],
  );

  const attendanceChartData = useMemo(
    () => ([
      { name: 'Присутствовали', value: teacherMetrics.presentCount, color: '#16a34a' },
      { name: 'Опоздали', value: teacherMetrics.lateCount, color: '#f59e0b' },
      { name: 'Отсутствовали', value: teacherMetrics.absentCount, color: '#dc2626' },
    ]),
    [teacherMetrics.absentCount, teacherMetrics.lateCount, teacherMetrics.presentCount],
  );

  const makeupChartData = useMemo(
    () => ([
      { name: 'Назначены', value: teacherMakeupMetrics.scheduled, color: '#0ea5e9' },
      { name: 'Проведены', value: teacherMakeupMetrics.completed, color: '#16a34a' },
      { name: 'Ожидают', value: teacherMakeupMetrics.pending, color: '#f59e0b' },
      { name: 'Не назначены', value: teacherMakeupMetrics.unscheduled, color: '#dc2626' },
    ]),
    [teacherMakeupMetrics.completed, teacherMakeupMetrics.pending, teacherMakeupMetrics.scheduled, teacherMakeupMetrics.unscheduled],
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
  const cancellationRate = teacherMetrics.totalLessons > 0
    ? Math.round((teacherMetrics.cancelledLessons / teacherMetrics.totalLessons) * 100)
    : 0;
  const groupProgressChartHeight = Math.max(260, groupRemainingProgressChartData.length * 44);
  const truncateGroupName = (name: string) => (name.length > 22 ? `${name.slice(0, 22)}...` : name);
  const teacherStudentsCount = teacherGroupedStudents.reduce((sum, group) => sum + group.students.length, 0);

  const renderRangeControl = (
    <div className="analytics-range">
      <button type="button" className={range === '7d' ? 'active' : ''} onClick={() => setRange('7d')}>7 дней</button>
      <button type="button" className={range === '30d' ? 'active' : ''} onClick={() => setRange('30d')}>30 дней</button>
      <button type="button" className={range === 'all' ? 'active' : ''} onClick={() => setRange('all')}>Все</button>
    </div>
  );

  if (isTeacher) {
    return (
      <section className={`${styles.page} analytics-page`}>
        <div className="analytics-head analytics-head--hero">
          <div className="analytics-head-copy">
            <h1 className={styles.title}>Аналитика преподавателя</h1>
            <p className={styles.muted}>Критичные показатели по посещаемости, отработкам, нагрузке и рискам учеников {rangeLabel}.</p>
            <div className="analytics-meta-chips">
              <span className="analytics-meta-chip">Групп: {teacherGroupsStats.length}</span>
              <span className="analytics-meta-chip">Учеников: {teacherStudentsCount}</span>
              <span className="analytics-meta-chip">Отметок: {teacherMetrics.totalAttendanceMarks}</span>
            </div>
          </div>
          {renderRangeControl}
        </div>

        {analyticsLoading ? (
          <p className={styles.muted}>Загрузка аналитики...</p>
        ) : (
          <>
            <section className="analytics-section">
              <div className="analytics-section-head">
                <h2>Ключевые показатели</h2>
                <p>Оперативный срез по урокам, посещаемости и рискам.</p>
              </div>
              <div className={`${styles.grid} analytics-kpi-grid analytics-kpi-grid--teacher`}>
              <article className={`${styles.card} analytics-kpi-card`}><h3>Всего занятий</h3><p>{teacherMetrics.totalLessons}</p></article>
              <article className={`${styles.card} analytics-kpi-card`}><h3>Проведено</h3><p>{teacherMetrics.conductedLessons}</p></article>
              <article className={`${styles.card} analytics-kpi-card`}><h3>Отменено</h3><p>{teacherMetrics.cancelledLessons} ({cancellationRate}%)</p></article>
              <article className={`${styles.card} analytics-kpi-card`}><h3>Предстоящие</h3><p>{teacherMetrics.upcomingLessons}</p></article>
              <article className={`${styles.card} analytics-kpi-card`}><h3>Процент посещаемости</h3><p>{teacherMetrics.attendanceRate}%</p></article>
              <article className={`${styles.card} analytics-kpi-card`}><h3>Нагрузка (часы)</h3><p>{teacherWorkload.totalHours}</p></article>
              <article className={`${styles.card} analytics-kpi-card analytics-kpi-card--warning`}>
                <h3>Пропуски без отработки</h3>
                <p>{teacherMakeupMetrics.unscheduled}</p>
              </article>
              <article className={`${styles.card} analytics-kpi-card analytics-kpi-card--accent`}>
                <h3>Ученики в зоне риска</h3>
                <p>{criticalStudents.length}</p>
              </article>
            </div>
            </section>

            <section className="analytics-section">
              <div className="analytics-section-head">
                <h2>Динамика и отработки</h2>
                <p>Тренды недели и контроль закрытия пропусков.</p>
              </div>
              <div className={styles.grid}>
              <article className={`${styles.card} chartCard`}>
                <h3>Динамика по неделям</h3>
                <p className={styles.muted}>Линии: посещаемость и пропуски. Столбцы: проведенные занятия.</p>
                <div className="chartWrap">
                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={weeklyDynamicsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis yAxisId="left" allowDecimals={false} />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="lessons" name="Занятия" fill="#01b8e0" radius={[8, 8, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="attendanceRate" name="Посещаемость %" stroke="#16a34a" strokeWidth={2} dot={{ r: 2 }} />
                      <Line yAxisId="left" type="monotone" dataKey="absences" name="Пропуски" stroke="#dc2626" strokeWidth={2} dot={{ r: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </article>

              <article className={`${styles.card} chartCard`}>
                <h3>Прогресс по отработкам</h3>
                <p className={styles.muted}>Пропуски: {teacherMakeupMetrics.absentRows}, назначено: {teacherMakeupMetrics.scheduled}.</p>
                <div className="chartWrap">
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={makeupChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {makeupChartData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>
            </div>
            </section>

            <section className="analytics-section">
              <div className="analytics-section-head">
                <h2>Качество посещаемости</h2>
                <p>Распределение статусов и остаток программы по каждой группе.</p>
              </div>
              <div className={styles.grid}>
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
                        outerRadius={86}
                        innerRadius={52}
                        labelLine={false}
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
                          if (typeof cx !== 'number' || typeof cy !== 'number' || typeof midAngle !== 'number' || typeof innerRadius !== 'number' || typeof outerRadius !== 'number') {
                            return null;
                          }
                          const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
                          const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                          const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                          return (
                            <text x={x} y={y} fill="#ffffff" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
                              {value}
                            </text>
                          );
                        }}
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
                <h3>Осталось до завершения по группам (%)</h3>
                <div className="chartWrap" style={{ height: `${groupProgressChartHeight}px` }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={groupRemainingProgressChartData} layout="vertical" margin={{ left: 12, right: 12 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" width={160} tickFormatter={truncateGroupName} interval={0} />
                      <Tooltip
                        formatter={(value, name) => {
                          if (name === 'remainingPercent') {
                            return [`${Number(value ?? 0)}%`, 'Осталось'];
                          }
                          return [`${Number(value ?? 0)}%`, 'Пройдено'];
                        }}
                        labelFormatter={(label, payload) => {
                          const row = payload?.[0]?.payload as { totalPlanned?: number; remainingLessons?: number } | undefined;
                          if (!row) {
                            return String(label);
                          }
                          return `${label}: осталось ${row.remainingLessons ?? 0} из ${row.totalPlanned ?? 0} занятий`;
                        }}
                      />
                      <Bar dataKey="remainingPercent" name="remainingPercent" fill="#01b8e0" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>
            </div>
            </section>

            <section className="analytics-section">
              <div className="analytics-section-head">
                <h2>Нагрузка и пропуски</h2>
                <p>Где больше часов и у кого чаще пропуски.</p>
              </div>
              <div className={styles.grid}>
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
                <h3>Ученики с наибольшими пропусками</h3>
                <div className="chartWrap">
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={studentAbsenceChartData} layout="vertical" margin={{ left: 12, right: 12 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" allowDecimals={false} />
                      <YAxis type="category" dataKey="studentName" width={110} />
                      <Tooltip />
                      <Bar dataKey="absences" fill="#dc2626" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>
            </div>
            </section>

            <section className="analytics-section">
              <div className="analytics-section-head">
                <h2>Контроль рисков</h2>
                <p>Ученики с низкой посещаемостью и сводные статусы по урокам.</p>
              </div>
              <div className={styles.grid}>
              <article className={styles.card}>
                <h3>Критичные ученики</h3>
                <p className={styles.muted}>Попадают ученики с 4+ отметками и посещаемостью ниже 75%.</p>
                {criticalStudents.length === 0 ? (
                  <p className={styles.muted}>Критичных учеников не выявлено.</p>
                ) : (
                  <div className="analytics-risk-list">
                    {criticalStudents.map((student) => (
                      <div key={student.studentId} className="analytics-risk-row">
                        <span>{student.studentName}</span>
                        <strong>{student.attendanceRate}% / {student.absences} проп.</strong>
                      </div>
                    ))}
                  </div>
                )}
              </article>

              <article className={styles.card}>
                <h3>Статусы занятий</h3>
                <div className={styles.row}><span>Проведено</span><strong>{teacherMetrics.conductedLessons}</strong></div>
                <div className={styles.row}><span>Отменено</span><strong>{teacherMetrics.cancelledLessons}</strong></div>
                <div className={styles.row}><span>Предстоящие</span><strong>{teacherMetrics.upcomingLessons}</strong></div>
                <div className={styles.row}><span>Присутствовали</span><strong>{teacherMetrics.presentCount}</strong></div>
                <div className={styles.row}><span>Опоздали</span><strong>{teacherMetrics.lateCount}</strong></div>
                <div className={styles.row}><span>Отсутствовали</span><strong>{teacherMetrics.absentCount}</strong></div>
              </article>
            </div>
            </section>
          </>
        )}
      </section>
    );
  }

  return (
    <section className={`${styles.page} analytics-page`}>
      <div className="analytics-head analytics-head--hero">
        <div className="analytics-head-copy">
          <h1 className={styles.title}>Аналитика</h1>
          <p className={styles.muted}>Сводные показатели отдела {rangeLabel}.</p>
        </div>
        {renderRangeControl}
      </div>

      <section className="analytics-section">
        <div className="analytics-section-head">
          <h2>Основные показатели</h2>
          <p>Сделки и задачи в выбранном периоде.</p>
        </div>
        <div className={`${styles.grid} analytics-kpi-grid`}>
        <article className={`${styles.card} analytics-kpi-card`}><h3>Сумма сделок</h3><p>{totalRevenueFiltered}</p></article>
        <article className={`${styles.card} analytics-kpi-card`}><h3>Всего сделок</h3><p>{filteredDeals.length}</p></article>
        <article className={`${styles.card} analytics-kpi-card`}><h3>Всего задач</h3><p>{filteredTasks.length}</p></article>
        <article className={`${styles.card} analytics-kpi-card`}><h3>Закрыто задач</h3><p>{closedTasksFiltered}</p></article>
      </div>
      </section>

      <section className="analytics-section">
        <div className="analytics-section-head">
          <h2>Визуализация статусов</h2>
          <p>Распределение по текущему состоянию сделок и задач.</p>
        </div>
        <div className={styles.grid}>
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
    </section>
  );
};
