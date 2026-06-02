import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userLoginApi, userRegisterApi } from "../apis/user.api";

export const userLoginThunk = createAsyncThunk(
  "user/userLoginThunk",
  async (userObj, thunkApi) => {
    try {
      const user = await userLoginApi(userObj);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const userRegisterThunk = createAsyncThunk(
  "user/userRegisterThunk",
  async (userObj, thunkApi) => {
    try {
      const user = await userRegisterApi(userObj);
      return user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

export const getUser = () => {
  return localStorage.getItem("user") 
}

const initialState = {
  users: [],
  user: null,
  isLogin: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    logout: (state) => {
      state.isLogin = false;
      state.user = null;
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(userLoginThunk.fulfilled, (state, action) => {
        const user = getUser();
        console.log("user", user);
        console.log("confirmuser", action.payload);
        state.loading = false;
      })

      .addCase(userLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(userRegisterThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(userRegisterThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })

      .addCase(userRegisterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export const userLogoutSlice = logout;

export default userSlice.reducer;

