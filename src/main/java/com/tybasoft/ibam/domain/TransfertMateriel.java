package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;

/**
 * A TransfertMateriel.
 */
@Entity
@Table(name = "transfert_materiel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TransfertMateriel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "reference", nullable = false)
    private String reference;

    @NotNull
    @Column(name = "date_transfert", nullable = false)
    private LocalDate dateTransfert;

    @Column(name = "commentaire")
    private String commentaire;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private LocalDate dateModif;

    @ManyToOne
    @JsonIgnoreProperties("transferts")
    private Materiel materiel;

    @ManyToOne
    @JsonIgnoreProperties("transferts")
    private Projet projet;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReference() {
        return reference;
    }

    public TransfertMateriel reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public LocalDate getDateTransfert() {
        return dateTransfert;
    }

    public TransfertMateriel dateTransfert(LocalDate dateTransfert) {
        this.dateTransfert = dateTransfert;
        return this;
    }

    public void setDateTransfert(LocalDate dateTransfert) {
        this.dateTransfert = dateTransfert;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public TransfertMateriel commentaire(String commentaire) {
        this.commentaire = commentaire;
        return this;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public String getUserModif() {
        return userModif;
    }

    public TransfertMateriel userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public LocalDate getDateModif() {
        return dateModif;
    }

    public TransfertMateriel dateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(LocalDate dateModif) {
        this.dateModif = dateModif;
    }

    public Materiel getMateriel() {
        return materiel;
    }

    public TransfertMateriel materiel(Materiel materiel) {
        this.materiel = materiel;
        return this;
    }

    public void setMateriel(Materiel materiel) {
        this.materiel = materiel;
    }

    public Projet getProjet() {
        return projet;
    }

    public TransfertMateriel projet(Projet projet) {
        this.projet = projet;
        return this;
    }

    public void setProjet(Projet projet) {
        this.projet = projet;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TransfertMateriel)) {
            return false;
        }
        return id != null && id.equals(((TransfertMateriel) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TransfertMateriel{" +
            "id=" + getId() +
            ", reference='" + getReference() + "'" +
            ", dateTransfert='" + getDateTransfert() + "'" +
            ", commentaire='" + getCommentaire() + "'" +
            ", userModif='" + getUserModif() + "'" +
            ", dateModif='" + getDateModif() + "'" +
            "}";
    }
}
