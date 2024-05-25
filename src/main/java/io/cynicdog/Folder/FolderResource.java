package io.cynicdog.Folder;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

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
    public Folder createFolder(Folder folder) {

        folder.getChildren().forEach(child -> child.setParent(folder));

        return folderRepository.createFolder(folder);
    }
}
