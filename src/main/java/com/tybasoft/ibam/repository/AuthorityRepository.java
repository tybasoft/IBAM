package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Authority;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
    Page<Authority> findByNameIsContaining(String name, Pageable pageable);
}
