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
 * A Employe.
 */
@Entity
@Table(name = "employe")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Employe implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "prenom", nullable = false)
    private String prenom;

    @NotNull
    @Column(name = "matricule", nullable = false)
    private String matricule;

    @NotNull
    @Column(name = "cin", nullable = false)
    private String cin;

    @Column(name = "sexe")
    private String sexe;

    @NotNull
    @Column(name = "tarif_journalier", nullable = false)
    private String tarifJournalier;

    @Column(name = "date_naissance")
    private LocalDate dateNaissance;

    @Column(name = "lieu_naissance")
    private String lieuNaissance;

    @Column(name = "situation_fam")
    private String situationFam;

    @Column(name = "nationalite")
    private String nationalite;

    @NotNull
    @Column(name = "date_entree", nullable = false)
    private LocalDate dateEntree;

    @NotNull
    @Column(name = "tel", nullable = false)
    private String tel;

    @Column(name = "email")
    private String email;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "division")
    private String division;

    @Column(name = "type_contrat")
    private String typeContrat;

    @NotNull
    @Column(name = "multi_porjet", nullable = false)
    private Boolean multiPorjet;

    @Column(name = "date_depart")
    private LocalDate dateDepart;

    @Column(name = "motif_depart")
    private String motifDepart;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private LocalDate dateModif;

    @OneToMany(mappedBy = "employe")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Materiel> materiels = new HashSet<>();

    @OneToMany(mappedBy = "equipe")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Equipe> employes = new HashSet<>();

    @OneToMany(mappedBy = "employe")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Pointage> pointages = new HashSet<>();

    @OneToMany(mappedBy = "employe")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Paie> paies = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("employes")
    private Projet projet;

    @ManyToOne
    @JsonIgnoreProperties("employes")
    private Equipe equipe;

    @ManyToOne
    @JsonIgnoreProperties("employes")
    private Fonction fonction;

    @ManyToOne
    @JsonIgnoreProperties("employees")
    private Image image;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not
    // remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Employe nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Employe prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getMatricule() {
        return matricule;
    }

    public Employe matricule(String matricule) {
        this.matricule = matricule;
        return this;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public String getCin() {
        return cin;
    }

    public Employe cin(String cin) {
        this.cin = cin;
        return this;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getSexe() {
        return sexe;
    }

    public Employe sexe(String sexe) {
        this.sexe = sexe;
        return this;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public String getTarifJournalier() {
        return tarifJournalier;
    }

    public Employe tarifJournalier(String tarifJournalier) {
        this.tarifJournalier = tarifJournalier;
        return this;
    }

    public void setTarifJournalier(String tarifJournalier) {
        this.tarifJournalier = tarifJournalier;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public Employe dateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
        return this;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getLieuNaissance() {
        return lieuNaissance;
    }

    public Employe lieuNaissance(String lieuNaissance) {
        this.lieuNaissance = lieuNaissance;
        return this;
    }

    public void setLieuNaissance(String lieuNaissance) {
        this.lieuNaissance = lieuNaissance;
    }

    public String getSituationFam() {
        return situationFam;
    }

    public Employe situationFam(String situationFam) {
        this.situationFam = situationFam;
        return this;
    }

    public void setSituationFam(String situationFam) {
        this.situationFam = situationFam;
    }

    public String getNationalite() {
        return nationalite;
    }

    public Employe nationalite(String nationalite) {
        this.nationalite = nationalite;
        return this;
    }

    public void setNationalite(String nationalite) {
        this.nationalite = nationalite;
    }

    public LocalDate getDateEntree() {
        return dateEntree;
    }

    public Employe dateEntree(LocalDate dateEntree) {
        this.dateEntree = dateEntree;
        return this;
    }

    public void setDateEntree(LocalDate dateEntree) {
        this.dateEntree = dateEntree;
    }

    public String getTel() {
        return tel;
    }

    public Employe tel(String tel) {
        this.tel = tel;
        return this;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getEmail() {
        return email;
    }

    public Employe email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAdresse() {
        return adresse;
    }

    public Employe adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getDivision() {
        return division;
    }

    public Employe division(String division) {
        this.division = division;
        return this;
    }

    public void setDivision(String division) {
        this.division = division;
    }

    public String getTypeContrat() {
        return typeContrat;
    }

    public Employe typeContrat(String typeContrat) {
        this.typeContrat = typeContrat;
        return this;
    }

    public void setTypeContrat(String typeContrat) {
        this.typeContrat = typeContrat;
    }

    public Boolean isMultiPorjet() {
        return multiPorjet;
    }

    public Employe multiPorjet(Boolean multiPorjet) {
        this.multiPorjet = multiPorjet;
        return this;
    }

    public void setMultiPorjet(Boolean multiPorjet) {
        this.multiPorjet = multiPorjet;
    }

    public LocalDate getDateDepart() {
        return dateDepart;
    }

    public Employe dateDepart(LocalDate dateDepart) {
        this.dateDepart = dateDepart;
        return this;
    }

    public void setDateDepart(LocalDate dateDepart) {
        this.dateDepart = dateDepart;
    }

    public String getMotifDepart() {
        return motifDepart;
    }

    public Employe motifDepart(String motifDepart) {
        this.motifDepart = motifDepart;
        return this;
    }

    public void setMotifDepart(String motifDepart) {
        this.motifDepart = motifDepart;
    }

    public String getUserModif() {
        return userModif;
    }

    public Employe userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public LocalDate getDateModif() {
        return dateModif;
    }

    public Employe dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
    }

    public Set<Materiel> getMateriels() {
        return materiels;
    }

    public Employe materiels(Set<Materiel> materiels) {
        this.materiels = materiels;
        return this;
    }

    public Employe addMateriel(Materiel materiel) {
        this.materiels.add(materiel);
        materiel.setEmploye(this);
        return this;
    }

    public Employe removeMateriel(Materiel materiel) {
        this.materiels.remove(materiel);
        materiel.setEmploye(null);
        return this;
    }

    public void setMateriels(Set<Materiel> materiels) {
        this.materiels = materiels;
    }

    public Set<Equipe> getEmployes() {
        return employes;
    }

    public Employe employes(Set<Equipe> equipes) {
        this.employes = equipes;
        return this;
    }

    public Employe addEmploye(Equipe equipe) {
        this.employes.add(equipe);
        equipe.setEquipe(this);
        return this;
    }

    public Employe removeEmploye(Equipe equipe) {
        this.employes.remove(equipe);
        equipe.setEquipe(null);
        return this;
    }

    public void setEmployes(Set<Equipe> equipes) {
        this.employes = equipes;
    }

    public Set<Pointage> getPointages() {
        return pointages;
    }

    public Employe pointages(Set<Pointage> pointages) {
        this.pointages = pointages;
        return this;
    }

    public Employe addPointage(Pointage pointage) {
        this.pointages.add(pointage);
        pointage.setEmploye(this);
        return this;
    }

    public Employe removePointage(Pointage pointage) {
        this.pointages.remove(pointage);
        pointage.setEmploye(null);
        return this;
    }

    public void setPointages(Set<Pointage> pointages) {
        this.pointages = pointages;
    }

    public Set<Paie> getPaies() {
        return paies;
    }

    public Employe paies(Set<Paie> paies) {
        this.paies = paies;
        return this;
    }

    public Employe addPaie(Paie paie) {
        this.paies.add(paie);
        paie.setEmploye(this);
        return this;
    }

    public Employe removePaie(Paie paie) {
        this.paies.remove(paie);
        paie.setEmploye(null);
        return this;
    }

    public void setPaies(Set<Paie> paies) {
        this.paies = paies;
    }

    public Projet getProjet() {
        return projet;
    }

    public Employe projet(Projet projet) {
        this.projet = projet;
        return this;
    }

    public void setProjet(Projet projet) {
        this.projet = projet;
    }

    public Equipe getEquipe() {
        return equipe;
    }

    public Employe equipe(Equipe equipe) {
        this.equipe = equipe;
        return this;
    }

    public void setEquipe(Equipe equipe) {
        this.equipe = equipe;
    }

    public Fonction getFonction() {
        return fonction;
    }

    public Employe fonction(Fonction fonction) {
        this.fonction = fonction;
        return this;
    }

    public void setFonction(Fonction fonction) {
        this.fonction = fonction;
    }

    public Image getImage() {
        return image;
    }

    public Employe image(Image image) {
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
        if (!(o instanceof Employe)) {
            return false;
        }
        return id != null && id.equals(((Employe) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return ("Employe{" + "id=" + getId() + ", nom='" + getNom() + "'" + ", prenom='" + getPrenom() + "'"
                + ", matricule='" + getMatricule() + "'" + ", cin='" + getCin() + "'" + ", sexe='" + getSexe() + "'"
                + ", tarifJournalier='" + getTarifJournalier() + "'" + ", dateNaissance='" + getDateNaissance() + "'"
                + ", lieuNaissance='" + getLieuNaissance() + "'" + ", situationFam='" + getSituationFam() + "'"
                + ", nationalite='" + getNationalite() + "'" + ", dateEntree='" + getDateEntree() + "'" + ", tel='"
                + getTel() + "'" + ", email='" + getEmail() + "'" + ", adresse='" + getAdresse() + "'" + ", division='"
                + getDivision() + "'" + ", typeContrat='" + getTypeContrat() + "'" + ", multiPorjet='" + isMultiPorjet()
                + "'" + ", dateDepart='" + getDateDepart() + "'" + ", motifDepart='" + getMotifDepart() + "'"
                + ", userModif='" + getUserModif() + "'" + ", dateModif='" + getDateModif() + "'" + "}");
    }

    public Boolean getMultiPorjet() {
        return multiPorjet;
    }

   
    
}
