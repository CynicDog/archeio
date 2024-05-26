package io.cynicdog.Post;

import io.cynicdog.Folder.Folder;
import io.cynicdog.Tag.Tag;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.*;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    private Long views;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> comments = new HashSet<>();

    private Long votes;

    @CreationTimestamp
    private Date timestamp;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "post_tag",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_name")
    )
    @OrderBy("name asc")
    private Set<Tag> tags = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "folder_id")
    private Folder folder;

    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getViews() {
        return views;
    }

    public void setViews(Long views) {
        this.views = views;
    }

    public Set<String> getComments() {
        return comments;
    }

    public void setComments(Set<String> comments) {
        this.comments = comments;
    }

    public Long getVotes() {
        return votes;
    }

    public void setVotes(Long votes) {
        this.votes = votes;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public void addTag(Tag tag) {
        this.tags.add(tag);
    }

    public Folder getFolder() {
        return folder;
    }

    public void setFolder(Folder folder) {
        this.folder = folder;
    }
}
