package com.tybasoft.ibam.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A StockDisponible.
 */
@Entity
@Table(name = "stock_disponible")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class StockDisponible implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date_stock", nullable = false)
    private LocalDate dateStock;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "remarque")
    private String remarque;

    @Column(name = "date_modif")
    private LocalDate dateModif;

    @Column(name = "quantite")
    private String quantite;

    @OneToOne
    @JoinColumn(unique = true)
    private Materiel materiel;

    @OneToOne
    @JoinColumn(unique = true)
    private Materiau materiau;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateStock() {
        return dateStock;
    }

    public StockDisponible dateStock(LocalDate dateStock) {
        this.dateStock = dateStock;
        return this;
    }

    public void setDateStock(LocalDate dateStock) {
        this.dateStock = dateStock;
    }

    public String getUserModif() {
        return userModif;
    }

    public StockDisponible userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public String getRemarque() {
        return remarque;
    }

    public StockDisponible remarque(String remarque) {
        this.remarque = remarque;
        return this;
    }

    public void setRemarque(String remarque) {
        this.remarque = remarque;
    }

    public LocalDate getDateModif() {
        return dateModif;
    }

    public StockDisponible dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
    }

    public String getQuantite() {
        return quantite;
    }

    public StockDisponible quantite(String quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(String quantite) {
        this.quantite = quantite;
    }

    public Materiel getMateriel() {
        return materiel;
    }

    public StockDisponible materiel(Materiel materiel) {
        this.materiel = materiel;
        return this;
    }

    public void setMateriel(Materiel materiel) {
        this.materiel = materiel;
    }

    public Materiau getMateriau() {
        return materiau;
    }

    public StockDisponible materiau(Materiau materiau) {
        this.materiau = materiau;
        return this;
    }

    public void setMateriau(Materiau materiau) {
        this.materiau = materiau;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StockDisponible)) {
            return false;
        }
        return id != null && id.equals(((StockDisponible) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StockDisponible{" +
            "id=" + getId() +
            ", dateStock='" + getDateStock() + "'" +
            ", userModif='" + getUserModif() + "'" +
            ", remarque='" + getRemarque() + "'" +
            ", dateModif='" + getDateModif() + "'" +
            ", quantite='" + getQuantite() + "'" +
            "}";
    }
}
