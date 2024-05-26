package io.cynicdog.Folder;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;
import java.util.Map;

@Path("/api/folder")
@Produces(MediaType.APPLICATION_JSON)
public class FolderResource {

    @Inject
    FolderRepository folderRepository;

    @GET
    public List<Folder> findAll() {
        return folderRepository.findAllFolders();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Folder saveFolder(Folder folder) {

        folder.getChildren().forEach(child -> child.setParent(folder));

        return folderRepository.save(folder);
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    public void deleteFolder(Map<String, Folder> payload) {
        folderRepository.deleteFolder(payload.get("parent"), payload.get("child"));
    }
}
