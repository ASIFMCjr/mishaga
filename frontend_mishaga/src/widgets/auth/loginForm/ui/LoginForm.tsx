import { AuthOutlet, Button } from "shared/ui"
import { AuthForm as Form, authFieldsType } from "entities/forms"
import { AuthFormsType, isLogged } from "shared/model"
import { serializeFields } from "features/auth"
import { fetchLogin } from "features/auth/model/authSlice"
import { setIsAuth } from "entities/user/model/userSlice"
import { useAppDispatch } from "shared/api/hooks"
import { useNavigate } from "@tanstack/react-router"

export const LoginForm: React.FC<AuthFormsType> = ({ onChangeForm }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const fields: authFieldsType = [
        {
            placeholder: 'Почта',
            type: 'email',
            required: true,
            identifier: 'email',
            value: ''
        },
        {
            placeholder: 'Пароль',
            type: 'password',
            required: true,
            identifier: 'password',
            value: ''
        }
    ]

    const onSubmit = async ({ fieldsArray: fields }: { fieldsArray: authFieldsType}) => {
        const newFields = serializeFields(fields)
        try {
            await dispatch(fetchLogin(newFields))
            await dispatch(setIsAuth(true))
            if (isLogged.get()) navigate({ to: '/topics'})
        } catch (err) {
            throw new Error
        }
    }
    return (
        <AuthOutlet text="Ещё не зарегистрированы?" heading="Авторизация" onChangeForm={onChangeForm}>
            <Form fieldsArray={fields} onSubmit={onSubmit}>
                <Button submit text="Войти"/>
            </Form>
        </AuthOutlet>
    )
}