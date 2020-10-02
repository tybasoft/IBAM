package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.LigneBonReception;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the LigneBonReception entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LigneBonReceptionRepository extends JpaRepository<LigneBonReception, Long> {
}
