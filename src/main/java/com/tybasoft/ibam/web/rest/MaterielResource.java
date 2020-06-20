package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Document;
import com.tybasoft.ibam.domain.Image;
import com.tybasoft.ibam.domain.Materiel;
import com.tybasoft.ibam.repository.DocumentRepository;
import com.tybasoft.ibam.repository.ImageRepository;
import com.tybasoft.ibam.repository.MaterielRepository;
import com.tybasoft.ibam.service.DocumentService;
import com.tybasoft.ibam.service.FileStorageService;
import com.tybasoft.ibam.service.ImageService;
import com.tybasoft.ibam.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.Materiel}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MaterielResource {

    private final Logger log = LoggerFactory.getLogger(MaterielResource.class);

    private static final String ENTITY_NAME = "materiel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MaterielRepository materielRepository;
    private final ImageService imageService;
    private final ImageRepository imageRepository;
    private final DocumentService documentService;
    private final DocumentRepository documentRepository;
    private final FileStorageService fileStorageService;

    public MaterielResource(MaterielRepository materielRepository, ImageService imageService, ImageRepository imageRepository, DocumentService documentService, DocumentRepository documentRepository, FileStorageService fileStorageService) {
        this.materielRepository = materielRepository;
        this.imageService = imageService;
        this.imageRepository = imageRepository;
        this.documentService = documentService;
        this.documentRepository = documentRepository;
        this.fileStorageService = fileStorageService;
    }

    /**
     * {@code POST  /materiels} : Create a new materiel.
     *
     * @param materiel the materiel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new materiel, or with status {@code 400 (Bad Request)} if the materiel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/materiels")
    public ResponseEntity<Materiel> createMateriel(@Valid @RequestBody Materiel materiel) throws URISyntaxException {
        Image image= materiel.getImage();
        Document document= materiel.getDocument();
        Image resultImage= null;
        Document resultDocument= null;

        if(image != null) {
            log.debug("REST request to save Image : {}", image);
            if (image.getId() != null) {
                throw new BadRequestAlertException("A new image cannot already have an ID", ENTITY_NAME, "idexists");
            }
            resultImage = imageService.createImageEntity(image);
        }

        if(document != null) {
            log.debug("REST request to save Document : {}", document);
            if (document.getId() != null) {
                throw new BadRequestAlertException("A new document cannot already have an ID", ENTITY_NAME, "idexists");
            }
            resultDocument = documentService.createDocumentEntity(document);
        }
        
        log.debug("REST request to save Materiel : {}", materiel);
        if (materiel.getId() != null) {
            throw new BadRequestAlertException("A new materiel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        materiel.setImage(resultImage);
        materiel.setDocument(resultDocument);
        Materiel result = materielRepository.save(materiel);
        return ResponseEntity.created(new URI("/api/materiels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /materiels} : Updates an existing materiel.
     *
     * @param materiel the materiel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated materiel,
     * or with status {@code 400 (Bad Request)} if the materiel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the materiel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/materiels")
    public ResponseEntity<Materiel> updateMateriel(@Valid @RequestBody Materiel materiel) throws URISyntaxException {
        Image image= materiel.getImage();
        Document document= materiel.getDocument();
        Image resultImage= null;
        Document resultDocument= null;

        if(image != null) {
            if (image.getPath() == null && image.getTitre() == null){
                resultImage= image;
            }else {
                log.debug("REST request to save Image : {}", image);
                resultImage = imageService.createImageEntity(image);
            }
        }

        if(document != null) {
            if (document.getPath() == null && document.getTitre() == null){
                resultDocument= document;
            }else {
                log.debug("REST request to save Document : {}", document);
                resultDocument = documentService.createDocumentEntity(document);
            }
        }

        log.debug("REST request to update Materiel : {}", materiel);
        if (materiel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        materiel.setImage(resultImage);
        materiel.setDocument(resultDocument);
        Materiel result = materielRepository.save(materiel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, materiel.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /materiels} : get all the materiels.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of materiels in body.
     */
    @GetMapping("/materiels")
    public ResponseEntity<List<Materiel>> getAllMateriels(Pageable pageable) {
        log.debug("REST request to get a page of Materiels");
        Page<Materiel> page = materielRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /materiels/:id} : get the "id" materiel.
     *
     * @param id the id of the materiel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the materiel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/materiels/{id}")
    public ResponseEntity<Materiel> getMateriel(@PathVariable Long id) {
        log.debug("REST request to get Materiel : {}", id);
        Optional<Materiel> materiel = materielRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(materiel);
    }

    /**
     * {@code DELETE  /materiels/:id} : delete the "id" materiel.
     *
     * @param id the id of the materiel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/materiels/{id}")
    public ResponseEntity<Void> deleteMateriel(@PathVariable Long id) {
        Materiel materiel= materielRepository.findById(id).get();
        Image image= materiel.getImage();
        Document document= materiel.getDocument();

        imageService.deleteImageEntityFile(image, log, imageRepository, fileStorageService);
        documentService.deleteDocumentEntityFile(document, log, documentRepository, fileStorageService);

        log.debug("REST request to delete Materiel : {}", id);
        materielRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
