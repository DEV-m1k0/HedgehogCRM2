import type { User } from '../types/crm.types';

export type CalendarDesktopView = 'dayGridMonth' | 'timeGridWeek' | 'listWeek';
export type CalendarMobileView = 'timeGridDay' | 'timeGridWeek' | 'listWeek';
export type CalendarTimeFormat = '24h' | '12h';
export type CalendarSlotDuration = '00:15:00' | '00:30:00' | '01:00:00';
export type CalendarSnapDuration = '00:05:00' | '00:10:00' | '00:15:00' | '00:30:00';
export type EventTitleMode = 'full' | 'short';
export type EventTitleLines = 1 | 2 | 3;
export type ToastDurationMs = 4000 | 6000 | 8000;
export type MaxVisibleToasts = 3 | 5 | 8;

export interface TeacherSettings {
  desktopView: CalendarDesktopView;
  mobileView: CalendarMobileView;
  timeFormat: CalendarTimeFormat;
  firstDay: 0 | 1;
  slotDuration: CalendarSlotDuration;
  snapDuration: CalendarSnapDuration;
  dayStartTime: string;
  dayEndTime: string;
  initialScrollTime: string;
  monthEventRows: 2 | 3 | 4;
  showNowIndicator: boolean;
  showWeekends: boolean;
  showLegend: boolean;
  denseEvents: boolean;
  showCancelledLessons: boolean;
  showEventTypeBadges: boolean;
  showEventStatusBadges: boolean;
  eventTitleMode: EventTitleMode;
  eventTitleLines: EventTitleLines;
  showEventTime: boolean;
  showRecurringBadge: boolean;
  dimConductedEvents: boolean;
  showCourseInTitle: boolean;
  autoMarkNotificationsRead: boolean;
  toastDurationMs: ToastDurationMs;
  maxVisibleToasts: MaxVisibleToasts;
}

export const DEFAULT_TEACHER_SETTINGS: TeacherSettings = {
  desktopView: 'dayGridMonth',
  mobileView: 'timeGridWeek',
  timeFormat: '24h',
  firstDay: 1,
  slotDuration: '00:30:00',
  snapDuration: '00:15:00',
  dayStartTime: '08:00:00',
  dayEndTime: '22:00:00',
  initialScrollTime: '09:00:00',
  monthEventRows: 2,
  showNowIndicator: true,
  showWeekends: true,
  showLegend: true,
  denseEvents: false,
  showCancelledLessons: true,
  showEventTypeBadges: true,
  showEventStatusBadges: true,
  eventTitleMode: 'full',
  eventTitleLines: 2,
  showEventTime: true,
  showRecurringBadge: true,
  dimConductedEvents: false,
  showCourseInTitle: true,
  autoMarkNotificationsRead: true,
  toastDurationMs: 4000,
  maxVisibleToasts: 5,
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const normalizeSettings = (raw: unknown): TeacherSettings => {
  if (!isObject(raw)) {
    return DEFAULT_TEACHER_SETTINGS;
  }

  const desktopView = raw.desktopView;
  const mobileView = raw.mobileView;
  const timeFormat = raw.timeFormat;
  const firstDay = raw.firstDay;
  const slotDuration = raw.slotDuration;
  const snapDuration = raw.snapDuration;
  const dayStartTime = raw.dayStartTime;
  const dayEndTime = raw.dayEndTime;
  const initialScrollTime = raw.initialScrollTime;
  const monthEventRows = raw.monthEventRows;
  const showNowIndicator = raw.showNowIndicator;
  const showWeekends = raw.showWeekends;
  const showLegend = raw.showLegend;
  const denseEvents = raw.denseEvents;
  const showCancelledLessons = raw.showCancelledLessons;
  const showEventTypeBadges = raw.showEventTypeBadges;
  const showEventStatusBadges = raw.showEventStatusBadges;
  const eventTitleMode = raw.eventTitleMode;
  const eventTitleLines = raw.eventTitleLines;
  const showEventTime = raw.showEventTime;
  const showRecurringBadge = raw.showRecurringBadge;
  const dimConductedEvents = raw.dimConductedEvents;
  const showCourseInTitle = raw.showCourseInTitle;
  const autoMarkNotificationsRead = raw.autoMarkNotificationsRead;
  const toastDurationMs = raw.toastDurationMs;
  const maxVisibleToasts = raw.maxVisibleToasts;
  const timeRegex = /^\d{2}:\d{2}:\d{2}$/;

  return {
    desktopView: desktopView === 'timeGridWeek' || desktopView === 'listWeek' || desktopView === 'dayGridMonth'
      ? desktopView
      : DEFAULT_TEACHER_SETTINGS.desktopView,
    mobileView: mobileView === 'timeGridDay' || mobileView === 'listWeek' || mobileView === 'timeGridWeek'
      ? mobileView
      : DEFAULT_TEACHER_SETTINGS.mobileView,
    timeFormat: timeFormat === '12h' ? '12h' : DEFAULT_TEACHER_SETTINGS.timeFormat,
    firstDay: firstDay === 0 ? 0 : DEFAULT_TEACHER_SETTINGS.firstDay,
    slotDuration: slotDuration === '00:15:00' || slotDuration === '01:00:00' || slotDuration === '00:30:00'
      ? slotDuration
      : DEFAULT_TEACHER_SETTINGS.slotDuration,
    snapDuration: snapDuration === '00:05:00' || snapDuration === '00:10:00' || snapDuration === '00:30:00' || snapDuration === '00:15:00'
      ? snapDuration
      : DEFAULT_TEACHER_SETTINGS.snapDuration,
    dayStartTime: typeof dayStartTime === 'string' && timeRegex.test(dayStartTime) ? dayStartTime : DEFAULT_TEACHER_SETTINGS.dayStartTime,
    dayEndTime: typeof dayEndTime === 'string' && timeRegex.test(dayEndTime) ? dayEndTime : DEFAULT_TEACHER_SETTINGS.dayEndTime,
    initialScrollTime: typeof initialScrollTime === 'string' && timeRegex.test(initialScrollTime) ? initialScrollTime : DEFAULT_TEACHER_SETTINGS.initialScrollTime,
    monthEventRows: monthEventRows === 3 || monthEventRows === 4 ? monthEventRows : DEFAULT_TEACHER_SETTINGS.monthEventRows,
    showNowIndicator: typeof showNowIndicator === 'boolean' ? showNowIndicator : DEFAULT_TEACHER_SETTINGS.showNowIndicator,
    showWeekends: typeof showWeekends === 'boolean' ? showWeekends : DEFAULT_TEACHER_SETTINGS.showWeekends,
    showLegend: typeof showLegend === 'boolean' ? showLegend : DEFAULT_TEACHER_SETTINGS.showLegend,
    denseEvents: typeof denseEvents === 'boolean' ? denseEvents : DEFAULT_TEACHER_SETTINGS.denseEvents,
    showCancelledLessons: typeof showCancelledLessons === 'boolean' ? showCancelledLessons : DEFAULT_TEACHER_SETTINGS.showCancelledLessons,
    showEventTypeBadges: typeof showEventTypeBadges === 'boolean' ? showEventTypeBadges : DEFAULT_TEACHER_SETTINGS.showEventTypeBadges,
    showEventStatusBadges: typeof showEventStatusBadges === 'boolean' ? showEventStatusBadges : DEFAULT_TEACHER_SETTINGS.showEventStatusBadges,
    eventTitleMode: eventTitleMode === 'short' ? 'short' : DEFAULT_TEACHER_SETTINGS.eventTitleMode,
    eventTitleLines: eventTitleLines === 1 || eventTitleLines === 3 ? eventTitleLines : DEFAULT_TEACHER_SETTINGS.eventTitleLines,
    showEventTime: typeof showEventTime === 'boolean' ? showEventTime : DEFAULT_TEACHER_SETTINGS.showEventTime,
    showRecurringBadge: typeof showRecurringBadge === 'boolean' ? showRecurringBadge : DEFAULT_TEACHER_SETTINGS.showRecurringBadge,
    dimConductedEvents: typeof dimConductedEvents === 'boolean' ? dimConductedEvents : DEFAULT_TEACHER_SETTINGS.dimConductedEvents,
    showCourseInTitle: typeof showCourseInTitle === 'boolean' ? showCourseInTitle : DEFAULT_TEACHER_SETTINGS.showCourseInTitle,
    autoMarkNotificationsRead: typeof autoMarkNotificationsRead === 'boolean'
      ? autoMarkNotificationsRead
      : DEFAULT_TEACHER_SETTINGS.autoMarkNotificationsRead,
    toastDurationMs: toastDurationMs === 6000 || toastDurationMs === 8000 ? toastDurationMs : DEFAULT_TEACHER_SETTINGS.toastDurationMs,
    maxVisibleToasts: maxVisibleToasts === 3 || maxVisibleToasts === 8 ? maxVisibleToasts : DEFAULT_TEACHER_SETTINGS.maxVisibleToasts,
  };
};

const keyByUser = (userId: number) => `teacher_settings_${userId}`;

export const loadTeacherSettings = (user: User | null): TeacherSettings => {
  if (!user) {
    return DEFAULT_TEACHER_SETTINGS;
  }
  const roleName = user.role?.name?.toLowerCase() ?? '';
  const isTeacher = roleName.includes('преподаватель') || roleName.includes('teacher');
  if (!isTeacher) {
    return DEFAULT_TEACHER_SETTINGS;
  }
  const raw = localStorage.getItem(keyByUser(user.id));
  if (!raw) {
    return DEFAULT_TEACHER_SETTINGS;
  }
  try {
    return normalizeSettings(JSON.parse(raw));
  } catch {
    return DEFAULT_TEACHER_SETTINGS;
  }
};

export const saveTeacherSettings = (user: User, settings: TeacherSettings) => {
  localStorage.setItem(keyByUser(user.id), JSON.stringify(settings));
  window.dispatchEvent(new Event('teacher-settings-updated'));
};
