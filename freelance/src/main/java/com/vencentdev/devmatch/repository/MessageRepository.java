// java
package com.vencentdev.devmatch.repository;

import com.vencentdev.devmatch.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByReceiverIdOrderByTimestampDesc(Long receiverId);
    List<Message> findBySenderIdOrderByTimestampDesc(Long senderId);

    @Query("""
        SELECT m FROM Message m
        LEFT JOIN m.project p
        WHERE ((m.sender.id = :u1 AND m.receiver.id = :u2) OR (m.sender.id = :u2 AND m.receiver.id = :u1))
          AND (:projectId IS NULL OR p.id = :projectId)
        ORDER BY m.timestamp
    """)
    List<Message> findConversation(@Param("u1") Long u1,
                                   @Param("u2") Long u2,
                                   @Param("projectId") Long projectId);
}
