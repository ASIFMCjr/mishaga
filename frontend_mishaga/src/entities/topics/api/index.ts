import { axiosInstance } from "shared/api/interceptor"
import { CreateTopic, Topic, TopicFilters } from "../model/types"

export const getTopicsCategories = async (): Promise<Array<string>> => (await axiosInstance.get('topic/categories')).data
export const getTopics = async (): Promise<{ category: 'Основная' | 'Знакомства' | 'Учеба', topics: Topic[] }[]> => (await axiosInstance.get('topics')).data
export const getTopicsFiltered = async (filtering: TopicFilters): Promise<{ category: 'Основная' | 'Знакомства' | 'Учеба', topics: Topic[] }[]> => (await axiosInstance.get('topics')).data
export const getTopic = async (id: number): Promise<Topic> => (await axiosInstance.get(`topics/${id}`)).data
export const deleteTopic = async (id: number): Promise<Topic> => (await axiosInstance.delete(`topics/${id}`)).data
export const createTopic = async (data: CreateTopic): Promise<Topic> => (await axiosInstance.post('topics', {data})).data
export const changeCountTopic = async (data: {sign: '+' | '-', id: number}): Promise<Topic> => (await axiosInstance.post('topic/changeCount', {data})).data