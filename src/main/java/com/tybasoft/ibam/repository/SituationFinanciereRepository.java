package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.SituationFinanciere;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the SituationFinanciere entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SituationFinanciereRepository extends JpaRepository<SituationFinanciere, Long> {
    List<SituationFinanciere> findAllByProjet_IdOrderByMontantEnCours(Long id);

}
