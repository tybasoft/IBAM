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
 * A Entreprise.
 */
@Entity
@Table(name = "entreprise")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Entreprise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "entite_juridique")
    private String entiteJuridique;

    @NotNull
    @Column(name = "nom_commercial", nullable = false)
    private String nomCommercial;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "capital")
    private String capital;

    @Column(name = "direction")
    private String direction;

    @Column(name = "activite")
    private String activite;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "email")
    private String email;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private LocalDate dateModif;

    @OneToMany(mappedBy = "entreprise")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Projet> projets = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("entreprises")
    private Image image;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not
    // remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEntiteJuridique() {
        return entiteJuridique;
    }

    public Entreprise entiteJuridique(String entiteJuridique) {
        this.entiteJuridique = entiteJuridique;
        return this;
    }

    public void setEntiteJuridique(String entiteJuridique) {
        this.entiteJuridique = entiteJuridique;
    }

    public String getNomCommercial() {
        return nomCommercial;
    }

    public Entreprise nomCommercial(String nomCommercial) {
        this.nomCommercial = nomCommercial;
        return this;
    }

    public void setNomCommercial(String nomCommercial) {
        this.nomCommercial = nomCommercial;
    }

    public String getAdresse() {
        return adresse;
    }

    public Entreprise adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getCapital() {
        return capital;
    }

    public Entreprise capital(String capital) {
        this.capital = capital;
        return this;
    }

    public void setCapital(String capital) {
        this.capital = capital;
    }

    public String getDirection() {
        return direction;
    }

    public Entreprise direction(String direction) {
        this.direction = direction;
        return this;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public String getActivite() {
        return activite;
    }

    public Entreprise activite(String activite) {
        this.activite = activite;
        return this;
    }

    public void setActivite(String activite) {
        this.activite = activite;
    }

    public String getTelephone() {
        return telephone;
    }

    public Entreprise telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public Entreprise email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserModif() {
        return userModif;
    }

    public Entreprise userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public LocalDate getDateModif() {
        return dateModif;
    }

    public Entreprise dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
    }

    public Set<Projet> getProjets() {
        return projets;
    }

    public Entreprise projets(Set<Projet> projets) {
        this.projets = projets;
        return this;
    }

    public Entreprise addProjet(Projet projet) {
        this.projets.add(projet);
        projet.setEntreprise(this);
        return this;
    }

    public Entreprise removeProjet(Projet projet) {
        this.projets.remove(projet);
        projet.setEntreprise(null);
        return this;
    }

    public void setProjets(Set<Projet> projets) {
        this.projets = projets;
    }

    public Image getImage() {
        return image;
    }

    public Entreprise image(Image image) {
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
        if (!(o instanceof Entreprise)) {
            return false;
        }
        return id != null && id.equals(((Entreprise) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Entreprise{" + "id=" + getId() + ", entiteJuridique='" + getEntiteJuridique() + "'"
                + ", nomCommercial='" + getNomCommercial() + "'" + ", adresse='" + getAdresse() + "'" + ", capital='"
                + getCapital() + "'" + ", direction='" + getDirection() + "'" + ", activite='" + getActivite() + "'"
                + ", telephone='" + getTelephone() + "'" + ", email='" + getEmail() + "'" + ", userModif='"
                + getUserModif() + "'" + ", dateModif='" + getDateModif() + "'" + "}";
    }
}
