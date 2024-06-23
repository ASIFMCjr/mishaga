import { useState } from "react"
import { LoginForm } from "widgets/auth/loginForm"
import { SignUpForm } from "widgets/auth/signUpForm"
import background from 'assets/mishaga.jpg'
import { useAppSelector } from "shared/api/hooks"
import { isLogged } from "shared/model"

export const AuthPage = () => {
    const isAuth = useAppSelector(state => state.user.isAuth)
    const [isLogging, setIsLogging] = useState(false)
    return !isAuth || !isLogged.get() ? (
        <div className="h-full flex flex-row w-full">
            <div className="basis-2/5">
                {isLogging ? <LoginForm onChangeForm={() => setIsLogging(!isLogging)} /> : <SignUpForm onChangeForm={() => setIsLogging(!isLogging)} />}
            </div>
            <div className="basis-3/5 bg-center bg-no-repeat bg-cover flex flex-col justify-center" style={{ backgroundImage: `url(${background})` }}>
                <h1 className="text-yellow" >МЫЩага</h1>
                <p className="text-white">Закрытое акционерное общество</p>
            </div>
        </div>
    ) : <div>Loader</div>
}