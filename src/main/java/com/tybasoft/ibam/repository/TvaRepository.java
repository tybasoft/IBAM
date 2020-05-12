package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Tva;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Tva entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TvaRepository extends JpaRepository<Tva, Long> {
}
