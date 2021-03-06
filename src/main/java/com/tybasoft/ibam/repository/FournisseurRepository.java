package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Fournisseur;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Fournisseur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FournisseurRepository extends JpaRepository<Fournisseur, Long> {

    Page<Fournisseur> findByNomIsContainingOrPrenomIsContainingOrTypeIsContainingOrNomCommercialIsContainingOrFaxIsContaining(String nom , String prenom , String type, String nomC , String fax , Pageable pageable);
}
