// ** Redux
import { createAsyncThunk } from '@reduxjs/toolkit'

// ** Service
import { changePasswordMe, registerAuth, updateAuthMe } from 'src/services/auth'

// ** Types
import { TChangePassword } from 'src/types/auth'

export const registerAuthAsync = createAsyncThunk('auth/register', async (data: any) => {
  const response = await registerAuth(data)

  if (response?.data) {
    return response
  }

  return {
    data: null,
    message: response?.response?.data?.message,
    typeError: response?.response?.data?.typeError
  }
})

export const updateAuthMeAsync = createAsyncThunk('auth/update-me', async (data: any) => {
  const response = await updateAuthMe(data)

  if (response?.data) {
    return response
  }

  return {
    data: null,
    message: response?.response?.data?.message,
    typeError: response?.response?.data?.typeError
  }
})

export const changePasswordMeAsync = createAsyncThunk('auth/change-password-me', async (data: TChangePassword) => {
  const response = await changePasswordMe(data)
  
  // console.log('response', { response })

  if (response?.status === 'Success') {
    return { ...response, data: 1 }
  }

  return {
    data: null,
    message: response?.response?.data?.message,
    typeError: response?.response?.data?.typeError
  }
})
