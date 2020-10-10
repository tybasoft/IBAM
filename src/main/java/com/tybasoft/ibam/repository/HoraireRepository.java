package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Horaire;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Horaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HoraireRepository extends JpaRepository<Horaire, Long> {
    List<Horaire> findByLibelleIsContainingOrNbrHeurParJrIsContainingOrNbrJourParSemIsContaining(String lib , String jour , String sem );
}
