package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Consommation;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Consommation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsommationRepository extends JpaRepository<Consommation, Long> {
}
