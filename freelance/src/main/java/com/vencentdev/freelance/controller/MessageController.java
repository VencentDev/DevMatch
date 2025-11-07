// java
package com.vencentdev.freelance.controller;

import com.vencentdev.freelance.controller.dto.MessageRequest;
import com.vencentdev.freelance.controller.dto.MessageResponse;
import com.vencentdev.freelance.model.Message;
import com.vencentdev.freelance.service.MessageService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private static final Logger logger = LoggerFactory.getLogger(MessageController.class);
    private final MessageService messageService;

    public MessageController(MessageService messageService) { this.messageService = messageService; }

    @PostMapping
    public ResponseEntity<?> send(@Valid @RequestBody MessageRequest req, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        String username = authentication.getName();
        try {
            Message msg = messageService.sendMessage(username, req);
            return ResponseEntity.status(201).body(Map.of("message", "Sent", "id", msg.getId()));
        } catch (Exception e) {
            logger.error("Send message failed", e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/inbox")
    public ResponseEntity<?> inbox(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        String username = authentication.getName();
        List<MessageResponse> resp = messageService.getInbox(username).stream().map(this::map).collect(Collectors.toList());
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/sent")
    public ResponseEntity<?> sent(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        String username = authentication.getName();
        List<MessageResponse> resp = messageService.getSent(username).stream().map(this::map).collect(Collectors.toList());
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/conversation/{otherUserId}")
    public ResponseEntity<?> conversation(@PathVariable Long otherUserId,
                                          @RequestParam(required = false) Long projectId,
                                          Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        String username = authentication.getName();
        try {
            List<MessageResponse> resp = messageService.getConversation(username, otherUserId, projectId)
                    .stream().map(this::map).collect(Collectors.toList());
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            logger.error("Conversation fetch failed", e);
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }

    private MessageResponse map(Message m) {
        MessageResponse r = new MessageResponse();
        r.setId(m.getId());
        r.setSenderId(m.getSender().getId());
        r.setSenderUsername(m.getSender().getUsername());
        r.setReceiverId(m.getReceiver().getId());
        r.setReceiverUsername(m.getReceiver().getUsername());
        r.setProjectId(m.getProject() == null ? null : m.getProject().getId());
        r.setContent(m.getContent());
        r.setTimestamp(m.getTimestamp());
        return r;
    }
}
