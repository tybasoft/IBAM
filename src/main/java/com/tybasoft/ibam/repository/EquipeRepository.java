package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Equipe;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Equipe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EquipeRepository extends JpaRepository<Equipe, Long> {

    Page<Equipe> findByLibelleIsContainingOrProjet_LibelleIsContainingOrEquipe_Email(String lib , String projet , String equipe, Pageable pageable);
}
