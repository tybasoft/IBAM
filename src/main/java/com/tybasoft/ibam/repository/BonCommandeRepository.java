package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.BonCommande;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

/**
 * Spring Data  repository for the BonCommande entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BonCommandeRepository extends JpaRepository<BonCommande, Long> {
    Page<BonCommande> findByRemarquesIsContainingOrDepot_LibelleIsContainingOrFournisseur_EmailIsContaining(String req ,String depot , String fournisseur , Pageable pageable);
}
