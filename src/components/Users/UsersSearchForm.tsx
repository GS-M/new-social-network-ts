import { Field, Form, Formik } from 'formik';
import { FilterType } from '../../redux/usersReduser';
import React from 'react'

const usersSearchFormValidate = (values: any) => { ////
    const errors = {};
    return errors;
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (values: FilterType,
        { setSubmitting }: { setSubmitting: (isSubmit: boolean) => void }) => {
        props.onFilterChanged(values)
        setSubmitting(false)
    }
    return (
        <div>
            <Formik
                initialValues={{ term: '', }}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />

                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})