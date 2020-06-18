package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tybasoft.ibam.security.SecurityUtils;

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
 * A BonReception.
 */
@Entity
@Table(name = "bon_reception")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
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

    @NotNull
    @Column(name = "date_livraison", nullable = false)
    private LocalDate dateLivraison;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private LocalDate dateModif;

    @OneToMany(mappedBy = "bonReception")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<LigneBonReception> ligneBonRecs = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("bonReceptions")
    private Depot depot;

    @ManyToOne
    @JsonIgnoreProperties("bonReceptions")
    private Fournisseur fournisseur;

    @ManyToOne
    @JsonIgnoreProperties("bonReceptions")
    private Image image;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not
    // remove
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

    public Set<LigneBonReception> getLigneBonRecs() {
        return ligneBonRecs;
    }

    public BonReception ligneBonRecs(Set<LigneBonReception> ligneBonReceptions) {
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

    public void setLigneBonRecs(Set<LigneBonReception> ligneBonReceptions) {
        this.ligneBonRecs = ligneBonReceptions;
    }

    public Depot getDepot() {
        return depot;
    }

    public BonReception depot(Depot depot) {
        this.depot = depot;
        return this;
    }

    public void setDepot(Depot depot) {
        this.depot = depot;
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

    // Fonction executed when the object is created
    @PrePersist
    public void prePresist() {
        this.dateModif = LocalDate.now();
        this.userModif = SecurityUtils.getCurrentUserLogin().get();
    }

    // Fonction executed when the object is updated
    @PreUpdate
    public void preUpdate() {
        this.dateModif = LocalDate.now();
        this.userModif = SecurityUtils.getCurrentUserLogin().get();
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and
    // setters here, do not remove

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

    @Override
    public String toString() {
        return "BonReception{" + "id=" + getId() + ", livreur='" + getLivreur() + "'" + ", remarques='" + getRemarques()
                + "'" + ", dateLivraison='" + getDateLivraison() + "'" + ", userModif='" + getUserModif() + "'"
                + ", dateModif='" + getDateModif() + "'" + "}";
    }
}
