package com.example.demo.model;
import jakarta.persistence.*;

@Entity
@Table(name = "book_rating", uniqueConstraints = @UniqueConstraint(columnNames = {"book_id", "user_id"}))
public class BookRating {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Each rating belongs to a specific user
    private MyAppUser user;

    @Column(nullable = false) // Keep bookId as reference instead of using a Book entity
    private Long bookId;

    private int rating;

    public Long getId() {
        return id;
    }

    public MyAppUser getUser() {
        return user;
    }

    public void setUser(MyAppUser user) {
        this.user = user;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
