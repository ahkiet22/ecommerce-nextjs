// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import { changePasswordMeAsync, registerAuthAsync, updateAuthMeAsync } from './actions'

// ** Types
import { UserDataType } from 'src/contexts/types'

type TInitialData = {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  message: string
  typeError: string
  isSuccessUpdateMe: boolean
  isErrorUpdateMe: boolean
  messageUpdateMe: string
  isSuccessChangePassword: boolean
  isErrorChangePassword: boolean
  messageChangePassword: string
  userData: UserDataType | null
}

const initialState: TInitialData = {
  isLoading: false,
  isSuccess: true,
  isError: false,
  message: '',
  typeError: '',
  isSuccessUpdateMe: true,
  isErrorUpdateMe: false,
  messageUpdateMe: '',
  isSuccessChangePassword: false,
  isErrorChangePassword: true,
  messageChangePassword: '',
  userData: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetInitialState: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = ''
      state.typeError = ''
      state.isSuccessUpdateMe = false
      state.isErrorUpdateMe = true
      state.messageUpdateMe = ''
      state.isSuccessChangePassword = false
      state.isErrorChangePassword = true
      state.messageChangePassword = ''
    }
  },
  extraReducers: builder => {
    // ** register
    builder.addCase(registerAuthAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(registerAuthAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = !!action.payload?.data?.email
      state.isError = !action.payload?.data?.email
      state.message = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(registerAuthAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = ''
      state.typeError = ''
    })

    // ** update me
    builder.addCase(updateAuthMeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateAuthMeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessUpdateMe = !!action.payload?.data?.email
      state.isErrorUpdateMe = !action.payload?.data?.email
      state.messageUpdateMe = action.payload?.message
      state.typeError = action.payload?.typeError
      state.userData = action.payload.data
    })
    builder.addCase(updateAuthMeAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isSuccessUpdateMe = false
      state.isErrorUpdateMe = true
      state.messageUpdateMe = ''
      state.typeError = ''
      state.userData = null
    })

    // ** change password me
    builder.addCase(changePasswordMeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(changePasswordMeAsync.fulfilled, (state, action) => {
      // console.log('action', { action })
      state.isLoading = false
      state.isSuccessChangePassword = !!action.payload?.data
      state.isErrorChangePassword = !action.payload?.data
      state.messageChangePassword = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(changePasswordMeAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isSuccessChangePassword = false
      state.isErrorChangePassword = true
      state.messageChangePassword = ''
      state.typeError = ''
    })
  }
})

export const { resetInitialState } = authSlice.actions

export default authSlice.reducer
