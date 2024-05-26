package io.cynicdog.Tag;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class TagRepository {

    @Inject
    EntityManager em;

    @Transactional
    public Tag findByName(String name) {
        return em.find(Tag.class, name);
    }

    @Transactional
    public void save(Tag tag) {
        em.persist(tag);
    }
}
