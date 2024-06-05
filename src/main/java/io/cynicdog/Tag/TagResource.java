package io.cynicdog.Tag;

import io.cynicdog.Post.PostService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/tag")
@Produces(MediaType.APPLICATION_JSON)
public class TagResource {

    @Inject
    TagService tagService;

    @Inject
    PostService postService;

    @GET
    @Path("/{username}")
    public Response findAll(@PathParam("username") String username) {

        var found = tagService.findAll(username);

        return Response.ok(found).build();
    }

    @GET
    @Path("/{username}/{tagName}/posts")
    public Response findPostsByTag(@PathParam("username") String username,
                                   @PathParam("tagName") String tagName) {

        var found = postService.findPostsByTag(username, tagName);

        return Response.ok(found).build();
    }
}
