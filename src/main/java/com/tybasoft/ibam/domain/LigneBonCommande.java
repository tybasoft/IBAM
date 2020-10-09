package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A LigneBonCommande.
 */
@Entity
@Table(name = "ligne_bon_commande")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
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
    @Column(name = "type")
    private String type;


    @ManyToOne
    @JsonIgnoreProperties(value = "ligneBonComs", allowSetters = true)
    private Materiau materiau;

    @ManyToOne
    @JsonIgnoreProperties(value = "ligneBonCommandes", allowSetters = true)
    private Materiel materiel;

    @ManyToOne(optional = false)
    @JsonIgnoreProperties(value = "ligneBonComs", allowSetters = true)
    private BonCommande bonCommande;

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

    public Materiel getMateriel() {
        return materiel;
    }

    public LigneBonCommande materiel(Materiel materiel) {
        this.materiel = materiel;
        return this;
    }

    public void setMateriel(Materiel materiel) {
        this.materiel = materiel;
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
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

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

    // prettier-ignore
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
