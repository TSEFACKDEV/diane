import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  mobileMenuOpen:    boolean
  resourceFilter:    { type: string; theme: string; language: string }
  directoryFilter:   { country: string; sector: string }
  searchQuery:       string
}

const initialState: UiState = {
  mobileMenuOpen:  false,
  resourceFilter:  { type: '', theme: '', language: '' },
  directoryFilter: { country: '', sector: '' },
  searchQuery:     '',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu(state) { state.mobileMenuOpen = !state.mobileMenuOpen },
    closeMobileMenu(state)  { state.mobileMenuOpen = false },
    setResourceFilter(state, action: PayloadAction<Partial<UiState['resourceFilter']>>) {
      state.resourceFilter = { ...state.resourceFilter, ...action.payload }
    },
    setDirectoryFilter(state, action: PayloadAction<Partial<UiState['directoryFilter']>>) {
      state.directoryFilter = { ...state.directoryFilter, ...action.payload }
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
    },
  },
})

export const {
  toggleMobileMenu, closeMobileMenu,
  setResourceFilter, setDirectoryFilter, setSearchQuery,
} = uiSlice.actions
export default uiSlice.reducer