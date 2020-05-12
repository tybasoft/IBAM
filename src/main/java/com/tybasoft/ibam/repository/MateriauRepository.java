package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Materiau;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Materiau entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MateriauRepository extends JpaRepository<Materiau, Long> {
}
