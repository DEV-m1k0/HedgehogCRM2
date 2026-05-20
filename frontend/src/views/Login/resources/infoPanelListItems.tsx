import { faCalendarCheck, faCalendarDays, faChartLine, faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ListItemProps } from '../../../components/ui/auth/InfoPanel/InfoPanel.types';

export const infoPanelListItems: ListItemProps[] = [
  {
    text: 'Следите за расписанием занятий',
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
    type: 'icon',
  },
  {
    text: 'Отслеживайте успеваемость и прогресс',
    icon: <FontAwesomeIcon icon={faChartLine} />,
    type: 'icon',
  },
  {
    text: 'Просматривайте записи на занятия',
    icon: <FontAwesomeIcon icon={faCalendarCheck} />,
    type: 'icon',
  },
  {
    text: 'Выставляйте или просматривайте задачи',
    icon: <FontAwesomeIcon icon={faTasks} />,
    type: 'icon',
  },
];
