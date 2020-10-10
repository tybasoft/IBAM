package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.TransfertMateriel;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TransfertMateriel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransfertMaterielRepository extends JpaRepository<TransfertMateriel, Long> {
    Page<TransfertMateriel> findByReferenceIsContainingOrCommentaireIsContainingOrMateriel_LibelleIsContaining(String ref, String commentaire , String mat , Pageable pageable);
}
