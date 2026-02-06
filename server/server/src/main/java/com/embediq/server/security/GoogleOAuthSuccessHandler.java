package com.embediq.server.security;

import com.embediq.server.users.dto.LoginRepoce;
import com.embediq.server.users.entity.User;
import com.embediq.server.users.enums.RolesTypes;
import com.embediq.server.users.repo.UserRepo;
import com.embediq.server.users.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class GoogleOAuthSuccessHandler implements AuthenticationSuccessHandler {

    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException {

        OAuth2User oAuthUser = (OAuth2User) authentication.getPrincipal();

        String email = oAuthUser.getAttribute("email");
        String name  = oAuthUser.getAttribute("name");

        LoginRepoce login = userService.googleLogin(email, name);

        response.sendRedirect(
                "https://embediq.in/auth?token=" + login.getToken()
        );
    }
}
