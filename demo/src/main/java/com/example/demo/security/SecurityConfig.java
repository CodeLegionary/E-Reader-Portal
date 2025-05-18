package com.example.demo.security;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.example.demo.model.MyAppUserService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final MyAppUserService appUserService;

    // Explicit constructor for dependency injection
    @Autowired
    public SecurityConfig(MyAppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(appUserService); // Ensure UserDetailsService is set
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(httpForm -> {
                    httpForm.loginPage("/req/login").permitAll();
                    httpForm.defaultSuccessUrl("http://localhost:5173", true);
                })
                .logout(logout -> {
                    logout.logoutUrl("/req/logout") // Define logout endpoint
                            .logoutSuccessUrl("/req/login") // Redirect to login page on logout
                            .invalidateHttpSession(true) // Invalidate session
                            .deleteCookies("JSESSIONID"); // Clear cookies
                })
                .authorizeHttpRequests(registry -> {
                    registry.requestMatchers("/req/signup", "/index", "/css/**", "/images/**", "/js/**").permitAll();
                    registry.requestMatchers("/api/readProgress/**", "/api/books/**").permitAll(); // Allow access to readProgress endpoints
                    registry.anyRequest().authenticated();
                })
                .build();
    }
}
