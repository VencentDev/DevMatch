package com.vencentdev.devmatch.service;

import com.vencentdev.devmatch.model.Pictures;
import com.vencentdev.devmatch.model.User;
import com.vencentdev.devmatch.repository.PicturesRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PicturesService {
    private final PicturesRepository picturesRepository;

    public PicturesService(PicturesRepository picturesRepository) {
        this.picturesRepository = picturesRepository;
    }

    public Optional<Pictures> getPicturesByUserId(Long userId) {
        return picturesRepository.findByUserId(userId);
    }

    public Pictures saveOrUpdatePictures(Pictures pictures, User authenticatedUser) {
        if (!pictures.getUser().getId().equals(authenticatedUser.getId())) {
            throw new IllegalArgumentException("You are not authorized to update this picture.");
        }
        return picturesRepository.save(pictures);
    }

    public void deletePicturesByUser(User user) {
        picturesRepository.deleteById(user.getId());
    }
}
