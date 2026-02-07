package com.embediq.server.bots.controller;

import com.embediq.server.utils.ApiResponce;
import com.embediq.server.utils.AskAI;
import com.embediq.server.utils.MyMailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.crypto.Data;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class Health {

    @Autowired
    private MyMailSender sender;

    @GetMapping
    public ResponseEntity<ApiResponce<?>> getHelath(){
        sender.sendWelcomeEmail("sarthaknavale40@gmail.com","health Route Called...");
        return  ResponseEntity.ok(new ApiResponce<>(true,"server is running halthy",null));
    }
}
