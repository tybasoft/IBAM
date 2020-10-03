package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Unite;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Unite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UniteRepository extends JpaRepository<Unite, Long> {
    Page<Unite>  findByLibelleIsContainingOrSymboleIsContainingOrDescriptionIsContaining(String lib , String symbole,String descp , Pageable pageable);
}
