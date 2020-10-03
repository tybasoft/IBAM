package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.BonReception;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the BonReception entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BonReceptionRepository extends JpaRepository<BonReception, Long> {
    Page<BonReception> findByRemarquesIsContainingOrDepot_LibelleIsContainingOrFournisseur_EmailIsContaining(String req , String depot , String fournisseur , Pageable pageable);
}
