package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;

/**
 * A Maintenance.
 */
@Entity
@Table(name = "maintenance")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Maintenance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "reference", nullable = false)
    private String reference;

    @NotNull
    @Column(name = "date_panne", nullable = false)
    private LocalDate datePanne;

    @NotNull
    @Column(name = "frais", nullable = false)
    private String frais;

    @Column(name = "technicien")
    private String technicien;

    @NotNull
    @Column(name = "motif", nullable = false)
    private String motif;

    @Column(name = "probleme_frequent")
    private Boolean problemeFrequent;

    @Column(name = "remarque")
    private String remarque;

    @Column(name = "duree_panne")
    private String dureePanne;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private LocalDate dateModif;

    @ManyToOne
    @JsonIgnoreProperties("maintenances")
    private Materiel materiel;

    @ManyToOne
    @JsonIgnoreProperties("maintenances")
    private CentreMaintenance centreMaintenance;

    @ManyToOne
    @JsonIgnoreProperties("maintenances")
    private Image image;

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

    public Maintenance reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public LocalDate getDatePanne() {
        return datePanne;
    }

    public Maintenance datePanne(LocalDate datePanne) {
        this.datePanne = datePanne;
        return this;
    }

    public void setDatePanne(LocalDate datePanne) {
        this.datePanne = datePanne;
    }

    public String getFrais() {
        return frais;
    }

    public Maintenance frais(String frais) {
        this.frais = frais;
        return this;
    }

    public void setFrais(String frais) {
        this.frais = frais;
    }

    public String getTechnicien() {
        return technicien;
    }

    public Maintenance technicien(String technicien) {
        this.technicien = technicien;
        return this;
    }

    public void setTechnicien(String technicien) {
        this.technicien = technicien;
    }

    public String getMotif() {
        return motif;
    }

    public Maintenance motif(String motif) {
        this.motif = motif;
        return this;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public Boolean isProblemeFrequent() {
        return problemeFrequent;
    }

    public Maintenance problemeFrequent(Boolean problemeFrequent) {
        this.problemeFrequent = problemeFrequent;
        return this;
    }

    public void setProblemeFrequent(Boolean problemeFrequent) {
        this.problemeFrequent = problemeFrequent;
    }

    public String getRemarque() {
        return remarque;
    }

    public Maintenance remarque(String remarque) {
        this.remarque = remarque;
        return this;
    }

    public void setRemarque(String remarque) {
        this.remarque = remarque;
    }

    public String getDureePanne() {
        return dureePanne;
    }

    public Maintenance dureePanne(String dureePanne) {
        this.dureePanne = dureePanne;
        return this;
    }

    public void setDureePanne(String dureePanne) {
        this.dureePanne = dureePanne;
    }

    public String getUserModif() {
        return userModif;
    }

    public Maintenance userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public LocalDate getDateModif() {
        return dateModif;
    }

    public Maintenance dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
    }

    public Materiel getMateriel() {
        return materiel;
    }

    public Maintenance materiel(Materiel materiel) {
        this.materiel = materiel;
        return this;
    }

    public void setMateriel(Materiel materiel) {
        this.materiel = materiel;
    }

    public CentreMaintenance getCentreMaintenance() {
        return centreMaintenance;
    }

    public Maintenance centreMaintenance(CentreMaintenance centreMaintenance) {
        this.centreMaintenance = centreMaintenance;
        return this;
    }

    public void setCentreMaintenance(CentreMaintenance centreMaintenance) {
        this.centreMaintenance = centreMaintenance;
    }

    public Image getImage() {
        return image;
    }

    public Maintenance image(Image image) {
        this.image = image;
        return this;
    }

    public void setImage(Image image) {
        this.image = image;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Maintenance)) {
            return false;
        }
        return id != null && id.equals(((Maintenance) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Maintenance{" +
            "id=" + getId() +
            ", reference='" + getReference() + "'" +
            ", datePanne='" + getDatePanne() + "'" +
            ", frais='" + getFrais() + "'" +
            ", technicien='" + getTechnicien() + "'" +
            ", motif='" + getMotif() + "'" +
            ", problemeFrequent='" + isProblemeFrequent() + "'" +
            ", remarque='" + getRemarque() + "'" +
            ", dureePanne='" + getDureePanne() + "'" +
            ", userModif='" + getUserModif() + "'" +
            ", dateModif='" + getDateModif() + "'" +
            "}";
    }
}
