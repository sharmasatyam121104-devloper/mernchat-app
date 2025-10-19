import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const initialState = {
  socket: null,      // non-serializable, warning ayega in dev
  onlineUser: null,  // online user ids array
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    initializeSocket: (state, action) => {
      const socket = io("http://localhost:8787", {
        query: { userId: action.payload }, // userId bhej rahe
        transports: ["websocket"],         // websocket ensure
      });

      state.socket = socket;
    },

    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload; // array of online user ids
    },
  },
});

export const { initializeSocket, setOnlineUser } = socketSlice.actions;
export default socketSlice.reducer;
