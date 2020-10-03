package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Marque;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Marque entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MarqueRepository extends JpaRepository<Marque, Long> {
    Page<Marque> findByDescriptionIsContainingOrLibelleIsContaining(String descp , String lib, Pageable pageable);
}
