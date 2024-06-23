import { configureStore } from '@reduxjs/toolkit'
import adsSlice from 'entities/ads/model/adsSlice'
import eventSlice from 'entities/events/model/eventSlice'
import topicSlice from 'entities/topics/model/topicSlice'
import userSlice from 'entities/user/model/userSlice'
import authSlice from 'features/auth/model/authSlice'
import sharedSlice from 'shared/model/sharedSlice'
// ...

export const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    events: eventSlice,
    ads: adsSlice,
    topics: topicSlice,
    shared: sharedSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch