package io.cynicdog.Post;

import io.cynicdog.Folder.Folder;
import io.cynicdog.Folder.FolderRepository;
import io.cynicdog.Tag.Tag;
import io.cynicdog.Tag.TagRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Path("/api/post")
@Produces(MediaType.APPLICATION_JSON)
public class PostResource {

    @Inject
    PostRepository postRepository;

    @Inject
    FolderRepository folderRepository;

    @Inject
    TagRepository tagRepository;

    @GET
    public List<Post> findAll() {
        return postRepository.findAll();
    }

    @GET
    @Path("/{folderId}")
    public List<Post> findByFolder(@PathParam("folderId") String folderId) {
        return postRepository.findByFolder(folderId);
    }

    @POST
    @Path("/{folderId}/{postId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Post savePost(@PathParam("folderId") String folderId, @PathParam("postId") Long postId, Map<String, Object> payload) {

        String content = (String) payload.get("content");
        List<String> tagNames = (List<String>) payload.get("tags");

        Folder folder = folderRepository.findById(folderId);

        Post post = postRepository.findById(postId);
        if (post == null) {
            post = new Post();
        }
        post.setContent(content);
        post.setFolder(folder);

        for (String tagName : tagNames) {
            Tag tag = tagRepository.findByName(tagName);
            if (tag == null) {
                tag = new Tag(tagName);
                tagRepository.save(tag);
            }

            post.addTag(tag);
        }

        postRepository.save(post);

        return post;
    }
}
