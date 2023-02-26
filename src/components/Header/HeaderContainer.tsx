import { connect } from 'react-redux';
import { Header, MapDispathHeaderType, MapStateHeaderType } from './Header';
import { logoutTC } from '../../redux/authReduser'
import { getIsAuthSR } from '../../utils/resecelectors/profile-selectors';
import { GlobalStateType } from '../../redux/redux-store';

//
const HeaderContainer: React.FC<MapStateHeaderType & MapDispathHeaderType> = (props) => {
    return (
        <Header isAuth={props.isAuth} login={props.login} logoutTC={props.logoutTC} />
    )
}
const mapStateToProps = (state: GlobalStateType) => {
    return {
        isAuth: getIsAuthSR(state), // пригодилась
        login: state.auth.login,
    }
}
export default connect<MapStateHeaderType, MapDispathHeaderType, {}, GlobalStateType>
    (mapStateToProps, { logoutTC })(HeaderContainer)
