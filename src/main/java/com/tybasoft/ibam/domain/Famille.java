package com.tybasoft.ibam.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * The Famille entity.
 */
@ApiModel(description = "The Famille entity.")
@Entity
@Table(name = "famille")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Famille implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "libelle", nullable = false)
    private String libelle;

    @Column(name = "description")
    private String description;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private LocalDate dateModif;

    @OneToMany(mappedBy = "famille")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Materiau> materiaus = new HashSet<>();

    @OneToMany(mappedBy = "famille")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Materiel> materiels = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public Famille libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getDescription() {
        return description;
    }

    public Famille description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUserModif() {
        return userModif;
    }

    public Famille userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public LocalDate getDateModif() {
        return dateModif;
    }

    public Famille dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
    }

    public Set<Materiau> getMateriaus() {
        return materiaus;
    }

    public Famille materiaus(Set<Materiau> materiaus) {
        this.materiaus = materiaus;
        return this;
    }

    public Famille addMateriau(Materiau materiau) {
        this.materiaus.add(materiau);
        materiau.setFamille(this);
        return this;
    }

    public Famille removeMateriau(Materiau materiau) {
        this.materiaus.remove(materiau);
        materiau.setFamille(null);
        return this;
    }

    public void setMateriaus(Set<Materiau> materiaus) {
        this.materiaus = materiaus;
    }

    public Set<Materiel> getMateriels() {
        return materiels;
    }

    public Famille materiels(Set<Materiel> materiels) {
        this.materiels = materiels;
        return this;
    }

    public Famille addMateriel(Materiel materiel) {
        this.materiels.add(materiel);
        materiel.setFamille(this);
        return this;
    }

    public Famille removeMateriel(Materiel materiel) {
        this.materiels.remove(materiel);
        materiel.setFamille(null);
        return this;
    }

    public void setMateriels(Set<Materiel> materiels) {
        this.materiels = materiels;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Famille)) {
            return false;
        }
        return id != null && id.equals(((Famille) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Famille{" +
            "id=" + getId() +
            ", libelle='" + getLibelle() + "'" +
            ", description='" + getDescription() + "'" +
            ", userModif='" + getUserModif() + "'" +
            ", dateModif='" + getDateModif() + "'" +
            "}";
    }
}
