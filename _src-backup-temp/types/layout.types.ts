import type { ReactNode } from 'react';

export type MenuItem = {
  id: string;
  label: string;
  icon: ReactNode;
  path: string;
  submenu?: MenuItem[];
};
