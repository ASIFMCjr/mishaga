import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as eventAPI from '../api/index'
import { CreateEvent, MyEvent, MyEventWithUser, UpdateEvent } from './types';

const initialState: { events: MyEvent[], event: MyEventWithUser | null} = {
    events: [],
    event: null
}

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async () => await eventAPI.getEvents(),
)

export const fetchEvent = createAsyncThunk(
    'events/fetchEvent',
    async (id: number) => await eventAPI.getEvent(id),
)

export const fetchAddUserToEvent = createAsyncThunk(
    'events/fetchAddUserToEvent',
    async (id: number) => await eventAPI.addUserToEvent(id)
)

export const fetchUpdateEvent = createAsyncThunk(
    'events/fetchUpdateEvent',
    async (props: {id: number, data: UpdateEvent}) => {
        await eventAPI.updateEvent(props.id, props.data)
        return await eventAPI.getEvents()
    }
)

export const fetchUpdateEventImage = createAsyncThunk(
  'events/fetchUpdateEventImage',
  async (props: {id: number, formData: FormData}) => await eventAPI.sendEventPhoto(props.id, props.formData),
)

export const fetchDeleteEvent = createAsyncThunk(
    'events/fetchDeleteEvent',
    async (id: number) => {
        await eventAPI.deleteEvent(id)
        return await eventAPI.getEvents()
    }
)

export const fetchCreateEvent = createAsyncThunk(
    'events/fetchCreateEvent',
    async (data: CreateEvent) => {
        await eventAPI.createEvent(data)
        return await eventAPI.getEvents()
    }
)

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearEvent: (state) => {state.event = initialState.event}
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload
    }),
    builder.addCase(fetchEvent.fulfilled, (state, action) => {
      state.event = action.payload
    }),
    builder.addCase(fetchAddUserToEvent.fulfilled, (state, action) => {
      state.event = action.payload
    }),
    builder.addCase(fetchUpdateEvent.fulfilled, (state, action) => {
      state.events = action.payload
    }),
    builder.addCase(fetchCreateEvent.fulfilled, (state, action) => {
      state.events = action.payload
    })
  },
})

export const { clearEvent } = eventSlice.actions
export default eventSlice.reducer