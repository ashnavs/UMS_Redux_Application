import axios from 'axios';

// import axiosInstance from '../../api/axiosInstance';

const API_URL = '/api/user/'

// // API URL for refreshing tokens
// const REFRESH_TOKEN_URL = '/api/auth/refresh';

// // Function to refresh access token
// const refreshToken = async (refreshToken) => {
//   try {
//     // Make a POST request to the refresh token endpoint
//     const response = await axios.post(REFRESH_TOKEN_URL, { refreshToken });

//     // Extract the new access token from the response
//     const newAccessToken = response.data.accessToken;

//     // Optionally, update the stored access token in localStorage or wherever it's stored
//     localStorage.setItem('accessToken', newAccessToken);

//     // Return the new access token
//     return newAccessToken;
//   } catch (error) {
//     // Handle token refresh failure
//     console.error('Token refresh failed:', error);
//     throw error; // Rethrow the error to be handled by the caller
//   }
// };


//Register user
const register = async (userData) => {
    console.log(userData);
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Login user
const login = async (userData) => {
    console.log(userData);
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Update user
const updateProfile = async(userId,userData,token)=>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    console.log("002",userId,userData,token);
    const response = await axios.put(API_URL + 'me/' + userId , userData , config)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}
// const updateProfile = async (userId, userData, token) => {
//     try {
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         };

//         const response = await axiosInstance.put(`/user/${userId}`, userData, config);
//         localStorage.setItem('user', JSON.stringify(response.data)); // Update user data in localStorage if necessary
//         return response.data;
//     } catch (error) {
//         // Handle errors, including token refresh errors
//         if (error.response && error.response.status === 401) {
//             try {
//                 // Attempt to refresh the token
//                 const newToken = await refreshToken(token);
//                 // Retry the request with the new token
//                 return updateProfile(userId, userData, newToken);
//             } catch (refreshError) {
//                 // Handle refresh failure, e.g., redirect to login page
//                 console.error('Token refresh failed:', refreshError);
//                 throw refreshError;
//             }
//         } else {
//             // Handle other errors
//             console.error('Error updating profile:', error);
//             throw error;
//         }
//     }
// };

//Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login,
    updateProfile,
  
}

export default authService