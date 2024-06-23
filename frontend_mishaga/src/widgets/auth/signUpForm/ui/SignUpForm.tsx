import { AuthOutlet, Button } from "shared/ui"
import { AuthForm as Form, authFieldsType } from "entities/forms"
import { AuthFormsType } from "shared/model"
import { serializeFields } from "features/auth"
import { useAppDispatch } from "shared/api/hooks"
import { fetchSignUp } from "features/auth/model/authSlice"
import { setIsAuth } from "entities/user/model/userSlice"
import { useNavigate } from "@tanstack/react-router"

export const SignUpForm: React.FC<AuthFormsType> = ({ onChangeForm }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate({from: '/auth'})
    const fields: authFieldsType = [
        {
            placeholder: 'ФИО',
            required: true,
            identifier: 'fio',
            value: ''
        },
        {
            placeholder: 'Пароль',
            required: true,
            type: 'password',
            identifier: 'password',
            value: ''
        },
        {
            placeholder: 'Почта',
            type: 'email',
            required: true,
            identifier: 'email',
            value: ''
        },
        {
            placeholder: 'Город',
            required: true,
            identifier: 'city',
            value: ''
        },
        {
            placeholder: 'Общежитие',
            required: true,
            identifier: 'community',
            value: ''
        },
        {
            placeholder: 'Номер комнаты',
            required: false,
            identifier: 'room',
            value: ''
        },
    ]

    const onSubmit = async ({ fieldsArray: fields }: { fieldsArray: authFieldsType}) => {
        const newFields = serializeFields(fields)
        try {
            await dispatch(fetchSignUp(newFields))
            await dispatch(setIsAuth(true))
            navigate({ to: '/topics'})
        } catch (err) {
            throw new Error
        }
    }

    return (
        <AuthOutlet text="Уже зарегистрированы?" heading="Регистрация" onChangeForm={onChangeForm}>
            <Form fieldsArray={fields} onSubmit={onSubmit}>
                <Button submit text="Зарегистрироваться"/>
            </Form>
        </AuthOutlet>
    )
}