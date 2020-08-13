package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
 * A Projet.
 */
@Entity
@Table(name = "projet")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Projet implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "reference", nullable = false)
    private String reference;

    @NotNull
    @Column(name = "libelle", nullable = false)
    private String libelle;

    @Column(name = "description")
    private String description;

    @Column(name = "date_debut")
    private LocalDate dateDebut;

    @Column(name = "date_fin")
    private LocalDate dateFin;

    @Column(name = "nbr_employe")
    private String nbrEmploye;

    @Column(name = "budget")
    private String budget;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "ville")
    private String ville;

    @Column(name = "pays")
    private String pays;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private Instant dateModif;

    @OneToMany(mappedBy = "projet")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TransfertMateriel> transferts = new HashSet<>();

    @OneToMany(mappedBy = "projet")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Equipe> equipes = new HashSet<>();

    @OneToMany(mappedBy = "projet")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Employe> employes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("projets")
    private Entreprise entreprise;

    @ManyToOne
    @JsonIgnoreProperties("projets")
    private Horaire horaire;

    @ManyToOne
    @JsonIgnoreProperties("projets")
    private Depot depot;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not
    // remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReference() {
        return reference;
    }

    public Projet reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getLibelle() {
        return libelle;
    }

    public Projet libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getDescription() {
        return description;
    }

    public Projet description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public Projet dateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
        return this;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public Projet dateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
        return this;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public String getNbrEmploye() {
        return nbrEmploye;
    }

    public Projet nbrEmploye(String nbrEmploye) {
        this.nbrEmploye = nbrEmploye;
        return this;
    }

    public void setNbrEmploye(String nbrEmploye) {
        this.nbrEmploye = nbrEmploye;
    }

    public String getBudget() {
        return budget;
    }

    public Projet budget(String budget) {
        this.budget = budget;
        return this;
    }

    public void setBudget(String budget) {
        this.budget = budget;
    }

    public String getAdresse() {
        return adresse;
    }

    public Projet adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getVille() {
        return ville;
    }

    public Projet ville(String ville) {
        this.ville = ville;
        return this;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getPays() {
        return pays;
    }

    public Projet pays(String pays) {
        this.pays = pays;
        return this;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }

    public String getUserModif() {
        return userModif;
    }

    public Projet userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public Instant getDateModif() {
        return dateModif;
    }

    public Projet dateModif(Instant dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(Instant dateModif) {
        this.dateModif = dateModif;
    }

    public Set<TransfertMateriel> getTransferts() {
        return transferts;
    }

    public Projet transferts(Set<TransfertMateriel> transfertMateriels) {
        this.transferts = transfertMateriels;
        return this;
    }

    public Projet addTransfert(TransfertMateriel transfertMateriel) {
        this.transferts.add(transfertMateriel);
        transfertMateriel.setProjet(this);
        return this;
    }

    public Projet removeTransfert(TransfertMateriel transfertMateriel) {
        this.transferts.remove(transfertMateriel);
        transfertMateriel.setProjet(null);
        return this;
    }

    public void setTransferts(Set<TransfertMateriel> transfertMateriels) {
        this.transferts = transfertMateriels;
    }

    public Set<Equipe> getEquipes() {
        return equipes;
    }

    public Projet equipes(Set<Equipe> equipes) {
        this.equipes = equipes;
        return this;
    }

    public Projet addEquipe(Equipe equipe) {
        this.equipes.add(equipe);
        equipe.setProjet(this);
        return this;
    }

    public Projet removeEquipe(Equipe equipe) {
        this.equipes.remove(equipe);
        equipe.setProjet(null);
        return this;
    }

    public void setEquipes(Set<Equipe> equipes) {
        this.equipes = equipes;
    }

    public Set<Employe> getEmployes() {
        return employes;
    }

    public Projet employes(Set<Employe> employes) {
        this.employes = employes;
        return this;
    }

    public Projet addEmploye(Employe employe) {
        this.employes.add(employe);
        employe.setProjet(this);
        return this;
    }

    public Projet removeEmploye(Employe employe) {
        this.employes.remove(employe);
        employe.setProjet(null);
        return this;
    }

    public void setEmployes(Set<Employe> employes) {
        this.employes = employes;
    }

    public Entreprise getEntreprise() {
        return entreprise;
    }

    public Projet entreprise(Entreprise entreprise) {
        this.entreprise = entreprise;
        return this;
    }

    public void setEntreprise(Entreprise entreprise) {
        this.entreprise = entreprise;
    }

    public Horaire getHoraire() {
        return horaire;
    }

    public Projet horaire(Horaire horaire) {
        this.horaire = horaire;
        return this;
    }

    public void setHoraire(Horaire horaire) {
        this.horaire = horaire;
    }

    public Depot getDepot() {
        return depot;
    }

    public Projet depot(Depot depot) {
        this.depot = depot;
        return this;
    }

    public void setDepot(Depot depot) {
        this.depot = depot;
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

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and
    // setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Projet)) {
            return false;
        }
        return id != null && id.equals(((Projet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return (
            "Projet{" +
            "id=" +
            getId() +
            ", reference='" +
            getReference() +
            "'" +
            ", libelle='" +
            getLibelle() +
            "'" +
            ", description='" +
            getDescription() +
            "'" +
            ", dateDebut='" +
            getDateDebut() +
            "'" +
            ", dateFin='" +
            getDateFin() +
            "'" +
            ", nbrEmploye='" +
            getNbrEmploye() +
            "'" +
            ", budget='" +
            getBudget() +
            "'" +
            ", adresse='" +
            getAdresse() +
            "'" +
            ", ville='" +
            getVille() +
            "'" +
            ", pays='" +
            getPays() +
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
