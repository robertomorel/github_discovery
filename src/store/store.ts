import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { rootReducer } from './slices'

export const store = configureStore({
  reducer: rootReducer,
})

export type GlobalState = ReturnType<typeof store.getState>

export type AppThunk = ThunkAction<void, GlobalState, unknown, Action<string>>

export type ActionDispatch = typeof store.dispatch

export const useActionDispatch = () => useDispatch<ActionDispatch>()
