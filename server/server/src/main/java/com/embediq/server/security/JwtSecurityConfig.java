package com.embediq.server.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class JwtSecurityConfig {

    private final JwtFilter jwtFilter;
    private final GoogleOAuthSuccessHandler successHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        // allow preflight
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // 🌍 PUBLIC (CDN + chatbot)
                        .requestMatchers("/cdn/**", "/api/payment/**","/api/chat/**","/success", "/cancel","/api/payment/create-session","/api/bot/recent/**").permitAll()

                        // 🔐 PUBLIC AUTH ROUTES
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/health",
                                "/oauth2/**",
                                "/login/**"
                        ).permitAll()

                        // 🔐 ADMIN ONLY
                        .requestMatchers("/admin/**", "/api/bot/bots").hasRole("ADMIN")

                        // 🔒 everything else requires JWT
                        .anyRequest().authenticated()
                )

                // ⭐ Google OAuth
                .oauth2Login(oauth ->
                        oauth.successHandler(successHandler)
                )

                // ⭐ Stateless (JWT only)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // ⭐ JWT filter
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)

                .build();
    }

    // =================================================
    // CORS CONFIG
    // =================================================
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        // =====================================
        // 🔐 DASHBOARD (STRICT)
        // =====================================
        CorsConfiguration dashboardConfig = new CorsConfiguration();
        dashboardConfig.setAllowedOrigins(Arrays.asList(
                "http://localhost:5173",
                "https://embediq.in"
        ));
        dashboardConfig.setAllowedMethods(Arrays.asList("*"));
        dashboardConfig.setAllowedHeaders(Arrays.asList("*"));
        dashboardConfig.setAllowCredentials(true);

        // =====================================
        // 🌍 PUBLIC CDN + CHATBOT (OPEN)
        // =====================================
        CorsConfiguration publicConfig = new CorsConfiguration();
        publicConfig.setAllowedOriginPatterns(Arrays.asList("*")); // ⭐ allow ANY domain
        publicConfig.setAllowedMethods(Arrays.asList("*"));
        publicConfig.setAllowedHeaders(Arrays.asList("*"));
        publicConfig.setAllowCredentials(false); // ⭐ required for "*"

        // apply rules
        source.registerCorsConfiguration("/cdn/**", publicConfig);
        source.registerCorsConfiguration("/api/chat/**", publicConfig);

        source.registerCorsConfiguration("/api/auth/**", dashboardConfig);
        source.registerCorsConfiguration("/admin/**", dashboardConfig);

        // fallback
        source.registerCorsConfiguration("/**", dashboardConfig);

        return source;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
