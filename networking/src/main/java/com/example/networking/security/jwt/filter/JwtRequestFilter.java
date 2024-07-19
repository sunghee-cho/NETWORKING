package com.example.networking.security.jwt.filter;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.networking.security.jwt.constants.JwtConstants;
import com.example.networking.security.jwt.provider.JwtTokenProvider;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtRequestFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    // 생성자
    public JwtRequestFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     *  jwt 요청 필터
     *  - request > headers > Authorization (💍JWT)
     *  - JWT 토큰 유효성 검사
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        // 헤더에서 jwt 토큰을 가져옴
        String header = request.getHeader(JwtConstants.TOKEN_HEADER);
        String token = null;

        // jwt 토큰이 없으면 URL 파라미터에서 가져옴 **새로 업데이트**
        if (header != null && header.startsWith(JwtConstants.TOKEN_PREFIX)) {
            token = header.replace(JwtConstants.TOKEN_PREFIX, "");
        } else {
            token = request.getParameter("token");
        }

        log.info("Token : " + token);

        // jwt 토큰이 없으면 다음 필터로 이동
        if (token == null || token.length() == 0) {
            filterChain.doFilter(request, response);
            return;
        }

        // 토큰 유효성 검사
        if (jwtTokenProvider.validateToken(token)) {
            log.info("유효한 JWT 토큰입니다.");
            
            // 토큰 해석
            Authentication authentication = jwtTokenProvider.getAuthentication(token);

            // 로그인
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        
        // 다음 필터
        filterChain.doFilter(request, response);
    }
}
