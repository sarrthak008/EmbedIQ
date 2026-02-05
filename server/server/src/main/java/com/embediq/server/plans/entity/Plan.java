package com.embediq.server.plans.entity;

import com.embediq.server.plans.enums.PlanType;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "plans")
public class Plan{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String plan_id;

    @Enumerated(EnumType.STRING)
    private PlanType planType;

    @Positive(message = "price must be grater than zero")
    private double amount;

    @Min(value = 1 ,message = "bot count  minimum is 1")
    @Max(value = 10 , message = "bot count maximum is 10")
    private int bot_count;

    @Min(value = 100, message = "Message count must be at least 100")
    @Max(value = 10000, message = "Message count cannot exceed 10000")
    private int msg_count;


    @CreationTimestamp
    private LocalDateTime createAt;

    @UpdateTimestamp
    private LocalDateTime updateAt;

}
