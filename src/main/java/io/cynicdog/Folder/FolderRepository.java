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
    public Folder createFolder(Folder folder) {

        em.persist(folder);
        return folder;
    }
}
