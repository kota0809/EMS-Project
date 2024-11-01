import React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import employeeService from "../services/EmployeeService";
export default function UpdateEmployeeComponent()
{
    let navigate=useNavigate();
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const {id} =useParams();

    useEffect(()=>{
        employeeService.getEmployeeById(id).then((res)=>{
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setEmail(res.data.email);
        })
        .catch(error=>{
            console.log(error);
        })
    },[id])

    const saveHandler=(e)=>{
        e.preventDefault();
        const employee={firstName,lastName,email};
        if(id){
            employeeService.updateEmployeeById(id,employee).then((res)=>{
                navigate("/employees");
            })
        }
        else{
            employeeService.createEmployee (employee).then((res)=>{
                console.log(res.data);
                navigate("/employees");
            })
        }
    }

    const cancelHandler=(e)=>{
        e.preventDefault();
        navigate("/employees");
    }

    return(
        <div className="container mt-5">
            <div className="row w-50">
            <div className="card offset-md-6" >
                <h3 className="text-center"> Update Employee</h3>
                <div className="card-body">
                    <form>
                        <label htmlFor="firstName" className="my-3">FirstName:</label>
                        <input type="text" name="firstName" id="firstName" autoComplete="off" className="form-control" value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
                        <label htmlFor="lastName" className="my-3">LastName:</label>
                        <input type="text" name="lastName" id="lastName" autoComplete="off" className="form-control" value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
                        <label htmlFor="email" className="my-3">Email:</label>
                        <input type="email" name="email" id="email" autoComplete="off" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        <button className="btn btn-danger mt-4" onClick={cancelHandler}>Cancel</button>
                        <button className="btn btn-success float-end mt-4" onClick={saveHandler}>Save</button>
                    </form>
                </div>
                </div>
            </div>

        </div>
    )
}