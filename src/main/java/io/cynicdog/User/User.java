package io.cynicdog.User;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    private String username;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @ElementCollection
    @CollectionTable(
            name = "user_sign_in",
            joinColumns = @JoinColumn(name = "username")
    )
    @Column(name = "sign_in_at")
    @JsonIgnore
    private List<LocalDateTime> signInHistory = new ArrayList<>();

    private String githubHome;
    private String avatarUrl;

    public User() {
    }

    public User(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<LocalDateTime> getSignInHistory() {
        return signInHistory;
    }

    public void addSignInHistory(LocalDateTime signInHistory) {
        this.signInHistory.add(signInHistory);
    }

    public String getGithubHome() {
        return githubHome;
    }

    public void setGithubHome(String githubUrl) {
        this.githubHome = githubUrl;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
}
