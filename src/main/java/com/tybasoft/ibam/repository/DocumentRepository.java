package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Document;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Document entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

    Page<Document> findByTitreIsContainingOrPathIsContainingOrTypeIsContainingOrCommentaireIsContaining(String titre, String path , String type, String commentaire, Pageable pageable);
}
