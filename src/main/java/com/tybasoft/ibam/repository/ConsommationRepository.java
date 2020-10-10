package com.tybasoft.ibam.repository;

import java.util.List;

import com.tybasoft.ibam.domain.Consommation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data repository for the Consommation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsommationRepository extends JpaRepository<Consommation, Long> {
    @Query(value = "SELECT * FROM CONSOMMATION u WHERE u.materiel_id = ?1", nativeQuery = true)
    List<Consommation> findByMaterielId(@Param("id") Long id);

    Page<Consommation> findByQuantiteIsContainingOrTypeCarburantIsContainingOrMontantIsContaining(String qt , String type , String montant , Pageable pageable);
}
