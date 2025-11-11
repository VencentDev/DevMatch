package com.vencentdev.devmatch.model;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    public Role(){}

    public Role(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public Long getId(){
        return id;
    }
    public void setName(String name){
        this.name = name;
    }

}
