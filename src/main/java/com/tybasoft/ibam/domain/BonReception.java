package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * A BonReception.
 */
@Entity
@Table(name = "bon_reception")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BonReception implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "livreur")
    private String livreur;

    @Column(name = "remarques")
    private String remarques;

    @Column(name = "date_livraison", nullable = false)
    private LocalDate dateLivraison;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private LocalDate dateModif;

    @OneToMany(mappedBy = "bonReception")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private List<LigneBonReception> ligneBonRecs ;

    @ManyToOne
    @JsonIgnoreProperties(value = "bonReceptions", allowSetters = true)
    private Fournisseur fournisseur;

    @ManyToOne
    @JsonIgnoreProperties(value = "bonReceptions", allowSetters = true)
    private Image image;

    @ManyToOne(optional = false)
    @JsonIgnoreProperties(value = "bonReceptions", allowSetters = true)
    private Projet projet;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLivreur() {
        return livreur;
    }

    public BonReception livreur(String livreur) {
        this.livreur = livreur;
        return this;
    }

    public void setLivreur(String livreur) {
        this.livreur = livreur;
    }

    public String getRemarques() {
        return remarques;
    }

    public BonReception remarques(String remarques) {
        this.remarques = remarques;
        return this;
    }

    public void setRemarques(String remarques) {
        this.remarques = remarques;
    }

    public LocalDate getDateLivraison() {
        return dateLivraison;
    }

    public BonReception dateLivraison(LocalDate dateLivraison) {
        this.dateLivraison = dateLivraison;
        return this;
    }

    public void setDateLivraison(LocalDate dateLivraison) {
        this.dateLivraison = dateLivraison;
    }

    public String getUserModif() {
        return userModif;
    }

    public BonReception userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public LocalDate getDateModif() {
        return dateModif;
    }

    public BonReception dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
    }

    public List<LigneBonReception> getLigneBonRecs() {
        return ligneBonRecs;
    }

    public BonReception ligneBonRecs(List<LigneBonReception> ligneBonReceptions) {
        this.ligneBonRecs = ligneBonReceptions;
        return this;
    }

    public BonReception addLigneBonRec(LigneBonReception ligneBonReception) {
        this.ligneBonRecs.add(ligneBonReception);
        ligneBonReception.setBonReception(this);
        return this;
    }

    public BonReception removeLigneBonRec(LigneBonReception ligneBonReception) {
        this.ligneBonRecs.remove(ligneBonReception);
        ligneBonReception.setBonReception(null);
        return this;
    }

    public void setLigneBonRecs(List<LigneBonReception> ligneBonReceptions) {
        this.ligneBonRecs = ligneBonReceptions;
    }

    public Fournisseur getFournisseur() {
        return fournisseur;
    }

    public BonReception fournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
        return this;
    }

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
    }

    public Image getImage() {
        return image;
    }

    public BonReception image(Image image) {
        this.image = image;
        return this;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public Projet getProjet() {
        return projet;
    }

    public BonReception projet(Projet projet) {
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
        if (!(o instanceof BonReception)) {
            return false;
        }
        return id != null && id.equals(((BonReception) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BonReception{" +
            "id=" + getId() +
            ", livreur='" + getLivreur() + "'" +
            ", remarques='" + getRemarques() + "'" +
            ", dateLivraison='" + getDateLivraison() + "'" +
            ", userModif='" + getUserModif() + "'" +
            ", dateModif='" + getDateModif() + "'" +
            "}";
    }
}
