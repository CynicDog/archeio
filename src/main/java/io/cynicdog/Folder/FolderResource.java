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
    @Path("/{username}/{folderId}")
    @Transactional
    public Response deleteFolder(@PathParam("username") String username,
                                 @PathParam("folderId") String folderId) {
        try {
            var found = folderService.findFolderById(username, folderId);
            var response = folderService.deleteFolder(found);

            return Response.ok(response).build();
        } catch (IllegalStateException e) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .entity(e.getMessage()).build();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(e.getMessage()).build();
        }
    }
}
