package io.cynicdog.Post;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class PostRepository {

    @Inject
    private EntityManager em;

    public List<Post> findAll(String username) {
        return em.createQuery("""
                    select p 
                    from Post p   
                    where p.user.username = :username
                    order by p.timestamp desc     
                """, Post.class)
                .setParameter("username", username)
                .getResultList();
    }

    public Optional<Post> findById(String username, Long postId) {
        try {
            Post post = em.createQuery("""
                select p 
                from Post p 
                where p.user.username = :username
                  and p.id = :postId
            """, Post.class)
                    .setParameter("username", username)
                    .setParameter("postId", postId)
                    .getSingleResult();
            return Optional.of(post);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }

    // materialized path model over hierarchical structure of Folder entity
    public List<Post> findByFolder(String username, String folderId) {
        return em.createQuery("""
                    select p
                    from Post p
                    where p.user.username = :username 
                    and ( p.folder.id = :folderId
                       or p.folder.id like CONCAT(:folderId, '-%'))   
                    order by p.timestamp desc
                """, Post.class)
                .setParameter("username", username)
                .setParameter("folderId", folderId)
                .getResultList();
    }

    public List<Post> findByTag(String username, String tagName) {

        return em.createQuery("""
                    select p 
                    from Post p
                    join p.tags t
                    where t.name = :tagName
                      and t.user.username = :username
                """, Post.class)
                .setParameter("tagName", tagName)
                .setParameter("username", username)
                .getResultList();
    }

    public Post save(Post post) {
        if (post.getId() == null) {
            em.persist(post);
            return post;
        } else {
            return em.merge(post);
        }
    }
}
