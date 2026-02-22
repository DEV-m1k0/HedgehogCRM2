import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { clientsApi, coursesApi, groupsApi, metaApi, scheduleApi } from '../../api/crm';
import type { AttendanceRecord, AttendanceStatus, Client, Course, Group, MakeupItem, User } from '../../types/crm.types';
import ConfirmationModal from './Components/ConfirmationModal';
import { useNotifications } from '../../components/feedback/Notifications';
import './LessonFormPage.css';

interface LessonFormState {
  group_id: number;
  topic: string;
  lesson_type: 'individual' | 'group' | 'makeup';
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

type DeleteScope = 'single' | 'future' | 'all';
type CreateTab = 'group' | 'individual' | 'makeup';

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
const getDurationByType = (type: 'individual' | 'group' | 'makeup') => (type === 'group' ? 90 : 60);
const withDuration = (startAt: string, minutes: number): string => {
  const start = new Date(startAt);
  if (Number.isNaN(start.getTime())) {
    return startAt;
  }
  const end = new Date(start.getTime() + minutes * 60_000);
  return dateToLocalInput(end);
};

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
  const [allStudents, setAllStudents] = useState<Client[]>([]);
  const [selectedIndividualStudentId, setSelectedIndividualStudentId] = useState<number>(0);
  const [makeupCandidates, setMakeupCandidates] = useState<MakeupItem[]>([]);
  const [makeupSelection, setMakeupSelection] = useState<Record<number, boolean>>({});
  const [makeupQuery, setMakeupQuery] = useState('');
  const [students, setStudents] = useState<Client[]>([]);
  const [attendance, setAttendance] = useState<Record<number, AttendanceDraft>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [applyToFuture, setApplyToFuture] = useState(false);
  const [canApplyToFuture, setCanApplyToFuture] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteScope, setDeleteScope] = useState<DeleteScope>('single');

  const attendanceReadyRef = useRef(false);
  const lastAttendanceSnapshotRef = useRef('');
  const attendanceDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentUser = getCurrentUser();
  const roleRaw = typeof currentUser?.role === 'string' ? currentUser.role : currentUser?.role?.name ?? '';
  const roleName = roleRaw.toLowerCase();
  const isTeacher = roleName === 'преподаватель';
  const isManager = roleName.includes('менеджер') || roleName.includes('manager');
  const isAdmin = roleName.includes('администратор') || roleName.includes('admin');
  const isManagerOrAdmin = isManager || isAdmin;

  const defaultRange = getDefaultRange(searchParams.get('date'));
  const mode = searchParams.get('mode');
  const initialCreateTab: CreateTab = mode === 'makeup' ? 'makeup' : 'group';
  const [createTab, setCreateTab] = useState<CreateTab>(initialCreateTab);
  const isMakeupMode = !isEditMode && createTab === 'makeup';
  const initialTeacherFilter = isTeacher ? String(currentUser?.id ?? '') : (searchParams.get('teacherId') ?? '');
  const [selectedTeacherFilter, setSelectedTeacherFilter] = useState<string>(initialTeacherFilter);

  const [form, setForm] = useState<LessonFormState>({
    group_id: 0,
    topic: '',
    lesson_type: initialCreateTab,
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

  useEffect(() => {
    if (isEditMode) {
      return;
    }
    setForm((prev) => ({
      ...prev,
      lesson_type: createTab,
      end_at: withDuration(prev.start_at, getDurationByType(createTab)),
    }));
  }, [createTab, isEditMode]);

  const availableGroups = useMemo(() => {
    const isIndividualGroup = (group: Group) =>
      group.audience?.toLowerCase() === 'individual' || group.name.toLowerCase().startsWith('индивидуально:');

    let filtered = groups;
    if (!selectedTeacherFilter) {
      filtered = groups;
    } else {
    const teacherId = Number(selectedTeacherFilter);
    if (!Number.isInteger(teacherId) || teacherId <= 0) {
        filtered = groups;
      } else {
        filtered = groups.filter((group) => group.teacher_id === teacherId);
      }
    }

    if (form.lesson_type === 'group') {
      return filtered.filter((group) => !isIndividualGroup(group));
    }
    if (form.lesson_type === 'individual') {
      return filtered.filter((group) => isIndividualGroup(group));
    }
    return filtered;
  }, [groups, selectedTeacherFilter, form.lesson_type]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const requests: Promise<any>[] = [
          groupsApi.list(),
          coursesApi.list(),
          metaApi.users(),
          clientsApi.list(),
        ];
        if (isMakeupMode) {
          requests.push(scheduleApi.listMakeups(false));
        }
        const [groupsRes, coursesRes, usersRes, clientsRes, makeupsRes] = await Promise.all(requests);

        const groupItems = groupsRes.data as Group[];
        setGroups(groupItems);
        setCourses(coursesRes.data);
        setUsers(usersRes.data);
        setAllStudents(clientsRes.data);

        if (isEditMode && lessonId) {
          const lessonRes = await scheduleApi.lesson(Number(lessonId));
          const lesson = lessonRes.data;
          const lessonGroup = groupItems.find((group) => group.id === lesson.group_id);
          if (lessonGroup?.teacher_id) {
            setSelectedTeacherFilter(String(lessonGroup.teacher_id));
          }
          setForm({
            group_id: lesson.group_id,
            topic: lesson.topic,
            lesson_type: (lesson.lesson_type ?? 'group') as 'individual' | 'group' | 'makeup',
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
        }

        if (isMakeupMode) {
          const candidates = (makeupsRes?.data ?? []) as MakeupItem[];
          setMakeupCandidates(candidates);
          setMakeupSelection((prev) => {
            const next: Record<number, boolean> = {};
            for (const item of candidates) {
              next[item.attendance_id] = prev[item.attendance_id] ?? false;
            }
            return next;
          });
        }
      } catch (requestError) {
        console.error(requestError);
        setError('Не удалось загрузить данные формы');
      } finally {
        setLoading(false);
      }
    };

    load().catch(console.error);
  }, [isEditMode, lessonId, isMakeupMode]);

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
      } catch (requestError) {
        console.error(requestError);
      }
    }, 650);
  }, [attendance, isEditMode, lessonId, students.length]);

  const handleChange = (field: keyof LessonFormState, value: string | boolean | number) => {
    if (field === 'start_at' && !isEditMode) {
      const nextStart = String(value);
      setForm((prev) => ({
        ...prev,
        start_at: nextStart,
        end_at: withDuration(nextStart, getDurationByType(prev.lesson_type)),
      }));
      return;
    }
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
  const selectedGroup = useMemo(
    () => availableGroups.find((group) => group.id === form.group_id) ?? null,
    [availableGroups, form.group_id],
  );
  const selectedCourseName = selectedGroup ? (courseMap.get(selectedGroup.course_id)?.name ?? 'Без курса') : 'Группа не выбрана';
  const selectedTeacherName = selectedGroup?.teacher_id
    ? (() => {
      const teacher = teacherMap.get(selectedGroup.teacher_id);
      return teacher ? `${teacher.second_name} ${teacher.first_name}` : 'Не назначен';
    })()
    : (() => {
      const teacherId = Number(selectedTeacherFilter);
      if (!Number.isInteger(teacherId) || teacherId <= 0) {
        return 'Не назначен';
      }
      const teacher = teacherMap.get(teacherId);
      return teacher ? `${teacher.second_name} ${teacher.first_name}` : 'Не назначен';
    })();

  const durationMinutes = useMemo(() => {
    const start = new Date(form.start_at).getTime();
    const end = new Date(form.end_at).getTime();
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
      return 0;
    }
    return Math.round((end - start) / 60000);
  }, [form.start_at, form.end_at]);

  const filteredMakeupCandidates = useMemo(() => {
    const term = makeupQuery.trim().toLowerCase();
    const teacherId = Number(selectedTeacherFilter);
    return makeupCandidates.filter((item) => {
      if (Number.isInteger(teacherId) && teacherId > 0) {
        if (item.makeup_teacher_id && item.makeup_teacher_id !== teacherId) {
          return false;
        }
      }
      if (!term) {
        return true;
      }
      const haystack = `${item.client_full_name} ${item.group_name} ${item.lesson_topic}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [makeupCandidates, makeupQuery, selectedTeacherFilter]);

  const validate = () => {
    if (isMakeupMode) {
      if (!isManagerOrAdmin) {
        return 'Назначать отработки может только менеджер или администратор';
      }
      const teacherId = Number(selectedTeacherFilter);
      if (!Number.isInteger(teacherId) || teacherId <= 0) {
        return 'Выберите преподавателя для отработки';
      }
      if (!form.start_at) {
        return 'Укажите дату и время отработки';
      }
      const selectedCount = Object.values(makeupSelection).filter(Boolean).length;
      if (selectedCount === 0) {
        return 'Выберите хотя бы одного ученика для отработки';
      }
      return null;
    }

    const missing: string[] = [];

    const isIndividualManagerCreate = !isEditMode && isManagerOrAdmin && form.lesson_type === 'individual';
    if (!isIndividualManagerCreate && !availableGroups.some((group) => group.id === form.group_id)) {
      missing.push('группа');
    }
    if (!isTeacher && isManager) {
      const teacherId = Number(selectedTeacherFilter);
      if (!Number.isInteger(teacherId) || teacherId <= 0) {
        missing.push('преподаватель');
      }
    }
    if (!isIndividualManagerCreate && !form.topic.trim()) {
      missing.push('тема');
    }
    if (isIndividualManagerCreate && !selectedIndividualStudentId) {
      missing.push('ученик');
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
    if (!window.confirm(isMakeupMode ? 'Назначить выбранные отработки?' : (isEditMode ? 'Сохранить изменения занятия?' : 'Создать новое занятие?'))) {
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
      if (isMakeupMode) {
        const teacherId = Number(selectedTeacherFilter);
        const selectedIds = Object.entries(makeupSelection)
          .filter(([, checked]) => checked)
          .map(([attendanceId]) => Number(attendanceId));

        await Promise.all(
          selectedIds.map((attendanceId) =>
            scheduleApi.assignMakeup(attendanceId, {
              makeup_lesson_at: localInputToApiDateTime(form.start_at),
              makeup_teacher_id: teacherId,
              makeup_comment: form.comment || null,
              makeup_completed: false,
            }),
          ),
        );
        notify('success', 'Отработки назначены', 'Выбранные ученики добавлены в сессию отработки.');
        navigate('/calendar');
        return;
      }

      if (isEditMode && lessonId) {
        await scheduleApi.updateLesson(Number(lessonId), {
          group_id: form.group_id,
          topic: form.topic.trim(),
          lesson_type: form.lesson_type,
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
        if (form.lesson_type === 'individual' && isManagerOrAdmin) {
          const teacherId = Number(selectedTeacherFilter);
          const student = allStudents.find((item) => item.id === selectedIndividualStudentId) ?? null;
          if (!Number.isInteger(teacherId) || teacherId <= 0 || !student) {
            throw new Error('Не выбраны преподаватель или ученик');
          }
          const individualCourse = courses.find((course) => course.name.toLowerCase().includes('индивиду')) ?? courses[0];
          if (!individualCourse) {
            throw new Error('Нет доступного курса для создания индивидуального занятия');
          }
          const startLabel = new Date(form.start_at).toLocaleString('ru-RU');
          const groupRes = await groupsApi.create({
            name: `Индивидуально: ${student.second_name} ${student.first_name} • ${startLabel}`,
            course_id: individualCourse.id,
            teacher_id: teacherId,
            schedule_text: 'Индивидуальное занятие',
            audience: 'individual',
          });
          await groupsApi.addStudent(groupRes.data.id, { client_id: student.id });

          const response = await scheduleApi.createLesson({
            group_id: groupRes.data.id,
            topic: `Индивидуальное занятие: ${student.second_name} ${student.first_name}`,
            lesson_type: 'individual',
            start_at: localInputToApiDateTime(form.start_at),
            end_at: localInputToApiDateTime(withDuration(form.start_at, 60)),
            materials_url: form.materials_url || undefined,
            comment: form.comment || undefined,
            is_cancelled: form.is_cancelled,
            is_recurring_weekly: false,
          });
          notify('success', 'Индивидуальное занятие создано', 'Новое индивидуальное занятие добавлено в календарь.', { href: `/calendar/${response.data.id}/edit` });
          navigate('/calendar');
          return;
        }

        const duration = getDurationByType(form.lesson_type);
        const response = await scheduleApi.createLesson({
          group_id: form.group_id,
          topic: form.topic.trim(),
          lesson_type: form.lesson_type,
          start_at: localInputToApiDateTime(form.start_at),
          end_at: localInputToApiDateTime(withDuration(form.start_at, duration)),
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

  if (isMakeupMode && !isManagerOrAdmin) {
    return <section className="lesson-form-page"><div className="lesson-form-error">Назначать отработки может только менеджер или администратор.</div></section>;
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/calendar');
  };

  return (
    <section className="lesson-form-page">
      <div className="lesson-form-heading">
        <button type="button" className="lesson-back-btn" onClick={handleBack}>
          Назад
        </button>
        <h1>{isEditMode ? 'Редактирование занятия' : 'Добавление занятия'}</h1>
      </div>
      <p className="lesson-form-subtitle">
        {isMakeupMode
          ? 'Выберите преподавателя и учеников из пропусков, чтобы назначить сессию отработки.'
          : isEditMode
          ? 'Измените данные урока, посещаемость сохраняется автоматически.'
          : 'После сохранения вы вернетесь на страницу календаря со всеми расписаниями.'}
      </p>
      <div className="lesson-meta">
        {!isMakeupMode ? <span className="lesson-meta-chip">Группа: {selectedGroup?.name ?? '—'}</span> : null}
        {!isMakeupMode ? <span className="lesson-meta-chip">Курс: {selectedCourseName}</span> : null}
        <span className="lesson-meta-chip">Преподаватель: {selectedTeacherName}</span>
        <span className="lesson-meta-chip">Тип: {isMakeupMode ? 'Отработка' : (form.lesson_type === 'individual' ? 'Индивидуальное занятие' : 'Групповое занятие')}</span>
      </div>

      {error && <div className="lesson-form-error">{error}</div>}

      {!isMakeupMode && availableGroups.length === 0 && <div className="lesson-form-error">Нет доступных групп для выбранного преподавателя.</div>}

      {!isEditMode && isManagerOrAdmin ? (
        <div className="lesson-create-tabs">
          <button
            type="button"
            className={createTab === 'group' ? 'lesson-create-tab lesson-create-tab--active' : 'lesson-create-tab'}
            onClick={() => setCreateTab('group')}
          >
            Добавить групповое занятие
          </button>
          <button
            type="button"
            className={createTab === 'individual' ? 'lesson-create-tab lesson-create-tab--active' : 'lesson-create-tab'}
            onClick={() => setCreateTab('individual')}
          >
            Добавить индивидуальное занятие
          </button>
          <button
            type="button"
            className={createTab === 'makeup' ? 'lesson-create-tab lesson-create-tab--active' : 'lesson-create-tab'}
            onClick={() => setCreateTab('makeup')}
          >
            Добавить отработку
          </button>
        </div>
      ) : null}

      <form id="lesson-form" className="lesson-form" onSubmit={handleSubmit}>
        {isMakeupMode ? (
          <>
            <section className="lesson-form-section">
              <h2>Параметры отработки</h2>
              <div className="lesson-form-row">
                <label>
                  Преподаватель
                  <select value={selectedTeacherFilter} onChange={(e) => setSelectedTeacherFilter(e.target.value)}>
                    <option value="">Выберите преподавателя</option>
                    {teacherOptions.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.second_name} {teacher.first_name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Дата и время отработки
                  <input type="datetime-local" value={form.start_at} onChange={(e) => handleChange('start_at', e.target.value)} />
                </label>
              </div>
              <label>
                Комментарий для отработки
                <input
                  type="text"
                  value={form.comment}
                  onChange={(e) => handleChange('comment', e.target.value)}
                  placeholder="Например: совместная отработка по пропускам"
                />
              </label>
            </section>

            <section className="lesson-form-section">
              <h2>Ученики на отработку</h2>
              <input
                type="text"
                value={makeupQuery}
                onChange={(e) => setMakeupQuery(e.target.value)}
                placeholder="Поиск: ученик, группа, тема пропуска"
              />
              {filteredMakeupCandidates.length === 0 ? (
                <p className="lesson-form-subtitle">Нет доступных пропусков для назначения.</p>
              ) : (
                <div className="attendance-list">
                  {filteredMakeupCandidates.map((item) => (
                    <label key={item.attendance_id} className="delete-scope-item">
                      <input
                        type="checkbox"
                        checked={Boolean(makeupSelection[item.attendance_id])}
                        onChange={(e) => setMakeupSelection((prev) => ({ ...prev, [item.attendance_id]: e.target.checked }))}
                      />
                      <span>
                        {item.client_full_name} • {item.group_name} • {item.lesson_topic} • {new Date(item.lesson_start_at).toLocaleString()}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </section>
          </>
        ) : (
          <>
            <section className="lesson-form-section">
          <h2>Основная информация</h2>
          <div className="lesson-form-row">
            <label>
              Преподаватель
              <select
                value={selectedTeacherFilter}
                onChange={(e) => setSelectedTeacherFilter(e.target.value)}
                disabled={isTeacher}
              >
                {!isTeacher ? <option value="">Выберите преподавателя</option> : null}
                {teacherOptions.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.second_name} {teacher.first_name}
                  </option>
                ))}
              </select>
            </label>

            {isEditMode || !isManagerOrAdmin ? (
              <label>
                Тип события
                <select value={form.lesson_type} onChange={(e) => handleChange('lesson_type', e.target.value)}>
                  <option value="group">Групповое занятие</option>
                  <option value="individual">Индивидуальное занятие</option>
                </select>
              </label>
            ) : null}

            {!(isManagerOrAdmin && !isEditMode && form.lesson_type === 'individual') ? (
              <label>
                Группа
                <select
                  value={form.group_id}
                  onChange={(e) => handleChange('group_id', Number(e.target.value))}
                  disabled={availableGroups.length === 0}
                >
                  {availableGroups.length === 0 ? (
                    <option value={0}>Нет доступных групп</option>
                  ) : (
                    availableGroups.map((group) => {
                      const courseName = courseMap.get(group.course_id)?.name ?? 'Без курса';
                      const teacher = group.teacher_id ? teacherMap.get(group.teacher_id) : null;
                      const teacherLabel = teacher ? `${teacher.second_name} ${teacher.first_name}` : 'Не назначен';
                      return (
                        <option key={group.id} value={group.id}>
                          {group.name} - {courseName} - {teacherLabel}
                        </option>
                      );
                    })
                  )}
                </select>
              </label>
            ) : (
              <label>
                Ученик
                <select value={selectedIndividualStudentId} onChange={(e) => setSelectedIndividualStudentId(Number(e.target.value))}>
                  <option value={0}>Выберите ученика</option>
                  {allStudents.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.second_name} {student.first_name} {student.patronymic ?? ''}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          {!(isManagerOrAdmin && !isEditMode && form.lesson_type === 'individual') ? (
            <label>
              Тема занятия
              <input
                type="text"
                value={form.topic}
                onChange={(e) => handleChange('topic', e.target.value)}
                placeholder="Например: Подготовка к ЕГЭ, модуль 3"
              />
            </label>
          ) : null}
        </section>

        <section className="lesson-form-section">
          <h2>Время занятия</h2>
          <div className="lesson-form-row">
            <label>
              Начало
              <input type="datetime-local" value={form.start_at} onChange={(e) => handleChange('start_at', e.target.value)} />
            </label>
            {!isEditMode ? (
              <label>
                Фиксированная длительность
                <input type="text" value={form.lesson_type === 'group' ? '1 час 30 минут' : '1 час'} readOnly />
              </label>
            ) : (
              <label>
                Окончание
                <input type="datetime-local" value={form.end_at} onChange={(e) => handleChange('end_at', e.target.value)} />
              </label>
            )}
          </div>

          {isEditMode ? (
            <>
              <div className="duration-row">
                <span>Длительность: {durationMinutes > 0 ? `${durationMinutes} мин` : 'не задана'}</span>
                <div className="duration-actions">
                  <button
                    type="button"
                    className={`duration-chip ${durationMinutes === 45 ? 'duration-chip--active' : ''}`}
                    onClick={() => setDurationMinutes(45)}
                  >
                    45 мин
                  </button>
                  <button
                    type="button"
                    className={`duration-chip ${durationMinutes === 60 ? 'duration-chip--active' : ''}`}
                    onClick={() => setDurationMinutes(60)}
                  >
                    60 мин
                  </button>
                  <button
                    type="button"
                    className={`duration-chip ${durationMinutes === 90 ? 'duration-chip--active' : ''}`}
                    onClick={() => setDurationMinutes(90)}
                  >
                    90 мин
                  </button>
                </div>
              </div>
              <p className="lesson-form-hint">Подсказка: быстрые кнопки справа автоматически пересчитают время окончания.</p>
            </>
          ) : null}
        </section>

        <section className="lesson-form-section">
          <h2>Материалы и комментарии</h2>
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
        </section>

        <section className="lesson-form-section">
          <h2>Параметры</h2>
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
        </section>
          </>
        )}

        <div className="lesson-form-actions lesson-form-actions--sticky">
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
          <button
            type="submit"
            disabled={submitting || (!isMakeupMode && !(isManagerOrAdmin && !isEditMode && form.lesson_type === 'individual') && availableGroups.length === 0)}
          >
            {isMakeupMode ? 'Назначить отработки' : (isEditMode ? 'Сохранить изменения' : 'Сохранить занятие')}
          </button>
        </div>
      </form>

      {isEditMode && (
        <section className="attendance-section">
          <div className="attendance-header-row">
            <h2>Посещаемость</h2>
            <div className="attendance-actions">
              <button type="button" className="secondary" onClick={() => setAllStatuses('present')}>Все присутствуют</button>
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
                    <div className="attendance-student">
                      <h3>
                        <Link to={`/clients/${student.id}`} className="attendance-student-link">
                          {student.second_name} {student.first_name} {student.patronymic ?? ''}
                        </Link>
                      </h3>
                      <p>{student.parent_full_name ?? 'Родитель не указан'}</p>
                      <span className={`attendance-badge attendance-badge--${item.status}`}>{statusText[item.status]}</span>
                    </div>

                    <div className="attendance-controls">
                      <label className="attendance-field">
                        <span>Статус</span>
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
                      </label>

                      <label className="attendance-field">
                        <span>Комментарий</span>
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
                      </label>

                      <label className="attendance-field attendance-hedgehogs-field">
                        <span>Хечхоги</span>
                        <input
                          className="attendance-comment-input"
                          type="number"
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
                    </div>
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
