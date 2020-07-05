package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tybasoft.ibam.security.SecurityUtils;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;
import java.time.LocalDate;

/**
 * A Location.
 */
@Entity
@Table(name = "location")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Location implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "reference", nullable = false)
    private String reference;

    @NotNull
    @Column(name = "date_debut", nullable = false)
    private LocalDate dateDebut;

    @Column(name = "date_fin")
    private LocalDate dateFin;

    @NotNull
    @Column(name = "tarif", nullable = false)
    private String tarif;

    @Column(name = "dure_location")
    private String dureLocation;

    @Column(name = "montant_location")
    private String montantLocation;

    @Column(name = "remarque")
    private String remarque;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private Instant dateModif;

    @ManyToOne
    @JsonIgnoreProperties("locations")
    private Materiel materiel;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReference() {
        return reference;
    }

    public Location reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public Location dateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
        return this;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public Location dateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
        return this;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public String getTarif() {
        return tarif;
    }

    public Location tarif(String tarif) {
        this.tarif = tarif;
        return this;
    }

    public void setTarif(String tarif) {
        this.tarif = tarif;
    }

    public String getDureLocation() {
        return dureLocation;
    }

    public Location dureLocation(String dureLocation) {
        this.dureLocation = dureLocation;
        return this;
    }

    public void setDureLocation(String dureLocation) {
        this.dureLocation = dureLocation;
    }

    public String getMontantLocation() {
        return montantLocation;
    }

    public Location montantLocation(String montantLocation) {
        this.montantLocation = montantLocation;
        return this;
    }

    public void setMontantLocation(String montantLocation) {
        this.montantLocation = montantLocation;
    }

    public String getRemarque() {
        return remarque;
    }

    public Location remarque(String remarque) {
        this.remarque = remarque;
        return this;
    }

    public void setRemarque(String remarque) {
        this.remarque = remarque;
    }

    public String getUserModif() {
        return userModif;
    }

    public Location userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public Instant getDateModif() {
        return dateModif;
    }

    public Location dateModif(Instant dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(Instant dateModif) {
        this.dateModif = dateModif;
    }

    public Materiel getMateriel() {
        return materiel;
    }

    public Location materiel(Materiel materiel) {
        this.materiel = materiel;
        return this;
    }

    public void setMateriel(Materiel materiel) {
        this.materiel = materiel;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Location)) {
            return false;
        }
        return id != null && id.equals(((Location) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Location{" +
            "id=" + getId() +
            ", reference='" + getReference() + "'" +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            ", tarif='" + getTarif() + "'" +
            ", dureLocation='" + getDureLocation() + "'" +
            ", montantLocation='" + getMontantLocation() + "'" +
            ", remarque='" + getRemarque() + "'" +
            ", userModif='" + getUserModif() + "'" +
            ", dateModif='" + getDateModif() + "'" +
            "}";
    }
    
    @PrePersist
    public void onCreate(){
        userModif= SecurityUtils.getCurrentUserLogin().get();
        dateModif= Instant.now();
    }
    @PreUpdate
    public void onUpdate(){
        userModif= SecurityUtils.getCurrentUserLogin().get();
        dateModif= Instant.now();
    }
}
