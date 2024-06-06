package io.cynicdog.Folder;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.Query;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class FolderRepository {

    @Inject
    private EntityManager em;

    public List<Folder> findAllFolders(String username) {
        return em.createQuery("""
                    select f 
                    from Folder f 
                    where f.parent.id is null
                      and f.user.username = :username 
                    order by f.createdAt
                """, Folder.class)
                .setParameter("username", username)
                .getResultList();
    }

    public Optional<Folder> findById(String username, String folderId) {
        try {
            Folder folder = em.createQuery(
                            """
                            select f 
                            from Folder f 
                            where f.user.username = :username
                              and f.id = :folderId 
                            """
                            , Folder.class)
                    .setParameter("username", username)
                    .setParameter("folderId", folderId)
                    .getSingleResult();
            return Optional.of(folder);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }

    public Folder save(Folder folder) {
        if (folder.getId() == null) {
            em.persist(folder);
            return folder;
        } else {
            return em.merge(folder);
        }
    }

    public Folder insertFolder(Folder folder) {

        em.createNativeQuery("""
                    insert into folders (id, name, parent_id, user_username, createdat)
                    values (
                        ?1, ?2, ?3, ?4, ?5
                    )
                    on conflict (id, user_username) do nothing 
                """)
                .setParameter(1, folder.getId())
                .setParameter(2, folder.getName())
                .setParameter(3, folder.getParent() != null ? folder.getParent().getId() : null)
                .setParameter(4, folder.getUser().getUsername())
                .setParameter(5, folder.getCreatedAt())
                .executeUpdate();

        return folder;
    }

    public String findFolderPathById(String username, String folderId) {
        return (String) em.createNativeQuery("""
                       with recursive folder_path as (
                            select id, cast(name as text) as name, parent_id, cast(name as text) as full_path
                            from folders 
                            where id = ?1
                              and user_username = ?2  
                            union all 
                            select f.id, f.name, f.parent_id, concat(f.name, ' / ', fp.full_path)
                            from folders f 
                            join folder_path fp on f.id = fp.parent_id 
                            where f.user_username = ?2
                       )
                       select full_path 
                       from folder_path
                       order by id asc
                       limit 1
                   """)
                .setParameter(1, folderId)
                .setParameter(2, username)
                .getSingleResult();
    }

    public void delete(Folder parent, Folder child) {
        if (parent != null && child != null) {
            Folder managedParent = em.find(Folder.class, parent.getId());
            Folder managedChild = em.find(Folder.class, child.getId());

            if (managedParent != null && managedChild != null) {
                managedParent.removeChild(managedChild);
                em.remove(managedChild);
            }
        }
    }
}
