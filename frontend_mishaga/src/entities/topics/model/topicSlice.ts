import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as topicAPI from '../api/index'
import { CreateTopic, Topic, TopicFilters } from './types';

const initialState: { topics: { category: 'Основная' | 'Знакомства' | 'Учеба', topics: Topic[] }[], topic: Topic | null, categories: string[]} = {
    topics: [],
    topic: null,
    categories: []
}

export const fetchTopicsCategories = createAsyncThunk(
  'events/fetchTopicsCategories',
  async () => await topicAPI.getTopicsCategories(),
)

export const fetchTopics = createAsyncThunk(
  'events/fetchTopics',
  async () => await topicAPI.getTopics(),
)

export const fetchTopicsFiltered = createAsyncThunk(
    'events/fetchTopicsFiltered',
    async (filtering: TopicFilters) => await topicAPI.getTopicsFiltered(filtering),
  )

export const fetchTopic = createAsyncThunk(
    'events/fetchTopic',
    async (id: number) => await topicAPI.getTopic(id),
)

export const fetchDeleteTopic = createAsyncThunk(
    'events/fetchDeleteTopic',
    async (id: number) => {
        await topicAPI.deleteTopic(id)
        return await topicAPI.getTopics()
    }
)

export const fetchCreateTopic = createAsyncThunk(
    'events/fetchCreateTopic',
    async (data: CreateTopic) => {
        await topicAPI.createTopic(data)
        return await topicAPI.getTopics()
    }
)

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    clearTopic: (state) => {state.topic = initialState.topic}
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopics.fulfilled, (state, action) => {
      state.topics = action.payload
    }),
    builder.addCase(fetchTopicsCategories.fulfilled, (state, action) => {
      state.categories = action.payload
    }),
    builder.addCase(fetchTopicsFiltered.fulfilled, (state, action) => {
        state.topics = action.payload
      }),
    builder.addCase(fetchTopic.fulfilled, (state, action) => {
      state.topic = action.payload
    }),
    builder.addCase(fetchCreateTopic.fulfilled, (state, action) => {
      state.topics = action.payload
    }),
    builder.addCase(fetchDeleteTopic.fulfilled, (state, action) => {
      state.topics = action.payload
    })
  },
})

export const { clearTopic } = topicSlice.actions
export default topicSlice.reducer