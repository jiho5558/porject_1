import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { userTotalGetApi } from "../apis/user.api"

export const userTotalGetSlice = createAsyncThunk( //Thunk , 외부API
    "userTotalGetSlice" ,
    async(_, thunkApi) => {
        try{
            // const payload = await userTotalGetApi()
            // return payload
            return await userTotalGetApi() //덩크가 알아서 payload를 해줌
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
            
        }
    }
)

  const initialState = {
      users: [],
      username: '',
      isLogin: false,
      loading : false,
      error : false

  }

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers:{
        login:(state, action)=>{
            state.username = action.payload
            state.isLogin = true
        },
        register: (state, action)=>{
            state.users = [
                ...state.users,
                {
                    id: action.payload.id,
                    username: action.payload.user.username,
                    password: action.payload.user.password
                }
            ]
        },
        logout: (state) => {
            state.isLogin = false,
            state.username = ""
        }
    },
    extraReducers : (builder)=> { // API를 받는 설정
        builder
            .addCase(userTotalGetSlice.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(userTotalGetSlice.fulfilled, (state, action) => {
                state.users = action.payload
                state.loading = false
            })
            .addCase(userTotalGetSlice.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

 export const {login, register, logout} = userSlice.actions;
 export default userSlice.reducer;