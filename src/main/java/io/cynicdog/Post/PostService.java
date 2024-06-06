package io.cynicdog.Post;

import io.cynicdog.Folder.Folder;
import io.cynicdog.Folder.FolderRepository;
import io.cynicdog.Tag.Tag;
import io.cynicdog.Tag.TagRepository;
import io.cynicdog.User.User;
import io.cynicdog.User.UserRepository;
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

    @Inject
    UserRepository userRepository;

    public List<Post> findAll(String username) {
        return postRepository.findAll(username);
    }

    public List<Post> findByFolder(String username, String folderId) {

        return postRepository.findByFolder(username, folderId);
    }

    public List<Post> findPostsByTag(String username, String tagName) {

        return postRepository.findByTag(username, tagName);
    }

    public Post savePost(String username, Long postId, Map<String, Object> payload) {

        User user = userRepository.findByUsername(username).orElseGet(() -> new User(username));

        Post post = postRepository
                .findById(username, postId)
                .orElseGet(() ->
                        new Post(
                                folderRepository.findById(username, (String) payload.get("folderId")).orElse(null),
                                user
                        )
                );

        String content = (String) payload.get("content");
        post.setContent(content);

        List<String> tagNames = (List<String>) payload.get("tags");
        if (tagNames != null) {
            updateTags(user, post, tagNames);
        }

        Post saved = postRepository.save(post);

        return saved;
    }

    public void updateTags(User user, Post post, List<String> tagNames) {
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
                            Tag newTag = new Tag(tagName, user);
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
