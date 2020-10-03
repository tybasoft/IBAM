package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Image;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Image entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    Page<Image> findByTitreIsContainingOrPathIsContaining(String titre , String path , Pageable pageable);
}
