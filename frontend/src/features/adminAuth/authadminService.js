import axios from 'axios';
const API_URL = '/api/admin/'

//Login admin
const adminlogin = async (adminData) => {
    console.log(adminData);
    const response = await axios.post(API_URL + 'login', adminData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const authadminService = {
    adminlogin
  
}

export default authadminService