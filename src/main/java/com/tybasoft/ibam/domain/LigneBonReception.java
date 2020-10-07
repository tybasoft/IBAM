package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A LigneBonReception.
 */
@Entity
@Table(name = "ligne_bon_reception")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LigneBonReception implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "quantite", nullable = false)
    private String quantite;

    @Column(name = "prix_ht")
    private String prixHt;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private LocalDate dateModif;

    @ManyToOne
    @JsonIgnoreProperties(value = "ligneBonRecs", allowSetters = true)
    private BonReception bonReception;

    @ManyToOne
    @JsonIgnoreProperties(value = "ligneBonRecs", allowSetters = true)
    private Materiau materiau;

    @ManyToOne
    @JsonIgnoreProperties(value = "ligneBonReceptions", allowSetters = true)
    private Materiel materiel;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuantite() {
        return quantite;
    }

    public LigneBonReception quantite(String quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(String quantite) {
        this.quantite = quantite;
    }

    public String getPrixHt() {
        return prixHt;
    }

    public LigneBonReception prixHt(String prixHt) {
        this.prixHt = prixHt;
        return this;
    }

    public void setPrixHt(String prixHt) {
        this.prixHt = prixHt;
    }

    public String getUserModif() {
        return userModif;
    }

    public LigneBonReception userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public LocalDate getDateModif() {
        return dateModif;
    }

    public LigneBonReception dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
    }

    public BonReception getBonReception() {
        return bonReception;
    }

    public LigneBonReception bonReception(BonReception bonReception) {
        this.bonReception = bonReception;
        return this;
    }

    public void setBonReception(BonReception bonReception) {
        this.bonReception = bonReception;
    }

    public Materiau getMateriau() {
        return materiau;
    }

    public LigneBonReception materiau(Materiau materiau) {
        this.materiau = materiau;
        return this;
    }

    public void setMateriau(Materiau materiau) {
        this.materiau = materiau;
    }

    public Materiel getMateriel() {
        return materiel;
    }

    public LigneBonReception materiel(Materiel materiel) {
        this.materiel = materiel;
        return this;
    }

    public void setMateriel(Materiel materiel) {
        this.materiel = materiel;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LigneBonReception)) {
            return false;
        }
        return id != null && id.equals(((LigneBonReception) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LigneBonReception{" +
            "id=" + getId() +
            ", quantite='" + getQuantite() + "'" +
            ", prixHt='" + getPrixHt() + "'" +
            ", userModif='" + getUserModif() + "'" +
            ", dateModif='" + getDateModif() + "'" +
            "}";
    }
}
