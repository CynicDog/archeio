package io.cynicdog.Tag;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.Optional;

@ApplicationScoped
public class TagRepository {

    @Inject
    private EntityManager em;

    public Optional<Tag> findByName(String name) {
        return Optional.ofNullable(em.find(Tag.class, name));
    }

    @Transactional
    public void save(Tag tag) {
        if (tag.getName() == null) {
            em.persist(tag);
        } else {
            em.merge(tag);
        }
    }
}
