package com.smarttouristplatform.tourismservice.filter;
import com.smarttouristplatform.tourismservice.config.JwtUtil;
import com.smarttouristplatform.tourismservice.dto.ApiResponse;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private tools.jackson.databind.ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        String token = null;

        try {

            // 1. Check Authorization header
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                filterChain.doFilter(request, response);
                return;
            }

            token = authHeader.substring(7);

            // 2. Validate token FIRST
            if (!jwtUtil.validateToken(token)) {
                sendError(response, "Invalid or expired token");
                return;
            }

            // 3. Extract data safely AFTER validation
            String userId = jwtUtil.extractUserId(token);
            String userEmail = jwtUtil.extractUserEmail(token);
            String userRole = jwtUtil.extractUserRole(token);

            // 4. Set Security Context only if not already set
            if (userEmail != null &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userEmail,
                                null,
                                Collections.singletonList(
                                        new SimpleGrantedAuthority("ROLE_" + userRole.toUpperCase())
                                )
                        );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

            // 5. Continue filter chain
            filterChain.doFilter(request, response);

        } catch (Exception e) {
            sendError(response, "Token processing failed: " + e.getMessage());
        }
    }

    // 🔥 Central error response method
    private void sendError(HttpServletResponse response, String message) throws IOException {

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        ApiResponse<?> apiResponse = new ApiResponse<>(
                false,
                message,
                null
        );

        response.getWriter().write(
                objectMapper.writeValueAsString(apiResponse)
        );
    }
}