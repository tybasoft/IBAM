package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.BonReception;
import com.tybasoft.ibam.domain.Image;
import com.tybasoft.ibam.repository.BonReceptionRepository;
import com.tybasoft.ibam.repository.ImageRepository;
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
 * REST controller for managing {@link com.tybasoft.ibam.domain.BonReception}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BonReceptionResource {

    private final Logger log = LoggerFactory.getLogger(BonReceptionResource.class);

    private static final String ENTITY_NAME = "bonReception";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BonReceptionRepository bonReceptionRepository;
    private final ImageService imageService;
    private final ImageRepository imageRepository;
    private final FileStorageService fileStorageService;

    public BonReceptionResource(BonReceptionRepository bonReceptionRepository, ImageService imageService, ImageRepository imageRepository, FileStorageService fileStorageService) {
        this.bonReceptionRepository = bonReceptionRepository;
        this.imageService = imageService;
        this.imageRepository = imageRepository;
        this.fileStorageService = fileStorageService;
    }

    /**
     * {@code POST  /bon-receptions} : Create a new bonReception.
     *
     * @param bonReception the bonReception to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bonReception, or with status {@code 400 (Bad Request)} if the bonReception has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bon-receptions")
    public ResponseEntity<BonReception> createBonReception(@Valid @RequestBody BonReception bonReception) throws URISyntaxException {
        Image image= bonReception.getImage();
        Image resultImage = imageService.saveImage(image, log, ENTITY_NAME);

        log.debug("REST request to save BonReception : {}", bonReception);
        if (bonReception.getId() != null) {
            throw new BadRequestAlertException("A new bonReception cannot already have an ID", ENTITY_NAME, "idexists");
        }
        bonReception.setImage(resultImage);
        BonReception result = bonReceptionRepository.save(bonReception);
        return ResponseEntity.created(new URI("/api/bon-receptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bon-receptions} : Updates an existing bonReception.
     *
     * @param bonReception the bonReception to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bonReception,
     * or with status {@code 400 (Bad Request)} if the bonReception is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bonReception couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bon-receptions")
    public ResponseEntity<BonReception> updateBonReception(@Valid @RequestBody BonReception bonReception) throws URISyntaxException {
        Image image= bonReception.getImage();
        Image resultImage= null;
        if(image != null) {
            log.debug("REST request to save Image : {}", image);
            resultImage = imageService.createImageEntity(image);
        }

        log.debug("REST request to update BonReception : {}", bonReception);
        if (bonReception.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        bonReception.setImage(resultImage);
        BonReception result = bonReceptionRepository.save(bonReception);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bonReception.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bon-receptions} : get all the bonReceptions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bonReceptions in body.
     */
    @GetMapping("/bon-receptions")
    public ResponseEntity<List<BonReception>> getAllBonReceptions(Pageable pageable) {
        log.debug("REST request to get a page of BonReceptions");
        Page<BonReception> page = bonReceptionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /bon-receptions/:id} : get the "id" bonReception.
     *
     * @param id the id of the bonReception to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bonReception, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bon-receptions/{id}")
    public ResponseEntity<BonReception> getBonReception(@PathVariable Long id) {
        log.debug("REST request to get BonReception : {}", id);
        Optional<BonReception> bonReception = bonReceptionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bonReception);
    }

    /**
     * {@code DELETE  /bon-receptions/:id} : delete the "id" bonReception.
     *
     * @param id the id of the bonReception to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bon-receptions/{id}")
    public ResponseEntity<Void> deleteBonReception(@PathVariable Long id) {
        BonReception bonReception= bonReceptionRepository.findById(id).get();
        Image image= bonReception.getImage();

        imageService.deleteImageEntityFile(image, log, imageRepository, fileStorageService);

        log.debug("REST request to delete BonReception : {}", id);
        bonReceptionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
