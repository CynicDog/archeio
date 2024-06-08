package io.cynicdog.Folder;

import io.cynicdog.User.User;
import io.cynicdog.User.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class FolderService {

    @Inject
    FolderRepository folderRepository;

    @Inject
    UserRepository userRepository;

    public List<Folder> findAllFolders(String username) {

        return folderRepository.findAllFolders(username);
    }

    public Folder saveFolder(String username, Folder folder) {

        Folder returnFolder = null;

        User user = userRepository.findByUsername(username).orElseGet(() -> new User(username));

        for (Folder child : folder.getChildren()) {
            if (child.getId() == null) {
                // set identity with materialized path over folder directories
                child.setId(folder.getId() + "-" + folder.getChildren().size());
                child.setParent(folder);
                child.setUser(user);
                child.setCreatedAt(LocalDateTime.now());

                folderRepository.insertFolder(child);
                returnFolder = child;
            }
        }

        // Insert the parent folder
        folder.setUser(user);

        if (folder.getId() == null) {
            // retrieve the root level folders length as inserted folder's id
            folder.setId("folder" + "-" + findAllFolders(username).size());
            folder.setCreatedAt(LocalDateTime.now());

            returnFolder = folder;
        }

        folderRepository.insertFolder(folder);

        return returnFolder;
    }

    public Folder findFolderById(String username, String folderId) {
        return folderRepository
                .findById(username, folderId)
                .orElseThrow(() -> new IllegalStateException("Folder not found for username: " + username + " and folderId: " + folderId));
    }

    public String findFolderPathById(String username, String folderId) {
        return folderRepository.findFolderPathById(username, folderId);
    }

    public Folder deleteFolder(Folder folder) {

        if (folder.getParent() != null) {
            folder.getParent().removeChild(folder);
        }
        folderRepository.delete(folder);

        return folder.getParent();
    }
}
