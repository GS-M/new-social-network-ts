import React from 'react';
import { connect } from 'react-redux';
import { Header } from './Header';
import { logoutTC } from '../../redux/authReduser'
import { getIsAuthSR } from '../../utils/resecelectors/profile-selectors';

//
const HeaderContainer = (props) => {
    return (
        <Header isAuth={props.isAuth} login={props.login} logoutTC={props.logoutTC} />
    )
}
const mapStateToProps = (state) => {
    return {
        isAuth: getIsAuthSR(state), // пригодилась
        login: state.auth.login,
    }
}
export default connect(mapStateToProps, { logoutTC })(HeaderContainer)
