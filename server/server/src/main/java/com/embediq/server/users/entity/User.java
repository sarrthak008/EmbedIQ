package com.embediq.server.users.entity;


import com.embediq.server.bots.entity.Bot;
import com.embediq.server.plans.entity.Plan;
import com.embediq.server.users.enums.RolesTypes;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

     @Id
     @GeneratedValue(strategy = GenerationType.UUID)
     private String user_id;

     @Email(message = "please enter valid email")
     @Column(unique = true)
     private  String email;

     private String comapny_name;

     private String password;

     @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
     @EqualsAndHashCode.Exclude
     @ToString.Exclude
     private Set<Bot> bots = new HashSet<>();

     @Enumerated(EnumType.STRING)
     private RolesTypes role = RolesTypes.ADMIN;

     @ManyToOne(fetch = FetchType.LAZY)
     @JoinColumn(name = "plan_id", referencedColumnName = "plan_id")
     @EqualsAndHashCode.Exclude
     @ToString.Exclude
     private Plan my_plan;

     @CreationTimestamp
     private LocalDateTime createAt;

     @UpdateTimestamp
     private LocalDateTime updateAt;
}
