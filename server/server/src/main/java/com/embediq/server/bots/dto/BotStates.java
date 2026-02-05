package com.embediq.server.bots.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BotStates {
    private Integer totalConversations;
    private long last24Hours;
    private String lastActive;
}
