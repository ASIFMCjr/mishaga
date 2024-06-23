import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as adsAPI from '../api/index'
import { CreateAd, MyAd, UpdateAd } from './types';

const initialState: { ads: MyAd[], ad: MyAd | null, category: MyAd['category']} = {
    ads: [],
    ad: null,
    category: 'found'
}

export const fetchAds = createAsyncThunk(
  'events/fetchAds',
  async () => await adsAPI.getAds(),
)

export const fetchAdsByCategory = createAsyncThunk(
    'events/fetchAdsByCategory',
    async (category: string) => await adsAPI.getAdsByCategory(category),
  )

export const fetchAd = createAsyncThunk(
    'events/fetchAd',
    async (id: number) => await adsAPI.getAd(id),
)

export const fetchUpdateAd = createAsyncThunk(
    'events/fetchUpdateAd',
    async (props: {id: number, data: UpdateAd}) => {
        await adsAPI.updateAd(props.id, props.data)
        return await adsAPI.getAds()
    }
)

export const fetchUpdateAdImage = createAsyncThunk(
  'events/fetchUpdateAdImage',
  async (props: {id: number, formData: FormData}) => await adsAPI.sendAdPhoto(props.id, props.formData),
)

export const fetchDeleteAd = createAsyncThunk(
    'events/fetchDeleteAd',
    async (id: number) => {
        await adsAPI.deleteAd(id)
        return await adsAPI.getAds()
    }
)

export const fetchCreateAd = createAsyncThunk(
    'events/fetchCreateAd',
    async (data: CreateAd) => {
        await adsAPI.createAd(data)
        return await adsAPI.getAds()
    }
)

const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    clearAd: (state) => {state.ad = initialState.ad},
    setCategory: (state, action: PayloadAction<MyAd['category']>) => {state.category = action.payload}
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAds.fulfilled, (state, action) => {
      state.ads = action.payload
    }),
    builder.addCase(fetchAd.fulfilled, (state, action) => {
      state.ad = action.payload
    }),
    builder.addCase(fetchUpdateAd.fulfilled, (state, action) => {
      state.ads = action.payload
    }),
    builder.addCase(fetchCreateAd.fulfilled, (state, action) => {
      state.ads = action.payload
    }),
    builder.addCase(fetchAdsByCategory.fulfilled, (state, action) => {
      state.ads = action.payload
    })
  },
})

export const { clearAd, setCategory } = adsSlice.actions
export default adsSlice.reducer