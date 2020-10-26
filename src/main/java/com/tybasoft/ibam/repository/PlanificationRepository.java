package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Employe;
import com.tybasoft.ibam.domain.Planification;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Planification entity.
 */
@Repository
public interface PlanificationRepository extends JpaRepository<Planification, Long> {

    @Query(value = "select distinct planification from Planification planification left join fetch planification.employes",
        countQuery = "select count(distinct planification) from Planification planification")
    Page<Planification> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct planification from Planification planification left join fetch planification.employes")
    List<Planification> findAllWithEagerRelationships();

    @Query("select planification from Planification planification left join fetch planification.employes where planification.id =:id")
    Optional<Planification> findOneWithEagerRelationships(@Param("id") Long id);

    List<Planification> findAllByEmployes(Optional<Employe> employe);
}
