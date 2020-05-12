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
 * A Fonction.
 */
@Entity
@Table(name = "fonction")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Fonction implements Serializable {

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

    @Column(name = "competences")
    private String competences;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private LocalDate dateModif;

    @OneToMany(mappedBy = "fonction")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Employe> employes = new HashSet<>();

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

    public Fonction libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getDescription() {
        return description;
    }

    public Fonction description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCompetences() {
        return competences;
    }

    public Fonction competences(String competences) {
        this.competences = competences;
        return this;
    }

    public void setCompetences(String competences) {
        this.competences = competences;
    }

    public String getUserModif() {
        return userModif;
    }

    public Fonction userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public LocalDate getDateModif() {
        return dateModif;
    }

    public Fonction dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
    }

    public Set<Employe> getEmployes() {
        return employes;
    }

    public Fonction employes(Set<Employe> employes) {
        this.employes = employes;
        return this;
    }

    public Fonction addEmploye(Employe employe) {
        this.employes.add(employe);
        employe.setFonction(this);
        return this;
    }

    public Fonction removeEmploye(Employe employe) {
        this.employes.remove(employe);
        employe.setFonction(null);
        return this;
    }

    public void setEmployes(Set<Employe> employes) {
        this.employes = employes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Fonction)) {
            return false;
        }
        return id != null && id.equals(((Fonction) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Fonction{" +
            "id=" + getId() +
            ", libelle='" + getLibelle() + "'" +
            ", description='" + getDescription() + "'" +
            ", competences='" + getCompetences() + "'" +
            ", userModif='" + getUserModif() + "'" +
            ", dateModif='" + getDateModif() + "'" +
            "}";
    }
}
