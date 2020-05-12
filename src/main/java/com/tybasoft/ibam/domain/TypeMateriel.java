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
 * A TypeMateriel.
 */
@Entity
@Table(name = "type_materiel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TypeMateriel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private LocalDate dateModif;

    @OneToMany(mappedBy = "typeMateriel")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Materiel> materiels = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public TypeMateriel type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUserModif() {
        return userModif;
    }

    public TypeMateriel userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public LocalDate getDateModif() {
        return dateModif;
    }

    public TypeMateriel dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
    }

    public Set<Materiel> getMateriels() {
        return materiels;
    }

    public TypeMateriel materiels(Set<Materiel> materiels) {
        this.materiels = materiels;
        return this;
    }

    public TypeMateriel addMateriel(Materiel materiel) {
        this.materiels.add(materiel);
        materiel.setTypeMateriel(this);
        return this;
    }

    public TypeMateriel removeMateriel(Materiel materiel) {
        this.materiels.remove(materiel);
        materiel.setTypeMateriel(null);
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
        if (!(o instanceof TypeMateriel)) {
            return false;
        }
        return id != null && id.equals(((TypeMateriel) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TypeMateriel{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", userModif='" + getUserModif() + "'" +
            ", dateModif='" + getDateModif() + "'" +
            "}";
    }
}
