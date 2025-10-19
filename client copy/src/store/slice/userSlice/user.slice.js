import { createSlice } from "@reduxjs/toolkit";
import {
  getOtherUsersThunk,
  getUserProfileThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
} from "./user.thunk";

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  user: null,
  userProfile: null,
  buttonLoading: false,
  screenLoading: true,
  otherUsers: [],
  selectedUsers:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectUser: (state,action)=>{
     state.selectedUsers = action.payload;
    },
    Login: (state) => {
      state.isAuthenticated = true;
      console.log("User logged in via reducer");
    },
    Logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.userProfile = null;
      console.log("User logged out via reducer");
    },
  },
  extraReducers: (builder) => {
    // ✅ LOGIN
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.buttonLoading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.buttonLoading = false;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.buttonLoading = false;
      });

    // ✅ REGISTER
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.buttonLoading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.buttonLoading = false;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
        state.buttonLoading = false;
      });

    // ✅ LOGOUT
    builder
      .addCase(logoutUserThunk.pending, (state) => {
        state.buttonLoading = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.userProfile = null;
        state.isAuthenticated = false;
        state.buttonLoading = false;
        state.selectedUsers=null;
        state.otherUsers=null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
        state.buttonLoading = false;
      });

    // get user profile
    builder.addCase(getUserProfileThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.screenLoading = false;
      state.userProfile = action.payload?.responseData;
      // console.log(userProfile);
    });
    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });

    // get other users
    builder.addCase(getOtherUsersThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.otherUsers = action.payload?.responseData;
    });
    builder.addCase(getOtherUsersThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });
  },
});

export const { Login, Logout,setSelectUser } = userSlice.actions;
export default userSlice.reducer;
