package com.embediq.server.users.service;

import com.embediq.server.bots.entity.Bot;
import com.embediq.server.logs.LogService;
import com.embediq.server.plans.entity.Plan;
import com.embediq.server.plans.enums.PlanType;
import com.embediq.server.plans.repo.PlanRepo;
import com.embediq.server.security.JwtUtils;
import com.embediq.server.users.dto.LoginRepoce;
import com.embediq.server.users.dto.LoginRequest;
import com.embediq.server.users.dto.MeResponse;
import com.embediq.server.users.entity.User;
import com.embediq.server.users.enums.RolesTypes;
import com.embediq.server.users.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PlanRepo planRepo;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private LogService logService;

    // =================================================
    // REGISTER (email/password)
    // =================================================
    public User register(User user){

        String cleanEmail = user.getEmail().toLowerCase().trim();

        if (userRepo.findByEmail(cleanEmail).isPresent()) {
            throw new RuntimeException("Email already exists, please login.");
        }

        Plan freePlan = getFreePlan();

        String hashedpass = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(10));

        User newUser = new User();
        newUser.setEmail(cleanEmail);
        newUser.setComapny_name(user.getComapny_name());
        newUser.setPassword(hashedpass);
        newUser.setMy_plan(freePlan);
        newUser.setRole(RolesTypes.USER);
         logService.saveLog(newUser.getEmail(), "USER_REGISTER" , "new user registered");
        return userRepo.save(newUser);
    }

    // =================================================
    // NORMAL LOGIN (email/password)
    // =================================================
    public LoginRepoce login(LoginRequest request){

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Account not found."));

        boolean isPassMatch = BCrypt.checkpw(request.getPassword(), user.getPassword());

        if(!isPassMatch){
            throw new RuntimeException("Invalid email or password");
        }
        logService.saveLog(user.getEmail(),"USER_LOGIN" , "user login");
        return buildLoginResponse(user);
    }

    // =================================================
    // ⭐ GOOGLE LOGIN (NEW)
    // =================================================
    public LoginRepoce googleLogin(String email, String name){

        String cleanEmail = email.toLowerCase().trim();

        User user = userRepo.findByEmail(cleanEmail)
                .orElseGet(() -> {

                    // first time → create user
                    Plan freePlan = getFreePlan();

                    User newUser = new User();
                    newUser.setEmail(cleanEmail);
                    newUser.setComapny_name(name);
                    newUser.setPassword(null); // no password
                    newUser.setMy_plan(freePlan);
                    newUser.setRole(RolesTypes.USER);
                    logService.saveLog(newUser.getEmail(), "USER_LOGIN_GOOGLE" ,"user login with google");
                    return userRepo.save(newUser);
                });

        return buildLoginResponse(user);
    }

    // =================================================
    // COMMON HELPERS
    // =================================================

    private Plan getFreePlan() {
        return planRepo.findByPlanType(PlanType.FREE)
                .orElseThrow(() -> new RuntimeException("Default FREE plan not found!"));
    }

    private LoginRepoce buildLoginResponse(User user){
        LoginRepoce response = new LoginRepoce();

        response.setToken(jwtUtils.ganarateToken(
                user.getEmail(),
                user.getRole().name()
        ));
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().name());

        return response;
    }

    @Transactional
    public Boolean UpdateUserPlan(String email, PlanType plan){
        User user = userRepo.findByEmail(email)
                .orElseThrow(()-> new RuntimeException("user not found"));

        if(user.getBots() != null){
            user.getBots().forEach(bot ->  bot.setChatCount(0));
        }
        user.setMy_plan(planRepo.findByPlanType(plan).get());
        userRepo.save(user);
        return true;
    }

    public MeResponse getMeResponse(String email){
        User user = userRepo.findByEmail(email)
                .orElseThrow(()->new RuntimeException("user not found"));
        MeResponse response = new MeResponse();
        response.setType(user.getMy_plan().getPlanType());
        response.setPlanMaxMessages(user.getMy_plan().getMsg_count());

        int total = user.getBots().stream()
                .mapToInt(Bot::getChatCount)
                .sum();
        response.setTotalBotChats(total);
        return response;
    }
}
