package io.cynicdog.Folder;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class FolderRepository {

    @Inject
    EntityManager em;

    @Transactional
    public List<Folder> findAllFolders() {
        return em.createQuery("select f from Folder f where f.parent is null order by f.id", Folder.class).getResultList();
    }

    @Transactional
    public Folder findById(String folderId) {
        return em.find(Folder.class, folderId);
    }

    @Transactional
    public Folder save(Folder folder) {

        em.merge(folder);
        return folder;
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
