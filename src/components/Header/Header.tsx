import { NavLink } from 'react-router-dom';
import cs from './Header.module.css';
import logo from '../../accets/images/logo.png'
import Layout from 'antd/es/layout';
import { Col, Row } from 'antd/es/grid';
import Menu from 'antd/es/menu';
import MenuItem from 'antd/es/menu/MenuItem';
import Avatar from 'antd/es/avatar';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { getIsAuthSR } from '../../utils/resecelectors/profile-selectors';
import { getLogin } from '../../utils/resecelectors/auth-selectors';
import { useDispatch } from 'react-redux';
import { logoutTC } from '../../redux/authReduser';
import { AppDispatch } from '../../redux/redux-store';
import { Button } from 'antd';
const { Header } = Layout;


export const AppHeader: React.FC = (props) => {
    const isAuth = useSelector(getIsAuthSR)
    const login = useSelector(getLogin)

    const dispatch: AppDispatch = useDispatch()
    const logout = () => {
        dispatch(logoutTC())
    }

    return (
        <Header className="header">
            <div className="logo" />
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} >
                        <MenuItem>
                            {/* <HeaderContainer /> */}
                            <NavLink to="/users" >Users</NavLink>
                        </MenuItem>
                    </Menu>
                </Col>

                {isAuth
                    ? <>
                        <Col span={1}>
                            <Avatar alt={login || ''} size={64} icon={<UserOutlined />} />
                        </Col>
                        <Col span={5}>
                            <Button onClick={logout}>Logout</Button>
                        </Col>
                    </>
                    : <Col span={5}>
                        <Button>
                            <NavLink to='/login'>Login</NavLink>
                        </Button>
                    </Col>}

            </Row>
        </Header >
        // <header className={cs.header}>
        //     <img alt="" src={logo} />
        //     <div className={cs.loginBlock}>
        //         {props.isAuth
        //             ? <div>{props.login} - <button onClick={props.logoutTC}>Logout</button></div>
        //             : <NavLink to='/login'>Login</NavLink>}
        //     </div>
        // </header>
    )
}
// isAuth={props.isAuth} login={props.login} logoutTC={props.logoutTC}


