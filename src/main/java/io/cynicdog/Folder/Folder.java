package io.cynicdog.Folder;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.cynicdog.User.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "folders")
@IdClass(Folder.CompositePrimaryKeys.class)
public class Folder {

    @Id
    private String id;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_username")
    @JsonIgnore
    private User user;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "parent_id", referencedColumnName = "id"),
            @JoinColumn(name = "user_username", referencedColumnName = "user_username")
    })
    @JsonIgnore
    private Folder parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OrderBy("id asc")
    private Set<Folder> children = new HashSet<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    public Folder() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Folder)) return false;
        Folder folder = (Folder) o;
        return id.equals(folder.id) &&
                user.equals(folder.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user);
    }

    static class CompositePrimaryKeys implements Serializable {

        private String id;
        private String user;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getUser() {
            return user;
        }

        public void setUser(String user) {
            this.user = user;
        }
    }
}
