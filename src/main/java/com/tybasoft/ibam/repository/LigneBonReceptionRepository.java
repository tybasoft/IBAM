package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.LigneBonReception;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotNull;

/**
 * Spring Data  repository for the LigneBonReception entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LigneBonReceptionRepository extends JpaRepository<LigneBonReception, Long> {
    Page<LigneBonReception> findByQuantiteIsContainingOrMateriau_LibelleIsContaining( String quantite,  String materiau_libelle, Pageable pageable);

}
