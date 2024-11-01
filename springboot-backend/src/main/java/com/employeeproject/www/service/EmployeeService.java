package com.employeeproject.www.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.employeeproject.www.exception.ResourceNotFoundException;
import com.employeeproject.www.model.Employee;
import com.employeeproject.www.repo.EmployeeRepository;

@Service
public class EmployeeService { 
	@Autowired
	EmployeeRepository employeeRepository;
	
	public List<Employee> getAllEmployees(){
		
		return employeeRepository.findAll();
	}
	
	public Employee addEmployee(Employee employee) {
		return employeeRepository.save(employee);
	}
	
	public Employee getEmployeeById(Long id) {
		return employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Id Not Found"));
	}
	
	public ResponseEntity<Employee> updateEmployeeById(Long id, Employee employee){
		Employee emp = employeeRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Id Not Found"));
		emp.setFirstName(employee.getFirstName()); 
		emp.setLastName(employee.getLastName());
		emp.setEmail(emp.getEmail());
		
		Employee updatedEmp = employeeRepository.save(emp);
		return ResponseEntity.ok(updatedEmp);
	}
	
	public ResponseEntity<HttpStatus> deleteEmployeeById(Long id){
		Employee employee=employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee Does Not Exit"));
		employeeRepository.delete(employee);;
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
