package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.MyAppUser;
import com.example.demo.model.MyAppUserRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
public class RegistrationController {

    @Autowired
    private MyAppUserRepository myAppUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping(value = "/req/signup", consumes = "application/json")
    public MyAppUser createUser(@RequestBody MyAppUser user) {
    // Codifica la password
    user.setPassword(passwordEncoder.encode(user.getPassword()));

    // Inizializza l'array di progressi di lettura con tre libri
    user.setPage(new ArrayList<>(List.of("", "", ""))); // Tre libri, tutti inizializzati a ""

    // Salva l'utente nel database
    return myAppUserRepository.save(user);
    }
}
