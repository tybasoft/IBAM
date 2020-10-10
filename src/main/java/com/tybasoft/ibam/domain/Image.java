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
 * A Image.
 */
@Entity
@Table(name = "image")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Image implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "titre", nullable = false)
    private String titre;

    @NotNull
    @Column(name = "path", nullable = false)
    private String path;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private Instant dateModif;

    @OneToMany(mappedBy = "image")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Materiau> materiaus = new HashSet<>();

    @OneToMany(mappedBy = "image")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Entreprise> entreprises = new HashSet<>();

    @OneToMany(mappedBy = "image")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Materiel> materiels = new HashSet<>();

    @OneToMany(mappedBy = "image")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Consommation> consommations = new HashSet<>();

    @OneToMany(mappedBy = "image")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Maintenance> maintenances = new HashSet<>();

    @OneToMany(mappedBy = "image")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Employe> employees = new HashSet<>();

    @OneToMany(mappedBy = "image")
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

    public String getTitre() {
        return titre;
    }

    public Image titre(String titre) {
        this.titre = titre;
        return this;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getPath() {
        return path;
    }

    public Image path(String path) {
        this.path = path;
        return this;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getUserModif() {
        return userModif;
    }

    public Image userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public Instant getDateModif() {
        return dateModif;
    }

    public Image dateModif(Instant dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(Instant dateModif) {
        this.dateModif = dateModif;
    }

    public Set<Materiau> getMateriaus() {
        return materiaus;
    }

    public Image materiaus(Set<Materiau> materiaus) {
        this.materiaus = materiaus;
        return this;
    }

    public Image addMateriau(Materiau materiau) {
        this.materiaus.add(materiau);
        materiau.setImage(this);
        return this;
    }

    public Image removeMateriau(Materiau materiau) {
        this.materiaus.remove(materiau);
        materiau.setImage(null);
        return this;
    }

    public void setMateriaus(Set<Materiau> materiaus) {
        this.materiaus = materiaus;
    }

    public Set<Entreprise> getEntreprises() {
        return entreprises;
    }

    public Image entreprises(Set<Entreprise> entreprises) {
        this.entreprises = entreprises;
        return this;
    }

    public Image addEntreprise(Entreprise entreprise) {
        this.entreprises.add(entreprise);
        entreprise.setImage(this);
        return this;
    }

    public Image removeEntreprise(Entreprise entreprise) {
        this.entreprises.remove(entreprise);
        entreprise.setImage(null);
        return this;
    }

    public void setEntreprises(Set<Entreprise> entreprises) {
        this.entreprises = entreprises;
    }

    public Set<Materiel> getMateriels() {
        return materiels;
    }

    public Image materiels(Set<Materiel> materiels) {
        this.materiels = materiels;
        return this;
    }

    public Image addMateriel(Materiel materiel) {
        this.materiels.add(materiel);
        materiel.setImage(this);
        return this;
    }

    public Image removeMateriel(Materiel materiel) {
        this.materiels.remove(materiel);
        materiel.setImage(null);
        return this;
    }

    public void setMateriels(Set<Materiel> materiels) {
        this.materiels = materiels;
    }

    public Set<Consommation> getConsommations() {
        return consommations;
    }

    public Image consommations(Set<Consommation> consommations) {
        this.consommations = consommations;
        return this;
    }

    public Image addConsommation(Consommation consommation) {
        this.consommations.add(consommation);
        consommation.setImage(this);
        return this;
    }

    public Image removeConsommation(Consommation consommation) {
        this.consommations.remove(consommation);
        consommation.setImage(null);
        return this;
    }

    public void setConsommations(Set<Consommation> consommations) {
        this.consommations = consommations;
    }

    public Set<Maintenance> getMaintenances() {
        return maintenances;
    }

    public Image maintenances(Set<Maintenance> maintenances) {
        this.maintenances = maintenances;
        return this;
    }

    public Image addMaintenance(Maintenance maintenance) {
        this.maintenances.add(maintenance);
        maintenance.setImage(this);
        return this;
    }

    public Image removeMaintenance(Maintenance maintenance) {
        this.maintenances.remove(maintenance);
        maintenance.setImage(null);
        return this;
    }

    public void setMaintenances(Set<Maintenance> maintenances) {
        this.maintenances = maintenances;
    }

    public Set<Employe> getEmployees() {
        return employees;
    }

    public Image employees(Set<Employe> employes) {
        this.employees = employes;
        return this;
    }

    public Image addEmployee(Employe employe) {
        this.employees.add(employe);
        employe.setImage(this);
        return this;
    }

    public Image removeEmployee(Employe employe) {
        this.employees.remove(employe);
        employe.setImage(null);
        return this;
    }

    public void setEmployees(Set<Employe> employes) {
        this.employees = employes;
    }

    public Set<BonReception> getBonReceptions() {
        return bonReceptions;
    }

    public Image bonReceptions(Set<BonReception> bonReceptions) {
        this.bonReceptions = bonReceptions;
        return this;
    }

    public Image addBonReception(BonReception bonReception) {
        this.bonReceptions.add(bonReception);
        bonReception.setImage(this);
        return this;
    }

    public Image removeBonReception(BonReception bonReception) {
        this.bonReceptions.remove(bonReception);
        bonReception.setImage(null);
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
        if (!(o instanceof Image)) {
            return false;
        }
        return id != null && id.equals(((Image) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return (
            "Image{" +
            "id=" +
            getId() +
            ", titre='" +
            getTitre() +
            "'" +
            ", path='" +
            getPath() +
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
