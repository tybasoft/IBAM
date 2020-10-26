package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.StockDisponible;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the StockDisponible entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StockDisponibleRepository extends JpaRepository<StockDisponible, Long> {
}
