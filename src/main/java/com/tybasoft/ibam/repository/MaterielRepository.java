package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Materiel;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Materiel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaterielRepository extends JpaRepository<Materiel, Long> {
}
