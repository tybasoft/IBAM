package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Entitetest;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Entitetest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntitetestRepository extends JpaRepository<Entitetest, Long> {
}
