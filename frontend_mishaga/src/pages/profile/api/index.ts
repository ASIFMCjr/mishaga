import { axiosInstance } from "shared/api/interceptor"

export const sendPhoto = async (formData: FormData) => (await axiosInstance.post('users/photo', formData, { headers: {'Content-Type': `multipart/form-data`}})).data
export const getPhoto = async () => (await axiosInstance.get('users/photo'))