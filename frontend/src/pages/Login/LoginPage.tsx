import styles from './LoginPage.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faChartLine, faTasks } from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons'

export const LoginPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.containerPanel}>
                <div className={`${styles.panel} ${styles.infoPanel}`}>
                    <h1>С возвращением!</h1>
                    <p>Войдити в личный кабинет, чтобы получить доступ к системе</p>
                    <ul>
                        <li>
                            <span className='icon-circle'><FontAwesomeIcon icon={faCalendarDays}/></span>
                            Следите за расписанием занятий
                        </li>
                        <li> 
                            <span className='icon-circle'><FontAwesomeIcon icon={faChartLine} /></span> 
                            Отслеживайте успеваемость и прогресс
                        </li>
                        <li>
                            <span className='icon-circle'><FontAwesomeIcon icon={faCalendarCheck} /></span> 
                            Просматривайте записи на занятия
                        </li>
                        <li> 
                            <span className='icon-circle'></span><FontAwesomeIcon icon={faTasks} /> 
                            Выставляйте или просматривайте задачи
                        </li>
                    </ul>
                </div>

                <div className={`${styles.panel} ${styles.formPanel}`}>
                    <h1>Вход в аккаунт</h1>
                    <p>Введите ваши учетные данные для доступа к системе</p>
                </div>
            </div>
        </div>
    )
}