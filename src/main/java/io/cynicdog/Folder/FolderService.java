package io.cynicdog.Folder;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;
import java.util.Map;

@ApplicationScoped
public class FolderService {

    @Inject
    FolderRepository folderRepository;

    public List<Folder> findAllFolders() {

        return folderRepository.findAllFolders();
    }

    public Folder saveFolder(Folder folder) {

        Folder savedChildWithNullId = null;

        for (Folder child : folder.getChildren()) {
            if (child.getId() == null) {
                // set identity with materialized path over folder directories
                child.setId(folder.getId() + "-" + folder.getChildren().size());
                child.setParent(folder);

                folderRepository.insertFolder(child);
                savedChildWithNullId = child;
            }
        }

        // Insert the parent folder
        folderRepository.insertFolder(folder);

        return savedChildWithNullId;
    }

    public String findFolderPathById(String folderId) {
        return folderRepository.findFolderPathById(folderId);
    }

    public void deleteFolder(Map<String, Folder> payload) {
        folderRepository.delete(payload.get("parent"), payload.get("child"));
    }
}
