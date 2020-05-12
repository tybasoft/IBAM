package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.VisiteTechnique;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the VisiteTechnique entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VisiteTechniqueRepository extends JpaRepository<VisiteTechnique, Long> {
}
