import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { coursesApi, groupsApi, metaApi, scheduleApi } from '../../api/crm';
import type { AttendanceRecord, AttendanceStatus, Client, Course, Group, User } from '../../types/crm.types';
import ConfirmationModal from './Components/ConfirmationModal';
import { useNotifications } from '../../components/feedback/Notifications';
import './LessonFormPage.css';

interface LessonFormState {
  group_id: number;
  topic: string;
  start_at: string;
  end_at: string;
  materials_url: string;
  comment: string;
  is_cancelled: boolean;
  is_recurring_weekly: boolean;
  recurrence_until: string;
}

interface AttendanceDraft {
  client_id: number;
  status: AttendanceStatus;
  comment: string;
  hedgehogs: number;
}

type AttendanceSyncState = 'idle' | 'saving' | 'saved' | 'error';
type DeleteScope = 'single' | 'future' | 'all';

const toDateTimeLocal = (iso: string) => {
  const date = new Date(iso);
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 16);
};

const dateToLocalInput = (date: Date) => {
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 16);
};

const localInputToApiDateTime = (value: string): string => `${value}:00`;

const getDefaultRange = (date: string | null) => {
  const baseDate = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : new Date().toISOString().slice(0, 10);
  return {
    start_at: `${baseDate}T10:00`,
    end_at: `${baseDate}T11:00`,
  };
};

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

const statusText: Record<AttendanceStatus, string> = {
  present: 'Присутствовал',
  late: 'Опоздал',
  absent: 'Отсутствовал',
};

export const LessonFormPage = () => {
  const { notify } = useNotifications();
  const { lessonId } = useParams();
  const isEditMode = Boolean(lessonId);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [groups, setGroups] = useState<Group[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [students, setStudents] = useState<Client[]>([]);
  const [attendance, setAttendance] = useState<Record<number, AttendanceDraft>>({});
  const [loading, setLoading] = useState(true);
  const [attendanceSyncState, setAttendanceSyncState] = useState<AttendanceSyncState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [applyToFuture, setApplyToFuture] = useState(false);
  const [canApplyToFuture, setCanApplyToFuture] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteScope, setDeleteScope] = useState<DeleteScope>('single');

  const attendanceReadyRef = useRef(false);
  const lastAttendanceSnapshotRef = useRef('');
  const attendanceDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedStatusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentUser = getCurrentUser();
  const isTeacher = currentUser?.role?.name?.toLowerCase() === 'преподаватель';

  const defaultRange = getDefaultRange(searchParams.get('date'));
  const teacherFilter = isTeacher ? String(currentUser?.id ?? '') : searchParams.get('teacherId');

  const [form, setForm] = useState<LessonFormState>({
    group_id: 0,
    topic: '',
    start_at: defaultRange.start_at,
    end_at: defaultRange.end_at,
    materials_url: '',
    comment: '',
    is_cancelled: false,
    is_recurring_weekly: false,
    recurrence_until: defaultRange.start_at.slice(0, 10),
  });

  const teacherOptions = useMemo(
    () => users.filter((user) => user.role.name.toLowerCase() === 'преподаватель'),
    [users],
  );

  const availableGroups = useMemo(() => {
    if (!teacherFilter) {
      return groups;
    }
    const teacherId = Number(teacherFilter);
    if (!Number.isInteger(teacherId) || teacherId <= 0) {
      return groups;
    }
    return groups.filter((group) => group.teacher_id === teacherId);
  }, [groups, teacherFilter]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [groupsRes, coursesRes, usersRes] = await Promise.all([
          groupsApi.list(),
          coursesApi.list(),
          metaApi.users(),
        ]);

        const groupItems = groupsRes.data;
        setGroups(groupItems);
        setCourses(coursesRes.data);
        setUsers(usersRes.data);

        if (isEditMode && lessonId) {
          const lessonRes = await scheduleApi.lesson(Number(lessonId));
          const lesson = lessonRes.data;
          setForm({
            group_id: lesson.group_id,
            topic: lesson.topic,
            start_at: toDateTimeLocal(lesson.start_at),
            end_at: toDateTimeLocal(lesson.end_at),
            materials_url: lesson.materials_url ?? '',
            comment: lesson.comment ?? '',
            is_cancelled: lesson.is_cancelled,
            is_recurring_weekly: lesson.is_recurring_weekly,
            recurrence_until: toDateTimeLocal(lesson.start_at).slice(0, 10),
          });
          setCanApplyToFuture(Boolean(lesson.recurrence_group_id));
          setDeleteScope('single');
        } else {
          const teacherId = Number(teacherFilter);
          const filtered = Number.isInteger(teacherId) && teacherId > 0
            ? groupItems.filter((group) => group.teacher_id === teacherId)
            : groupItems;
          if (filtered.length > 0) {
            setForm((prev) => ({ ...prev, group_id: filtered[0].id }));
          }
        }
      } catch (requestError) {
        console.error(requestError);
        setError('Не удалось загрузить данные формы');
      } finally {
        setLoading(false);
      }
    };

    load().catch(console.error);
  }, [isEditMode, lessonId, teacherFilter]);

  useEffect(() => {
    if (!canApplyToFuture && deleteScope !== 'single') {
      setDeleteScope('single');
    }
  }, [canApplyToFuture, deleteScope]);

  useEffect(() => {
    if (availableGroups.length === 0) {
      return;
    }

    const hasSelected = availableGroups.some((group) => group.id === form.group_id);
    if (!hasSelected) {
      setForm((prev) => ({ ...prev, group_id: availableGroups[0].id }));
    }
  }, [availableGroups, form.group_id]);

  useEffect(() => {
    if (!isEditMode || !lessonId || !form.group_id) {
      return;
    }

    const loadAttendanceData = async () => {
      try {
        const [studentsRes, attendanceRes] = await Promise.all([
          groupsApi.students(form.group_id),
          scheduleApi.attendance(Number(lessonId)),
        ]);

        const studentsData = studentsRes.data;
        const attendanceMap = new Map(attendanceRes.data.map((item: AttendanceRecord) => [item.client_id, item]));

        const nextAttendance = studentsData.reduce<Record<number, AttendanceDraft>>((acc, student) => {
          const existing = attendanceMap.get(student.id);
          acc[student.id] = {
            client_id: student.id,
            status: existing?.status ?? 'present',
            comment: existing?.comment ?? '',
            hedgehogs: existing?.hedgehogs ?? 0,
          };
          return acc;
        }, {});

        setStudents(studentsData);
        setAttendance(nextAttendance);
        lastAttendanceSnapshotRef.current = JSON.stringify(nextAttendance);
        attendanceReadyRef.current = true;
        setAttendanceSyncState('idle');
      } catch (requestError) {
        console.error(requestError);
        setError('Не удалось загрузить посещаемость группы');
      }
    };

    loadAttendanceData().catch(console.error);
  }, [isEditMode, lessonId, form.group_id]);

  useEffect(() => {
    return () => {
      if (attendanceDebounceRef.current) {
        clearTimeout(attendanceDebounceRef.current);
      }
      if (savedStatusTimeoutRef.current) {
        clearTimeout(savedStatusTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isEditMode || !lessonId || !attendanceReadyRef.current || students.length === 0) {
      return;
    }

    const currentSnapshot = JSON.stringify(attendance);
    if (currentSnapshot === lastAttendanceSnapshotRef.current) {
      return;
    }

    setAttendanceSyncState('saving');

    if (attendanceDebounceRef.current) {
      clearTimeout(attendanceDebounceRef.current);
    }

    attendanceDebounceRef.current = setTimeout(async () => {
      try {
        await Promise.all(
          Object.values(attendance).map((item) =>
            scheduleApi.upsertAttendance(Number(lessonId), {
              client_id: item.client_id,
              status: item.status,
              comment: item.comment || null,
              hedgehogs: item.hedgehogs ?? 0,
            }),
          ),
        );

        lastAttendanceSnapshotRef.current = JSON.stringify(attendance);
        setAttendanceSyncState('saved');

        if (savedStatusTimeoutRef.current) {
          clearTimeout(savedStatusTimeoutRef.current);
        }
        savedStatusTimeoutRef.current = setTimeout(() => setAttendanceSyncState('idle'), 1200);
      } catch (requestError) {
        console.error(requestError);
        setAttendanceSyncState('error');
      }
    }, 650);
  }, [attendance, isEditMode, lessonId, students.length]);

  const handleChange = (field: keyof LessonFormState, value: string | boolean | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const setDurationMinutes = (minutes: number) => {
    if (!form.start_at) {
      return;
    }

    const start = new Date(form.start_at);
    if (Number.isNaN(start.getTime())) {
      return;
    }

    const end = new Date(start.getTime() + minutes * 60_000);
    setForm((prev) => ({ ...prev, end_at: dateToLocalInput(end) }));
  };

  const courseMap = useMemo(() => new Map(courses.map((course) => [course.id, course])), [courses]);
  const teacherMap = useMemo(() => new Map(teacherOptions.map((teacher) => [teacher.id, teacher])), [teacherOptions]);

  const durationMinutes = useMemo(() => {
    const start = new Date(form.start_at).getTime();
    const end = new Date(form.end_at).getTime();
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
      return 0;
    }
    return Math.round((end - start) / 60000);
  }, [form.start_at, form.end_at]);

  const validate = () => {
    const missing: string[] = [];

    if (!availableGroups.some((group) => group.id === form.group_id)) {
      missing.push('группа');
    }
    if (!form.topic.trim()) {
      missing.push('тема');
    }
    if (!form.start_at) {
      missing.push('начало');
    }
    if (!form.end_at) {
      missing.push('окончание');
    }

    if (missing.length > 0) {
      return `Заполните обязательные поля: ${missing.join(', ')}`;
    }

    if (new Date(form.end_at).getTime() <= new Date(form.start_at).getTime()) {
      return 'Время окончания должно быть позже начала';
    }
    if (form.is_recurring_weekly && !form.recurrence_until) {
      return 'Укажите дату завершения повторения';
    }
    return null;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!window.confirm(isEditMode ? 'Сохранить изменения занятия?' : 'Создать новое занятие?')) {
      return;
    }
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      if (isEditMode && lessonId) {
        await scheduleApi.updateLesson(Number(lessonId), {
          group_id: form.group_id,
          topic: form.topic.trim(),
          start_at: localInputToApiDateTime(form.start_at),
          end_at: localInputToApiDateTime(form.end_at),
          materials_url: form.materials_url || null,
          comment: form.comment || null,
          is_cancelled: form.is_cancelled,
          is_recurring_weekly: form.is_recurring_weekly,
          apply_to_future: canApplyToFuture && applyToFuture,
        });
        notify('success', 'Изменения сохранены', 'Данные занятия обновлены.', { href: `/calendar/${lessonId}/edit` });
      } else {
        const response = await scheduleApi.createLesson({
          group_id: form.group_id,
          topic: form.topic.trim(),
          start_at: localInputToApiDateTime(form.start_at),
          end_at: localInputToApiDateTime(form.end_at),
          materials_url: form.materials_url || undefined,
          comment: form.comment || undefined,
          is_cancelled: form.is_cancelled,
          is_recurring_weekly: form.is_recurring_weekly,
          recurrence_until: form.is_recurring_weekly ? form.recurrence_until : undefined,
        });
        notify('success', 'Занятие создано', 'Новое занятие добавлено в расписание.', { href: `/calendar/${response.data.id}/edit` });
      }

      navigate('/calendar');
    } catch (requestError) {
      console.error(requestError);
      setError('Не удалось сохранить занятие');
      notify('error', 'Ошибка', 'Не удалось сохранить занятие.');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const handleHotkey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
        if (!submitting) {
          const formElement = document.getElementById('lesson-form') as HTMLFormElement | null;
          formElement?.requestSubmit();
        }
      }
    };

    window.addEventListener('keydown', handleHotkey);
    return () => window.removeEventListener('keydown', handleHotkey);
  }, [submitting]);

  const handleDelete = async (scope: DeleteScope) => {
    if (!lessonId) {
      return;
    }
    setSubmitting(true);
    try {
      await scheduleApi.deleteLesson(Number(lessonId), scope);
      notify('info', 'Занятие архивировано', 'Занятие было перенесено в архив.', { href: '/archive' });
      navigate('/calendar');
    } catch (requestError) {
      console.error(requestError);
      setError('Не удалось удалить занятие');
      notify('error', 'Ошибка', 'Не удалось архивировать занятие.');
      setSubmitting(false);
    }
  };

  const setAllStatuses = (status: AttendanceStatus) => {
    setAttendance((prev) => {
      const next = { ...prev };
      for (const student of students) {
        next[student.id] = {
          client_id: student.id,
          status,
          comment: prev[student.id]?.comment ?? '',
          hedgehogs: prev[student.id]?.hedgehogs ?? 0,
        };
      }
      return next;
    });
  };

  if (loading) {
    return <section className="lesson-form-page">Загрузка...</section>;
  }

  return (
    <section className="lesson-form-page">
      <h1>{isEditMode ? 'Редактирование занятия' : 'Добавление занятия'}</h1>
      <p className="lesson-form-subtitle">
        {isEditMode
          ? 'Измените данные урока, посещаемость сохраняется автоматически.'
          : 'После сохранения вы вернетесь на страницу календаря со всеми расписаниями.'}
      </p>

      {error && <div className="lesson-form-error">{error}</div>}

      {availableGroups.length === 0 && <div className="lesson-form-error">Нет доступных групп для выбранного преподавателя.</div>}

      <form id="lesson-form" className="lesson-form" onSubmit={handleSubmit}>
        <label>
          Группа
          <select value={form.group_id} onChange={(e) => handleChange('group_id', Number(e.target.value))}>
            {availableGroups.map((group) => {
              const courseName = courseMap.get(group.course_id)?.name ?? 'Без курса';
              const teacher = group.teacher_id ? teacherMap.get(group.teacher_id) : null;
              const teacherLabel = teacher ? `${teacher.second_name} ${teacher.first_name}` : 'Не назначен';
              return (
                <option key={group.id} value={group.id}>
                  {group.name} - {courseName} - {teacherLabel}
                </option>
              );
            })}
          </select>
        </label>

        <label>
          Тема занятия
          <input
            type="text"
            value={form.topic}
            onChange={(e) => handleChange('topic', e.target.value)}
            placeholder="Например: Подготовка к ЕГЭ, модуль 3"
          />
        </label>

        <div className="lesson-form-row">
          <label>
            Начало
            <input type="datetime-local" value={form.start_at} onChange={(e) => handleChange('start_at', e.target.value)} />
          </label>
          <label>
            Окончание
            <input type="datetime-local" value={form.end_at} onChange={(e) => handleChange('end_at', e.target.value)} />
          </label>
        </div>

        <div className="duration-row">
          <span>Длительность: {durationMinutes > 0 ? `${durationMinutes} мин` : 'не задана'}</span>
          <div className="duration-actions">
            <button type="button" className="secondary" onClick={() => setDurationMinutes(45)}>45 мин</button>
            <button type="button" className="secondary" onClick={() => setDurationMinutes(60)}>60 мин</button>
            <button type="button" className="secondary" onClick={() => setDurationMinutes(90)}>90 мин</button>
          </div>
        </div>

        <label>
          Ссылка на материалы
          <input
            type="text"
            value={form.materials_url}
            onChange={(e) => handleChange('materials_url', e.target.value)}
            placeholder="https://..."
          />
        </label>

        <label>
          Комментарий
          <textarea
            value={form.comment}
            onChange={(e) => handleChange('comment', e.target.value)}
            placeholder="Например: аудитория, заметки по подготовке, домашнее задание"
          />
        </label>

        <label className="lesson-form-checkbox">
          <input
            type="checkbox"
            checked={form.is_cancelled}
            onChange={(e) => handleChange('is_cancelled', e.target.checked)}
          />
          Занятие отменено
        </label>

        {form.is_cancelled && (
          <p className="lesson-form-subtitle">
            Ученики этого занятия автоматически попадут в список на назначение отработки.
          </p>
        )}

        <label className="lesson-form-checkbox">
          <input
            type="checkbox"
            checked={form.is_recurring_weekly}
            onChange={(e) => handleChange('is_recurring_weekly', e.target.checked)}
            disabled={isEditMode}
          />
          Повторять еженедельно в это же время
        </label>

        {form.is_recurring_weekly && !isEditMode && (
          <label>
            Повторять до
            <input type="date" value={form.recurrence_until} onChange={(e) => handleChange('recurrence_until', e.target.value)} />
          </label>
        )}

        {isEditMode && canApplyToFuture && (
          <label className="lesson-form-checkbox lesson-form-checkbox-panel">
            <input
              type="checkbox"
              checked={applyToFuture}
              onChange={(e) => setApplyToFuture(e.target.checked)}
            />
            Применить изменения к этому и всем последующим занятиям серии
          </label>
        )}

        <div className="lesson-form-actions">
          <button type="button" className="secondary" onClick={() => navigate('/calendar')} disabled={submitting}>
            Отмена
          </button>
          {isEditMode && (
            <button
              type="button"
              className="danger"
              onClick={() => {
                setDeleteScope('single');
                setDeleteDialogOpen(true);
              }}
              disabled={submitting}
            >
              Удалить
            </button>
          )}
          <button type="submit" disabled={submitting || availableGroups.length === 0}>
            {isEditMode ? 'Сохранить изменения' : 'Сохранить занятие'}
          </button>
        </div>
      </form>

      {isEditMode && (
        <section className="attendance-section">
          <div className="attendance-header-row">
            <h2>Посещаемость</h2>
            <div className="attendance-actions">
              <button type="button" className="secondary" onClick={() => setAllStatuses('present')}>Все присутствуют</button>
              <button type="button" className="secondary" onClick={() => setAllStatuses('absent')}>Все отсутствуют</button>
              <span className={`attendance-sync attendance-sync--${attendanceSyncState}`}>
                {attendanceSyncState === 'saving' && 'Сохраняю...'}
                {attendanceSyncState === 'saved' && 'Сохранено'}
                {attendanceSyncState === 'error' && 'Ошибка сохранения'}
                {attendanceSyncState === 'idle' && 'Автосохранение включено'}
              </span>
            </div>
          </div>
          {isTeacher && <p className="lesson-form-subtitle">Отработки назначаются в отдельном разделе менеджера/администратора.</p>}

          {students.length === 0 ? (
            <p className="lesson-form-subtitle">В этой группе пока нет учеников.</p>
          ) : (
            <div className="attendance-list">
              {students.map((student) => {
                const item = attendance[student.id] ?? {
                  client_id: student.id,
                  status: 'present' as AttendanceStatus,
                  comment: '',
                  hedgehogs: 0,
                };
                return (
                  <article className={`attendance-item attendance-item--${item.status}`} key={student.id}>
                    <div>
                      <h3>
                        <Link to={`/clients/${student.id}`} className="attendance-student-link">
                          {student.second_name} {student.first_name} {student.patronymic ?? ''}
                        </Link>
                      </h3>
                      <p>{student.parent_full_name ?? 'Родитель не указан'}</p>
                      <span className={`attendance-badge attendance-badge--${item.status}`}>{statusText[item.status]}</span>
                    </div>

                    <select
                      className="attendance-select"
                      value={item.status}
                      onChange={(e) => setAttendance((prev) => ({
                        ...prev,
                        [student.id]: {
                          ...item,
                          status: e.target.value as AttendanceStatus,
                        },
                      }))}
                    >
                      <option value="present">Присутствовал</option>
                      <option value="late">Опоздал</option>
                      <option value="absent">Отсутствовал</option>
                    </select>

                    <input
                      className="attendance-comment-input"
                      type="text"
                      value={item.comment}
                      onChange={(e) => setAttendance((prev) => ({
                        ...prev,
                        [student.id]: {
                          ...item,
                          comment: e.target.value,
                        },
                      }))}
                      placeholder="Комментарий"
                    />

                    <label>
                      Хечхоги
                      <input
                        className="attendance-comment-input"
                        type="number"
                        min={0}
                        max={1000}
                        value={item.hedgehogs}
                      onChange={(e) => setAttendance((prev) => ({
                        ...prev,
                        [student.id]: {
                          ...item,
                          hedgehogs: Number(e.target.value || 0),
                        },
                      }))}
                      />
                    </label>

                    <Link to={`/clients/${student.id}`} className="attendance-link">Открыть карточку</Link>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}

      <ConfirmationModal
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => handleDelete(deleteScope)}
        title="Удаление занятия"
        confirmText="Удалить"
        cancelText="Отмена"
        confirmVariant="danger"
      >
        <div className="delete-scope-list">
          <label className={`delete-scope-item ${deleteScope === 'single' ? 'active' : ''}`}>
            <input
              type="radio"
              name="deleteScope"
              checked={deleteScope === 'single'}
              onChange={() => setDeleteScope('single')}
            />
            Только это занятие
          </label>

          <label className={`delete-scope-item ${deleteScope === 'future' ? 'active' : ''} ${!canApplyToFuture ? 'disabled' : ''}`}>
            <input
              type="radio"
              name="deleteScope"
              checked={deleteScope === 'future'}
              disabled={!canApplyToFuture}
              onChange={() => setDeleteScope('future')}
            />
            Это и все последующие
          </label>

          <label className={`delete-scope-item ${deleteScope === 'all' ? 'active' : ''} ${!canApplyToFuture ? 'disabled' : ''}`}>
            <input
              type="radio"
              name="deleteScope"
              checked={deleteScope === 'all'}
              disabled={!canApplyToFuture}
              onChange={() => setDeleteScope('all')}
            />
            Всю серию целиком
          </label>
        </div>
      </ConfirmationModal>
    </section>
  );
};
