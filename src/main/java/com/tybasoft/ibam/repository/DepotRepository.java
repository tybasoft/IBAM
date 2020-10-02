package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Depot;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Depot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DepotRepository extends JpaRepository<Depot, Long> {

    Page<Depot> findByLibelleIsContainingOrAdresseIsContainingOrTelIsContainingOrVilleIsContainingOrPaysIsContaining(String lib , String adr , String tel , String ville , String pays, Pageable pageable);
}
