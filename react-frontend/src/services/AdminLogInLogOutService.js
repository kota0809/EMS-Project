// src/services/AdminServiceComponent.js
import axios from 'axios';

const BASE_URL = "http://localhost:7171/api/v1/admin"; // Adjust the port if necessary

class AdminServiceComponent {
  
  login(adminCredentials) {
    return axios.post(`${BASE_URL}/login`, adminCredentials,{ withCredentials: true });
  }

  changePassword(adminDetails) {
    return axios.post(`${BASE_URL}/change-password`, adminDetails,{ withCredentials: true });
  }
}

const adminServiceComponent = new AdminServiceComponent();


export { adminServiceComponent };
export default adminServiceComponent;

