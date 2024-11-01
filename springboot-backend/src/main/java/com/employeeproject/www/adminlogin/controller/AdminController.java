package com.employeeproject.www.adminlogin.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employeeproject.www.adminlogin.modal.Admin;
import com.employeeproject.www.adminlogin.service.AdminService;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins="http://localhost:3000")
public class AdminController {
	
	
	@Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin loginDetails) {
        Optional<String> adminName = adminService.login(loginDetails.getUserName(), loginDetails.getCurrentPassword());
        
        if (adminName.isPresent()) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("adminName", adminName.get());
            return ResponseEntity.ok(response); // Return the name in response
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    
    @PostMapping("/change-password")
    public String changePassword(@RequestBody Admin adminDetails) {
        Admin admin = adminService.findByUserName(adminDetails.getUserName())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        // Call service to update password securely
        adminService.updatePassword(admin, adminDetails.getCurrentPassword());

        return "Password changed successfully";
    }
    
  


}
