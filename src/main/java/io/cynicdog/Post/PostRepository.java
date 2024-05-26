package io.cynicdog.Post;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class PostRepository {

    @Inject
    private EntityManager em;

    public List<Post> findAll() {
        return em.createQuery("""
                    select p 
                    from Post p        
                """, Post.class)
                .getResultList();
    }

    public Optional<Post> findById(Long postId) {
        return Optional.ofNullable(em.find(Post.class, postId));
    }

    public List<Post> findByFolder(String folderId) {

        return em.createQuery("""
                    select p 
                    from Post p 
                    where p.folder.parent.id = :folderId 
                       or p.folder.id = :folderId 
                """, Post.class)
                .setParameter("folderId", folderId)
                .getResultList();
    }

    public List<Post> findByTag(String tagName) {

        return em.createQuery("""
                    select p 
                    from Post p
                    join p.tags t
                    where t.name = :tagName
                """, Post.class)
                .setParameter("tagName", tagName)
                .getResultList();
    }

    @Transactional
    public Post save(Post post) {
        if (post.getId() == null) {
            em.persist(post);
            return post;
        } else {
            return em.merge(post);
        }
    }
}
