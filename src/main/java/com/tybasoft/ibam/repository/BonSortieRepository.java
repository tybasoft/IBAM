package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.BonSortie;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the BonSortie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BonSortieRepository extends JpaRepository<BonSortie, Long> {
}
