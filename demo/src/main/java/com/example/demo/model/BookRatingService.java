package com.example.demo.model;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class BookRatingService {
    private final BookRatingRepository bookRatingRepository;

    public BookRatingService(BookRatingRepository bookRatingRepository) {
        this.bookRatingRepository = bookRatingRepository;
    }

    @Transactional
    public void addOrUpdateRating(Long bookId, int newRating, MyAppUser user) {
        BookRating rating = bookRatingRepository.findByBookIdAndUserId(bookId, user.getId())
                .orElse(new BookRating()); // If not found, create a new instance

        rating.setBookId(bookId);
        rating.setRating(newRating);
        rating.setUser(user);
        bookRatingRepository.save(rating); // ✅ Single save() call reduces queries
    }

}
