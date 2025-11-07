// java
package com.vencentdev.freelance.service;

import com.vencentdev.freelance.controller.dto.MessageRequest;
import com.vencentdev.freelance.model.Message;
import com.vencentdev.freelance.model.Project;
import com.vencentdev.freelance.model.User;
import com.vencentdev.freelance.repository.MessageRepository;
import com.vencentdev.freelance.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class MessageService {
    private static final Logger logger = LoggerFactory.getLogger(MessageService.class);
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ProjectService projectService;

    public MessageService(MessageRepository messageRepository,
                          UserRepository userRepository,
                          ProjectService projectService) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.projectService = projectService;
    }

    public Message sendMessage(String senderUsername, MessageRequest req) {
        User sender = userRepository.findByUsername(senderUsername)
                .orElseThrow(() -> new NoSuchElementException("Sender not found"));
        User receiver = userRepository.findById(req.getReceiverId())
                .orElseThrow(() -> new NoSuchElementException("Receiver not found"));

        Project project = null;
        if (req.getProjectId() != null) {
            project = projectService.getById(req.getProjectId());
        }

        Message m = new Message();
        m.setSender(sender);
        m.setReceiver(receiver);
        m.setProject(project);
        m.setContent(req.getContent());
        logger.info("User {} sending message to {} (project={})", senderUsername, receiver.getUsername(), req.getProjectId());
        return messageRepository.save(m);
    }

    public List<Message> getInbox(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        return messageRepository.findByReceiverIdOrderByTimestampDesc(user.getId());
    }

    public List<Message> getSent(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        return messageRepository.findBySenderIdOrderByTimestampDesc(user.getId());
    }

    public List<Message> getConversation(String username, Long otherUserId, Long projectId) {
        User me = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        // verify other user exists
        userRepository.findById(otherUserId)
                .orElseThrow(() -> new NoSuchElementException("Other user not found"));
        return messageRepository.findConversation(me.getId(), otherUserId, projectId);
    }
}
