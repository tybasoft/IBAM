package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A FichePointage.
 */
@Entity
@Table(name = "fiche_pointage")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FichePointage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date_jour")
    private LocalDate datejour;

    @ManyToOne
    @JsonIgnoreProperties(value = "fichePointages", allowSetters = true)
    private Projet projet;

    @OneToMany(mappedBy = "fichePointage")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Pointage> pointages = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDatejour() {
        return datejour;
    }

    public FichePointage datejour(LocalDate datejour) {
        this.datejour = datejour;
        return this;
    }

    public void setDatejour(LocalDate datejour) {
        this.datejour = datejour;
    }

    public Projet getProjet() {
        return projet;
    }

    public FichePointage projet(Projet projet) {
        this.projet = projet;
        return this;
    }

    public void setProjet(Projet projet) {
        this.projet = projet;
    }

    public Set<Pointage> getPointages() {
        return pointages;
    }

    public FichePointage pointages(Set<Pointage> pointages) {
        this.pointages = pointages;
        return this;
    }

    public FichePointage addPointages(Pointage pointage) {
        this.pointages.add(pointage);
        pointage.setFichePointage(this);
        return this;
    }

    public FichePointage removePointages(Pointage pointage) {
        this.pointages.remove(pointage);
        pointage.setFichePointage(null);
        return this;
    }

    public void setPointages(Set<Pointage> pointages) {
        this.pointages = pointages;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FichePointage)) {
            return false;
        }
        return id != null && id.equals(((FichePointage) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FichePointage{" +
            "id=" + getId() +
            ", datejour='" + getDatejour() + "'" +
            "}";
    }
}
