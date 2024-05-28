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

        folder.getChildren().forEach(child -> child.setParent(folder));

        return folderRepository.save(folder);
    }

    public String findFolderPathById(String folderId) {
        return folderRepository.findFolderPathById(folderId);
    }

    public void deleteFolder(Map<String, Folder> payload) {
        folderRepository.delete(payload.get("parent"), payload.get("child"));
    }
}
