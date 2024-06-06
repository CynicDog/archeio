package io.cynicdog.Tag;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.cynicdog.Post.Post;
import io.cynicdog.User.User;
import jakarta.persistence.*;
import java.util.*;

@Entity
public class Tag {

    @Id
    private String name;

    @ManyToMany(mappedBy = "tags")
    @JsonIgnore
    private List<Post> posts = new ArrayList<>();

    @ManyToOne
    @JsonIgnore
    private User user;

    public Tag() {
    }

    public Tag(String name, User user) {
        this.name = name;
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void removePost(Post post) {
        this.posts.remove(post);
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
