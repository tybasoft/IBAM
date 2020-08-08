package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.FichePointage;
import com.tybasoft.ibam.repository.FichePointageRepository;
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
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.FichePointage}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FichePointageResource {

    private final Logger log = LoggerFactory.getLogger(FichePointageResource.class);

    private static final String ENTITY_NAME = "fichePointage";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FichePointageRepository fichePointageRepository;

    public FichePointageResource(FichePointageRepository fichePointageRepository) {
        this.fichePointageRepository = fichePointageRepository;
    }

    /**
     * {@code POST  /fiche-pointages} : Create a new fichePointage.
     *
     * @param fichePointage the fichePointage to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fichePointage, or with status {@code 400 (Bad Request)} if the fichePointage has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fiche-pointages")
    public ResponseEntity<FichePointage> createFichePointage(@RequestBody FichePointage fichePointage) throws URISyntaxException {
        log.debug("REST request to save FichePointage : {}", fichePointage);
        if (fichePointage.getId() != null) {
            throw new BadRequestAlertException("A new fichePointage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FichePointage result = fichePointageRepository.save(fichePointage);
        return ResponseEntity.created(new URI("/api/fiche-pointages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fiche-pointages} : Updates an existing fichePointage.
     *
     * @param fichePointage the fichePointage to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fichePointage,
     * or with status {@code 400 (Bad Request)} if the fichePointage is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fichePointage couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fiche-pointages")
    public ResponseEntity<FichePointage> updateFichePointage(@RequestBody FichePointage fichePointage) throws URISyntaxException {
        log.debug("REST request to update FichePointage : {}", fichePointage);
        if (fichePointage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FichePointage result = fichePointageRepository.save(fichePointage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fichePointage.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /fiche-pointages} : get all the fichePointages.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fichePointages in body.
     */
    @GetMapping("/fiche-pointages")
    public ResponseEntity<List<FichePointage>> getAllFichePointages(Pageable pageable) {
        log.debug("REST request to get a page of FichePointages");
        Page<FichePointage> page = fichePointageRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /fiche-pointages/:id} : get the "id" fichePointage.
     *
     * @param id the id of the fichePointage to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fichePointage, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fiche-pointages/{id}")
    public ResponseEntity<FichePointage> getFichePointage(@PathVariable Long id) {
        log.debug("REST request to get FichePointage : {}", id);
        Optional<FichePointage> fichePointage = fichePointageRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fichePointage);
    }

    /**
     * {@code DELETE  /fiche-pointages/:id} : delete the "id" fichePointage.
     *
     * @param id the id of the fichePointage to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fiche-pointages/{id}")
    public ResponseEntity<Void> deleteFichePointage(@PathVariable Long id) {
        log.debug("REST request to delete FichePointage : {}", id);
        fichePointageRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
