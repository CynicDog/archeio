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

    public List<Folder> findAllFolders() {
        return em.createQuery("""
                    select f 
                    from Folder f 
                    where f.parent is null order by f.id
                """, Folder.class)
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
                    insert into folders (id, name, parent_id)
                    values (
                        ?1, ?2, ?3
                    )
                    on conflict (id) do nothing 
                """)
                .setParameter(1, folder.getId())
                .setParameter(2, folder.getName())
                .setParameter(3, folder.getParent() != null ? folder.getParent().getId() : null)
                .executeUpdate();

        return folder;
    }

    public String findFolderPathById(String folderId) {
        return (String) em.createNativeQuery("""
                       with recursive folder_path as (
                            select id, cast(name as text) as name, parent_id, cast(name as text) as full_path
                            from folders 
                            where id = ?1
                            union all 
                            select f.id, f.name, f.parent_id, concat(f.name, ' / ', fp.full_path)
                            from folders f 
                            join folder_path fp on f.id = fp.parent_id 
                       )
                       select full_path 
                       from folder_path
                       order by id asc
                       limit 1
                   """)
                .setParameter(1, folderId)
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
