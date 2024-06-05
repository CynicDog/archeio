package io.cynicdog.Folder;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
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
    @Path("/{username}")
    public Response findAll(@PathParam("username") String username) {

        var found = folderService.findAllFolders(username);

        return Response.ok(found).build();
    }

    @GET
    @Path("/{username}/{folderId}/path")
    public Response findFolderPath(@PathParam("username") String username,
                                   @PathParam("folderId") String folderId) {

        var found = folderService.findFolderPathById(username, folderId);

        return Response.ok(found).build();
    }

    // TODO: add security ops
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{username}")
    @Transactional
    public Response saveFolder(@PathParam("username") String username, Folder folder) {

        var found = folderService.saveFolder(username, folder);

        return Response.ok(found).build();
    }

    // TODO: add security ops
    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
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
