package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Fonction;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Fonction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FonctionRepository extends JpaRepository<Fonction, Long> {
    Page<Fonction> findByLibelleIsContainingOrDescriptionIsContainingOrCompetencesIsContaining(String lib , String descp , String comp , Pageable pageable);
}
