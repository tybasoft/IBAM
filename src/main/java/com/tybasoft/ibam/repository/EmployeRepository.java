package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Employe;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Employe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeRepository extends JpaRepository<Employe, Long> {

    Page<Employe> findByNomIsContainingOrPrenomIsContainingOrMatriculeIsContainingOrCinIsContaining(String nom , String prenom , String matricule , String cin , Pageable pageable);
}
