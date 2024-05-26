package io.cynicdog.Post;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class PostRepository {

    @Inject
    EntityManager em;

    @Transactional
    public List<Post> findAll() {
        return em.createQuery("select p from Post p", Post.class).getResultList();
    }

    @Transactional
    public Post findById(Long postId) {
        return em.find(Post.class, postId);
    }

    @Transactional
    public List<Post> findByFolder(String folderId) {
        return em.createQuery("select p from Post p where p.folder.id = :folderId", Post.class)
                .setParameter("folderId", folderId)
                .getResultList();
    }

    @Transactional
    public void save(Post post) {

        em.persist(post);
    }
}
