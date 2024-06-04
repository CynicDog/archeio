package io.cynicdog.User;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class UserService {

    @Inject
    UserRepository userRepository;

    public User findByUsername(String username) {

        return userRepository
                .findByUsername(username)
                .orElseGet(() -> new User(username));
    }

    public void save(User user) {
        userRepository.save(user);
    }
}
