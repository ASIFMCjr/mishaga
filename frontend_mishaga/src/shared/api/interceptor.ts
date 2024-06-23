import axios from "axios";
import { store } from "app/store";
import { setIsAuth } from "entities/user/model/userSlice";
import { getToken, refreshTokens } from "./tokens";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
});
  

axiosInstance.interceptors.request.use((config) => {
    const accessToken = getToken()
	const auth = accessToken ? `Bearer ${accessToken}` : ''
	config.headers['Authorization'] = auth
	store.dispatch(setIsAuth(true))
    return config;
  }, (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use((response) => {
    store.dispatch(setIsAuth(true))
    return response;
  }, async (error) => {
    if (
        error.response.status === 401
    ) {
        return await refreshTokens()
    }
    return Promise.reject(error);
  });