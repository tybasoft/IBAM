package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.AffectationsMateriels;

import com.tybasoft.ibam.domain.Materiel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Spring Data  repository for the AffectationsMateriels entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AffectationsMaterielsRepository extends JpaRepository<AffectationsMateriels, Long> {

    List<AffectationsMateriels> findByMaterielAndDateFinAfter(Materiel materiel , LocalDate localDate);
    List<AffectationsMateriels> findByMateriel(Materiel materiel);
    List<AffectationsMateriels> findByDescriptionIsContaining(String description);
    List<AffectationsMateriels> findByMateriel_LibelleOrProjet_LibelleOrDateFinOrDateDebutOrDescription(String libelleM , String libelleP , LocalDate fin , LocalDate debut , String description);

}
