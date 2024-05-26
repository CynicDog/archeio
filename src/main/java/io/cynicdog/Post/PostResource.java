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
    public Response findAll() {

        var found = postService.findAll();

        return Response.ok(found).build();
    }

    @GET
    @Path("/{folderId}")
    public Response findByFolder(@PathParam("folderId") String folderId) {

        var found = postService.findByFolder(folderId);

        return Response.ok(found).build();
    }

    @POST
    @Path("/{postId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response savePost(@PathParam("postId") Long postId, Map<String, Object> payload) {

        var found = postService.savePost(postId, payload);

        return Response.ok(found).build();
    }
}
