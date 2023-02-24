import cs from './Navbar.module.css';

import { NavLink } from 'react-router-dom';
const Navbar = () => {
    return (
        <nav className={cs.nav}>
            <div>
                <NavLink to='/profile' className={navData => navData.isActive ? cs.active : cs.item}>Profile</NavLink>
            </div>
            <div>
                <NavLink to='/dialogs' className={navData => navData.isActive ? cs.active : cs.item}>Messages</NavLink>
            </div>
            <div>
                <NavLink to="/news" className={navData => navData.isActive ? cs.active : cs.item}>News</NavLink>
            </div>
            <div>
                <NavLink to="/music" className={navData => navData.isActive ? cs.active : cs.item}>Music</NavLink>
            </div>
            <div>
                <NavLink to="/settings" className={navData => navData.isActive ? cs.active : cs.item}>Settings</NavLink>
            </div>
            <div>
                <NavLink to="/users" className={navData => navData.isActive ? cs.active : cs.item}>Users</NavLink>
            </div>
        </nav>
    )
}
export default Navbar