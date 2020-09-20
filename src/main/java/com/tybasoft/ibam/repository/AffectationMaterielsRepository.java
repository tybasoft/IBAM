package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.AffectationMateriels;

import com.tybasoft.ibam.domain.Materiel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

/**
 * Spring Data  repository for the AffectationMateriels entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AffectationMaterielsRepository extends JpaRepository<AffectationMateriels, Long> {

    List<AffectationMateriels> findByMaterielAndDateFinAfter(Materiel materiel , LocalDate localDate);
    List<AffectationMateriels> findByMateriel(Materiel materiel);
    Collection<AffectationMateriels> findByDescriptionIsContaining(String description);
    //    Collection<AffectationsMateriels> findByDescriptionIsContainingOrProjet_LibelleIsContainingOrMateriel_LibelleIsContaining(String desp , String prj,String mat);
    Page<AffectationMateriels> findByDescriptionIsContainingOrProjet_LibelleIsContainingOrMateriel_LibelleIsContaining(String desp , String prj, String mat, Pageable pageable);
}
