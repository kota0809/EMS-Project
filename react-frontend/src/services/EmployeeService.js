import axios from 'axios';

const EMPLOYEE_API_BASE_URL="http://localhost:7171/api/v1/employees";
const EMPLOYEE_API_ADD_URL = "http://localhost:7171/api/v1/addEmployee";
const Employee_API_GETBYID_URL ="http://localhost:7171/api/v1/getEmployeeById";
const Employee_API_UPDATEBYID_URL ="http://localhost:7171/api/v1/updateEmployeeById";
const Employee_API_DELETEBYID_URL ="http://localhost:7171/api/v1/deleteEmployeeById";
class EmployeeService{

 	getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    	}

	createEmployee(employee){
		return axios.post(EMPLOYEE_API_ADD_URL, employee);

	}

	getEmployeeById(employeeId){
		return axios.get(Employee_API_GETBYID_URL+"/"+employeeId)
	}

	updateEmployeeById(employeeId, employee){
		return axios.put(Employee_API_UPDATEBYID_URL+"/"+employeeId,employee );
	}

	deleteEmployeeById(employeeId){
		return axios.delete(Employee_API_DELETEBYID_URL+"/"+employeeId)
	}
}
const employeeService = new EmployeeService();

// Export the instance as named and default exports
export { employeeService };
export default  employeeService;
