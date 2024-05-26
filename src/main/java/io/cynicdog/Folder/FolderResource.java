package io.cynicdog.Folder;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Map;

@Path("/api/folder")
@Produces(MediaType.APPLICATION_JSON)
public class FolderResource {

    @Inject
    FolderService folderService;

    @GET
    public Response findAll() {

        var found = folderService.findAllFolders();

        return Response.ok(found).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveFolder(Folder folder) {

        var found = folderService.saveFolder(folder);

        return Response.ok(found).build();
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteFolder(Map<String, Folder> payload) {
        try {
            folderService.deleteFolder(payload);
            return Response.ok().build();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(e.getMessage()).build();
        }
    }
}
