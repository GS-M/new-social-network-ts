import { Field } from 'redux-form'
import cs from './FormsControl.module.css'

export const Textarea = ({ input, meta, ...props }) => {
    const showError = meta.touched && meta.error
    return (
        <div className={cs.form_control + " " + (showError ? cs.error : '')}>
            <textarea {...input} {...props} />
            <div>
                {showError && <span>{meta.error}</span>}
            </div>

        </div>
    )
}

export const Input = ({ input, meta, ...props }) => {
    const showError = meta.touched && meta.error
    return (
        <div className={cs.form_control + " " + (showError ? cs.error : '')}>
            <input {...input} {...props} />
            <div>
                {showError && <span>{meta.error}</span>}
            </div>

        </div>
    )
}

export const createField = (placeholder, component, name, validate, props = {}, text = '') => {
    return (
        <div>
            <Field placeholder={placeholder} component={component} name={name}
                validate={validate} {...props} />{text}
        </div>
    )
}