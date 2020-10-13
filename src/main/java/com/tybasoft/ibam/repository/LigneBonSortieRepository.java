package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.LigneBonReception;
import com.tybasoft.ibam.domain.LigneBonSortie;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the LigneBonSortie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LigneBonSortieRepository extends JpaRepository<LigneBonSortie, Long> {

    List<LigneBonSortie> findAllByBonSortie_Id(Long id);

}
