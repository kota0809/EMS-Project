package com.employeeproject.www.adminlogin.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.employeeproject.www.adminlogin.modal.Admin;
@Repository
public interface AdminRepository extends JpaRepository<Admin, Long>{
	
	Optional<Admin> findByUserName(String userName);

}
