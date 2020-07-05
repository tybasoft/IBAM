package com.tybasoft.ibam.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tybasoft.ibam.security.SecurityUtils;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Consommation.
 */
@Entity
@Table(name = "consommation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Consommation implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "reference", nullable = false)
    private String reference;

    @NotNull
    @Column(name = "date_achat", nullable = false)
    private LocalDate dateAchat;

    @Column(name = "type_carburant")
    private String typeCarburant;

    @NotNull
    @Column(name = "montant", nullable = false)
    private String montant;

    @NotNull
    @Column(name = "quantite", nullable = false)
    private String quantite;

    @Column(name = "kilometrage")
    private String kilometrage;

    @Column(name = "commentaire")
    private String commentaire;

    @Column(name = "user_modif")
    private String userModif;

    @Column(name = "date_modif")
    private Instant dateModif;

    @ManyToOne
    @JsonIgnoreProperties("consommations")
    private Materiel materiel;

    @ManyToOne
    @JsonIgnoreProperties("consommations")
    private Fournisseur fournisseur;

    @ManyToOne
    @JsonIgnoreProperties("consommations")
    private Image image;

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

    public Consommation reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public LocalDate getDateAchat() {
        return dateAchat;
    }

    public Consommation dateAchat(LocalDate dateAchat) {
        this.dateAchat = dateAchat;
        return this;
    }

    public void setDateAchat(LocalDate dateAchat) {
        this.dateAchat = dateAchat;
    }

    public String getTypeCarburant() {
        return typeCarburant;
    }

    public Consommation typeCarburant(String typeCarburant) {
        this.typeCarburant = typeCarburant;
        return this;
    }

    public void setTypeCarburant(String typeCarburant) {
        this.typeCarburant = typeCarburant;
    }

    public String getMontant() {
        return montant;
    }

    public Consommation montant(String montant) {
        this.montant = montant;
        return this;
    }

    public void setMontant(String montant) {
        this.montant = montant;
    }

    public String getQuantite() {
        return quantite;
    }

    public Consommation quantite(String quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(String quantite) {
        this.quantite = quantite;
    }

    public String getKilometrage() {
        return kilometrage;
    }

    public Consommation kilometrage(String kilometrage) {
        this.kilometrage = kilometrage;
        return this;
    }

    public void setKilometrage(String kilometrage) {
        this.kilometrage = kilometrage;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public Consommation commentaire(String commentaire) {
        this.commentaire = commentaire;
        return this;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public String getUserModif() {
        return userModif;
    }

    public Consommation userModif(String userModif) {
        this.userModif = userModif;
        return this;
    }

    public void setUserModif(String userModif) {
        this.userModif = userModif;
    }

    public Instant getDateModif() {
        return dateModif;
    }

    public Consommation dateModif(Instant dateModif) {
        this.dateModif = dateModif;
        return this;
    }

    public void setDateModif(Instant dateModif) {
        this.dateModif = dateModif;
    }

    public Materiel getMateriel() {
        return materiel;
    }

    public Consommation materiel(Materiel materiel) {
        this.materiel = materiel;
        return this;
    }

    public void setMateriel(Materiel materiel) {
        this.materiel = materiel;
    }

    public Fournisseur getFournisseur() {
        return fournisseur;
    }

    public Consommation fournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
        return this;
    }

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
    }

    public Image getImage() {
        return image;
    }

    public Consommation image(Image image) {
        this.image = image;
        return this;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and
    // setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Consommation)) {
            return false;
        }
        return id != null && id.equals(((Consommation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return (
            "Consommation{" +
            "id=" +
            getId() +
            ", reference='" +
            getReference() +
            "'" +
            ", dateAchat='" +
            getDateAchat() +
            "'" +
            ", typeCarburant='" +
            getTypeCarburant() +
            "'" +
            ", montant='" +
            getMontant() +
            "'" +
            ", quantite='" +
            getQuantite() +
            "'" +
            ", kilometrage='" +
            getKilometrage() +
            "'" +
            ", commentaire='" +
            getCommentaire() +
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
