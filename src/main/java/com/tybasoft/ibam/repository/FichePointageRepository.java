package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.FichePointage;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the FichePointage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FichePointageRepository extends JpaRepository<FichePointage, Long> {
}
