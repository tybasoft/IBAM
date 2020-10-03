package com.tybasoft.ibam.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A SituationFinanciere.
 */
@Entity
@Table(name = "situation_financiere")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SituationFinanciere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "montant_facture", nullable = false)
    private String montantFacture;

    @NotNull
    @Column(name = "date_facturation", nullable = false)
    private LocalDate dateFacturation;

    @Column(name = "montant_en_cours")
    private String montantEnCours;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Projet projet;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMontantFacture() {
        return montantFacture;
    }

    public SituationFinanciere montantFacture(String montantFacture) {
        this.montantFacture = montantFacture;
        return this;
    }

    public void setMontantFacture(String montantFacture) {
        this.montantFacture = montantFacture;
    }

    public LocalDate getDateFacturation() {
        return dateFacturation;
    }

    public SituationFinanciere dateFacturation(LocalDate dateFacturation) {
        this.dateFacturation = dateFacturation;
        return this;
    }

    public void setDateFacturation(LocalDate dateFacturation) {
        this.dateFacturation = dateFacturation;
    }

    public String getMontantEnCours() {
        return montantEnCours;
    }

    public SituationFinanciere montantEnCours(String montantEnCours) {
        this.montantEnCours = montantEnCours;
        return this;
    }

    public void setMontantEnCours(String montantEnCours) {
        this.montantEnCours = montantEnCours;
    }

    public Projet getProjet() {
        return projet;
    }

    public SituationFinanciere projet(Projet projet) {
        this.projet = projet;
        return this;
    }

    public void setProjet(Projet projet) {
        this.projet = projet;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SituationFinanciere)) {
            return false;
        }
        return id != null && id.equals(((SituationFinanciere) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SituationFinanciere{" +
            "id=" + getId() +
            ", montantFacture='" + getMontantFacture() + "'" +
            ", dateFacturation='" + getDateFacturation() + "'" +
            ", montantEnCours='" + getMontantEnCours() + "'" +
            "}";
    }
}
