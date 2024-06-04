package io.cynicdog.User;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.time.LocalDateTime;
import java.util.Optional;

@ApplicationScoped
public class UserRepository {

    @Inject
    EntityManager em;

    public Optional<User> findByUsername(String username) {
        return Optional.ofNullable(em.find(User.class, username));
    }

    public void save(User user) {
        if (user.getCreatedAt() == null) {
            user.setCreatedAt(LocalDateTime.now());
            em.persist(user);
        } else {
            em.merge(user);
        }
    }
}
