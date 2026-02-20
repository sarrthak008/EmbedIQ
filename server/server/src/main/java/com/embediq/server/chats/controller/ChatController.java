package com.embediq.server.chats.controller;

import com.embediq.server.chats.dto.ChatResponse;
import com.embediq.server.chats.entity.Chat;
import com.embediq.server.chats.service.ChatService;
import com.embediq.server.utils.ApiResponce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin("*")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/chatbot/{botId}")
    public ResponseEntity<ApiResponce<?>> getaianswer(@PathVariable String botId, @RequestBody String question){
         try{
             ChatResponse response = chatService.getAnswer(botId,question);
             return  ResponseEntity.ok(new ApiResponce<>(true , "here is you anser",response));
         } catch (Exception e) {
             throw new RuntimeException(e);
         }
    }

    @GetMapping("/chart/{botId}")
    public ResponseEntity<ApiResponce<?>> getChart(@PathVariable String botId){
        try{
            Map<String, Object> chartData = chatService.getChartData(botId);
            return ResponseEntity.ok(new ApiResponce<>(true, "Chart data retrieved successfully", chartData));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponce<>(false, e.getMessage(), null));
        }
        }

        @GetMapping("/botcount")
       public ResponseEntity<ApiResponce<?>> getBotCounts(){
         try{
            long count =   chatService.getAllBotsCount();
            return ResponseEntity.ok(new ApiResponce<>(true,"loadin bots cound",count));
         } catch (Exception e) {
             return ResponseEntity.status(400).body(new ApiResponce<>(false,"loading Fails",e.getMessage()));
         }
        }
}
