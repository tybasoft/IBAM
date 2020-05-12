package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Tva;
import com.tybasoft.ibam.repository.TvaRepository;
import com.tybasoft.ibam.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.Tva}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TvaResource {

    private final Logger log = LoggerFactory.getLogger(TvaResource.class);

    private static final String ENTITY_NAME = "tva";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TvaRepository tvaRepository;

    public TvaResource(TvaRepository tvaRepository) {
        this.tvaRepository = tvaRepository;
    }

    /**
     * {@code POST  /tvas} : Create a new tva.
     *
     * @param tva the tva to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tva, or with status {@code 400 (Bad Request)} if the tva has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tvas")
    public ResponseEntity<Tva> createTva(@Valid @RequestBody Tva tva) throws URISyntaxException {
        log.debug("REST request to save Tva : {}", tva);
        if (tva.getId() != null) {
            throw new BadRequestAlertException("A new tva cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tva result = tvaRepository.save(tva);
        return ResponseEntity.created(new URI("/api/tvas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tvas} : Updates an existing tva.
     *
     * @param tva the tva to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tva,
     * or with status {@code 400 (Bad Request)} if the tva is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tva couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tvas")
    public ResponseEntity<Tva> updateTva(@Valid @RequestBody Tva tva) throws URISyntaxException {
        log.debug("REST request to update Tva : {}", tva);
        if (tva.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tva result = tvaRepository.save(tva);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tva.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tvas} : get all the tvas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tvas in body.
     */
    @GetMapping("/tvas")
    public List<Tva> getAllTvas() {
        log.debug("REST request to get all Tvas");
        return tvaRepository.findAll();
    }

    /**
     * {@code GET  /tvas/:id} : get the "id" tva.
     *
     * @param id the id of the tva to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tva, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tvas/{id}")
    public ResponseEntity<Tva> getTva(@PathVariable Long id) {
        log.debug("REST request to get Tva : {}", id);
        Optional<Tva> tva = tvaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tva);
    }

    /**
     * {@code DELETE  /tvas/:id} : delete the "id" tva.
     *
     * @param id the id of the tva to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tvas/{id}")
    public ResponseEntity<Void> deleteTva(@PathVariable Long id) {
        log.debug("REST request to delete Tva : {}", id);
        tvaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
