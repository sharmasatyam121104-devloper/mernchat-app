import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../components/utilities/axiosinstance";
import toast from "react-hot-toast";

//login user thunk code
export const loginUserThunk = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        password, // ✅ correct
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);


//register user thunk code
export const registerUserThunk = createAsyncThunk(
  "users/signup",
  async ({ fullname, email, password, gender }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/register", {
        fullname,
        email,
        password, 
        gender,
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
        console.log(errorMessage);
        
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);


//logout user thunk code
export const logoutUserThunk = createAsyncThunk(
  "users/logout",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/logout");
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Logout failed";
        console.log(errorMessage);
        
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);


//get-profile 
export const getUserProfileThunk  = createAsyncThunk(
  "users/getProfile",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/get-profile");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Logout failed";
        console.log(errorMessage);
        
      // toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getOtherUsersThunk = createAsyncThunk(
  "user/getOtherUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/get-other-users");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      // toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);
