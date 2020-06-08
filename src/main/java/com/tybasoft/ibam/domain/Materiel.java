package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tybasoft.ibam.security.SecurityUtils;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Materiel.
 */
@Entity
@Table(name = "materiel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Materiel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "libelle", nullable = false)
    private String libelle;

    @Column(name = "matricule")
    private String matricule;

    @Column(name = "modele")
    private String modele;

    @NotNull
    @Column(name = "num_carte_grise", nullable = false)
    private String numCarteGrise;

    @Column(name = "date_identification")
    private LocalDate dateIdentification;

    @Column(name = "compteur_achat")
    private String compteurAchat;

    @Column(name = "etat")
    private String etat;

    @Column(name = "location")
    private Boolean location;

    @Column(name = "description")
    private String description;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private Instant dateModif;

    @OneToMany(mappedBy = "materiel")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Location> locations = new HashSet<>();

    @OneToMany(mappedBy = "materiel")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Assurance> assurances = new HashSet<>();

    @OneToMany(mappedBy = "materiel")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TransfertMateriel> transferts = new HashSet<>();

    @OneToMany(mappedBy = "materiel")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Consommation> consommations = new HashSet<>();

    @OneToMany(mappedBy = "materiel")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Maintenance> maintenances = new HashSet<>();

    @OneToMany(mappedBy = "materiel")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<VisiteTechnique> visitetechniques = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("materiels")
    private Famille famille;

    @ManyToOne
    @JsonIgnoreProperties("materiels")
    private TypeMateriel typeMateriel;

    @ManyToOne
    @JsonIgnoreProperties("materiels")
    private Fournisseur fournisseur;

    @ManyToOne
    @JsonIgnoreProperties("materiels")
    private Marque marque;

    @ManyToOne
    @JsonIgnoreProperties("materiels")
    private Document document;

    @ManyToOne
    @JsonIgnoreProperties("materiels")
    private Employe employe;

    @ManyToOne
    @JsonIgnoreProperties("materiels")
    private Image image;

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

    public Materiel libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getMatricule() {
        return matricule;
    }

    public Materiel matricule(String matricule) {
        this.matricule = matricule;
        return this;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public String getModele() {
        return modele;
    }

    public Materiel modele(String modele) {
        this.modele = modele;
        return this;
    }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public String getNumCarteGrise() {
        return numCarteGrise;
    }

    public Materiel numCarteGrise(String numCarteGrise) {
        this.numCarteGrise = numCarteGrise;
        return this;
    }

    public void setNumCarteGrise(String numCarteGrise) {
        this.numCarteGrise = numCarteGrise;
    }

    public LocalDate getDateIdentification() {
        return dateIdentification;
    }

    public Materiel dateIdentification(LocalDate dateIdentification) {
        this.dateIdentification = dateIdentification;
        return this;
    }

    public void setDateIdentification(LocalDate dateIdentification) {
        this.dateIdentification = dateIdentification;
    }

    public String getCompteurAchat() {
        return compteurAchat;
    }

    public Materiel compteurAchat(String compteurAchat) {
        this.compteurAchat = compteurAchat;
        return this;
    }

    public void setCompteurAchat(String compteurAchat) {
        this.compteurAchat = compteurAchat;
    }

    public String getEtat() {
        return etat;
    }

    public Materiel etat(String etat) {
        this.etat = etat;
        return this;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public Boolean isLocation() {
        return location;
    }

    public Materiel location(Boolean location) {
        this.location = location;
        return this;
    }

    public void setLocation(Boolean location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public Materiel description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUserModif() {
        return userModif;
    }

    public Materiel userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public Instant getDateModif() {
        return dateModif;
    }

    public Materiel dateModif(Instant dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(Instant dateModif) {
        this.dateModif = dateModif;
    }

    public Set<Location> getLocations() {
        return locations;
    }

    public Materiel locations(Set<Location> locations) {
        this.locations = locations;
        return this;
    }

    public Materiel addLocation(Location location) {
        this.locations.add(location);
        location.setMateriel(this);
        return this;
    }

    public Materiel removeLocation(Location location) {
        this.locations.remove(location);
        location.setMateriel(null);
        return this;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }

    public Set<Assurance> getAssurances() {
        return assurances;
    }

    public Materiel assurances(Set<Assurance> assurances) {
        this.assurances = assurances;
        return this;
    }

    public Materiel addAssurance(Assurance assurance) {
        this.assurances.add(assurance);
        assurance.setMateriel(this);
        return this;
    }

    public Materiel removeAssurance(Assurance assurance) {
        this.assurances.remove(assurance);
        assurance.setMateriel(null);
        return this;
    }

    public void setAssurances(Set<Assurance> assurances) {
        this.assurances = assurances;
    }

    public Set<TransfertMateriel> getTransferts() {
        return transferts;
    }

    public Materiel transferts(Set<TransfertMateriel> transfertMateriels) {
        this.transferts = transfertMateriels;
        return this;
    }

    public Materiel addTransfert(TransfertMateriel transfertMateriel) {
        this.transferts.add(transfertMateriel);
        transfertMateriel.setMateriel(this);
        return this;
    }

    public Materiel removeTransfert(TransfertMateriel transfertMateriel) {
        this.transferts.remove(transfertMateriel);
        transfertMateriel.setMateriel(null);
        return this;
    }

    public void setTransferts(Set<TransfertMateriel> transfertMateriels) {
        this.transferts = transfertMateriels;
    }

    public Set<Consommation> getConsommations() {
        return consommations;
    }

    public Materiel consommations(Set<Consommation> consommations) {
        this.consommations = consommations;
        return this;
    }

    public Materiel addConsommation(Consommation consommation) {
        this.consommations.add(consommation);
        consommation.setMateriel(this);
        return this;
    }

    public Materiel removeConsommation(Consommation consommation) {
        this.consommations.remove(consommation);
        consommation.setMateriel(null);
        return this;
    }

    public void setConsommations(Set<Consommation> consommations) {
        this.consommations = consommations;
    }

    public Set<Maintenance> getMaintenances() {
        return maintenances;
    }

    public Materiel maintenances(Set<Maintenance> maintenances) {
        this.maintenances = maintenances;
        return this;
    }

    public Materiel addMaintenance(Maintenance maintenance) {
        this.maintenances.add(maintenance);
        maintenance.setMateriel(this);
        return this;
    }

    public Materiel removeMaintenance(Maintenance maintenance) {
        this.maintenances.remove(maintenance);
        maintenance.setMateriel(null);
        return this;
    }

    public void setMaintenances(Set<Maintenance> maintenances) {
        this.maintenances = maintenances;
    }

    public Set<VisiteTechnique> getVisitetechniques() {
        return visitetechniques;
    }

    public Materiel visitetechniques(Set<VisiteTechnique> visiteTechniques) {
        this.visitetechniques = visiteTechniques;
        return this;
    }

    public Materiel addVisitetechnique(VisiteTechnique visiteTechnique) {
        this.visitetechniques.add(visiteTechnique);
        visiteTechnique.setMateriel(this);
        return this;
    }

    public Materiel removeVisitetechnique(VisiteTechnique visiteTechnique) {
        this.visitetechniques.remove(visiteTechnique);
        visiteTechnique.setMateriel(null);
        return this;
    }

    public void setVisitetechniques(Set<VisiteTechnique> visiteTechniques) {
        this.visitetechniques = visiteTechniques;
    }

    public Famille getFamille() {
        return famille;
    }

    public Materiel famille(Famille famille) {
        this.famille = famille;
        return this;
    }

    public void setFamille(Famille famille) {
        this.famille = famille;
    }

    public TypeMateriel getTypeMateriel() {
        return typeMateriel;
    }

    public Materiel typeMateriel(TypeMateriel typeMateriel) {
        this.typeMateriel = typeMateriel;
        return this;
    }

    public void setTypeMateriel(TypeMateriel typeMateriel) {
        this.typeMateriel = typeMateriel;
    }

    public Fournisseur getFournisseur() {
        return fournisseur;
    }

    public Materiel fournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
        return this;
    }

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
    }

    public Marque getMarque() {
        return marque;
    }

    public Materiel marque(Marque marque) {
        this.marque = marque;
        return this;
    }

    public void setMarque(Marque marque) {
        this.marque = marque;
    }

    public Document getDocument() {
        return document;
    }

    public Materiel document(Document document) {
        this.document = document;
        return this;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    public Employe getEmploye() {
        return employe;
    }

    public Materiel employe(Employe employe) {
        this.employe = employe;
        return this;
    }

    public void setEmploye(Employe employe) {
        this.employe = employe;
    }

    public Image getImage() {
        return image;
    }

    public Materiel image(Image image) {
        this.image = image;
        return this;
    }

    public void setImage(Image image) {
        this.image = image;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Materiel)) {
            return false;
        }
        return id != null && id.equals(((Materiel) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Materiel{" +
            "id=" + getId() +
            ", libelle='" + getLibelle() + "'" +
            ", matricule='" + getMatricule() + "'" +
            ", modele='" + getModele() + "'" +
            ", numCarteGrise='" + getNumCarteGrise() + "'" +
            ", dateIdentification='" + getDateIdentification() + "'" +
            ", compteurAchat='" + getCompteurAchat() + "'" +
            ", etat='" + getEtat() + "'" +
            ", location='" + isLocation() + "'" +
            ", description='" + getDescription() + "'" +
            ", userModif='" + getUserModif() + "'" +
            ", dateModif='" + getDateModif() + "'" +
            "}";
    }
    @PrePersist
    public void onCreate(){
        userModif= SecurityUtils.getCurrentUserLogin().get();
        dateModif= Instant.now();
    }
    @PreUpdate
    public void onUpdate(){
        userModif= SecurityUtils.getCurrentUserLogin().get();
        dateModif= Instant.now();
    }
}
