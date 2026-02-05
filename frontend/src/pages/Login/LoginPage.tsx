import styles from './LoginPage.module.scss'
import { InfoPanel } from '@components/ui/auth/InfoPanel/InfoPanel'
import { FormPanel } from '@components/ui/auth/FormPanel/FormPanel'
import { infoPanelListItems } from './resources/infoPanelListItems'
import { fields } from './resources/formPanelListOfFields'


export const LoginPage = () => {


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
                fields={fields}
                type="login"
                buttonText="Войти в аккаунт"
                link={{
                    pText: 'Еще нет аккаунта?',
                    pathname: '/registration',
                    linkText: 'Зарегистрироваться'
                }}
                />
            </div>
        </div>
    )
}