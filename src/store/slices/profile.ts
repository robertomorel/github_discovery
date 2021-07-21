import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ProfileProps } from '../../types'

export interface ProfileState {
  profile: ProfileProps[] | undefined
  loading: boolean
  error: string | null
}

export const profileInitialState: ProfileState = {
  profile: undefined,
  loading: false,
  error: null,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState: profileInitialState,
  reducers: {
    actionRequestProfileStart: (state: ProfileState) => {
      state.loading = true
    },
    actionCreateNewProfileSuccess: (state, action: PayloadAction<ProfileProps[] | undefined>) => {
      state.profile = action.payload || undefined
      state.loading = false
      state.error = null
    },
    actionCreateNewProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    actionFetchProfileListSuccess: (state, action: PayloadAction<ProfileProps[] | undefined>) => {
      state.profile = action.payload || undefined
      state.loading = false
      state.error = null
    },
    actionFetchProfileListFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  actionRequestProfileStart,
  actionCreateNewProfileSuccess,
  actionCreateNewProfileFailure,
  actionFetchProfileListSuccess,
  actionFetchProfileListFailure,
} = profileSlice.actions
