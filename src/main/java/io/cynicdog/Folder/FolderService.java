package io.cynicdog.Folder;

import io.cynicdog.User.User;
import io.cynicdog.User.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

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

        Folder savedChildWithNullId = null;

        User user = userRepository.findByUsername(username).orElseGet(() -> new User(username));

        for (Folder child : folder.getChildren()) {
            if (child.getId() == null) {
                // set identity with materialized path over folder directories
                child.setId(folder.getId() + "-" + folder.getChildren().size());
                child.setParent(folder);
                child.setUser(user);

                folderRepository.insertFolder(child);
                savedChildWithNullId = child;
            }
        }

        // Insert the parent folder
        folder.setUser(user);
        folderRepository.insertFolder(folder);

        return savedChildWithNullId;
    }

    public String findFolderPathById(String username, String folderId) {
        return folderRepository.findFolderPathById(username, folderId);
    }

    public void deleteFolder(Map<String, Folder> payload) {
        folderRepository.delete(payload.get("parent"), payload.get("child"));
    }
}
