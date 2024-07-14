package com.example.networking.messaging.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

//     @SuppressWarnings("deprecation")
//     @Bean
//     SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//       http
//               .authorizeRequests(authorizeRequests ->
//                       authorizeRequests
//                               .requestMatchers("/chat/**").authenticated()
//                               .anyRequest().permitAll()
//               )
//               .formLogin(withDefaults())
//               .csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()));

//     return http.build();
//   }

@SuppressWarnings({ "deprecation", "removal" })
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
            .requestMatchers("/chat/**").permitAll()  // chat enpoint에 누구나 access 가능하도록 요청 
            .anyRequest().authenticated()
            .and()
        .csrf().disable();

    return http.build();
}
}
