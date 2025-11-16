package com.vencentdev.devmatch.service;

@Repository
public interface PicturesRepository extends JpaRepository<Pictures, Long> {
  Optional<Pictures> findByUserId(Long userId);

  void updateByUser(User user);
  void deleteByUser(User user);
}