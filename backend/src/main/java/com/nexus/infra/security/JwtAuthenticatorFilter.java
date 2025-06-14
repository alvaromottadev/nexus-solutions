package com.nexus.infra.security;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticatorFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsServiceImpl userDetailsService;

    public JwtAuthenticatorFilter(JwtTokenUtil jwtTokenUtil, UserDetailsServiceImpl userDetailsService) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
    }

    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain) {
        String authHeader = req.getHeader("Authorization");
        String token = null;
        String email = null;
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
                email = jwtTokenUtil.extractUsername(token);
            }
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(email);
                if (jwtTokenUtil.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
            filterChain.doFilter(req, res);
        } catch (ExpiredJwtException e){
            createErrorResponse(res, "Token expired");
        } catch (Exception e) {
            createErrorResponse(res, "Error in JWT authentication: " + e.getMessage());
        }
    }

    private void createErrorResponse(HttpServletResponse res, String message) {
        try {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            res.setContentType("application/json");
            res.getWriter().write(createJson(message));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String createJson(String message){
        return "{ \"error\": \"" + message + "\" }";
    }

}
