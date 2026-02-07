export type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  submenu?: MenuItem[];
};

export type User = {
  name: string;
  email: string;
  avatar?: string;
  role: string;
};