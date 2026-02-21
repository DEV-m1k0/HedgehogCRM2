import { api } from './client';
import type { Client, Course, Deal, Lesson, Task, User } from '../types/crm.types';

export const authApi = {
  register: (payload: {
    email: string;
    password: string;
    first_name: string;
    second_name: string;
    patronymic?: string;
  }) => api.post<{ user: User }>('/auth/register', payload),
  login: (payload: { email: string; password: string }) => api.post<{ user: User }>('/auth/login', payload),
};

export const metaApi = {
  users: () => api.get<User[]>('/users'),
};

export const clientsApi = {
  list: () => api.get<Client[]>('/clients'),
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
  remove: (id: number) => api.delete(`/clients/${id}`),
};

export const coursesApi = {
  list: () => api.get<Course[]>('/courses'),
  create: (payload: { name: string; cost: number; lesson_cost: number; lesson_count: number; module_count: number }) =>
    api.post<Course>('/courses', payload),
};

export const groupsApi = {
  list: () => api.get('/groups'),
  create: (payload: {
    name: string;
    course_id: number;
    teacher_id?: number;
    schedule_text?: string;
    audience?: string;
  }) => api.post('/groups', payload),
};

export const scheduleApi = {
  lessons: () => api.get<Lesson[]>('/schedule/lessons'),
  createLesson: (payload: {
    group_id: number;
    topic: string;
    start_at: string;
    end_at: string;
    materials_url?: string;
    comment?: string;
  }) => api.post<Lesson>('/schedule/lessons', payload),
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
};
