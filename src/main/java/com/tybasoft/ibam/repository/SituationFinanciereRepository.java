package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.SituationFinanciere;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Spring Data  repository for the SituationFinanciere entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SituationFinanciereRepository extends JpaRepository<SituationFinanciere, Long> {
    List<SituationFinanciere> findAllByProjet_IdOrderByMontantEnCours(Long id);

    List<SituationFinanciere> findAllByProjetIdAndDateFacturationBefore(Long projet_id, LocalDate dateFacturation);



    Page<SituationFinanciere> findByProjet_LibelleIsContainingOrMontantEnCoursIsContainingOrMontantFactureIsContaining(String projet , String montantC , String montantF , Pageable pageable);

}
