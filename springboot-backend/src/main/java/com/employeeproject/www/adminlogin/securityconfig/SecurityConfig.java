package com.employeeproject.www.adminlogin.securityconfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class SecurityConfig {

	 @Bean
	    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http
	    	.cors() // Enable CORS
	    	.and()
		      .csrf().disable() // Disable CSRF for simplicity in development
	        .authorizeRequests()
	       // .requestMatchers("/api/v1/admin/login").permitAll()  // Allow access to login endpoint
	        .requestMatchers("/api/v1/admin/**","/api/v1/**")// Protect admin and employee management endpoints
	        .permitAll()
	        //.authenticated()
	       // .anyRequest().denyAll()  // Deny access to any other URLs unless authenticated
	        .anyRequest().permitAll() // Allow access to any other URLs
            .and()
            .httpBasic() // Enable HTTP Basic authentication for API endpoints
	        .and()
	        .formLogin()
	            .loginPage("/login")
	            .permitAll()  // Allow everyone to see the login page
	        .and()
	        .logout()
	            .logoutUrl("/logout")
	            .logoutSuccessUrl("/login");  // Redirect to login page after logout
	       
	    return http.build();
	}

	
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}