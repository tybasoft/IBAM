package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A LigneStockDisponible.
 */
@Entity
@Table(name = "ligne_stock_disponible")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LigneStockDisponible implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "quantite", nullable = false)
    private String quantite;

    @Column(name = "type")
    private String type;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "ligneStockDisponibles", allowSetters = true)
    private Materiel materiel;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "ligneStockDisponibles", allowSetters = true)
    private Materiau materiau;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "ligneStockDisponibles", allowSetters = true)
    private StockDisponible stockDisponible;

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

    public LigneStockDisponible quantite(String quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(String quantite) {
        this.quantite = quantite;
    }

    public String getType() {
        return type;
    }

    public LigneStockDisponible type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Materiel getMateriel() {
        return materiel;
    }

    public LigneStockDisponible materiel(Materiel materiel) {
        this.materiel = materiel;
        return this;
    }

    public void setMateriel(Materiel materiel) {
        this.materiel = materiel;
    }

    public Materiau getMateriau() {
        return materiau;
    }

    public LigneStockDisponible materiau(Materiau materiau) {
        this.materiau = materiau;
        return this;
    }

    public void setMateriau(Materiau materiau) {
        this.materiau = materiau;
    }

    public StockDisponible getStockDisponible() {
        return stockDisponible;
    }

    public LigneStockDisponible stockDisponible(StockDisponible stockDisponible) {
        this.stockDisponible = stockDisponible;
        return this;
    }

    public void setStockDisponible(StockDisponible stockDisponible) {
        this.stockDisponible = stockDisponible;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LigneStockDisponible)) {
            return false;
        }
        return id != null && id.equals(((LigneStockDisponible) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LigneStockDisponible{" +
            "id=" + getId() +
            ", quantite='" + getQuantite() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
