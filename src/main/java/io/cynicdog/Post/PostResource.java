package io.cynicdog.Post;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Map;

@Path("/api/post")
@Produces(MediaType.APPLICATION_JSON)
public class PostResource {

    @Inject
    PostService postService;

    @GET
    @Path("/{username}")
    public Response findAll(@PathParam("username") String username) {

        var found = postService.findAll(username);

        return Response.ok(found).build();
    }

    @GET
    @Path("/{username}/{folderId}")
    public Response findByFolder(@PathParam("username") String username,
                                 @PathParam("folderId") String folderId) {

        var found = postService.findByFolder(username, folderId);

        return Response.ok(found).build();
    }

    @POST
    @Path("/{username}/{postId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response savePost(@PathParam("username") String username,
                             @PathParam("postId") Long postId,
                             Map<String, Object> payload) {

        var found = postService.savePost(username, postId, payload);

        return Response.ok(found).build();
    }
}
