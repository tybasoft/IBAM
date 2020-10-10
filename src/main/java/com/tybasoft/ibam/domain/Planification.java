package com.tybasoft.ibam.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Planification.
 */
@Entity
@Table(name = "planification")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Planification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nom_tache")
    private String nom_tache;

    @Column(name = "description_tache")
    private String description_tache;

    @Column(name = "date_debut")
    private ZonedDateTime date_debut;

    @Column(name = "date_fin")
    private ZonedDateTime date_fin;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "planification_employe",
               joinColumns = @JoinColumn(name = "planification_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "employe_id", referencedColumnName = "id"))
    private Set<Employe> employes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom_tache() {
        return nom_tache;
    }

    public Planification nom_tache(String nom_tache) {
        this.nom_tache = nom_tache;
        return this;
    }

    public void setNom_tache(String nom_tache) {
        this.nom_tache = nom_tache;
    }

    public String getDescription_tache() {
        return description_tache;
    }

    public Planification description_tache(String description_tache) {
        this.description_tache = description_tache;
        return this;
    }

    public void setDescription_tache(String description_tache) {
        this.description_tache = description_tache;
    }

    public ZonedDateTime getDate_debut() {
        return date_debut;
    }

    public Planification date_debut(ZonedDateTime date_debut) {
        this.date_debut = date_debut;
        return this;
    }

    public void setDate_debut(ZonedDateTime date_debut) {
        this.date_debut = date_debut;
    }

    public ZonedDateTime getDate_fin() {
        return date_fin;
    }

    public Planification date_fin(ZonedDateTime date_fin) {
        this.date_fin = date_fin;
        return this;
    }

    public void setDate_fin(ZonedDateTime date_fin) {
        this.date_fin = date_fin;
    }

    public Set<Employe> getEmployes() {
        return employes;
    }

    public Planification employes(Set<Employe> employes) {
        this.employes = employes;
        return this;
    }

    public Planification addEmploye(Employe employe) {
        this.employes.add(employe);
    //    employe.getPlanifications().add(this);
        return this;
    }

    public Planification removeEmploye(Employe employe) {
        this.employes.remove(employe);
       // employe.getPlanifications().remove(this);
        return this;
    }

    public void setEmployes(Set<Employe> employes) {
        this.employes = employes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Planification)) {
            return false;
        }
        return id != null && id.equals(((Planification) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Planification{" +
            "id=" + getId() +
            ", nom_tache='" + getNom_tache() + "'" +
            ", description_tache='" + getDescription_tache() + "'" +
            ", date_debut='" + getDate_debut() + "'" +
            ", date_fin='" + getDate_fin() + "'" +
            "}";
    }
}
