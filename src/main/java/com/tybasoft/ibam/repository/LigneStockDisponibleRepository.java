package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.LigneStockDisponible;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the LigneStockDisponible entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LigneStockDisponibleRepository extends JpaRepository<LigneStockDisponible, Long> {
}
