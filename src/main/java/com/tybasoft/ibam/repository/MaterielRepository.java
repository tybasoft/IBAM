package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Materiel;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Materiel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaterielRepository extends JpaRepository<Materiel, Long> {

    List<Materiel> findAllByProjetId(Long id);
    Page<Materiel> findByLibelleIsContainingOrMatriculeIsContainingOrModeleIsContainingOrNumCarteGriseIsContaining(String lib , String matricule, String modele , String num , Pageable pageable);
}
