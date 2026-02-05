package com.embediq.server.users.controller;

import com.embediq.server.users.dto.LoginRepoce;
import com.embediq.server.users.dto.LoginRequest;
import com.embediq.server.users.dto.MeResponse;
import com.embediq.server.users.entity.User;
import com.embediq.server.users.service.UserService;
import com.embediq.server.utils.ApiResponce;
import jakarta.persistence.PrePersist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;


    @PostMapping("/signup")
    public ResponseEntity<ApiResponce<?>> singup(@RequestBody User user){
        try{
            User savedUser = userService.register(user);
            return ResponseEntity.ok(new ApiResponce<>(true , "account create successfully",savedUser));
        } catch (Exception e) {
            return  ResponseEntity.status(400).body(new ApiResponce<>(false,e.getMessage(),null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponce<?>> login(@RequestBody  LoginRequest request ){
        try{
             LoginRepoce res = userService.login(request);
            return ResponseEntity.ok(new ApiResponce<>(true , "Login successfully",res));
        } catch (Exception e) {
            return  ResponseEntity.status(400).body(new ApiResponce<>(false,e.getMessage(),null));
        }
    }


    @GetMapping("/me/{mail}")
    public ResponseEntity<ApiResponce<?>> getUserPlanAndOtherInfo(@PathVariable String mail){
        try{
           MeResponse response =  userService.getMeResponse(mail);
           return ResponseEntity.ok(new ApiResponce<>(true,"user plan info",response));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new ApiResponce<>(false,e.getMessage(),null));
        }
    }
}
