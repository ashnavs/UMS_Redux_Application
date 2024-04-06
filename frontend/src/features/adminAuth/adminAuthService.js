import axios from 'axios';
const API_URL = '/api/admin/'

//login admin
const loginAdmin = async(adminData)=>{
    const response = await axios.post(API_URL + 'login',adminData);

    if(response.data){
        console.log(response.data,'admindata service');
        localStorage.setItem('admin',JSON.stringify(response.data))
    }
    return response.data
}

//Logout admin
export const logoutAdmin = () => {
    localStorage.removeItem('admin')
}

const adminAuthService = {
    loginAdmin,
    logoutAdmin
}

export default adminAuthService