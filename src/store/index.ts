import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import authSlice     from './slices/authSlice'
import uiSlice       from './slices/uiSlice'
import diagnosticSlice from './slices/diagnosticSlice'

export const store = configureStore({
  reducer: {
    auth:       authSlice,
    ui:         uiSlice,
    diagnostic: diagnosticSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState   = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector