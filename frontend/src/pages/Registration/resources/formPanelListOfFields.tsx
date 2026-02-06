import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

export const fields = [
    {
        type: 'text',
        name: 'secondName',
        id: 'secondName',
        label: 'Фамилия',
        placeholder: 'Иванов',
        required: true,
        pattern: `^[A-Za-zА-Яа-яЁё]+$`
    },
    {
        type: 'text',
        name: 'firstName',
        id: 'firstName',
        label: 'Имя',
        placeholder: 'Иван',
        required: true,
        pattern: '^[A-Za-zА-Яа-яЁё]+$'
    },
    {
        type: 'text',
        name: 'patronymic',
        id: 'patronymic',
        label: 'Отчество',
        placeholder: 'Иванович',
        required: false,
    },
    {
        type: 'email',
        name: 'email',
        id: 'email',
        label: 'Электронная почта',
        placeholder: 'Введите электронную почту',
        required: true,
        icon: <FontAwesomeIcon icon={faEnvelope} />,
        pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
    },
    {
        type: 'password',
        name: 'password',
        id: 'password',
        label: 'Пароль',
        placeholder: 'Введите пароль',
        required: true,
        icon: <FontAwesomeIcon icon={faLock} />,
        pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'
    }
]