export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  second_name: string;
  patronymic: string | null;
  income_per_hour: number;
  phone: string | null;
  is_accepted: boolean;
  created_at: string;
  role: Role;
}

export interface Client {
  id: number;
  first_name: string;
  second_name: string;
  patronymic: string | null;
  date_of_birth: string | null;
  parent_full_name: string | null;
  parent_phone: string | null;
  parent_email: string | null;
  tags: string | null;
  created_at: string;
}

export interface TeacherGroupStudents {
  group_id: number;
  group_name: string;
  course_name: string | null;
  students: Client[];
}

export interface Course {
  id: number;
  name: string;
  cost: number;
  lesson_cost: number;
  lesson_count: number;
  module_count: number;
}

export interface Group {
  id: number;
  name: string;
  course_id: number;
  teacher_id: number | null;
  schedule_text: string | null;
  audience: string | null;
}

export interface Lesson {
  id: number;
  group_id: number;
  topic: string;
  start_at: string;
  end_at: string;
  materials_url: string | null;
  comment: string | null;
  is_conducted: boolean;
  is_cancelled: boolean;
  is_recurring_weekly: boolean;
  recurrence_group_id: string | null;
}

export type AttendanceStatus = 'present' | 'absent' | 'late';

export interface AttendanceRecord {
  id: number;
  lesson_id: number;
  client_id: number;
  status: AttendanceStatus;
  auto_marked_cancelled: boolean;
  comment: string | null;
  hedgehogs: number;
  absent_marked_by_user_id: number | null;
  makeup_lesson_at: string | null;
  makeup_teacher_id: number | null;
  makeup_comment: string | null;
  makeup_completed: boolean;
}

export interface StudentAttendanceStats {
  client_id: number;
  total_lessons: number;
  present_count: number;
  late_count: number;
  absent_count: number;
  attendance_rate: number;
  total_hedgehogs: number;
  average_hedgehogs: number;
  makeups_scheduled: number;
  makeups_completed: number;
}

export interface StudentMakeup {
  attendance_id: number;
  lesson_id: number;
  lesson_topic: string;
  lesson_start_at: string;
  status: string;
  makeup_lesson_at: string | null;
  makeup_teacher_id: number | null;
  makeup_comment: string | null;
  makeup_completed: boolean;
}

export interface MakeupItem {
  attendance_id: number;
  client_id: number;
  client_full_name: string;
  lesson_id: number;
  lesson_topic: string;
  lesson_start_at: string;
  group_id: number;
  group_name: string;
  absent_marked_by_user_id: number | null;
  makeup_lesson_at: string | null;
  makeup_teacher_id: number | null;
  makeup_comment: string | null;
  makeup_completed: boolean;
}

export interface MakeupCalendarEvent {
  attendance_id: number;
  client_id: number;
  client_full_name: string;
  group_name: string;
  lesson_topic: string;
  makeup_lesson_at: string;
  makeup_completed: boolean;
}

export interface Deal {
  id: number;
  client_id: number;
  manager_id: number | null;
  stage: string;
  amount: number;
  deadline: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  assignee_id: number | null;
  creator_id: number | null;
  client_id: number | null;
  deal_id: number | null;
  priority: 'low' | 'medium' | 'high';
  deadline: string | null;
  status: 'open' | 'in_progress' | 'done';
  created_at: string;
}

export type ArchiveEntity = 'clients' | 'courses' | 'groups' | 'lessons' | 'deals' | 'tasks';

export interface ArchiveItem {
  entity: ArchiveEntity;
  entity_id: number;
  title: string;
  subtitle: string | null;
  archived_at: string;
}

export type ArchiveSortBy = 'archived_at' | 'title' | 'entity';
export type ArchiveSortDir = 'asc' | 'desc';

export interface AdminUserActivity {
  user_id: number;
  full_name: string;
  email: string;
  role: string;
  active_sessions: number;
  total_actions: number;
  last_activity_at: string | null;
}

export interface UserSessionInfo {
  id: number;
  session_id: string;
  user_id: number;
  ip_address: string | null;
  user_agent: string | null;
  started_at: string;
  last_seen_at: string;
  ended_at: string | null;
  expires_at: string | null;
  revoked_at: string | null;
  is_active: boolean;
}

export interface AuditLogItem {
  id: number;
  user_id: number | null;
  session_id: string | null;
  action: string;
  method: string | null;
  path: string | null;
  status_code: number | null;
  ip_address: string | null;
  user_agent: string | null;
  details: string | null;
  is_reviewed: boolean;
  review_note: string | null;
  created_at: string;
}
