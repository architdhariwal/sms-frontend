import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Asynchronous thunk to fetch students data from the API
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/students');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// console.log("student Dta",fetchStudents);

// Asynchronous thunk to register a student
export const registerStudent = createAsyncThunk(
  'students/registerStudent',
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await api.post('/students/register', studentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Asynchronous thunk to update a student
// export const updateStudent = createAsyncThunk(
//   'students/updateStudent',
//   async ({ admissionNumber, updatedData }, { rejectWithValue }) => {
//     try {
//       const response = await api.put(`/students/${admissionNumber}`, updatedData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async (updatedStudent, { rejectWithValue }) => {
    try {
      const response = await api.put(`/students/${updatedStudent.admissionNumber}`, updatedStudent);
      return response.data.student;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




// Asynchronous thunk to delete a student
export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (admissionNumber, { rejectWithValue }) => {
    try {
      await api.delete(`/students/${admissionNumber}`);
      return admissionNumber;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload);
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.students.findIndex(student => student.admissionNumber === action.payload.admissionNumber);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(student => student.admissionNumber !== action.payload);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentsSlice.reducer;

