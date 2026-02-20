package com.embediq.server.chats.service;

import com.embediq.server.bots.entity.Bot;
import com.embediq.server.bots.repo.BotRepo;
import com.embediq.server.chats.dto.ChatResponse;
import com.embediq.server.chats.entity.Chat;
import com.embediq.server.chats.repo.ChatRepo;
import com.embediq.server.plans.entity.Plan;
import com.embediq.server.plans.repo.PlanRepo;
import com.embediq.server.users.entity.User;
import com.embediq.server.users.repo.UserRepo;
import com.embediq.server.utils.AskAI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {

    @Autowired
    private ChatRepo chatRepo;
    @Autowired
    private BotRepo botRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PlanRepo planRepo;
    @Autowired
    private AskAI askAI;

    public ChatResponse getAnswer(String botId, String question){
        // check id is ohk..
        Bot bot = botRepo.findById(botId)
                .orElseThrow(()-> new RuntimeException("Bot Not found or service is deactive.."));

        // check bot is active
        if(bot.getIsBotActive() == false){
            throw new RuntimeException("bot is currently deactive please try latter");
        }


        String userId = bot.getUser().getUser_id();
        User botOwner = userRepo.findById(userId)
                .orElseThrow(()-> new RuntimeException("some thing went wrong..."));

        Plan userPlan = botOwner.getMy_plan();

        if(bot.getChatCount() >= userPlan.getMsg_count()){
            throw new RuntimeException("You have reached your plan limit of " +
                    userPlan.getMsg_count() + " chats. Please upgrade!");
        }
        String aiResult = askAI.getBotAnswer(bot.getBot_data(), question);
        bot.increaseChatCount();
        botRepo.save(bot);

        // save new chat
        Chat newChat = new Chat();
        newChat.setBot_answer(aiResult);
        newChat.setUser_question(question);
        newChat.setBot(bot);
        chatRepo.save(newChat);

        ChatResponse response = new ChatResponse();
        response.setBot_answer(newChat.getBot_answer());
        response.setUser_question(newChat.getUser_question());
        response.setCreated_at(newChat.getCreated_at() != null ?
                newChat.getCreated_at() : LocalDateTime.now());
        response.setTheme(bot.getTheme());
        response.setOrigin(bot.getDomain());
        response.setPositon(bot.getPosition());
        response.setBot_name(bot.getBot_name());
        return  response;
    }

    public Map<String, Object> getChartData(String botId) {
        List<Object[]> results = chatRepo.getHourlyActivityWithLabels(botId);

        List<String> labels = new ArrayList<>();
        List<Long> data = new ArrayList<>();

        for (Object[] row : results) {
            labels.add((String) row[1]); // The "HH24:00" label
            data.add(((Number) row[2]).longValue()); // The count
        }

        Map<String, Object> chartResponse = new HashMap<>();
        chartResponse.put("labels", labels);
        chartResponse.put("data", data);
        return chartResponse;
    }

    public List<Chat> getLast24HourChatsByBot(String botId) {
        LocalDateTime twentyFourHoursAgo = LocalDateTime.now().minusHours(24);
        return chatRepo.findRecentChatsByBot(botId, twentyFourHoursAgo);
    }

    public long getAllBotsCount(){
        return  botRepo.count();
    }
}
