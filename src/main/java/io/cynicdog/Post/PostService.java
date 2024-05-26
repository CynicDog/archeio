package io.cynicdog.Post;

import io.cynicdog.Folder.Folder;
import io.cynicdog.Folder.FolderRepository;
import io.cynicdog.Tag.Tag;
import io.cynicdog.Tag.TagRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Map;

@ApplicationScoped
public class PostService {

    @Inject
    PostRepository postRepository;

    @Inject
    FolderRepository folderRepository;

    @Inject
    TagRepository tagRepository;

    public List<Post> findAll() {
        return postRepository.findAll();
    }

    public List<Post> findByFolder(String folderId) {

        return postRepository.findByFolder(folderId);
    }

    @Transactional
    public Post savePost(Long postId, Map<String, Object> payload) {
        String content = (String) payload.get("content");
        List<String> tagNames = (List<String>) payload.get("tags");

        Post post = postRepository
                .findById(postId)
                .orElse(new Post());

        post.setContent(content);

        for (String tagName : tagNames) {
            Tag tag = tagRepository
                    .findByName(tagName)
                    .orElseGet(() -> {
                        Tag newTag = new Tag(tagName);
                        tagRepository.save(newTag);
                        return newTag;
                    });

            post.addTag(tag);
        }

        return postRepository.save(post);
    }
}
