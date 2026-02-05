package com.embediq.server.admin.services;

import com.embediq.server.bots.entity.Bot;
import com.embediq.server.bots.repo.BotRepo;
import com.embediq.server.chats.repo.ChatRepo;
import com.embediq.server.logs.LogsRepo;
import com.embediq.server.users.dto.LoginRepoce;
import com.embediq.server.users.entity.User;
import com.embediq.server.users.repo.UserRepo;
import com.embediq.server.utils.MyMailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminServices {

     @Autowired
    private UserRepo userRepo;

     @Autowired
    private BotRepo botRepo;

     @Autowired
    private ChatRepo chatRepo;

     @Autowired
     private LogsRepo logsRepo;

     @Autowired
     private MyMailSender sender;


     public Map<String,Object> getDashboardStats(){
           Map<String , Object> stats= new HashMap<>();
           stats.put("totalUser",userRepo.count());
           stats.put("activeBots",botRepo.countBotByIsBotActive(true));
           stats.put("totalChats",chatRepo.count());
         LocalDateTime tenMinsAgo = LocalDateTime.now().minusMinutes(10);
         stats.put("liveTraffic", logsRepo.countByCreatedAtAfter(tenMinsAgo));
         stats.put("recentActivity", logsRepo.findTop5ByOrderByCreatedAtDesc());
         return stats;
     }

    public List<LoginRepoce> getAllUsers(){
         List<User>  user =  userRepo.findAll();
        return user.stream().map(u -> {
            LoginRepoce response = new LoginRepoce();
            response.setEmail(u.getEmail());
            response.setRole(u.getRole().name());
            return response;
        }).collect(Collectors.toList());
    }

    public Boolean deleteUser(String mail){
         User user = userRepo.findByEmail(mail)
                 .orElseThrow(()->new RuntimeException("user not found"));
         userRepo.delete(user);
         return  true;
    }

    public List<Bot> getAllBots(){
         return  botRepo.findAll();
    }

    public Boolean deleteBot(String botId){
         Bot bot = botRepo.findById(botId)
                 .orElseThrow(()->new RuntimeException("bot not found"));
         botRepo.delete(bot);
        return  true;
    }
}
