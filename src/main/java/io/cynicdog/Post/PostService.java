package io.cynicdog.Post;

import io.cynicdog.Folder.Folder;
import io.cynicdog.Folder.FolderRepository;
import io.cynicdog.Tag.Tag;
import io.cynicdog.Tag.TagRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

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

    public List<Post> findPostsByTag(String tagName) {

        return postRepository.findByTag(tagName);
    }

    public Post savePost(Long postId, Map<String, Object> payload) {
        String content = (String) payload.get("content");
        List<String> tagNames = (List<String>) payload.get("tags");

        Post post = postRepository
                .findById(postId)
                .orElseGet(() -> new Post(folderRepository.findById((String) payload.get("folderId")).orElse(null)));

        post.setContent(content);

        if (tagNames != null) {
            updateTags(post, tagNames);
        }

        Post saved = postRepository.save(post);

        return saved;
    }

    public void updateTags(Post post, List<String> tagNames) {
        Set<String> currentTagNames = post.getTags().stream()
                .map(Tag::getName)
                .collect(Collectors.toSet());

        Set<String> newTagNames = new HashSet<>(tagNames);

        // Tags to add
        for (String tagName : newTagNames) {
            if (!currentTagNames.contains(tagName)) {
                Tag tag = tagRepository
                        .findByName(tagName)
                        .orElseGet(() -> {
                            Tag newTag = new Tag(tagName);
                            tagRepository.save(newTag);
                            return newTag;
                        });

                post.addTag(tag);
            }
        }

        // Tags to remove
        for (String tagName : currentTagNames) {
            if (!newTagNames.contains(tagName)) {
                tagRepository
                        .findByName(tagName)
                        .ifPresent(tag -> {
                            // bidirectional reference removal
                            post.removeTag(tag);
                            tag.removePost(post);

                            if (tag.getPosts().isEmpty()) {
                                tagRepository.delete(tag);
                            }
                        });
            }
        }
    }
}
