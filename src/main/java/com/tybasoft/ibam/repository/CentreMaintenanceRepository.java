package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.CentreMaintenance;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CentreMaintenance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CentreMaintenanceRepository extends JpaRepository<CentreMaintenance, Long> {

    Page<CentreMaintenance> findByLibelleIsContainingOrAdresseIsContainingOrSpecialiteIsContainingOrResponsableIsContaining(String lib , String adresse , String specialite , String reso , Pageable pageable);
}
