package com.embediq.server.bots.entity;


import com.embediq.server.bots.enums.PositionType;
import com.embediq.server.bots.enums.ThemeType;
import com.embediq.server.users.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "bots")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bot {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String bot_id;

    @NotBlank(message = "bot name required")
    private String bot_name;

    private String bot_description;

    @NotBlank(message = "bot data required to handle answers")
    @Size(max = 1000000, message = "Bot data is too large")
    @Lob // Tells JPA to use a 'Large Object' (TEXT/LONGTEXT) in the database
    @Column(columnDefinition = "LONGTEXT") // Ensures the database can actually hold 1M characters
    private String bot_data;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private User user;

    private String domain = "*";

    private  Integer chatCount = 0 ;

    @Enumerated(EnumType.STRING)
    private ThemeType theme = ThemeType.DARK;

    @Enumerated(EnumType.STRING)
    private PositionType position = PositionType.RIGHT_BOTTOM;


    private Boolean isBotActive = true;

    @CreationTimestamp
    private LocalDateTime createAt;

    @UpdateTimestamp
    private LocalDateTime updateAt;

    public void increaseChatCount(){
        this.chatCount ++;
    }
}
