import { axiosInstance } from "shared/api/interceptor"
import { CreateAd, MyAd, UpdateAd } from "../model/types"

export const getAds = async (): Promise<MyAd[]> => (await axiosInstance.get('ads')).data
export const getAdsByCategory = async (category: string): Promise<MyAd[]> => (await axiosInstance.get(`ads/${category}`)).data
export const getAd = async (id: number): Promise<MyAd> => (await axiosInstance.get(`ad/${id}`)).data
export const updateAd = async (id: number, data: UpdateAd): Promise<MyAd> => (await axiosInstance.patch(`ad/${id}`, data)).data
export const deleteAd = async (id: number): Promise<MyAd> => (await axiosInstance.delete(`ad/${id}`)).data
export const createAd = async (data: CreateAd): Promise<MyAd> => (await axiosInstance.post(`ads`, data)).data
export const sendAdPhoto = async (id: number, data: FormData): Promise<MyAd> => (await axiosInstance.post(`ads/photos/${id}`, data)).data