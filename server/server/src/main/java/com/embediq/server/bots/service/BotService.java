package com.embediq.server.bots.service;

import com.embediq.server.bots.dto.BotStates;
import com.embediq.server.bots.entity.Bot;
import com.embediq.server.bots.enums.ThemeType;
import com.embediq.server.bots.repo.BotRepo;
import com.embediq.server.chats.repo.ChatRepo;
import com.embediq.server.logs.LogService;
import com.embediq.server.plans.enums.PlanType;
import com.embediq.server.users.entity.User;
import com.embediq.server.users.repo.UserRepo;
import com.embediq.server.utils.ApiResponce;
import com.embediq.server.utils.MyMailSender;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BotService {

    @Autowired
    private BotRepo botRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ChatRepo chatRepo;

    @Autowired
    private MyMailSender sender;

    @Autowired
    private LogService logService;

    private String formatRelativeTime(LocalDateTime time) {
        if (time == null) return "Never";

        long minutes = java.time.Duration.between(time, LocalDateTime.now()).toMinutes();
        if (minutes < 1) return "Just now";
        if (minutes < 60) return minutes + " min ago";
        if (minutes < 1440) return (minutes / 60) + " hours ago";
        return (minutes / 1440) + " days ago";
    }

    public Bot createBot(Bot bot,String email){

        User botOwner = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with the provided ID."));

         int BotCount = botOwner.getBots().size();
         int allowedBotCount = botOwner.getMy_plan().getBot_count();

         if(BotCount >= allowedBotCount){
             sender.sendWelcomeEmail(botOwner.getEmail(),"Limit reached! Your current plan only allows " +
                     allowedBotCount + " bot(s). Please upgrade.");
             throw new RuntimeException("Limit reached! Your current plan only allows " +
                 allowedBotCount + " bot(s). Please upgrade.");
         }

         Bot newBot = new Bot();
         newBot.setBot_name(bot.getBot_name());
         newBot.setUser(botOwner);
         newBot.setBot_description(bot.getBot_description());
         newBot.setBot_data(bot.getBot_data());
         botOwner.getBots().add(newBot);
         sender.sendWelcomeEmail(botOwner.getEmail(),newBot.getBot_name() + "  just live to work !");
         logService.saveLog(botOwner.getEmail(),"BOT_CREATION",botOwner.getEmail() + " creates a new bot " + newBot.getBot_name());
         return  botRepo.save(newBot);
    }

    public List<Bot> getAllBots(){
        return botRepo.findAll();
    }

    public List<Bot> getMyBots(String email){
        User user = userRepo.findByEmail(email)
                .orElseThrow(()-> new RuntimeException("user not found"));
        return botRepo.findByOwnerId(user.getUser_id());
    }

    public Bot updateBot(String botId , Bot updatedBot){
         Bot exitingBot = botRepo.findById(botId)
                 .orElseThrow(()-> new RuntimeException("Bot not found"));

         if(updatedBot.getBot_name() != null){
              exitingBot.setBot_name(updatedBot.getBot_name());
         }
         if(updatedBot.getBot_description() != null){
             exitingBot.setBot_description(updatedBot.getBot_description());
         }

        if(updatedBot.getPosition() != null){
            exitingBot.setPosition(updatedBot.getPosition());
        }

        if(updatedBot.getDomain() != null){
            exitingBot.setDomain(updatedBot.getDomain());
        }

        if(updatedBot.getBot_data() != null){
             exitingBot.setBot_data(updatedBot.getBot_data());
        }

        if(updatedBot.getTheme() != null){
            exitingBot.setTheme(updatedBot.getTheme());
        }
     return  botRepo.save(exitingBot);
    }

    public String changeBotStatus(String botId){
        Bot bot = botRepo.findById(botId)
                .orElseThrow(()->new RuntimeException("bot not found"));
         bot.setIsBotActive(!bot.getIsBotActive());
         botRepo.save(bot);
         logService.saveLog(bot.getUser().getEmail(),"BOT_STATUS" , "bot status just changes");
         return "bot status change successfully. now bot is " + (bot.getIsBotActive() ? "acitve" : "deactive");
    }

    public String deleteBot(String botId){
        if (!botRepo.existsById(botId)) {
            throw new RuntimeException("Bot not found with id: " + botId);
        }
        try {
            botRepo.deleteById(botId);
            logService.saveLog(botRepo.findById(botId).get().getUser().getEmail(),"BOT_DELETION","bot deleted");
            return  "bot deleted..!";
        } catch (Exception e) {
            return  e.getMessage();
        }
    }

    public Bot getBotById(String botId){
        return botRepo.findById(botId)
                .orElseThrow(()-> new EntityNotFoundException("bot not found for give bot id"));
    }

    public BotStates getBotStates(String BotId){

        Bot bot = botRepo.findById(BotId)
                .orElseThrow(()-> new EntityNotFoundException("bot not found for give bot id"));
        BotStates states = new BotStates();
        Integer total = bot.getChatCount();
        states.setTotalConversations(total);
        LocalDateTime yesterday = LocalDateTime.now().minusHours(24);
        long recent = chatRepo.countRecentChats(BotId, yesterday);
        states.setLast24Hours(recent);

        LocalDateTime lastActive = chatRepo.findLastActiveTimestamp(BotId);
        states.setLastActive(formatRelativeTime(lastActive));
        return states;
    }
}

