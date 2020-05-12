package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A BonCommande.
 */
@Entity
@Table(name = "bon_commande")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BonCommande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date_prev_liv")
    private LocalDate datePrevLiv;

    @Column(name = "remarques")
    private String remarques;

    @NotNull
    @Column(name = "date_creation", nullable = false)
    private LocalDate dateCreation;

    @Column(name = "valide")
    private Boolean valide;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private LocalDate dateModif;

    @OneToMany(mappedBy = "bonCommande")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<LigneBonCommande> ligneBonComs = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("bonCommandes")
    private Depot depot;

    @ManyToOne
    @JsonIgnoreProperties("bonCommandes")
    private Fournisseur fournisseur;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDatePrevLiv() {
        return datePrevLiv;
    }

    public BonCommande datePrevLiv(LocalDate datePrevLiv) {
        this.datePrevLiv = datePrevLiv;
        return this;
    }

    public void setDatePrevLiv(LocalDate datePrevLiv) {
        this.datePrevLiv = datePrevLiv;
    }

    public String getRemarques() {
        return remarques;
    }

    public BonCommande remarques(String remarques) {
        this.remarques = remarques;
        return this;
    }

    public void setRemarques(String remarques) {
        this.remarques = remarques;
    }

    public LocalDate getDateCreation() {
        return dateCreation;
    }

    public BonCommande dateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
        return this;
    }

    public void setDateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Boolean isValide() {
        return valide;
    }

    public BonCommande valide(Boolean valide) {
        this.valide = valide;
        return this;
    }

    public void setValide(Boolean valide) {
        this.valide = valide;
    }

    public String getUserModif() {
        return userModif;
    }

    public BonCommande userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public LocalDate getDateModif() {
        return dateModif;
    }

    public BonCommande dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
    }

    public Set<LigneBonCommande> getLigneBonComs() {
        return ligneBonComs;
    }

    public BonCommande ligneBonComs(Set<LigneBonCommande> ligneBonCommandes) {
        this.ligneBonComs = ligneBonCommandes;
        return this;
    }

    public BonCommande addLigneBonCom(LigneBonCommande ligneBonCommande) {
        this.ligneBonComs.add(ligneBonCommande);
        ligneBonCommande.setBonCommande(this);
        return this;
    }

    public BonCommande removeLigneBonCom(LigneBonCommande ligneBonCommande) {
        this.ligneBonComs.remove(ligneBonCommande);
        ligneBonCommande.setBonCommande(null);
        return this;
    }

    public void setLigneBonComs(Set<LigneBonCommande> ligneBonCommandes) {
        this.ligneBonComs = ligneBonCommandes;
    }

    public Depot getDepot() {
        return depot;
    }

    public BonCommande depot(Depot depot) {
        this.depot = depot;
        return this;
    }

    public void setDepot(Depot depot) {
        this.depot = depot;
    }

    public Fournisseur getFournisseur() {
        return fournisseur;
    }

    public BonCommande fournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
        return this;
    }

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BonCommande)) {
            return false;
        }
        return id != null && id.equals(((BonCommande) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "BonCommande{" +
            "id=" + getId() +
            ", datePrevLiv='" + getDatePrevLiv() + "'" +
            ", remarques='" + getRemarques() + "'" +
            ", dateCreation='" + getDateCreation() + "'" +
            ", valide='" + isValide() + "'" +
            ", userModif='" + getUserModif() + "'" +
            ", dateModif='" + getDateModif() + "'" +
            "}";
    }
}
