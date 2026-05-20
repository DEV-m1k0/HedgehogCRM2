import styles from './RegistrationPage.module.scss';
import { InfoPanel } from '@components/ui/auth/InfoPanel/InfoPanel';
import { FormPanel } from '@components/ui/auth/FormPanel/FormPanel';
import { infoPanelListItems } from './resources/infoPanelListItems';
import { fields } from './resources/formPanelListOfFields';
import type { RegistrationFormData } from './Registration.types';
import { useMemo, useState, type FormEvent } from 'react';
import { authApi } from '../../api/crm';
import { useNotifications } from '../../components/feedback/Notifications';

export const RegistrationPage = () => {
  const { notify } = useNotifications();
  const [formData, setFormData] = useState<RegistrationFormData>({
    first_name: '',
    second_name: '',
    patronymic: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    const hasNames = formData.first_name.trim() && formData.second_name.trim();
    const emailValid = /\S+@\S+\.\S+/.test(formData.email.trim());
    const passwordValid = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(formData.password);
    return Boolean(hasNames && emailValid && passwordValid && !isSubmitting);
  }, [formData, isSubmitting]);

  const handleChange = (name: string, value: string | number) => {
    setFormData({
      ...formData,
      [name]: String(value),
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      notify('error', 'Проверьте форму', 'Пароль должен быть минимум 8 символов и содержать буквы и цифры.');
      return;
    }
    setIsSubmitting(true);
    authApi.register(formData)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('access_token', response.data.access_token);
        notify('success', 'Регистрация отправлена', 'Аккаунт создан. Проверьте доступ к системе.');
        window.location.href = '/';
      })
      .catch((error) => {
        notify('error', 'Ошибка регистрации', error?.response?.data?.detail ?? 'Не удалось создать учетную запись.');
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
          canSubmit={canSubmit}
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
