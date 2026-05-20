'use client';

import styles from './LoginPage.module.scss';
import { InfoPanel } from '@components/ui/auth/InfoPanel/InfoPanel';
import { FormPanel } from '@components/ui/auth/FormPanel/FormPanel';
import { infoPanelListItems } from './resources/infoPanelListItems';
import { fields } from './resources/formPanelListOfFields';
import type { LoginFormData } from './Login.types';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { authApi } from '@/lib/api/crm';
import { useNotifications } from '@/components/feedback/Notifications';

export const LoginPage = () => {
  const { notify } = useNotifications();
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const expired = sessionStorage.getItem('auth_expired');
    if (expired === '1') {
      sessionStorage.removeItem('auth_expired');
      notify('info', 'Сессия истекла', 'Срок действия токенов завершён. Войдите в аккаунт повторно.');
    }
  }, [notify]);

  const canSubmit = useMemo(
    () => loginData.email.trim().length > 3 && loginData.password.length >= 8 && !isSubmitting,
    [loginData.email, loginData.password, isSubmitting],
  );

  const handleChange = (name: string, value: string | number) => {
    setLoginData({
      ...loginData,
      [name]: String(value),
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }
    setIsSubmitting(true);
    authApi.login(loginData)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('access_token', response.data.access_token);
        notify('success', 'Вход выполнен', 'Добро пожаловать в систему.');
        window.location.href = '/';
      })
      .catch((error) => {
        notify('error', 'Ошибка входа', error?.response?.data?.detail ?? 'Проверьте email и пароль.');
        console.log(error?.response?.data ?? error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerPanel}>
        <InfoPanel
          h1Text="С возвращением!"
          pText="Войди в свой аккаунт и получай полноценный доступ к нашей системе"
          listItems={infoPanelListItems}
        />

        <FormPanel
          h1Text="Вход в аккаунт"
          pText="Введите свои учетные данные для входа в аккаунт"
          formValues={loginData}
          fields={fields}
          type="login"
          onChangeField={handleChange}
          onSubmitForm={handleSubmit}
          canSubmit={canSubmit}
          buttonText="Войти в аккаунт"
          link={{
            pText: 'Еще нет аккаунта?',
            pathname: '/registration',
            linkText: 'Зарегистрироваться',
          }}
        />
      </div>
    </div>
  );
};
