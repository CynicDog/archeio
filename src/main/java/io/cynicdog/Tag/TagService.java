package io.cynicdog.Tag;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

@ApplicationScoped
public class TagService {

    @Inject
    TagRepository tagRepository;

    public List<Tag> findAll(String username) {
        return tagRepository.findAll(username);
    }
}
