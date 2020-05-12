package com.tybasoft.ibam.domain;

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
 * A Unite.
 */
@Entity
@Table(name = "unite")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Unite implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "libelle", nullable = false)
    private String libelle;

    @NotNull
    @Column(name = "symbole", nullable = false)
    private String symbole;

    @Column(name = "description")
    private String description;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private LocalDate dateModif;

    @OneToMany(mappedBy = "unite")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Materiau> materiaus = new HashSet<>();

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

    public Unite libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getSymbole() {
        return symbole;
    }

    public Unite symbole(String symbole) {
        this.symbole = symbole;
        return this;
    }

    public void setSymbole(String symbole) {
        this.symbole = symbole;
    }

    public String getDescription() {
        return description;
    }

    public Unite description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUserModif() {
        return userModif;
    }

    public Unite userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public LocalDate getDateModif() {
        return dateModif;
    }

    public Unite dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
    }

    public Set<Materiau> getMateriaus() {
        return materiaus;
    }

    public Unite materiaus(Set<Materiau> materiaus) {
        this.materiaus = materiaus;
        return this;
    }

    public Unite addMateriau(Materiau materiau) {
        this.materiaus.add(materiau);
        materiau.setUnite(this);
        return this;
    }

    public Unite removeMateriau(Materiau materiau) {
        this.materiaus.remove(materiau);
        materiau.setUnite(null);
        return this;
    }

    public void setMateriaus(Set<Materiau> materiaus) {
        this.materiaus = materiaus;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Unite)) {
            return false;
        }
        return id != null && id.equals(((Unite) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Unite{" +
            "id=" + getId() +
            ", libelle='" + getLibelle() + "'" +
            ", symbole='" + getSymbole() + "'" +
            ", description='" + getDescription() + "'" +
            ", userModif='" + getUserModif() + "'" +
            ", dateModif='" + getDateModif() + "'" +
            "}";
    }
}
