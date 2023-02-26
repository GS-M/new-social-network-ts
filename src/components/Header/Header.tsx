import { NavLink } from 'react-router-dom';
import cs from './Header.module.css';
import logo from '../../accets/images/logo.png'

export type MapStateHeaderType = {
    isAuth: boolean
    login: string | null
}
export type MapDispathHeaderType = {
    logoutTC: () => void
}
export const Header: React.FC<MapStateHeaderType & MapDispathHeaderType> = (props) => {
    return (
        <header className={cs.header}>
            <img alt="" src={logo} />
            <div className={cs.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logoutTC}>Logout</button></div>
                    : <NavLink to='/login'>Login</NavLink>}
            </div>
        </header>
    )
}

