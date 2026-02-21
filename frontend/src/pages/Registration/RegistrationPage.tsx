import styles from './RegistrationPage.module.scss';
import { InfoPanel } from '@components/ui/auth/InfoPanel/InfoPanel';
import { FormPanel } from '@components/ui/auth/FormPanel/FormPanel';
import { infoPanelListItems } from './resources/infoPanelListItems';
import { fields } from './resources/formPanelListOfFields';
import type { RegistrationFormData } from './Registration.types';
import { useState, type FormEvent } from 'react';
import { authApi } from '../../api/crm';

export const RegistrationPage = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    first_name: '',
    second_name: '',
    patronymic: '',
    email: '',
    password: '',
  });

  const handleChange = (name: string, value: string | number) => {
    setFormData({
      ...formData,
      [name]: String(value),
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    authApi.register(formData)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        window.location.href = '/';
      })
      .catch((error) => console.log(error?.response?.data ?? error.message));
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerPanel}>
        <InfoPanel
          h1Text="Присоединяйся к нам!"
          pText="Вас приветствует команда HedgehogCRM! Зарегистрируйтесь, чтобы получить доступ к системе."
          listItems={infoPanelListItems}
        />

        <FormPanel
          h1Text="Регистрация учетной записи"
          pText="Заполните форму регистрации для создания учетной записи"
          formValues={formData}
          onChangeField={handleChange}
          onSubmitForm={handleSubmit}
          fields={fields}
          type="registration"
          buttonText="Зарегистрироваться"
          link={{
            pText: 'Уже есть аккаунт?',
            pathname: '/login',
            linkText: 'Войти',
          }}
        />
      </div>
    </div>
  );
};
