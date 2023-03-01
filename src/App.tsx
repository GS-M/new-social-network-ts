import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import './App.css';
import { initialiseAppTC } from "./redux/appReduser"
import { connect, Provider } from 'react-redux';
//import {getAuthUserDataTC} from "./redux/authReduser"
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Settings from './components/Settings/Settings';

import { Preloader } from './components/common/Preloader/Preloader';
import { GlobalStateType, store } from './redux/redux-store';
import { UsersPage } from './components/Users/UsersContainer';
import { Login } from './components/Login/Login';

import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import Avatar from 'antd/es/avatar';
import { Col, Row } from 'antd/es/grid';
import { AppHeader } from './components/Header/Header';
//import cs from './components/Navbar/Navbar.module.css'


//import { DialogsContainer } from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
//import { ProfileContainer } from './components/Profile/ProfileContainer';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const { Header, Content, Footer, Sider } = Layout;


// const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

// const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
//   (icon, index) => {
//     const key: any = String(index + 1);

//     return {
//       key: `sub${key}`,
//       icon: React.createElement(icon),
//       label: `subnav ${key}`,

//       children: new Array(4).fill(null).map((_, j) => {
//         const subKey = index * 4 + j + 1;
//         return {
//           key: subKey,
//           label: `option${subKey}`,
//         };
//       }),
//     };
//   },
// );



type PropsType = {
  initialised: boolean
  initialiseAppTC: () => void
}
const App: React.FC<PropsType> = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    props.initialiseAppTC()
  }, [])

  if (!props.initialised) {
    return <Preloader />
  }

  return (
    <Router >
      <Layout>
        {/* <Header className="header">
          <div className="logo" />
          <Row>
            <Col span={20}>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} >
                <MenuItem>
                   <HeaderContainer /> 
                  <NavLink to="/users" >Users</NavLink>
                </MenuItem>
              </Menu>
            </Col>
            <Col span={4}>
              <Avatar size={64} icon={<UserOutlined />} />
            </Col>
          </Row>
        </Header> */}
        <AppHeader />

        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <MenuItem>
                  <NavLink to='/profile' >Profile</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to='/dialogs' >Messages</NavLink>
                </MenuItem>
                {/* <MenuItem>
                  <NavLink to="/news" >News</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/settings" >Settings</NavLink>
                </MenuItem> */}
                <MenuItem>
                  <NavLink to="/users" >Users</NavLink>
                </MenuItem>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Routes>

                <Route path='/profile/' element={
                  <Suspense fallback={<Preloader />}>
                    <ProfileContainer />
                  </Suspense>} >
                  <Route path=':userId' element={<ProfileContainer />} />
                </Route>
                <Route path='/dialogs' element={
                  <Suspense fallback={<Preloader />}>
                    <DialogsContainer />
                  </Suspense>} />
                <Route path='/news' element={<News />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/users' element={<UsersPage />} />
                <Route path='/login' element={<Login />} />
                <Route path="/" element={<Navigate to="/profile" />} />
                <Route path='*' element={<div>404</div>} />
              </Routes>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Soshial network ©2023</Footer>
      </Layout>
    </Router >


    // <Router>
    //   <div className='app-wrapper'>
    //     <HeaderContainer />
    //     <Navbar />
    //     <div className='app-wrapper-content'>
    //       <Routes>
    //         <Route path='/profile/' element={
    //           <Suspense fallback={<Preloader />}>
    //             <ProfileContainer />
    //           </Suspense>} >
    //           <Route path=':userId' element={<ProfileContainer />} />
    //         </Route>
    //         <Route path='/dialogs' element={
    //           <Suspense fallback={<Preloader />}>
    //             <DialogsContainer />
    //           </Suspense>
    //           // dialogsPage={props.state.dialogsPage} dispatch={props.dispatch} 
    //         } />
    //         <Route path='/news' element={<News />} />
    //         <Route path='/settings' element={<Settings />} />
    //         <Route path='/users' element={<UsersPage />} />
    //         <Route path='/login' element={<Login />} />
    //         <Route path="/" element={<Navigate to="/profile" />} />
    //         <Route path='*' element={<div>404</div>} />

    //       </Routes>
    //     </div>
    //   </div>
    // </Router >

  )
}


const mapStateToprops = (state: GlobalStateType) => ({
  initialised: state.app.initialised
})

//export default connect(mapStateToprops, { initialiseAppTC })(App)
let AppWithRouter = connect(mapStateToprops, { initialiseAppTC })(App)

export let AppContainer = () => {
  return (
    <Provider store={store}>
      <AppWithRouter />
    </Provider >
  )
}