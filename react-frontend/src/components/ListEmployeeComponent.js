import React,{Component} from 'react';
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';

class ListEmployeeComponent extends Component{

    constructor(props){
        super(props)
        this.state ={employees:[],
            welcomeMessage:this.props.location?.state?.message ||"" // Get welcome message from location state
        }
    }
    componentDidMount(){
        EmployeeService.getEmployees().then((res)=>
    {
        this.setState({employees:res.data})
    });

    if (this.state.welcomeMessage) {
        setTimeout(() => {
            this.setState({ welcomeMessage: "" });
        }, 2000);
    }
}
    deleteEmployeeBYId=(employeeId)=>{
        EmployeeService.deleteEmployeeById(employeeId).then((res)=>{
            EmployeeService.getEmployees().then((res)=>{
                this.setState({employees:res.data})
            })
        })
        .catch(error=>{
            console.log(error);
        })

    }
    render(){
        return(
            <div>
                <h2 className='text-center'>Employee List</h2>

                {this.state.welcomeMessage && (
          <div className="alert alert-success" role="alert">
            {this.state.welcomeMessage}
          </div>
        )}
            <div className='row'>
                <Link to="/add-employee" className='btn btn-primary'>Add Employee</Link>
                <table className='table mt-3 table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.employees.map(employee=>
                                <tr key={employee.id}>
                                      <td>{employee.id}</td>
                                      <td>{employee.firstName}</td>
                                      <td>{employee.lastName}</td>
                                      <td>{employee.email}</td>
                                      <td>
                                        <Link to={`/update-employee/${employee.id}`} className="btn btn-info">Update</Link>
                                        <button className='btn btn-danger mx-2' onClick={()=>this.deleteEmployeeBYId(employee.id )}>Delete</button>
                                      </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>        
      </div>
        )
    }
}

export default ListEmployeeComponent;