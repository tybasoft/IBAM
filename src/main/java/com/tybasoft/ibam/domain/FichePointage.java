package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

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
    private LocalDate dateJour;

    @ManyToOne
    @JsonIgnoreProperties(value = "fichePointages", allowSetters = true)
    private Projet projet;

    
    public FichePointage() {
		super();
		// TODO Auto-generated constructor stub
	}

	public FichePointage(LocalDate dateJour,Projet projet) {
		super();
		this.dateJour = dateJour;
		this.projet = projet;
	}

	// jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateJour() {
        return dateJour;
    }

    public FichePointage dateJour(LocalDate dateJour) {
        this.dateJour = dateJour;
        return this;
    }

    public void setDateJour(LocalDate dateJour) {
        this.dateJour = dateJour;
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
            ", dateJour='" + getDateJour() + "'" +
            "}";
    }
}
