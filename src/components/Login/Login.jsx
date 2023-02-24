import { connect } from "react-redux"
import { reduxForm } from "redux-form"
import { requiredField } from "../../utils/validators/validators"
import { createField, Input } from "../common/FormsControl/FormsControl"
import { loginTC } from "../../redux/authReduser"
import { Navigate } from "react-router-dom"
import cs from "../common/FormsControl/FormsControl.module.css"
import { getIsAuthSR } from "../../utils/resecelectors/profile-selectors"

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>

            {createField('Email', Input, 'email', [requiredField])}
            {createField('Password', Input, 'password', [requiredField], { type: 'password' })}
            {createField(null, Input, 'rememberMe', null, { type: 'checkbox' }, 'remember me')}

            {props.captchaUrl && <img alt='Captcha' src={props.captchaUrl} />}
            {props.captchaUrl &&
                createField('Captcha', Input, 'captcha', [requiredField], null, null)}
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

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
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

let mapStateToProps = (state) => {
    return {
        isAuth: getIsAuthSR(state), // Пригодилась (этот же селектор в ProfileContainer)
        captchaUrl: state.auth.captchaUrl
    }
}
export default connect(mapStateToProps, { loginTC })(Login)