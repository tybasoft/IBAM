package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Assurance;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;


/**
 * Spring Data  repository for the Assurance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssuranceRepository extends JpaRepository<Assurance, Long> {
    Page<Assurance> findByMateriel_LibelleIsContainingOrAgenceIsContaining(String materiel , String agence, Pageable pageable);
}
