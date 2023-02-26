import { connect } from "react-redux"
import { InjectedFormProps, reduxForm } from "redux-form"
import { requiredField } from "../../utils/validators/validators"
import { createField, Input } from "../common/FormsControl/FormsControl"
import { loginTC } from "../../redux/authReduser"
import { Navigate } from "react-router-dom"
import cs from "../common/FormsControl/FormsControl.module.css"
import { getIsAuthSR } from "../../utils/resecelectors/profile-selectors"
import { GlobalStateType } from "../../redux/redux-store"
import React from "react"

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>
type LoginFormOwnPropsType = {
    captchaUrl: string | null
}
const LoginForm:
    React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType>
    = (props) => {
        return (
            <form onSubmit={props.handleSubmit}>

                {createField<LoginFormValuesTypeKeys>
                    ('Email', Input, 'email', [requiredField])}
                {createField<LoginFormValuesTypeKeys>
                    ('Password', Input, 'password', [requiredField], { type: 'password' })}
                {createField<LoginFormValuesTypeKeys>
                    (undefined, Input, 'rememberMe', undefined, { type: 'checkbox' }, 'remember me')}

                {props.captchaUrl && <img alt='Captcha' src={props.captchaUrl} />}
                {props.captchaUrl && createField('Captcha', Input, 'captcha', [requiredField], {})}
                {/* <div> 
                <Field placeholder={"Email"} component={Input} name={'email'}
                    validate={[requiredField]} /> 
            </div>*/}
                {/* <div>
                <Field placeholder={"Password"} component={Input} name={'password'} type={'password'}
                    validate={[requiredField]} />
            </div>
            <div>
                <Field type={"checkbox"} component={Input} name={'rememberMe'} /> remember me
            </div> */}
                {props.error && <div className={cs.form_summary_error}>
                    {props.error}
                </div>}
                <div>
                    <button>Login</button>
                </div>
            </form>
        )
    }

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({ form: 'login' })(LoginForm)

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchPropsType = {
    loginTC: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type propsType = MapStatePropsType & MapDispatchPropsType

const Login: React.FC<propsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {                ///
        props.loginTC(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Navigate to={'/profile'} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}

let mapStateToProps = (state: GlobalStateType): MapStatePropsType => {
    return {
        isAuth: getIsAuthSR(state), // Пригодилась (этот же селектор в ProfileContainer)
        captchaUrl: state.auth.captchaUrl
    }
}
export default connect(mapStateToProps, { loginTC })(Login)