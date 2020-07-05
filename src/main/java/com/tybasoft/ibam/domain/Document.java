package com.tybasoft.ibam.domain;

import com.tybasoft.ibam.security.SecurityUtils;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Document.
 */
@Entity
@Table(name = "document")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "titre", nullable = false)
    private String titre;

    @NotNull
    @Column(name = "type", nullable = false)
    private String type;

    @NotNull
    @Column(name = "path", nullable = false)
    private String path;

    @Column(name = "commentaire")
    private String commentaire;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private Instant dateModif;

    @PrePersist
    public void onCreate() {
        userModif = SecurityUtils.getCurrentUserLogin().get();
        dateModif = Instant.now();
    }

    @PreUpdate
    public void onUpdate() {
        userModif = SecurityUtils.getCurrentUserLogin().get();
        dateModif = Instant.now();
    }

    @OneToMany(mappedBy = "document")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Materiel> materiels = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not
    // remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public Document titre(String titre) {
        this.titre = titre;
        return this;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getType() {
        return type;
    }

    public Document type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPath() {
        return path;
    }

    public Document path(String path) {
        this.path = path;
        return this;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public Document commentaire(String commentaire) {
        this.commentaire = commentaire;
        return this;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public String getUserModif() {
        return userModif;
    }

    public Document userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public Instant getDateModif() {
        return dateModif;
    }

    public Document dateModif(Instant dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(Instant dateModif) {
        this.dateModif = dateModif;
    }

    public Set<Materiel> getMateriels() {
        return materiels;
    }

    public Document materiels(Set<Materiel> materiels) {
        this.materiels = materiels;
        return this;
    }

    public Document addMateriel(Materiel materiel) {
        this.materiels.add(materiel);
        materiel.setDocument(this);
        return this;
    }

    public Document removeMateriel(Materiel materiel) {
        this.materiels.remove(materiel);
        materiel.setDocument(null);
        return this;
    }

    public void setMateriels(Set<Materiel> materiels) {
        this.materiels = materiels;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and
    // setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Document)) {
            return false;
        }
        return id != null && id.equals(((Document) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Document{" + "id=" + getId() + ", titre='" + getTitre() + "'" + ", type='" + getType() + "'"
                + ", path='" + getPath() + "'" + ", commentaire='" + getCommentaire() + "'" + ", userModif='"
                + getUserModif() + "'" + ", dateModif='" + getDateModif() + "'" + "}";
    }
}
