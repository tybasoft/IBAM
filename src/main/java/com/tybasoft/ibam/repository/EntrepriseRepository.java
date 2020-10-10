package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Entreprise;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Entreprise entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntrepriseRepository extends JpaRepository<Entreprise, Long> {

    List<Entreprise> findByEntiteJuridiqueIsContainingOrNomCommercialIsContainingOrAdresseIsContainingOrCapitalIsContaining(String entite , String nom , String adresse , String capitale);
}
