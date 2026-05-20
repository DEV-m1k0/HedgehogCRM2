import type { EventInput } from '@fullcalendar/core/index.js';

export interface BaseEvent extends EventInput {
  id: string;
  title: string;
  start: string;
  end: string;
  color?: string;
  editable?: boolean;
}
