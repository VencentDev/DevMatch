package com.vencentdev.devmatch.model;

@Entity
@Table(name = "pictures")
public class Pictures {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Column(name = "profile_picture_url")
  private String profilePictureUrl;

  @Column(name = "cover_photo_url")
  private String coverPhotoUrl;

}