package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Assurance;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Assurance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssuranceRepository extends JpaRepository<Assurance, Long> {
}
