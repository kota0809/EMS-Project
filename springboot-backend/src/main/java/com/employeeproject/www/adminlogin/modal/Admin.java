package com.employeeproject.www.adminlogin.modal;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name=" adminCredentials")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Admin {
	
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;
		private String userName;
		private String currentPassword;
		
		@ElementCollection
		private List<String> oldPasswords;


}
