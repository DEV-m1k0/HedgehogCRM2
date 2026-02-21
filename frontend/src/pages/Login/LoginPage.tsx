import styles from './LoginPage.module.scss';
import { InfoPanel } from '@components/ui/auth/InfoPanel/InfoPanel';
import { FormPanel } from '@components/ui/auth/FormPanel/FormPanel';
import { infoPanelListItems } from './resources/infoPanelListItems';
import { fields } from './resources/formPanelListOfFields';
import type { LoginFormData } from './Login.types';
import { useState, type FormEvent } from 'react';
import { authApi } from '../../api/crm';

export const LoginPage = () => {
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const handleChange = (name: string, value: string | number) => {
    setLoginData({
      ...loginData,
      [name]: String(value),
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    authApi.login(loginData)
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
