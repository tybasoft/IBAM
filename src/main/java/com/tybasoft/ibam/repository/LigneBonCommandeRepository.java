package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.LigneBonCommande;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the LigneBonCommande entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LigneBonCommandeRepository extends JpaRepository<LigneBonCommande, Long> {
}
