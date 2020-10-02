package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Pointage;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Pointage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PointageRepository extends JpaRepository<Pointage, Long> {
}
