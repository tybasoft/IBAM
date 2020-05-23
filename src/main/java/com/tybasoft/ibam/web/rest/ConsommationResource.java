package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Consommation;
import com.tybasoft.ibam.repository.ConsommationRepository;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.Consommation}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ConsommationResource {

    private final Logger log = LoggerFactory.getLogger(ConsommationResource.class);

    private static final String ENTITY_NAME = "consommation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConsommationRepository consommationRepository;

    public ConsommationResource(ConsommationRepository consommationRepository) {
        this.consommationRepository = consommationRepository;
    }

    /**
     * {@code POST  /consommations} : Create a new consommation.
     *
     * @param consommation the consommation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new consommation, or with status {@code 400 (Bad Request)} if the consommation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/consommations")
    public ResponseEntity<Consommation> createConsommation(@Valid @RequestBody Consommation consommation) throws URISyntaxException {
        log.debug("REST request to save Consommation : {}", consommation);
        if (consommation.getId() != null) {
            throw new BadRequestAlertException("A new consommation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Consommation result = consommationRepository.save(consommation);
        return ResponseEntity.created(new URI("/api/consommations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /consommations} : Updates an existing consommation.
     *
     * @param consommation the consommation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consommation,
     * or with status {@code 400 (Bad Request)} if the consommation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the consommation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/consommations")
    public ResponseEntity<Consommation> updateConsommation(@Valid @RequestBody Consommation consommation) throws URISyntaxException {
        log.debug("REST request to update Consommation : {}", consommation);
        if (consommation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Consommation result = consommationRepository.save(consommation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consommation.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /consommations} : get all the consommations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of consommations in body.
     */
    @GetMapping("/consommations")
    public ResponseEntity<List<Consommation>> getAllConsommations(Pageable pageable) {
        log.debug("REST request to get a page of Consommations");
        Page<Consommation> page = consommationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /consommations/:id} : get the "id" consommation.
     *
     * @param id the id of the consommation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the consommation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/consommations/{id}")
    public ResponseEntity<Consommation> getConsommation(@PathVariable Long id) {
        log.debug("REST request to get Consommation : {}", id);
        Optional<Consommation> consommation = consommationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(consommation);
    }

    /**
     * {@code DELETE  /consommations/:id} : delete the "id" consommation.
     *
     * @param id the id of the consommation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/consommations/{id}")
    public ResponseEntity<Void> deleteConsommation(@PathVariable Long id) {
        log.debug("REST request to delete Consommation : {}", id);
        consommationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}