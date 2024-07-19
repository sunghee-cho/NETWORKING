package com.example.networking.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.networking.security.custom.CustomUserDetailService;
import com.example.networking.security.jwt.filter.JwtAuthenticationFilter;
import com.example.networking.security.jwt.filter.JwtRequestFilter;
import com.example.networking.security.jwt.provider.JwtTokenProvider;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@EnableWebSecurity
// @preAuthorize, @postAuthorize, @Secured 활성화
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true) 
public class SecurityConfig {

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    // 시큐리티 설정
    @SuppressWarnings("removal")
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        log.info("시큐리티 설정...");

        http.cors().and().csrf().disable(); // cors 에러가 떠서 추가함 **새로 업데이트**

        // 폼 기반 로그인 비활성화
        http.formLogin(login -> login.disable());

        // HTTP 기본 인증 비활성화
        http.httpBasic(basic -> basic.disable());

        // CSRF(Cross-Site Request Forgery) 공격 방어 기능 비활성화
        http.csrf(csrf -> csrf.disable());

        // 필터 설정 ✅
        http.addFilterAt(new JwtAuthenticationFilter(authenticationManager, jwtTokenProvider),
                        UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(new JwtRequestFilter(jwtTokenProvider),
                            UsernamePasswordAuthenticationFilter.class);

        // 인가 설정 ✅
        http.authorizeHttpRequests(authorizeRequests -> 
            authorizeRequests
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                .requestMatchers("/", "/login", "/users/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers("/chat/**").authenticated() // 웹소켓 endpoint 추가 **새로 업데이트**
                .anyRequest().authenticated()
        );

        // 인증 방식 설정 ✅
        http.userDetailsService(customUserDetailService);
        return http.build();
    }

    // PasswordEncoder 빈 등록
    // 암호화 알고리즘 방식: Bcrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();    
    }

    // AuthenticationManager 빈 등록
    private AuthenticationManager authenticationManager;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        this.authenticationManager = authenticationConfiguration.getAuthenticationManager();
        return authenticationManager;
    }
}
