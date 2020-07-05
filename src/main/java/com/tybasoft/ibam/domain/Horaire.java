package com.tybasoft.ibam.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.tybasoft.ibam.security.SecurityUtils;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Horaire.
 */
@Entity
@Table(name = "horaire")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Horaire implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "libelle", nullable = false)
    private String libelle;

    @NotNull
    @Column(name = "nbr_heur_par_jr", nullable = false)
    private String nbrHeurParJr;

    @NotNull
    @Column(name = "nbr_jour_par_sem", nullable = false)
    private String nbrJourParSem;

    @Column(name = "heure_debut_jr")
    private String heureDebutJr;

    @Column(name = "heure_fin_jr")
    private String heureFinJr;

    @Column(name = "duree_pause")
    private String dureePause;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private LocalDate dateModif;

    @OneToMany(mappedBy = "horaire")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Projet> projets = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not
    // remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public Horaire libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getNbrHeurParJr() {
        return nbrHeurParJr;
    }

    public Horaire nbrHeurParJr(String nbrHeurParJr) {
        this.nbrHeurParJr = nbrHeurParJr;
        return this;
    }

    public void setNbrHeurParJr(String nbrHeurParJr) {
        this.nbrHeurParJr = nbrHeurParJr;
    }

    public String getNbrJourParSem() {
        return nbrJourParSem;
    }

    public Horaire nbrJourParSem(String nbrJourParSem) {
        this.nbrJourParSem = nbrJourParSem;
        return this;
    }

    public void setNbrJourParSem(String nbrJourParSem) {
        this.nbrJourParSem = nbrJourParSem;
    }

    public String getHeureDebutJr() {
        return heureDebutJr;
    }

    public Horaire heureDebutJr(String heureDebutJr) {
        this.heureDebutJr = heureDebutJr;
        return this;
    }

    public void setHeureDebutJr(String heureDebutJr) {
        this.heureDebutJr = heureDebutJr;
    }

    public String getHeureFinJr() {
        return heureFinJr;
    }

    public Horaire heureFinJr(String heureFinJr) {
        this.heureFinJr = heureFinJr;
        return this;
    }

    public void setHeureFinJr(String heureFinJr) {
        this.heureFinJr = heureFinJr;
    }

    public String getDureePause() {
        return dureePause;
    }

    public Horaire dureePause(String dureePause) {
        this.dureePause = dureePause;
        return this;
    }

    public void setDureePause(String dureePause) {
        this.dureePause = dureePause;
    }

    public String getUserModif() {
        return userModif;
    }

    public Horaire userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public LocalDate getDateModif() {
        return dateModif;
    }

    public Horaire dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
    }

    public Set<Projet> getProjets() {
        return projets;
    }

    public Horaire projets(Set<Projet> projets) {
        this.projets = projets;
        return this;
    }

    public Horaire addProjet(Projet projet) {
        this.projets.add(projet);
        projet.setHoraire(this);
        return this;
    }

    public Horaire removeProjet(Projet projet) {
        this.projets.remove(projet);
        projet.setHoraire(null);
        return this;
    }

    public void setProjets(Set<Projet> projets) {
        this.projets = projets;
    }

    // Fonction executed when the object is created
    @PrePersist
    public void prePresist() {
        this.dateModif = LocalDate.now();
        this.userModif = SecurityUtils.getCurrentUserLogin().get();
    }

    // Fonction executed when the object is updated
    @PreUpdate
    public void preUpdate() {
        this.dateModif = LocalDate.now();
        this.userModif = SecurityUtils.getCurrentUserLogin().get();
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and
    // setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Horaire)) {
            return false;
        }
        return id != null && id.equals(((Horaire) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Horaire{" + "id=" + getId() + ", libelle='" + getLibelle() + "'" + ", nbrHeurParJr='"
                + getNbrHeurParJr() + "'" + ", nbrJourParSem='" + getNbrJourParSem() + "'" + ", heureDebutJr='"
                + getHeureDebutJr() + "'" + ", heureFinJr='" + getHeureFinJr() + "'" + ", dureePause='"
                + getDureePause() + "'" + ", userModif='" + getUserModif() + "'" + ", dateModif='" + getDateModif()
                + "'" + "}";
    }
}
