package com.embediq.server.bots.controller;


import com.embediq.server.bots.dto.BotStates;
import com.embediq.server.bots.entity.Bot;
import com.embediq.server.bots.service.BotService;
import com.embediq.server.chats.entity.Chat;
import com.embediq.server.chats.service.ChatService;
import com.embediq.server.utils.ApiResponce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/bot")
@CrossOrigin(origins = "*")
public class BotController {

    @Autowired
    private BotService botService;

    @Autowired
    private ChatService chatService;

    // use to create a new bot
    @PostMapping("/new")
    public ResponseEntity<ApiResponce<?>> createBot(@RequestBody Bot bot , @AuthenticationPrincipal String email){
         try{
             Bot createdBot =  botService.createBot(bot,email);
             return ResponseEntity.ok(new ApiResponce<>(true,"bot create successfully",createdBot));
         } catch (Exception e) {
             return ResponseEntity.status(400).body(new ApiResponce<>(false,e.getMessage(),e.getLocalizedMessage()));
         }
    }

    // get all bots
    @GetMapping("/bots")
    public ResponseEntity<ApiResponce<?>> getAllBot(){
        try{
            List<Bot> botList = botService.getAllBots();
            return  ResponseEntity.ok(new ApiResponce<>(true,"load all bots",botList));
        } catch (Exception e) {
            return  ResponseEntity.status(400).body(new ApiResponce<>(false , e.getMessage(),null));
        }
    }

    // get a user bot by add
    @GetMapping("/mybot")
    public ResponseEntity<ApiResponce<?>> getMyBots(@AuthenticationPrincipal String email){
        try{
            List<Bot> botList = botService.getMyBots(email);
            return  ResponseEntity.ok(new ApiResponce<>(true,"load all bots",botList));
        } catch (Exception e) {
            return  ResponseEntity.status(400).body(new ApiResponce<>(false , e.getMessage(),null));
        }
    }

    @GetMapping("/get/{botId}")
    public ResponseEntity<ApiResponce<?>> getBotById(@PathVariable String botId){
        try{
            Bot bot = botService.getBotById(botId);
            return  ResponseEntity.ok(new ApiResponce<>(true,"load all bots",bot));
        } catch (Exception e) {
            return  ResponseEntity.status(400).body(new ApiResponce<>(false , e.getMessage(),null));
        }
    }

    @PutMapping( "/update/{botId}")
    public ResponseEntity<ApiResponce<?>> updateBot(@PathVariable String botId, @RequestBody Bot bot){
        try{
              Bot updatedBot = botService.updateBot(botId , bot);
             return ResponseEntity.ok(new ApiResponce<>(true,"bot updated successfully",updatedBot));
        } catch (Exception e) {
            return  ResponseEntity.status(400).body(new ApiResponce<>(false , e.getMessage(),null));
        }
    }

    @GetMapping("/updatestatus/{botId}")
    public ResponseEntity<ApiResponce<?>> updateBotStatus(@PathVariable String botId){
         try {
             String result = botService.changeBotStatus(botId);
             return  ResponseEntity.ok(new ApiResponce<>(true,result,null));
         } catch (Exception e) {
             return  ResponseEntity.status(400).body(new ApiResponce<>(false,e.getMessage(),null));
         }
    }

    @DeleteMapping("/delete/{botId}")
    public  ResponseEntity<ApiResponce<?>> deleteBot(@PathVariable String botId){
         try {
             String result = botService.deleteBot(botId);
             return  ResponseEntity.ok(new ApiResponce<>(true,result , null));
         } catch (Exception e) {
             return  ResponseEntity.status(400).body(new ApiResponce<>(false , e.getMessage(),null));
         }
    }

    @GetMapping("/states/{botId}")
    public ResponseEntity<ApiResponce<?>> getBotStates(@PathVariable String botId) {
        try {
            BotStates response = botService.getBotStates(botId);
            return ResponseEntity.ok(new ApiResponce<>(true, "bot states", response));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new ApiResponce<>(false, e.getMessage(), null));
        }

    }


        @GetMapping("/recent/{botId}")
        public ResponseEntity<ApiResponce<?>> getBotChats(@PathVariable String botId) {
            try{
                List<Chat> chats = chatService.getLast24HourChatsByBot(botId);
                return ResponseEntity.ok(new ApiResponce<>(true, "Last 24-hour chats retrieved successfully", chats));
            } catch (Exception e) {
                return ResponseEntity.status(500).body(new ApiResponce<>(false, e.getMessage(), null));
            }
        }

}




