import { axiosInstance } from "shared/api/interceptor";
import { CreateEvent, UpdateEvent, MyEvent, MyEventWithUser } from "../model/types";

export const getEvents = async (): Promise<MyEvent[]> => (await axiosInstance.get('events')).data
export const getEvent = async (id: number): Promise<MyEvent | MyEventWithUser> => (await axiosInstance.get(`events/${id}`)).data
export const createEvent = async (data: CreateEvent): Promise<MyEvent> => (await axiosInstance.post('events', { data })).data
export const updateEvent = async (id: number, data: UpdateEvent): Promise<MyEvent> => (await axiosInstance.patch(`events/${id}`, { data })).data
export const deleteEvent = async (id: number): Promise<MyEvent> => (await axiosInstance.delete(`events/${id}`)).data
export const addUserToEvent = async (id: number): Promise<MyEventWithUser> => (await axiosInstance.get(`events/addUser/${id}`)).data
export const sendEventPhoto = async (id: number ,formData: FormData) => (await axiosInstance.post(`events/photo/${id}`, formData, { headers: {'Content-Type': `multipart/form-data`}})).data