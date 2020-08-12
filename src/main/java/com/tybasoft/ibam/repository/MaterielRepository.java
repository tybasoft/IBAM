package com.tybasoft.ibam.repository;

import java.util.List;

import com.tybasoft.ibam.domain.Materiel;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data repository for the Materiel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaterielRepository extends JpaRepository<Materiel, Long> {
    @Query(value = "SELECT * FROM MATERIEL u WHERE u.projet_id = ?1", nativeQuery = true)
    List<Materiel> findAllByProjetId(@Param("id") Long id);
}
