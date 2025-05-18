package com.example.demo.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class MyAppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String email;
    private String password;

    // NEW CODE 4 READING PROGRESS
    @ElementCollection
    @CollectionTable(name = "numbers_table", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    @OrderColumn(name = "book")
    @Column(name = "page")
    private List<String> page;
    public List<String> getPage() {
        return page;
    }
    public void setPage(List<String> page) {
        this.page = page;
    }
    //NEW CODE 4 READING PROGRESS

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}