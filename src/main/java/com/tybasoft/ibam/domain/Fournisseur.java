package com.tybasoft.ibam.domain;

import com.tybasoft.ibam.security.SecurityUtils;
import com.tybasoft.ibam.security.SecurityUtils;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Fournisseur.
 */
@Entity
@Table(name = "fournisseur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Fournisseur implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nom_commercial", nullable = false)
    private String nomCommercial;

    @Column(name = "type")
    private String type;

    @Column(name = "fax")
    private String fax;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "email")
    private String email;

    @Column(name = "tel")
    private String tel;

    @NotNull
    @Column(name = "adresse", nullable = false)
    private String adresse;

    @Column(name = "description")
    private String description;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private Instant dateModif;

    @OneToMany(mappedBy = "fournisseur")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Materiel> materiels = new HashSet<>();

    @OneToMany(mappedBy = "fournisseur")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Consommation> consommations = new HashSet<>();

    @OneToMany(mappedBy = "fournisseur")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<BonCommande> bonCommandes = new HashSet<>();

    @OneToMany(mappedBy = "fournisseur")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<BonReception> bonReceptions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not
    // remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomCommercial() {
        return nomCommercial;
    }

    public Fournisseur nomCommercial(String nomCommercial) {
        this.nomCommercial = nomCommercial;
        return this;
    }

    public void setNomCommercial(String nomCommercial) {
        this.nomCommercial = nomCommercial;
    }

    public String getType() {
        return type;
    }

    public Fournisseur type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFax() {
        return fax;
    }

    public Fournisseur fax(String fax) {
        this.fax = fax;
        return this;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getNom() {
        return nom;
    }

    public Fournisseur nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Fournisseur prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public Fournisseur email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTel() {
        return tel;
    }

    public Fournisseur tel(String tel) {
        this.tel = tel;
        return this;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getAdresse() {
        return adresse;
    }

    public Fournisseur adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getDescription() {
        return description;
    }

    public Fournisseur description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUserModif() {
        return userModif;
    }

    public Fournisseur userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public Instant getDateModif() {
        return dateModif;
    }

    public Fournisseur dateModif(Instant dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(Instant dateModif) {
        this.dateModif = dateModif;
    }

    public Set<Materiel> getMateriels() {
        return materiels;
    }

    public Fournisseur materiels(Set<Materiel> materiels) {
        this.materiels = materiels;
        return this;
    }

    public Fournisseur addMateriel(Materiel materiel) {
        this.materiels.add(materiel);
        materiel.setFournisseur(this);
        return this;
    }

    public Fournisseur removeMateriel(Materiel materiel) {
        this.materiels.remove(materiel);
        materiel.setFournisseur(null);
        return this;
    }

    public void setMateriels(Set<Materiel> materiels) {
        this.materiels = materiels;
    }

    public Set<Consommation> getConsommations() {
        return consommations;
    }

    public Fournisseur consommations(Set<Consommation> consommations) {
        this.consommations = consommations;
        return this;
    }

    public Fournisseur addConsommation(Consommation consommation) {
        this.consommations.add(consommation);
        consommation.setFournisseur(this);
        return this;
    }

    public Fournisseur removeConsommation(Consommation consommation) {
        this.consommations.remove(consommation);
        consommation.setFournisseur(null);
        return this;
    }

    public void setConsommations(Set<Consommation> consommations) {
        this.consommations = consommations;
    }

    public Set<BonCommande> getBonCommandes() {
        return bonCommandes;
    }

    public Fournisseur bonCommandes(Set<BonCommande> bonCommandes) {
        this.bonCommandes = bonCommandes;
        return this;
    }

    public Fournisseur addBonCommande(BonCommande bonCommande) {
        this.bonCommandes.add(bonCommande);
        bonCommande.setFournisseur(this);
        return this;
    }

    public Fournisseur removeBonCommande(BonCommande bonCommande) {
        this.bonCommandes.remove(bonCommande);
        bonCommande.setFournisseur(null);
        return this;
    }

    public void setBonCommandes(Set<BonCommande> bonCommandes) {
        this.bonCommandes = bonCommandes;
    }

    public Set<BonReception> getBonReceptions() {
        return bonReceptions;
    }

    public Fournisseur bonReceptions(Set<BonReception> bonReceptions) {
        this.bonReceptions = bonReceptions;
        return this;
    }

    public Fournisseur addBonReception(BonReception bonReception) {
        this.bonReceptions.add(bonReception);
        bonReception.setFournisseur(this);
        return this;
    }

    public Fournisseur removeBonReception(BonReception bonReception) {
        this.bonReceptions.remove(bonReception);
        bonReception.setFournisseur(null);
        return this;
    }

    public void setBonReceptions(Set<BonReception> bonReceptions) {
        this.bonReceptions = bonReceptions;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and
    // setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Fournisseur)) {
            return false;
        }
        return id != null && id.equals(((Fournisseur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return (
            "Fournisseur{" +
            "id=" +
            getId() +
            ", nomCommercial='" +
            getNomCommercial() +
            "'" +
            ", type='" +
            getType() +
            "'" +
            ", fax='" +
            getFax() +
            "'" +
            ", nom='" +
            getNom() +
            "'" +
            ", prenom='" +
            getPrenom() +
            "'" +
            ", email='" +
            getEmail() +
            "'" +
            ", tel='" +
            getTel() +
            "'" +
            ", adresse='" +
            getAdresse() +
            "'" +
            ", description='" +
            getDescription() +
            "'" +
            ", userModif='" +
            getUserModif() +
            "'" +
            ", dateModif='" +
            getDateModif() +
            "'" +
            "}"
        );
    }

    @PrePersist
    public void onCreate() {
        userModif = SecurityUtils.getCurrentUserLogin().get();
        dateModif = Instant.now();
    }

    @PreUpdate
    public void onUpdate() {
        userModif = SecurityUtils.getCurrentUserLogin().get();
        dateModif = Instant.now();
    }
}
