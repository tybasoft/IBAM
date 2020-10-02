package com.tybasoft.ibam.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Avancement.
 */
@Entity
@Table(name = "avancement")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Avancement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "updated_at")
    private LocalDate updatedAt;

    @NotNull
    @Column(name = "titre_compte_rendu", nullable = false)
    private String titreCompteRendu;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "contenu_compte_rendu")
    private String contenuCompteRendu;

    @OneToOne
    @JoinColumn(unique = true)
    private Employe employe;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public Avancement createdAt(LocalDate createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public Avancement updatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getTitreCompteRendu() {
        return titreCompteRendu;
    }

    public Avancement titreCompteRendu(String titreCompteRendu) {
        this.titreCompteRendu = titreCompteRendu;
        return this;
    }

    public void setTitreCompteRendu(String titreCompteRendu) {
        this.titreCompteRendu = titreCompteRendu;
    }

    public String getContenuCompteRendu() {
        return contenuCompteRendu;
    }

    public Avancement contenuCompteRendu(String contenuCompteRendu) {
        this.contenuCompteRendu = contenuCompteRendu;
        return this;
    }

    public void setContenuCompteRendu(String contenuCompteRendu) {
        this.contenuCompteRendu = contenuCompteRendu;
    }

    public Employe getEmploye() {
        return employe;
    }

    public Avancement employe(Employe employe) {
        this.employe = employe;
        return this;
    }

    public void setEmploye(Employe employe) {
        this.employe = employe;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Avancement)) {
            return false;
        }
        return id != null && id.equals(((Avancement) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Avancement{" +
            "id=" + getId() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", titreCompteRendu='" + getTitreCompteRendu() + "'" +
            ", contenuCompteRendu='" + getContenuCompteRendu() + "'" +
            "}";
    }
}
