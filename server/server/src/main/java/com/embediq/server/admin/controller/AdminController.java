package com.embediq.server.admin.controller;


import com.embediq.server.admin.services.AdminServices;
import com.embediq.server.security.JwtUtils;
import com.embediq.server.users.entity.User;
import com.embediq.server.users.repo.UserRepo;
import com.embediq.server.utils.ApiResponce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

     @Autowired
    private AdminServices adminServices;

     @Autowired
     private  UserRepo userRepo;

     @Autowired
     private JwtUtils jwtUtils;

     @GetMapping("/dashboard")
     @PreAuthorize("hasRole('ADMIN')")
     public ResponseEntity<ApiResponce<?>> getDashboardStates() {
         try {
             Map<String, Object> data = adminServices.getDashboardStats();
             return ResponseEntity.ok(new ApiResponce<>(true, "Dashboard data retrieved", data));
         } catch (Exception e) {
             return ResponseEntity.status(400)
                     .body(new ApiResponce<>(false, "Error: " + e.getMessage(), null));
         }
     }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponce<?>> getAllUsers(){
         try {
             return ResponseEntity.ok(new ApiResponce<>(true, "Dashboard data retrieved", adminServices.getAllUsers()));
         } catch (Exception e) {
             return ResponseEntity.status(400).body(new ApiResponce<>(false, "Error: " + e.getMessage(), null));
         }
    }

    @PostMapping("/gosting")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponce<?>> gosting(@RequestBody Map<String, String> payload) {
        try {
            String mail = payload.get("mail");
            if (mail == null || mail.isEmpty()) {
                return ResponseEntity.status(400).body(new ApiResponce<>(false, "Email is missing in request", null));
            }

            User user = userRepo.findByEmail(mail)
                    .orElseThrow(() -> new RuntimeException("Invalid email: " + mail));

            String token = jwtUtils.ganarateToken(user.getEmail(), user.getRole().name());

            return ResponseEntity.ok(new ApiResponce<>(true, "Ready for Gosting...", token));
        } catch (Exception e) {
            // This will now print the actual error to your React console
            return ResponseEntity.status(400).body(new ApiResponce<>(false, e.getMessage(), null));
        }
    }

    @DeleteMapping("/delete/{mail}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponce<?>> deleteUser(@PathVariable String mail){
         try{
             Boolean responce = adminServices.deleteUser(mail);
             return ResponseEntity.ok(new ApiResponce<>(true,"user deleted",responce));
         } catch (Exception e) {
             return ResponseEntity.status(400).body(new ApiResponce<>(false, "Error: " + e.getMessage(), null));
         }
    }

    @GetMapping("/bots")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponce<?>> getAllBots(){
         try{
             return ResponseEntity.ok(new ApiResponce<>(true,"bots fetched",adminServices.getAllBots()));
             } catch (Exception e) {
             return ResponseEntity.status(400).body(new ApiResponce<>(false, e.getMessage(), null));
         }
     }

     @DeleteMapping("/delete/bot/{botId}")
     @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponce<?>> deleteBot(@PathVariable String botId) {
         try {
             Boolean responce = adminServices.deleteBot(botId);
             return ResponseEntity.ok(new ApiResponce<>(true, "bot deleted", responce));
         } catch (Exception e) {
             return ResponseEntity.status(400).body(new ApiResponce<>(false, "Error: " + e.getMessage(), null));
         }
     }
}
