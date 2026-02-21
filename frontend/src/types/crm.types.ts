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
