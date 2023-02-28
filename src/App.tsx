import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { initialiseAppTC } from "./redux/appReduser"
import HeaderContainer from './components/Header/HeaderContainer';
import { connect, Provider } from 'react-redux';
//import {getAuthUserDataTC} from "./redux/authReduser"
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import Login from './components/Login/Login';
import { Preloader } from './components/common/Preloader/Preloader';
import { GlobalStateType, store } from './redux/redux-store';
import { UsersPage } from './components/Users/UsersContainer';

//import { DialogsContainer } from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
//import { ProfileContainer } from './components/Profile/ProfileContainer';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

type PropsType = {
  initialised: boolean
  initialiseAppTC: () => void
}

class App extends React.Component<PropsType> {
  componentDidMount() {
    this.props.initialiseAppTC()
  }

  render() {
    if (!this.props.initialised) {
      return <Preloader />
    }
    return (

      <Router>
        <div className='app-wrapper'>
          <HeaderContainer />
          <Navbar />
          <div className='app-wrapper-content'>
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
                </Suspense>
                // dialogsPage={props.state.dialogsPage} dispatch={props.dispatch} 
              } />
              <Route path='/news' element={<News />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/users' element={<UsersPage />} />
              <Route path='/login' element={<Login />} />
              <Route path="/" element={<Navigate to="/profile" />} />
              <Route path='*' element={<div>404</div>} />

            </Routes>
          </div>
        </div>
      </Router >

    )
  }
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