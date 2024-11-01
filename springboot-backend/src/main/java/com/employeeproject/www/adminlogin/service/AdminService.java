package com.employeeproject.www.adminlogin.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.employeeproject.www.adminlogin.modal.Admin;
import com.employeeproject.www.adminlogin.repo.AdminRepository;

@Service
public class AdminService {
	
	@Autowired
	AdminRepository adminRepository;
	

    @Autowired
    private PasswordEncoder passwordEncoder;
	
	public Optional<Admin> findByUserName(String userName) {
		return adminRepository.findByUserName(userName);
	}
	
	public Optional<String> login(String userName, String password) {
        Optional<Admin> adminOptional = findByUserName(userName);
        
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            if (checkPassword(admin, password)) {
                return Optional.of(admin.getUserName()); // Return the admin name if login is successful
            }
        }
        return Optional.empty(); // Return empty if login fails
    }
	
	public boolean checkPassword(Admin admin, String rawPassword) {
	    // Compare raw password with hashed password
	    return passwordEncoder.matches(rawPassword, admin.getCurrentPassword());
	}
	
	public void updatePassword(Admin admin, String newPassword) {
	    // Add current (old) password to history before changing
	    admin.getOldPasswords().add(admin.getCurrentPassword());

	    // Hash the new password and set it as the current password
	    admin.setCurrentPassword(passwordEncoder.encode(newPassword));

	    // Save the updated admin to the database
	    adminRepository.save(admin);
	}




}
