package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.TransfertMateriel;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TransfertMateriel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransfertMaterielRepository extends JpaRepository<TransfertMateriel, Long> {
}
