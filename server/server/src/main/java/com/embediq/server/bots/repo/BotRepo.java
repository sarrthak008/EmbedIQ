package com.embediq.server.bots.repo;

import com.embediq.server.bots.entity.Bot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BotRepo extends JpaRepository<Bot ,String> {
    @Query("SELECT b FROM Bot b WHERE b.user.user_id = :userId")
    List<Bot> findByOwnerId(@Param("userId") String userId);
    long countBotByIsBotActive(boolean isActive);
}
