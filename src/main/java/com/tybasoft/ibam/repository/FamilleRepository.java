package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Famille;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Famille entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FamilleRepository extends JpaRepository<Famille, Long> {
    Page<Famille> findByLibelleIsContainingOrDescriptionIsContaining(String lib , String descp , Pageable pageable);
}
