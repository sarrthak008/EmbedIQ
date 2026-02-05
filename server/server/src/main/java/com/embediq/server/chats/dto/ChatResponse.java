package com.embediq.server.chats.dto;

import com.embediq.server.bots.enums.PositionType;
import com.embediq.server.bots.enums.ThemeType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatResponse {
    private String user_question;
    private String bot_answer;
    private String bot_name;
    private PositionType positon;
    private ThemeType theme;
    private String origin;
    private LocalDateTime created_at;
}
