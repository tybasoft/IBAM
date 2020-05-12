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
 * A LigneBonCommande.
 */
@Entity
@Table(name = "ligne_bon_commande")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class LigneBonCommande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "quantite", nullable = false)
    private String quantite;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private LocalDate dateModif;

    @ManyToOne
    @JsonIgnoreProperties("ligneBonComs")
    private BonCommande bonCommande;

    @ManyToOne
    @JsonIgnoreProperties("ligneBonComs")
    private Materiau materiau;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuantite() {
        return quantite;
    }

    public LigneBonCommande quantite(String quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(String quantite) {
        this.quantite = quantite;
    }

    public String getUserModif() {
        return userModif;
    }

    public LigneBonCommande userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public LocalDate getDateModif() {
        return dateModif;
    }

    public LigneBonCommande dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
    }

    public BonCommande getBonCommande() {
        return bonCommande;
    }

    public LigneBonCommande bonCommande(BonCommande bonCommande) {
        this.bonCommande = bonCommande;
        return this;
    }

    public void setBonCommande(BonCommande bonCommande) {
        this.bonCommande = bonCommande;
    }

    public Materiau getMateriau() {
        return materiau;
    }

    public LigneBonCommande materiau(Materiau materiau) {
        this.materiau = materiau;
        return this;
    }

    public void setMateriau(Materiau materiau) {
        this.materiau = materiau;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LigneBonCommande)) {
            return false;
        }
        return id != null && id.equals(((LigneBonCommande) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "LigneBonCommande{" +
            "id=" + getId() +
            ", quantite='" + getQuantite() + "'" +
            ", userModif='" + getUserModif() + "'" +
            ", dateModif='" + getDateModif() + "'" +
            "}";
    }
}
