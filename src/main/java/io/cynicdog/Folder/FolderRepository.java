package io.cynicdog.Folder;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class FolderRepository {

    @Inject
    private EntityManager em;

    public List<Folder> findAllFolders() {
        return em.createQuery("SELECT f FROM Folder f WHERE f.parent IS NULL ORDER BY f.id", Folder.class)
                .getResultList();
    }

    public Optional<Folder> findById(String folderId) {
        return Optional.ofNullable(em.find(Folder.class, folderId));
    }

    @Transactional
    public Folder save(Folder folder) {
        if (folder.getId() == null) {
            em.persist(folder);
            return folder;
        } else {
            return em.merge(folder);
        }
    }

    @Transactional
    public void deleteFolder(Folder parent, Folder child) {
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
