import styles from './RegistrationPage.module.scss'
import { InfoPanel } from '@components/ui/auth/InfoPanel/InfoPanel'
import { FormPanel } from '@components/ui/auth/FormPanel/FormPanel'
import { infoPanelListItems } from './resources/infoPanelListItems'
import { fields } from './resources/formPanelListOfFields'

export const RegistrationPage = () => {

    return (
        <div className={styles.container}>
            <div className={styles.containerPanel}>
                <InfoPanel
                h1Text="Присоединяйся к нам!"
                pText="Вас приветствует команда HedgehogCRM! Зарегестрируйся, чтобы получить полноценный доступ к системе."
                listItems={infoPanelListItems}
                />
                
                <FormPanel
                h1Text="Регистрация учетной записи"
                pText="Заполните форму регистрации для создания учетной записи"
                fields={fields}
                buttonText="Зарегистрироваться"
                link={
                    {
                        pText: 'Уже есть аккаунт?',
                        pathname: '/login',
                        linkText: 'Войти'
                    }
                }
                />
            </div>
        </div>
    )
}