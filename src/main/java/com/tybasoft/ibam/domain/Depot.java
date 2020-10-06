package com.tybasoft.ibam.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.tybasoft.ibam.security.SecurityUtils;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Depot.
 */
@Entity
@Table(name = "depot")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Depot implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "libelle", nullable = false)
    private String libelle;

    @NotNull
    @Column(name = "adresse", nullable = false)
    private String adresse;

    @Column(name = "tel")
    private String tel;

    @Column(name = "ville")
    private String ville;

    @Column(name = "pays")
    private String pays;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private LocalDate dateModif;

//    @OneToMany(mappedBy = "depot")
//    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
//    private Set<BonCommande> bonCommandes = new HashSet<>();

    @OneToMany(mappedBy = "depot")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<BonReception> bonReceptions = new HashSet<>();

    @OneToMany(mappedBy = "depot")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Projet> projets = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not
    // remove
    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public Depot libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getAdresse() {
        return adresse;
    }

    public Depot adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getTel() {
        return tel;
    }

    public Depot tel(String tel) {
        this.tel = tel;
        return this;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getVille() {
        return ville;
    }

    public Depot ville(String ville) {
        this.ville = ville;
        return this;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getPays() {
        return pays;
    }

    public Depot pays(String pays) {
        this.pays = pays;
        return this;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }

    public String getUserModif() {
        return userModif;
    }

    public Depot userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public LocalDate getDateModif() {
        return dateModif;
    }

    public Depot dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public void setDateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
    }

//    public Set<BonCommande> getBonCommandes() {
//        return bonCommandes;
//    }

//    public Depot bonCommandes(Set<BonCommande> bonCommandes) {
//        this.bonCommandes = bonCommandes;
//        return this;
//    }


//    public void setBonCommandes(Set<BonCommande> bonCommandes) {
//        this.bonCommandes = bonCommandes;
//    }

    public Set<BonReception> getBonReceptions() {
        return bonReceptions;
    }

    public Depot bonReceptions(Set<BonReception> bonReceptions) {
        this.bonReceptions = bonReceptions;
        return this;
    }

    public Depot addBonReception(BonReception bonReception) {
        this.bonReceptions.add(bonReception);
        bonReception.setDepot(this);
        return this;
    }

    public Depot removeBonReception(BonReception bonReception) {
        this.bonReceptions.remove(bonReception);
        bonReception.setDepot(null);
        return this;
    }

    public void setBonReceptions(Set<BonReception> bonReceptions) {
        this.bonReceptions = bonReceptions;
    }

    public Set<Projet> getProjets() {
        return projets;
    }

    public Depot projets(Set<Projet> projets) {
        this.projets = projets;
        return this;
    }

    public Depot addProjet(Projet projet) {
        this.projets.add(projet);
        projet.setDepot(this);
        return this;
    }

    public Depot removeProjet(Projet projet) {
        this.projets.remove(projet);
        projet.setDepot(null);
        return this;
    }

    public void setProjets(Set<Projet> projets) {
        this.projets = projets;
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
        if (!(o instanceof Depot)) {
            return false;
        }
        return id != null && id.equals(((Depot) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Depot{" +
            "id=" + id +
            ", libelle='" + libelle + '\'' +
            ", adresse='" + adresse + '\'' +
            ", tel='" + tel + '\'' +
            ", ville='" + ville + '\'' +
            ", pays='" + pays + '\'' +
            ", userModif='" + userModif + '\'' +
            ", dateModif=" + dateModif +
            ", latitude=" + latitude +
            ", longitude=" + longitude +
            '}';
    }
}
