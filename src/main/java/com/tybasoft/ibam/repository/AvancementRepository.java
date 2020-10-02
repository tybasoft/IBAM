package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Avancement;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Avancement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AvancementRepository extends JpaRepository<Avancement, Long> {
    Avancement findById(int id);
}
