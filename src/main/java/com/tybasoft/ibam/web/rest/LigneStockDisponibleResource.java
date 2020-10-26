package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.LigneStockDisponible;
import com.tybasoft.ibam.repository.LigneStockDisponibleRepository;
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
 * REST controller for managing {@link com.tybasoft.ibam.domain.LigneStockDisponible}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LigneStockDisponibleResource {

    private final Logger log = LoggerFactory.getLogger(LigneStockDisponibleResource.class);

    private static final String ENTITY_NAME = "ligneStockDisponible";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LigneStockDisponibleRepository ligneStockDisponibleRepository;

    public LigneStockDisponibleResource(LigneStockDisponibleRepository ligneStockDisponibleRepository) {
        this.ligneStockDisponibleRepository = ligneStockDisponibleRepository;
    }

    /**
     * {@code POST  /ligne-stock-disponibles} : Create a new ligneStockDisponible.
     *
     * @param ligneStockDisponible the ligneStockDisponible to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ligneStockDisponible, or with status {@code 400 (Bad Request)} if the ligneStockDisponible has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ligne-stock-disponibles")
    public ResponseEntity<LigneStockDisponible> createLigneStockDisponible(@Valid @RequestBody LigneStockDisponible ligneStockDisponible) throws URISyntaxException {
        log.debug("REST request to save LigneStockDisponible : {}", ligneStockDisponible);
        if (ligneStockDisponible.getId() != null) {
            throw new BadRequestAlertException("A new ligneStockDisponible cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LigneStockDisponible result = ligneStockDisponibleRepository.save(ligneStockDisponible);
        return ResponseEntity.created(new URI("/api/ligne-stock-disponibles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ligne-stock-disponibles} : Updates an existing ligneStockDisponible.
     *
     * @param ligneStockDisponible the ligneStockDisponible to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ligneStockDisponible,
     * or with status {@code 400 (Bad Request)} if the ligneStockDisponible is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ligneStockDisponible couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ligne-stock-disponibles")
    public ResponseEntity<LigneStockDisponible> updateLigneStockDisponible(@Valid @RequestBody LigneStockDisponible ligneStockDisponible) throws URISyntaxException {
        log.debug("REST request to update LigneStockDisponible : {}", ligneStockDisponible);
        if (ligneStockDisponible.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LigneStockDisponible result = ligneStockDisponibleRepository.save(ligneStockDisponible);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ligneStockDisponible.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ligne-stock-disponibles} : get all the ligneStockDisponibles.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ligneStockDisponibles in body.
     */
    @GetMapping("/ligne-stock-disponibles")
    public ResponseEntity<List<LigneStockDisponible>> getAllLigneStockDisponibles(Pageable pageable) {
        log.debug("REST request to get a page of LigneStockDisponibles");
        Page<LigneStockDisponible> page = ligneStockDisponibleRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ligne-stock-disponibles/:id} : get the "id" ligneStockDisponible.
     *
     * @param id the id of the ligneStockDisponible to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ligneStockDisponible, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ligne-stock-disponibles/{id}")
    public ResponseEntity<LigneStockDisponible> getLigneStockDisponible(@PathVariable Long id) {
        log.debug("REST request to get LigneStockDisponible : {}", id);
        Optional<LigneStockDisponible> ligneStockDisponible = ligneStockDisponibleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ligneStockDisponible);
    }

    /**
     * {@code DELETE  /ligne-stock-disponibles/:id} : delete the "id" ligneStockDisponible.
     *
     * @param id the id of the ligneStockDisponible to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ligne-stock-disponibles/{id}")
    public ResponseEntity<Void> deleteLigneStockDisponible(@PathVariable Long id) {
        log.debug("REST request to delete LigneStockDisponible : {}", id);
        ligneStockDisponibleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
