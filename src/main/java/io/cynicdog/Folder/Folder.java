package io.cynicdog.Folder;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

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
}
