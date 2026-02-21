export type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  submenu?: MenuItem[];
};