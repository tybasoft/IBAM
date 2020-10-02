package com.tybasoft.ibam.service;

import com.tybasoft.ibam.domain.Document;
import com.tybasoft.ibam.repository.DocumentRepository;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;

@Service
public class DocumentService {
    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public Document createDocumentEntity(Document document){
        Document newdocument= new Document();

        String documentPath= "doc"+ document.getPath();
        newdocument.setPath("/content/uploads/documents/"+documentPath);
        newdocument.setTitre(document.getTitre()+"-Document");
        newdocument.setType(document.getType());

        if (document.getId() != null) {
            newdocument.setId(document.getId());
        }

        return documentRepository.save(newdocument);
    }

    public void deleteDocumentEntityFile(Document document, Logger log, DocumentRepository documentRepository, FileStorageService fileStorageService) {
        if (document != null) {
            Document newDocument= documentRepository.findById(document.getId()).get();
            String documentPath= newDocument.getPath().substring(27);

            log.debug("REST request to delete Document : {}", newDocument.getId());
            documentRepository.deleteById(newDocument.getId());
            fileStorageService.deleteFile(documentPath, "document");
        }
    }
}