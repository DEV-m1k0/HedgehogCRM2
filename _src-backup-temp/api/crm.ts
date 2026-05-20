import { api } from './client';
import type {
  AdminUserActivity,
  ArchiveEntity,
  ArchiveItem,
  ArchiveSortBy,
  ArchiveSortDir,
  AttendanceRecord,
  MakeupCalendarEvent,
  MakeupItem,
  AuditLogItem,
  Client,
  Course,
  Deal,
  Group,
  Lesson,
  StudentAttendanceStats,
  StudentMakeup,
  Task,
  TeacherGroupStudents,
  User,
  UserSessionInfo,
} from '../types/crm.types';

export const authApi = {
  register: (payload: {
    email: string;
    password: string;
    first_name: string;
    second_name: string;
    patronymic?: string;
  }) => api.post<{ user: User; access_token: string; token_type: 'bearer' }>('/auth/register', payload),
  login: (payload: { email: string; password: string }) => api.post<{ user: User; access_token: string; token_type: 'bearer' }>('/auth/login', payload),
  refresh: () => api.post<{ access_token: string; token_type: 'bearer' }>('/auth/refresh'),
  logout: () => api.post<{ message: string }>('/auth/logout'),
};

export const metaApi = {
  users: () => api.get<User[]>('/users'),
  me: () => api.get<User>('/users/me'),
  updateMe: (payload: {
    email?: string | null;
    first_name?: string | null;
    second_name?: string | null;
    patronymic?: string | null;
    phone?: string | null;
    vk_contact?: string | null;
    telegram_contact?: string | null;
    whatsapp_contact?: string | null;
    max_contact?: string | null;
  }) => api.patch<User>('/users/me', payload),
  uploadMyAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post<User>('/users/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export const clientsApi = {
  list: () => api.get<Client[]>('/clients'),
  myStudents: () => api.get<Client[]>('/clients/my-students'),
  myStudentsGrouped: () => api.get<TeacherGroupStudents[]>('/clients/my-students/grouped'),
  get: (id: number) => api.get<Client>(`/clients/${id}`),
  stats: (id: number) => api.get<StudentAttendanceStats>(`/clients/${id}/stats`),
  makeups: (id: number) => api.get<StudentMakeup[]>(`/clients/${id}/makeups`),
  create: (payload: {
    first_name: string;
    second_name: string;
    patronymic?: string;
    date_of_birth?: string;
    parent_full_name?: string;
    parent_phone?: string;
    parent_email?: string;
    tags?: string;
  }) => api.post<Client>('/clients', payload),
  update: (id: number, payload: Partial<Pick<Client, 'first_name' | 'second_name' | 'patronymic' | 'date_of_birth' | 'parent_full_name' | 'parent_phone' | 'parent_email' | 'tags'>>) =>
    api.patch<Client>(`/clients/${id}`, payload),
  remove: (id: number) => api.delete(`/clients/${id}`),
};

export const coursesApi = {
  list: () => api.get<Course[]>('/courses'),
  create: (payload: { name: string; cost: number; lesson_cost: number; lesson_count: number; module_count: number }) =>
    api.post<Course>('/courses', payload),
};

export const groupsApi = {
  list: () => api.get<Group[]>('/groups'),
  students: (groupId: number) => api.get<Client[]>(`/groups/${groupId}/students`),
  addStudent: (groupId: number, payload: { client_id: number }) => api.post<{ message: string }>(`/groups/${groupId}/students`, payload),
  create: (payload: {
    name: string;
    course_id: number;
    teacher_id?: number;
    schedule_text?: string;
    audience?: string;
  }) => api.post<Group>('/groups', payload),
};

export const scheduleApi = {
  lessons: (teacherId?: number) => api.get<Lesson[]>('/schedule/lessons', teacherId ? { params: { teacher_id: teacherId } } : undefined),
  lesson: (id: number) => api.get<Lesson>(`/schedule/lessons/${id}`),
  attendance: (lessonId: number) => api.get<AttendanceRecord[]>(`/schedule/lessons/${lessonId}/attendance`),
  upsertAttendance: (lessonId: number, payload: {
    client_id: number;
    status: 'present' | 'absent' | 'late';
    comment?: string | null;
    hedgehogs?: number;
    makeup_lesson_at?: string | null;
    makeup_teacher_id?: number | null;
    makeup_comment?: string | null;
    makeup_completed?: boolean;
  }) =>
    api.put<AttendanceRecord>(`/schedule/lessons/${lessonId}/attendance`, payload),
  createLesson: (payload: {
    group_id: number;
    topic: string;
    lesson_type?: 'individual' | 'group' | 'makeup';
    start_at: string;
    end_at: string;
    materials_url?: string;
    comment?: string;
    is_cancelled?: boolean;
    is_recurring_weekly?: boolean;
    recurrence_until?: string;
    reminder_minutes_before?: number | null;
  }) => api.post<Lesson>('/schedule/lessons', payload),
  updateLesson: (id: number, payload: {
    group_id?: number;
    topic?: string;
    lesson_type?: 'individual' | 'group' | 'makeup';
    start_at?: string;
    end_at?: string;
    materials_url?: string | null;
    comment?: string | null;
    is_cancelled?: boolean;
    is_recurring_weekly?: boolean;
    reminder_minutes_before?: number | null;
    apply_to_future?: boolean;
  }) => api.put<Lesson>(`/schedule/lessons/${id}`, payload),
  deleteLesson: (id: number, scope: 'single' | 'future' | 'all' = 'single') =>
    api.delete(`/schedule/lessons/${id}`, { params: { delete_scope: scope } }),
  listMakeups: (includeCompleted = false) => api.get<MakeupItem[]>('/schedule/makeups', { params: { include_completed: includeCompleted } }),
  makeupSession: (params: { makeup_group_id?: number; makeup_lesson_at?: string; teacher_id?: number }) =>
    api.get<MakeupItem[]>('/schedule/makeups/session', { params }),
  makeupCalendar: (teacherId?: number, includeCompleted = true) =>
    api.get<MakeupCalendarEvent[]>('/schedule/makeups-events', { params: { teacher_id: teacherId, include_completed: includeCompleted } }),
  assignMakeup: (attendanceId: number, payload: {
    makeup_lesson_at: string;
    makeup_teacher_id: number;
    makeup_comment?: string | null;
    makeup_completed?: boolean;
  }) => api.patch<MakeupItem>(`/schedule/makeups/${attendanceId}`, payload),
  completeMakeup: (attendanceId: number, payload: { makeup_completed: boolean; makeup_comment?: string | null }) =>
    api.patch<MakeupItem>(`/schedule/makeups/${attendanceId}/completion`, payload),
};

export const dealsApi = {
  list: () => api.get<Deal[]>('/deals'),
  create: (payload: {
    client_id: number;
    manager_id?: number;
    stage?: string;
    amount: number;
    deadline?: string;
    status?: string;
  }) => api.post<Deal>('/deals', payload),
  patch: (id: number, payload: Partial<Pick<Deal, 'stage' | 'amount' | 'status' | 'deadline'>>) =>
    api.patch<Deal>(`/deals/${id}`, payload),
  remove: (id: number) => api.delete(`/deals/${id}`),
  restore: (id: number) => api.post<Deal>(`/deals/${id}/restore`),
};

export const tasksApi = {
  list: () => api.get<Task[]>('/tasks'),
  create: (payload: {
    title: string;
    description?: string;
    assignee_id?: number;
    creator_id?: number;
    client_id?: number;
    deal_id?: number;
    priority?: 'low' | 'medium' | 'high';
    deadline?: string;
  }) => api.post<Task>('/tasks', payload),
  patch: (id: number, payload: Partial<Pick<Task, 'status' | 'priority' | 'deadline' | 'title' | 'description'>>) =>
    api.patch<Task>(`/tasks/${id}`, payload),
  remove: (id: number) => api.delete(`/tasks/${id}`),
  restore: (id: number) => api.post<Task>(`/tasks/${id}/restore`),
};

export const archiveApi = {
  list: (params?: {
    entity?: ArchiveEntity | 'all';
    q?: string;
    archived_from?: string;
    archived_to?: string;
    sort_by?: ArchiveSortBy;
    sort_dir?: ArchiveSortDir;
  }) => api.get<ArchiveItem[]>('/archive/items', { params }),
  get: (entity: ArchiveEntity, id: number) => api.get<Record<string, unknown>>(`/archive/${entity}/${id}`),
  restore: (entity: ArchiveEntity, id: number) => api.post(`/archive/${entity}/${id}/restore`),
};

export const adminApi = {
  usersActivity: () => api.get<AdminUserActivity[]>('/admin/activity/users'),
  sessions: (params?: { user_id?: number; active_only?: boolean; limit?: number }) =>
    api.get<UserSessionInfo[]>('/admin/activity/sessions', { params }),
  terminateSession: (sessionId: string) => api.post<{ message: string }>(`/admin/activity/sessions/${sessionId}/terminate`),
  logs: (params?: {
    user_id?: number;
    action?: string;
    path?: string;
    is_reviewed?: boolean;
    date_from?: string;
    date_to?: string;
    limit?: number;
  }) => api.get<AuditLogItem[]>('/admin/activity/logs', { params }),
  reviewLog: (logId: number, payload: { is_reviewed: boolean; review_note?: string | null }) =>
    api.patch<AuditLogItem>(`/admin/activity/logs/${logId}`, payload),
};
