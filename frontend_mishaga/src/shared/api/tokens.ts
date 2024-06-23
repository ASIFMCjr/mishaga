import { store } from "app/store"
import { setIsAuth } from "entities/user/model/userSlice"
import { Tokens } from "shared/model"
import { axiosInstance } from "./interceptor"

export const getToken = () => localStorage.getItem('accessToken') || ''
export const refreshTokens = async (): Promise<string> => {
    try {
        const { accessToken }  = (await axiosInstance.get<Tokens>('auth/refresh')).data
        localStorage.setItem('accessToken', accessToken)
        return accessToken
    }
    catch (err) {
        localStorage.setItem('accessToken', '')
        store.dispatch(setIsAuth(false))
        return ''
    }
}