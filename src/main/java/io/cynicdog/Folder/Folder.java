package io.cynicdog.Folder;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.cynicdog.User.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "folders")
public class Folder {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JsonIgnore
    private Folder parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OrderBy("id asc")
    private Set<Folder> children = new HashSet<>();

    @ManyToOne
    @JsonIgnore
    private User user;

    @CreationTimestamp
    private LocalDateTime createdAt;

    // TODO configure composite primary key over materialized folder path and username
    // @Embeddable
    static class compositePrimaryKeys implements Serializable {
        private String id;
        private String username;
    }

    public Folder() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Folder getParent() {
        return parent;
    }

    public void setParent(Folder parent) {
        this.parent = parent;
    }

    public Set<Folder> getChildren() {
        return children;
    }

    public void removeChild(Folder child) {
        children.remove(child);
    }

    public void addSubFolders(Folder subFolder) {
        this.children.add(subFolder);
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
