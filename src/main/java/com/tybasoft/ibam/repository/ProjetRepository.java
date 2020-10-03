package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Projet;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Projet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjetRepository extends JpaRepository<Projet, Long> {

    Page<Projet> findByLibelleIsContainingOrReferenceIsContainingOrDescriptionIsContaining(String lib , String ref , String descp ,  Pageable pageable);
}
