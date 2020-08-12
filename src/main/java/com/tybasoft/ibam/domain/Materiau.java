package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tybasoft.ibam.security.SecurityUtils;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Materiau.
 */
@Entity
@Table(name = "materiau")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Materiau implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "libelle", nullable = false)
    private String libelle;

    @NotNull
    @Column(name = "reference", nullable = false)
    private String reference;

    @Column(name = "poids")
    private String poids;

    @Column(name = "volume")
    private String volume;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private LocalDate dateModif;

    @OneToMany(mappedBy = "materiau")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<LigneBonReception> ligneBonRecs = new HashSet<>();

    @OneToMany(mappedBy = "materiau")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<LigneBonCommande> ligneBonComs = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("materiaus")
    private Marque marque;

    @ManyToOne
    @JsonIgnoreProperties("materiaus")
    private Unite unite;

    @ManyToOne
    @JsonIgnoreProperties("materiaus")
    private Famille famille;

    @ManyToOne
    @JsonIgnoreProperties("materiaus")
    private Tva tva;

    @ManyToOne
    @JsonIgnoreProperties("materiaus")
    private Image image;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not
    // remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public Materiau libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getReference() {
        return reference;
    }

    public Materiau reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getPoids() {
        return poids;
    }

    public Materiau poids(String poids) {
        this.poids = poids;
        return this;
    }

    public void setPoids(String poids) {
        this.poids = poids;
    }

    public String getVolume() {
        return volume;
    }

    public Materiau volume(String volume) {
        this.volume = volume;
        return this;
    }

    public void setVolume(String volume) {
        this.volume = volume;
    }

    public String getUserModif() {
        return userModif;
    }

    public Materiau userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public LocalDate getDateModif() {
        return dateModif;
    }

    public Materiau dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
    }

    public Set<LigneBonReception> getLigneBonRecs() {
        return ligneBonRecs;
    }

    public Materiau ligneBonRecs(Set<LigneBonReception> ligneBonReceptions) {
        this.ligneBonRecs = ligneBonReceptions;
        return this;
    }

    public Materiau addLigneBonRec(LigneBonReception ligneBonReception) {
        this.ligneBonRecs.add(ligneBonReception);
        ligneBonReception.setMateriau(this);
        return this;
    }

    public Materiau removeLigneBonRec(LigneBonReception ligneBonReception) {
        this.ligneBonRecs.remove(ligneBonReception);
        ligneBonReception.setMateriau(null);
        return this;
    }

    public void setLigneBonRecs(Set<LigneBonReception> ligneBonReceptions) {
        this.ligneBonRecs = ligneBonReceptions;
    }

    public Set<LigneBonCommande> getLigneBonComs() {
        return ligneBonComs;
    }

    public Materiau ligneBonComs(Set<LigneBonCommande> ligneBonCommandes) {
        this.ligneBonComs = ligneBonCommandes;
        return this;
    }

    public Materiau addLigneBonCom(LigneBonCommande ligneBonCommande) {
        this.ligneBonComs.add(ligneBonCommande);
        ligneBonCommande.setMateriau(this);
        return this;
    }

    public Materiau removeLigneBonCom(LigneBonCommande ligneBonCommande) {
        this.ligneBonComs.remove(ligneBonCommande);
        ligneBonCommande.setMateriau(null);
        return this;
    }

    public void setLigneBonComs(Set<LigneBonCommande> ligneBonCommandes) {
        this.ligneBonComs = ligneBonCommandes;
    }

    public Marque getMarque() {
        return marque;
    }

    public Materiau marque(Marque marque) {
        this.marque = marque;
        return this;
    }

    public void setMarque(Marque marque) {
        this.marque = marque;
    }

    public Unite getUnite() {
        return unite;
    }

    public Materiau unite(Unite unite) {
        this.unite = unite;
        return this;
    }

    public void setUnite(Unite unite) {
        this.unite = unite;
    }

    public Famille getFamille() {
        return famille;
    }

    public Materiau famille(Famille famille) {
        this.famille = famille;
        return this;
    }

    public void setFamille(Famille famille) {
        this.famille = famille;
    }

    public Tva getTva() {
        return tva;
    }

    public Materiau tva(Tva tva) {
        this.tva = tva;
        return this;
    }

    public void setTva(Tva tva) {
        this.tva = tva;
    }

    public Image getImage() {
        return image;
    }

    public Materiau image(Image image) {
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
        if (!(o instanceof Materiau)) {
            return false;
        }
        return id != null && id.equals(((Materiau) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return ("Materiau{" + "id=" + getId() + ", libelle='" + getLibelle() + "'" + ", reference='" + getReference()
                + "'" + ", poids='" + getPoids() + "'" + ", volume='" + getVolume() + "'" + ", userModif='"
                + getUserModif() + "'" + ", dateModif='" + getDateModif() + "'" + "}");
    }
}
