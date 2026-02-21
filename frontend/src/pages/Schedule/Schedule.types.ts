import type { EventInput } from "@fullcalendar/core/index.js";

export interface BaseEvent extends EventInput {
  id: string;
  title: string;
  start: string | Date;
  startTime?: string | Date | null;
  end?: string | Date;
  endTime?: string | Date;
  allDay?: boolean;
  editable?: boolean;
}

export interface ICustomEvent extends EventInput {
  id: number;
  students?: Student | null;
  teacher: Teacher;
  course: Course;
  group?: Group | null;
  type: Type;
  isConducted: boolean | null;
  start: string;
  end: string;
  allDay?: boolean;
}

export interface Type {
  id: number;
  name: "Индивидуальное" | "Групповое";
  // color: string;
}

export interface Group {
  id: number;
  name: string;
  students: Student[];
}

export interface Course {
  id: number;
  name: string;
}

export interface Teacher {
  id: number;
  firstName: string;
  secondName: string;
  patronymic?: string;
  email?: string;
  phone?: string;
  income_per_hour?: number;
}

export interface Student {
  id: number;
  firstName: string;
  secondName: string;
  patronymic?: string;
  dateOfBirth?: string;
  parentPhone?: string;
  parentFullName?: string;
}