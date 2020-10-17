package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.LigneBonReception;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

/**
 * Spring Data  repository for the LigneBonReception entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LigneBonReceptionRepository extends JpaRepository<LigneBonReception, Long> {

    List<LigneBonReception> findAllByBonReception_Id(Long id);
    List<LigneBonReception> findAllByMateriau_ReferenceOrMateriel_Reference(String referenceMateriau , String referenceMateriel);
}
