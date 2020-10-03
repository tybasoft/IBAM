package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.TypeMateriel;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the TypeMateriel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeMaterielRepository extends JpaRepository<TypeMateriel, Long> {

    List<TypeMateriel> findByTypeIsContaining(String type);
}
