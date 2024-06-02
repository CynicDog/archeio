package io.cynicdog.User;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    private String userPrincipalName;

    public User() {
    }

    public User(String userPrincipalName) {
        this.userPrincipalName = userPrincipalName;
    }

    public String getUserPrincipalName() {
        return userPrincipalName;
    }

    public void setUserPrincipalName(String username) {
        this.userPrincipalName = username;
    }
}
