package com.example.demo.controller;
import com.example.demo.model.BookRating;
import com.example.demo.model.BookRatingRepository;
import com.example.demo.model.MyAppUser;
import com.example.demo.model.MyAppUserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class BookRatingController {

    private final BookRatingRepository bookRatingRepository;
    private final MyAppUserRepository userRepository; // Inject User Repository

    public BookRatingController(BookRatingRepository bookRatingRepository, MyAppUserRepository userRepository) {
        this.bookRatingRepository = bookRatingRepository;
        this.userRepository = userRepository; // Ensure it's correctly instantiated
    }

    @PostMapping("/{bookId}/rate")
    public BookRating rateBook(@PathVariable Long bookId, @RequestBody BookRating bookRating) {
        String username = getAuthenticatedUsername(); // Retrieve authenticated user
        MyAppUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Optional<BookRating> existingRating = bookRatingRepository.findByBookIdAndUserId(bookId, user.getId());

        if (existingRating.isPresent()) {
            // Update existing rating for this user
            BookRating rating = existingRating.get();
            rating.setRating(bookRating.getRating());
            return bookRatingRepository.save(rating);
        } else {
            // Create a new rating for this book & user
            bookRating.setBookId(bookId);
            bookRating.setUser(user); // ✅ Ensure authenticated user is set before saving
            return bookRatingRepository.save(bookRating);
        }
    }

    private String getAuthenticatedUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }


    @GetMapping("/{bookId}/rating")
    public ResponseEntity<Double> getRating(@PathVariable Long bookId) {
        Double avgRating = bookRatingRepository.findAverageRatingByBookId(bookId);
        return ResponseEntity.ok(avgRating);
    }
}
