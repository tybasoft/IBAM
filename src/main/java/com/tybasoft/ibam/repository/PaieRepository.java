package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Paie;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Paie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaieRepository extends JpaRepository<Paie, Long> {

    Page<Paie> findByRemarquesIsContainingOrNbrHeurSupIsContainingOrMontantPayIsContainingOrNbrHeurSupIsContaining(String rem , String nbr , String montant , String heures , Pageable pageable);
}

