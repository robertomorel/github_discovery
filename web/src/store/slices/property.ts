import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PropertyProps } from '../../types'

export interface PropertyState {
  property: PropertyProps[] | undefined
  loading: boolean
  error: string | null
}

export const propertyInitialState: PropertyState = {
  property: undefined,
  loading: false,
  error: null,
}

export const propertySlice = createSlice({
  name: 'property',
  initialState: propertyInitialState,
  reducers: {
    actionRequestPropertyStart: (state: PropertyState) => {
      state.loading = true
    },
    actionCreateNewPropertySuccess: (state, action: PayloadAction<PropertyProps[] | undefined>) => {
      state.property = action.payload || undefined
      state.loading = false
      state.error = null
    },
    actionCreateNewPropertyFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    actionFetchPropertyListSuccess: (state, action: PayloadAction<PropertyProps[] | undefined>) => {
      state.property = action.payload || undefined
      state.loading = false
      state.error = null
    },
    actionFetchPropertyListFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  actionRequestPropertyStart,
  actionCreateNewPropertySuccess,
  actionCreateNewPropertyFailure,
  actionFetchPropertyListSuccess,
  actionFetchPropertyListFailure,
} = propertySlice.actions
