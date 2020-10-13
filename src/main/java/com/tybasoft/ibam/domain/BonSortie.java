package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

/**
 * A BonSortie.
 */
@Entity
@Table(name = "bon_sortie")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BonSortie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date_sortie", nullable = false)
    private LocalDate dateSortie;

    @Column(name = "date_creation")
    private LocalDate dateCreation;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private LocalDate dateModif;

    @Column(name = "remarques")
    private String remarques;

    @ManyToOne(optional = false)
    @JsonIgnoreProperties(value = "bonSorties", allowSetters = true)
    private Projet projet;

    @OneToMany(mappedBy = "bonSortie")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private List<LigneBonSortie> ligneBonSortie ;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateSortie() {
        return dateSortie;
    }

    public BonSortie dateSortie(LocalDate dateSortie) {
        this.dateSortie = dateSortie;
        return this;
    }

    public List<LigneBonSortie> getLigneBonSortie() {
        return ligneBonSortie;
    }

    public void setLigneBonSortie(List<LigneBonSortie> ligneBonSortie) {
        this.ligneBonSortie = ligneBonSortie;
    }

    public void setDateSortie(LocalDate dateSortie) {
        this.dateSortie = dateSortie;
    }

    public LocalDate getDateCreation() {
        return dateCreation;
    }

    public BonSortie dateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
        return this;
    }

    public void setDateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
    }

    public String getUserModif() {
        return userModif;
    }

    public BonSortie userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public LocalDate getDateModif() {
        return dateModif;
    }

    public BonSortie dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
    }

    public String getRemarques() {
        return remarques;
    }

    public BonSortie remarques(String remarques) {
        this.remarques = remarques;
        return this;
    }

    public void setRemarques(String remarques) {
        this.remarques = remarques;
    }

    public Projet getProjet() {
        return projet;
    }

    public BonSortie projet(Projet projet) {
        this.projet = projet;
        return this;
    }

    public void setProjet(Projet projet) {
        this.projet = projet;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BonSortie)) {
            return false;
        }
        return id != null && id.equals(((BonSortie) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BonSortie{" +
            "id=" + getId() +
            ", dateSortie='" + getDateSortie() + "'" +
            ", dateCreation='" + getDateCreation() + "'" +
            ", userModif='" + getUserModif() + "'" +
            ", dateModif='" + getDateModif() + "'" +
            ", remarques='" + getRemarques() + "'" +
            "}";
    }
}
