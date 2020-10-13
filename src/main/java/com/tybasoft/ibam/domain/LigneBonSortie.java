package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A LigneBonSortie.
 */
@Entity
@Table(name = "ligne_bon_sortie")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LigneBonSortie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "quantite", nullable = false)
    private String quantite;

    @NotNull
    @Column(name = "prix_ht", nullable = false)
    private String prixHt;

    @Column(name = "type")
    private String type;

    @ManyToOne
    @JsonIgnoreProperties(value = "ligneBonSorties", allowSetters = true)
    private Materiel materiel;

    @ManyToOne
    @JsonIgnoreProperties(value = "ligneBonSorties", allowSetters = true)
    private Materiau materiau;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "ligneBonSorties", allowSetters = true)
    private BonSortie bonSortie;

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

    public LigneBonSortie quantite(String quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(String quantite) {
        this.quantite = quantite;
    }

    public String getPrixHt() {
        return prixHt;
    }

    public LigneBonSortie prixHt(String prixHt) {
        this.prixHt = prixHt;
        return this;
    }

    public void setPrixHt(String prixHt) {
        this.prixHt = prixHt;
    }

    public String getType() {
        return type;
    }

    public LigneBonSortie type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Materiel getMateriel() {
        return materiel;
    }

    public LigneBonSortie materiel(Materiel materiel) {
        this.materiel = materiel;
        return this;
    }

    public void setMateriel(Materiel materiel) {
        this.materiel = materiel;
    }

    public Materiau getMateriau() {
        return materiau;
    }

    public LigneBonSortie materiau(Materiau materiau) {
        this.materiau = materiau;
        return this;
    }

    public void setMateriau(Materiau materiau) {
        this.materiau = materiau;
    }

    public BonSortie getBonSortie() {
        return bonSortie;
    }

    public LigneBonSortie bonSortie(BonSortie bonSortie) {
        this.bonSortie = bonSortie;
        return this;
    }

    public void setBonSortie(BonSortie bonSortie) {
        this.bonSortie = bonSortie;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LigneBonSortie)) {
            return false;
        }
        return id != null && id.equals(((LigneBonSortie) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LigneBonSortie{" +
            "id=" + getId() +
            ", quantite='" + getQuantite() + "'" +
            ", prixHt='" + getPrixHt() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
