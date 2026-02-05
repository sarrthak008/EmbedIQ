package com.embediq.server.chats.repo;

import com.embediq.server.chats.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatRepo extends JpaRepository<Chat, String> {
    @Query("SELECT COUNT(c) FROM Chat c WHERE c.bot.bot_id = :botId")
    long countTotalChatsByBotId(@Param("botId") String botId);

    // 2. Chats in the Last 24 Hours
    @Query("SELECT COUNT(c) FROM Chat c WHERE c.bot.bot_id = :botId AND c.created_at >= :since")
    long countRecentChats(@Param("botId") String botId, @Param("since") LocalDateTime since);

    // 3. Last Active (Timestamp of the most recent chat)
    @Query("SELECT MAX(c.created_at) FROM Chat c WHERE c.bot.bot_id = :botId")
    LocalDateTime findLastActiveTimestamp(@Param("botId") String botId);

    @Query(value = "SELECT " +
            "  DATE_FORMAT(created_at, '%Y-%m-%d %H:00:00') AS hour_bucket, " + // Truncates to hour
            "  DATE_FORMAT(created_at, '%H:00') AS time_label, " +            // e.g., "14:00"
            "  COUNT(*) AS chat_count " +
            "FROM chats " +
            "WHERE bot_id = :botId AND created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR) " +
            "GROUP BY hour_bucket, time_label " +
            "ORDER BY hour_bucket ASC", nativeQuery = true)
    List<Object[]> getHourlyActivityWithLabels(@Param("botId") String botId);
    // Notice the underscore between Bot and Bot_id

    @Query("SELECT c FROM Chat c WHERE c.bot.bot_id = :botId AND c.created_at >= :since ORDER BY c.created_at ASC")
    List<Chat> findRecentChatsByBot(@Param("botId") String botId, @Param("since") LocalDateTime since);

}
