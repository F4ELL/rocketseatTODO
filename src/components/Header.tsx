import styles from './Header.module.css'

import logo from '../assets/logo.svg'

export const Header = () => {
    return (
        <div className={styles.header}>
            <img src={logo} alt="Logo ToDo List" />
        </div>
    )
}