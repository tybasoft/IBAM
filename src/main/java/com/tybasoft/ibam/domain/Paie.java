package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tybasoft.ibam.security.SecurityUtils;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;

/**
 * A Paie.
 */
@Entity
@Table(name = "paie")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Paie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "date_paiement", nullable = false)
    private LocalDate datePaiement;

    @NotNull
    @Column(name = "nbr_jour_travail", nullable = false)
    private String nbrJourTravail;

    @NotNull
    @Column(name = "montant_pay", nullable = false)
    private String montantPay;

    @Column(name = "nbr_heur_sup")
    private String nbrHeurSup;

    @Column(name = "date_debut")
    private LocalDate dateDebut;

    @Column(name = "date_fin")
    private LocalDate dateFin;

    @Column(name = "remarques")
    private String remarques;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private LocalDate dateModif;

    @ManyToOne
    @JsonIgnoreProperties("paies")
    private Employe employe;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not
    // remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDatePaiement() {
        return datePaiement;
    }

    public Paie datePaiement(LocalDate datePaiement) {
        this.datePaiement = datePaiement;
        return this;
    }

    public void setDatePaiement(LocalDate datePaiement) {
        this.datePaiement = datePaiement;
    }

    public String getNbrJourTravail() {
        return nbrJourTravail;
    }

    public Paie nbrJourTravail(String nbrJourTravail) {
        this.nbrJourTravail = nbrJourTravail;
        return this;
    }

    public void setNbrJourTravail(String nbrJourTravail) {
        this.nbrJourTravail = nbrJourTravail;
    }

    public String getMontantPay() {
        return montantPay;
    }

    public Paie montantPay(String montantPay) {
        this.montantPay = montantPay;
        return this;
    }

    public void setMontantPay(String montantPay) {
        this.montantPay = montantPay;
    }

    public String getNbrHeurSup() {
        return nbrHeurSup;
    }

    public Paie nbrHeurSup(String nbrHeurSup) {
        this.nbrHeurSup = nbrHeurSup;
        return this;
    }

    public void setNbrHeurSup(String nbrHeurSup) {
        this.nbrHeurSup = nbrHeurSup;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public Paie dateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
        return this;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public Paie dateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
        return this;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public String getRemarques() {
        return remarques;
    }

    public Paie remarques(String remarques) {
        this.remarques = remarques;
        return this;
    }

    public void setRemarques(String remarques) {
        this.remarques = remarques;
    }

    public String getUserModif() {
        return userModif;
    }

    public Paie userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public LocalDate getDateModif() {
        return dateModif;
    }

    public Paie dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
    }

    public Employe getEmploye() {
        return employe;
    }

    public Paie employe(Employe employe) {
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
        if (!(o instanceof Paie)) {
            return false;
        }
        return id != null && id.equals(((Paie) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Paie{" + "id=" + getId() + ", datePaiement='" + getDatePaiement() + "'" + ", nbrJourTravail='"
                + getNbrJourTravail() + "'" + ", montantPay='" + getMontantPay() + "'" + ", nbrHeurSup='"
                + getNbrHeurSup() + "'" + ", dateDebut='" + getDateDebut() + "'" + ", dateFin='" + getDateFin() + "'"
                + ", remarques='" + getRemarques() + "'" + ", userModif='" + getUserModif() + "'" + ", dateModif='"
                + getDateModif() + "'" + "}";
    }
}
