import type { ListItemProps } from '../../../components/ui/auth/InfoPanel/InfoPanel.types';

export const infoPanelListItems: ListItemProps[] = [
  {
    text: {
      h3Text: 'Заполняйте',
      pText: 'Заполните форму регистрации',
    },
    icon: '1',
    type: 'number',
  },
  {
    text: {
      h3Text: 'Отправляйте',
      pText: 'Для отправки формы нажмите кнопку "Зарегистрироваться"',
    },
    icon: '2',
    type: 'number',
  },
  {
    text: {
      h3Text: 'Ожидайте',
      pText: 'Ожидайте подтверждения регистрации от администратора',
    },
    icon: '3',
    type: 'number',
  },
];
