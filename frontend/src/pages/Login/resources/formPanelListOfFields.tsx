import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

export const fields = [
    {
        type: 'email',
        name: 'email',
        id: 'email',
        label: 'Электронная почта',
        placeholder: 'Введите электронную почту',
        required: true,
        icon: <FontAwesomeIcon icon={faEnvelope} />
    },
    {
        type: 'password',
        name: 'password',
        id: 'password',
        label: 'Пароль',
        placeholder: 'Введите пароль',
        required: true,
        icon: <FontAwesomeIcon icon={faLock} />
    }
]