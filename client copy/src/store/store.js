import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice/user.slice"; // ✅ default export ko import karo
import messageReducer from './slice/messageSlice/messageSlice.js'
import socketReducer from './slice/socket/socket.slice.js'

export const store = configureStore({
  reducer: {
    user: userReducer, // key naam "user" rakho, "userSlice" mat rakho
    messages: messageReducer,
    socketReducer:socketReducer,
  },
  middleware: (getDefaultMiddleware)=>(
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["socketReducer.socket"]
      }
    })
  )
});
