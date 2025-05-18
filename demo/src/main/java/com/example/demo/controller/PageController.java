package com.example.demo.controller;

import com.example.demo.model.MyAppUser;
import com.example.demo.model.MyAppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/readProgress")
@CrossOrigin(origins = "http://localhost:5173") // Consenti richieste dalla URL del frontend
public class PageController {

    @Autowired
    private MyAppUserRepository userRepository;

    @PostMapping("/{bookId}/save")
    public ResponseEntity<String> saveReadingProgress(@PathVariable int bookId, @RequestBody String page) {
        String username = getAuthenticatedUsername();

        MyAppUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (user.getPage() == null) {
            user.setPage(new ArrayList<>(List.of("", "", ""))); // Inizializzazione di default
        }

        // Estensione dinamica della lista per accomodare nuovi ID libro
        while (user.getPage().size() <= bookId) {
            user.getPage().add("");
        }// to be deleted

        if (bookId < 0 || bookId >= user.getPage().size()) {
            return ResponseEntity.badRequest().body("Invalid book ID.");
        }

        List<String> pages = user.getPage();
        pages.set(bookId, page);
        user.setPage(pages);

        userRepository.save(user);

        return ResponseEntity.ok("Progress for book " + (bookId + 1) + " saved successfully!");
    }

    @GetMapping("/{bookId}/get")
    public ResponseEntity<String> getReadingProgress(@PathVariable int bookId) {
        String username = getAuthenticatedUsername();

        MyAppUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (user.getPage() == null || bookId < 0 || bookId >= user.getPage().size()) {
            return ResponseEntity.badRequest().body("Invalid bookId or no progress saved.");
        }

        return ResponseEntity.ok(user.getPage().get(bookId));
    }

    private String getAuthenticatedUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }
}
