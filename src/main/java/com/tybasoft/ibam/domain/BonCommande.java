package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * A BonCommande.
 */
@Entity
@Table(name = "bon_commande")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
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
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private List<LigneBonCommande> ligneBonComs ;

    @ManyToOne
    @JsonIgnoreProperties(value = "bonCommandes", allowSetters = true)
    private Fournisseur fournisseur;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "bonCommandes", allowSetters = true)
    private Projet projet;

    // jhipster-needle-entity-add-field - JHipster will add fields here
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

    public void setLigneBonComs(List<LigneBonCommande> ligneBonComs) {
        this.ligneBonComs = ligneBonComs;
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

    public List<LigneBonCommande> getLigneBonComs() {
        return ligneBonComs;
    }

//    public BonCommande ligneBonComs(Set<LigneBonCommande> ligneBonCommandes) {
//        this.ligneBonComs = ligneBonCommandes;
//        return this;
//    }

    public BonCommande addLigneBonCom(LigneBonCommande ligneBonCommande) {
        this.ligneBonComs.add(ligneBonCommande);
        ligneBonCommande.setBonCommande(this);
        return this;
    }
//
    public BonCommande removeLigneBonCom(LigneBonCommande ligneBonCommande) {
        this.ligneBonComs.remove(ligneBonCommande);
        ligneBonCommande.setBonCommande(null);
        return this;
    }

//    public void setLigneBonComs(Set<LigneBonCommande> ligneBonCommandes) {
//        this.ligneBonComs = ligneBonCommandes;
//    }

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

    public Projet getProjet() {
        return projet;
    }

    public BonCommande projet(Projet projet) {
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
        if (!(o instanceof BonCommande)) {
            return false;
        }
        return id != null && id.equals(((BonCommande) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
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
