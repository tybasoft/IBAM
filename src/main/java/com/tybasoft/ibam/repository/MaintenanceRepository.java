package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Maintenance;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Maintenance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaintenanceRepository extends JpaRepository<Maintenance, Long> {
    Page<Maintenance> findByReferenceIsContainingOrFraisIsContainingOrTechnicienIsContaining(String ref , String frais , String tech, Pageable pageable);
}
