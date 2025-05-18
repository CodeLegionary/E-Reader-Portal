package com.example.demo.model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BookRatingRepository extends JpaRepository<BookRating, Long> {
    @Query("SELECT AVG(br.rating) FROM BookRating br WHERE br.bookId = :bookId")
    Double findAverageRatingByBookId(@Param("bookId") Long bookId);

    Optional<BookRating> findByBookIdAndUserId(Long bookId, Long userId);
}
