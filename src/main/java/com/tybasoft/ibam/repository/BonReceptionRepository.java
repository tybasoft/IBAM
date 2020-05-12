package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.BonReception;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the BonReception entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BonReceptionRepository extends JpaRepository<BonReception, Long> {
}
