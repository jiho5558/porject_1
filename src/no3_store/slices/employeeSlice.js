import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  employeeAllGetApi,
  employeeAllPostApi,
  employeeAllPutApi,
  employeeDeleteApi
} from "../apis/employee.api";

// 전체 조회
export const employeeAllGetSlice = createAsyncThunk(
  "employeeAllGetSlice",
  async (_, thunkAPI) => {
    try {
      return await employeeAllGetApi();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 등록
export const employeeAllPostSlice = createAsyncThunk(
  "employeeAllPostSlice",
  async (dataobj, thunkAPI) => {
    try {
      return await employeeAllPostApi(dataobj);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 수정
export const employeeAllPutSlice = createAsyncThunk(
  "employeeAllPutSlice",
  async (dataobj, thunkAPI) => {
    try {
      return await employeeAllPutApi(dataobj);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 삭제
export const employeeDeleteSlice = createAsyncThunk(
  "employeeDeleteSlice",
  async (id, thunkAPI) => {
    try {
      await employeeDeleteApi(id);
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialEmp = {
  id: "",
  name: "",
  email: "",
  job: "",
  pay: ""
};

const initialState = {
  empTable: [],
  emp: initialEmp,
  mode: "",
  selectedId: "",
  loading: false,
  error: null
};

const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState,

  reducers: {
    select: (state, action) => {
      state.selectedId = action.payload;
    },

    setEmp: (state, action) => {
      state.emp = action.payload;
    },

    update: (state, action) => {
      state.empTable = state.empTable.map((emp) =>
        emp.id === state.selectedId ? action.payload : emp
      );
    },

    remove: (state) => {
      state.empTable = state.empTable.filter(
        (emp) => emp.id !== state.selectedId
      );
    },

    setMode: (state, action) => {
      state.mode = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder

      // GET
      .addCase(employeeAllGetSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(employeeAllGetSlice.fulfilled, (state, action) => {
        state.empTable = action.payload;
        state.loading = false;
      })
      .addCase(employeeAllGetSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // POST
      .addCase(employeeAllPostSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(employeeAllPostSlice.fulfilled, (state, action) => {
        state.empTable = [...state.empTable, action.payload];
        state.loading = false;
      })
      .addCase(employeeAllPostSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PUT
      .addCase(employeeAllPutSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(employeeAllPutSlice.fulfilled, (state, action) => {
        state.empTable = state.empTable.map((emp) =>
          emp.id === action.payload.id ? action.payload : emp
        );
        state.loading = false;
      })
      .addCase(employeeAllPutSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(employeeDeleteSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(employeeDeleteSlice.fulfilled, (state, action) => {
        state.empTable = state.empTable.filter(
          (emp) => emp.id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(employeeDeleteSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  setMode,
  remove,
  update,
  select,
  setEmp
} = employeeSlice.actions;

export default employeeSlice.reducer;