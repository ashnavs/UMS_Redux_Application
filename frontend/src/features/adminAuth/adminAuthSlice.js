import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adminAuthService from './adminAuthService'

//get user from localstorage
const admin = JSON.parse(localStorage.getItem('admin'))

const initialState = {
    admin: admin ? admin : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Logout admin
export const logoutAdmin = createAsyncThunk('adminAuth/logout',
 async()=>{
    await adminAuthService.logoutAdmin()
 })

export const loginAdmin = createAsyncThunk('adminAuth/login', async (admin, thunkAPI) => {
    try {
        console.log('slice/////',admin);
        return await adminAuthService.loginAdmin(admin)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.admin = action.payload
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.admin = action.payload;
            })

            //
            .addCase(logoutAdmin.fulfilled,(state)=>{
                state.admin = null
            })
    },
})

export const { reset } = adminAuthSlice.actions
export default adminAuthSlice.reducer