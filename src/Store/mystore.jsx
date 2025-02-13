
import { configureStore } from '@reduxjs/toolkit'
import  UserSlice  from './UserSlice'
import  SocketSlice  from './SocketSlice'

export const mystore = configureStore({
  reducer: {
    user:UserSlice,
    socket:SocketSlice
  },
})