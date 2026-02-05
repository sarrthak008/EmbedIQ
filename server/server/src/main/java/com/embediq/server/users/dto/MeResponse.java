package com.embediq.server.users.dto;

import com.embediq.server.plans.enums.PlanType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MeResponse {
    PlanType type;
    int planMaxMessages;
    int totalBotChats;
}
