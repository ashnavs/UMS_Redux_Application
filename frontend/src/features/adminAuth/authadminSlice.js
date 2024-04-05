import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authadminService from '../adminAuth/authadminService'


// //get admin from localstorage
const admin = JSON.parse(localStorage.getItem('admin'))

const initialState = {
    admin: admin ? admin : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//  //Login admin
 export const adminlogin = createAsyncThunk('authadmin/adminlogin', async(admin,thunkAPI)=>{
    try {
      console.log(admin);
      return await authadminService.adminlogin(admin)
    } catch (error) {
      console.log("abcccc");
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }      
}) 

export const adminReducer = createSlice({
    name:'authadmin',
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
        .addCase(adminlogin.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(adminlogin.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.admin = action.payload
        })
        .addCase(adminlogin.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.admin = null
    })
    
    
},
})


export const{reset} = adminReducer.actions
export default adminReducer.reducer