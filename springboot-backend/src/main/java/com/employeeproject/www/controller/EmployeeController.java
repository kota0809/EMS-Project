package com.employeeproject.www.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employeeproject.www.model.Employee;
import com.employeeproject.www.service.EmployeeService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {
	
	@Autowired
	EmployeeService employeeService;
	
	@GetMapping("/employees")
	public List<Employee> getAllEmployees(){
		
		return employeeService.getAllEmployees();
	}
	
	@PostMapping("/addEmployee")
	public Employee createEmployee(@RequestBody Employee employee) {
		return employeeService.addEmployee(employee);
	}
	
	@GetMapping("/getEmployeeById/{id}")
	public Employee getEmployeeById(@PathVariable Long id) {
		return employeeService.getEmployeeById(id);
		
	}
	
	@PutMapping("/updateEmployeeById/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee){
		return employeeService.updateEmployeeById(id, employee);
		
	} 
	
	@DeleteMapping("/deleteEmployeeById/{id}")
	public ResponseEntity<HttpStatus> deleteEmployeeById(@PathVariable Long id){
		return employeeService.deleteEmployeeById(id);
	}

}
