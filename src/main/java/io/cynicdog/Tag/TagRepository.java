package io.cynicdog.Tag;

import io.cynicdog.Post.Post;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class TagRepository {

    @Inject
    private EntityManager em;

    public Optional<Tag> findByName(String name) {
        return Optional.ofNullable(em.find(Tag.class, name));
    }

    public List<Tag> findAll() {
        return em.createQuery("""
                    select t 
                    from Tag t 
                """, Tag.class)
                .getResultList();
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
