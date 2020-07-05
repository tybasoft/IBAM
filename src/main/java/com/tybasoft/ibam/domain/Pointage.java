package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tybasoft.ibam.security.SecurityUtils;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Pointage.
 */
@Entity
@Table(name = "pointage")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
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
    private LocalDate dateModif;

    @ManyToOne
    @JsonIgnoreProperties("pointages")
    private Employe employe;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not
    // remove
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

    public LocalDate getDateModif() {
        return dateModif;
    }

    public Pointage dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(LocalDate dateModif) {
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
        if (!(o instanceof Pointage)) {
            return false;
        }
        return id != null && id.equals(((Pointage) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return ("Pointage{" + "id=" + getId() + ", dateJour='" + getDateJour() + "'" + ", presenceMatin='"
                + isPresenceMatin() + "'" + ", presenceAPM='" + isPresenceAPM() + "'" + ", nbrHeureSup='"
                + getNbrHeureSup() + "'" + ", remarques='" + getRemarques() + "'" + ", userModif='" + getUserModif()
                + "'" + ", dateModif='" + getDateModif() + "'" + "}");
    }

    public Boolean getPresenceMatin() {
        return presenceMatin;
    }

    public Boolean getPresenceAPM() {
        return presenceAPM;
    }
}
