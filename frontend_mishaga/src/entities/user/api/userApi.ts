import { axiosInstance } from "shared/api/interceptor";
import { UpdateUser, User } from "../model/userSlice";

export const getUser = async (): Promise<User> => (await axiosInstance.get('users/me')).data
export const updateUser = async (data: UpdateUser): Promise<User> => (await axiosInstance.patch('users', { data })).data