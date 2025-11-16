package com.vencentdev.devmatch.controller;

import com.vencentdev.devmatch.model.Pictures;
import com.vencentdev.devmatch.model.User;
import com.vencentdev.devmatch.service.PicturesService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/pictures")
public class PicturesController {
    private final PicturesService picturesService;

    public PicturesController(PicturesService picturesService) {
        this.picturesService = picturesService;
    }

    // Get pictures by user ID
    @GetMapping("/{userId}")
    public ResponseEntity<Pictures> getPicturesByUserId(@PathVariable Long userId) {
        Optional<Pictures> pictures = picturesService.getPicturesByUserId(userId);
        return pictures.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Save or update pictures
    @PostMapping
    public ResponseEntity<Pictures> saveOrUpdatePictures(@RequestBody Pictures pictures) {
        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = (User) authentication.getPrincipal();

        // Delegate to the service
        Pictures savedPictures = picturesService.saveOrUpdatePictures(pictures, authenticatedUser);
        return ResponseEntity.ok(savedPictures);
    }

    // Delete pictures by user ID
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deletePicturesByUserId(@PathVariable Long userId) {
        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = (User) authentication.getPrincipal();

        // Delegate to the service
        picturesService.deletePicturesByUser(new User(userId), authenticatedUser);
        return ResponseEntity.noContent().build();
    }
}