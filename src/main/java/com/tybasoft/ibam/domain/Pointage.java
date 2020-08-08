package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tybasoft.ibam.security.SecurityUtils;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;

/**
 * A Pointage.
 */
@Entity
@Table(name = "pointage")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Pointage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "date_jour", nullable = false)
    private LocalDate dateJour;

    @NotNull
    @Column(name = "presence_matin", nullable = false)
    private Boolean presenceMatin;

    @NotNull
    @Column(name = "presence_apm", nullable = false)
    private Boolean presenceAPM;

    @Column(name = "nbr_heure_sup")
    private String nbrHeureSup;

    @Column(name = "remarques")
    private String remarques;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private Instant dateModif;

    @ManyToOne
    @JsonIgnoreProperties(value = "pointages")
    private Employe employe;

    @ManyToOne
    @JsonIgnoreProperties(value = "pointages")
    private FichePointage fichePointage;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateJour() {
        return dateJour;
    }

    public Pointage dateJour(LocalDate dateJour) {
        this.dateJour = dateJour;
        return this;
    }

    public void setDateJour(LocalDate dateJour) {
        this.dateJour = dateJour;
    }

    public Boolean isPresenceMatin() {
        return presenceMatin;
    }

    public Pointage presenceMatin(Boolean presenceMatin) {
        this.presenceMatin = presenceMatin;
        return this;
    }

    public void setPresenceMatin(Boolean presenceMatin) {
        this.presenceMatin = presenceMatin;
    }

    public Boolean isPresenceAPM() {
        return presenceAPM;
    }

    public Pointage presenceAPM(Boolean presenceAPM) {
        this.presenceAPM = presenceAPM;
        return this;
    }

    public void setPresenceAPM(Boolean presenceAPM) {
        this.presenceAPM = presenceAPM;
    }

    public String getNbrHeureSup() {
        return nbrHeureSup;
    }

    public Pointage nbrHeureSup(String nbrHeureSup) {
        this.nbrHeureSup = nbrHeureSup;
        return this;
    }

    public void setNbrHeureSup(String nbrHeureSup) {
        this.nbrHeureSup = nbrHeureSup;
    }

    public String getRemarques() {
        return remarques;
    }

    public Pointage remarques(String remarques) {
        this.remarques = remarques;
        return this;
    }

    public void setRemarques(String remarques) {
        this.remarques = remarques;
    }

    public String getUserModif() {
        return userModif;
    }

    public Pointage userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public Instant getDateModif() {
        return dateModif;
    }

    public Pointage dateModif(Instant dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(Instant dateModif) {
        this.dateModif = dateModif;
    }

    public Employe getEmploye() {
        return employe;
    }

    public Pointage employe(Employe employe) {
        this.employe = employe;
        return this;
    }

    public void setEmploye(Employe employe) {
        this.employe = employe;
    }

    public FichePointage getFichePointage() {
        return fichePointage;
    }

    public Pointage fichePointage(FichePointage fichePointage) {
        this.fichePointage = fichePointage;
        return this;
    }

    public void setFichePointage(FichePointage fichePointage) {
        this.fichePointage = fichePointage;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pointage)) {
            return false;
        }
        return id != null && id.equals(((Pointage) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pointage{" +
            "id=" + getId() +
            ", dateJour='" + getDateJour() + "'" +
            ", presenceMatin='" + isPresenceMatin() + "'" +
            ", presenceAPM='" + isPresenceAPM() + "'" +
            ", nbrHeureSup='" + getNbrHeureSup() + "'" +
            ", remarques='" + getRemarques() + "'" +
            ", userModif='" + getUserModif() + "'" +
            ", dateModif='" + getDateModif() + "'" +
            "}";
    }
    
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
}
