import styles from './LoginPage.module.scss'
import { InfoPanel } from '@components/ui/auth/InfoPanel/InfoPanel'
import { FormPanel } from '@components/ui/auth/FormPanel/FormPanel'
import { infoPanelListItems } from './resources/infoPanelListItems'
import { fields } from './resources/formPanelListOfFields'
import type { LoginFormData } from './Login.types'
import { useState } from 'react'
import axios from 'axios'


export const LoginPage = () => {
    const [loginData, setLoginData] = useState<LoginFormData>({
        email: '',
        password: ''
    });

    const handleChange = (name: string, value: string | number) => {
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/user/login', loginData)
        .then(res => {
            localStorage.setItem('user', JSON.stringify(res.data.user))
            window.location.href = '/account'
        })
        .catch(err => console.log(err.response.data))
    }

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
                onChangeField={handleChange}
                onSubmitForm={handleSubmit}
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