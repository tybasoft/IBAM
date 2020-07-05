package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Paie;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Paie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaieRepository extends JpaRepository<Paie, Long> {
}
