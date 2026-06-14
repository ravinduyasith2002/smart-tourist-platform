package com.smarttouristplatform.authservice.config;

import com.smarttouristplatform.authservice.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsService;

    public JwtAuthFilter(
            JwtUtil jwtUtil,
            UserDetailsServiceImpl userDetailsService) {

        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("-----------------------come to here 1 ");

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("-----------------------come to here 2 ");
            filterChain.doFilter(request, response);
            return;
        }

        try {

            String token = authHeader.substring(7);
            System.out.println("-----------------------come to here 3 "+ token);

            String userEmail = jwtUtil.extractUsername(token);

            System.out.println("-----------------------come to here 4 "+ userEmail);

            if (userEmail != null ) {
                System.out.println("-----------------------come to here 5 "+ "to find user details function");
                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(userEmail);

                if (jwtUtil.validateToken(token)) {
                    System.out.println("-----------------------come to here validation token  6 ");
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request));

                    SecurityContextHolder.getContext()
                            .setAuthentication(authentication);
                }
            }
            System.out.println("-----------------------come to here validatin 8 ");

        } catch (Exception e) {
            System.out.println("JWT Filter Error: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}