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
    public Response findAll() {

        var found = tagService.findAll();

        return Response.ok(found).build();
    }

    @GET
    @Path("/{tagName}/posts")
    public Response findPostsByTag(@PathParam("tagName") String tagName) {

        var found = postService.findPostsByTag(tagName);

        return Response.ok(found).build();
    }
}
