package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Location;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Location entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    Page<Location> findByReferenceIsContainingOrTarifIsContaining(String ref , String tarif , Pageable pageable);
}
