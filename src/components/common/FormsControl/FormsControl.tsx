import { Field, WrappedFieldProps } from 'redux-form'
import { FieldValidatorType } from '../../../utils/validators/validators'
import cs from './FormsControl.module.css'

export const Textarea: React.FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
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

export const Input: React.FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
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
export function createField<FormsKeysType extends string>(
    placeholder: string | undefined,
    component: React.FC<WrappedFieldProps>,
    name: FormsKeysType,
    validate: Array<FieldValidatorType> | undefined,
    props = {},
    text = ''
) {
    return (
        <div>
            <Field placeholder={placeholder} component={component} name={name}
                validate={validate} {...props} />{text}
        </div>
    )
}
// export const createField = (placeholder: string | undefined,
//     component: React.FC<WrappedFieldProps>,
//     name: loginFormValuesTypeKeys,
//     validate: Array<FieldValidatorType> | undefined,
//     props = {}, text = '') => {
//     return (
//         <div>
//             <Field placeholder={placeholder} component={component} name={name}
//                 validate={validate} {...props} />{text}
//         </div>
//     )
// }