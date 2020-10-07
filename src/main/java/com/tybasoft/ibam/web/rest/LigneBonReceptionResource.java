package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.LigneBonReception;
import com.tybasoft.ibam.repository.LigneBonReceptionRepository;
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
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.LigneBonReception}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LigneBonReceptionResource {

    private final Logger log = LoggerFactory.getLogger(LigneBonReceptionResource.class);

    private static final String ENTITY_NAME = "ligneBonReception";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LigneBonReceptionRepository ligneBonReceptionRepository;

    public LigneBonReceptionResource(LigneBonReceptionRepository ligneBonReceptionRepository) {
        this.ligneBonReceptionRepository = ligneBonReceptionRepository;
    }

    /**
     * {@code POST  /ligne-bon-receptions} : Create a new ligneBonReception.
     *
     * @param ligneBonReception the ligneBonReception to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ligneBonReception, or with status {@code 400 (Bad Request)} if the ligneBonReception has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ligne-bon-receptions")
    public ResponseEntity<LigneBonReception> createLigneBonReception(@Valid @RequestBody LigneBonReception ligneBonReception) throws URISyntaxException {
        log.debug("REST request to save LigneBonReception : {}", ligneBonReception);
        if (ligneBonReception.getId() != null) {
            throw new BadRequestAlertException("A new ligneBonReception cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LigneBonReception result = ligneBonReceptionRepository.save(ligneBonReception);
        return ResponseEntity.created(new URI("/api/ligne-bon-receptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ligne-bon-receptions} : Updates an existing ligneBonReception.
     *
     * @param ligneBonReception the ligneBonReception to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ligneBonReception,
     * or with status {@code 400 (Bad Request)} if the ligneBonReception is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ligneBonReception couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ligne-bon-receptions")
    public ResponseEntity<LigneBonReception> updateLigneBonReception(@Valid @RequestBody LigneBonReception ligneBonReception) throws URISyntaxException {
        log.debug("REST request to update LigneBonReception : {}", ligneBonReception);
        if (ligneBonReception.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LigneBonReception result = ligneBonReceptionRepository.save(ligneBonReception);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ligneBonReception.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ligne-bon-receptions} : get all the ligneBonReceptions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ligneBonReceptions in body.
     */
    @GetMapping("/ligne-bon-receptions")
    public ResponseEntity<List<LigneBonReception>> getAllLigneBonReceptions(Pageable pageable) {
        log.debug("REST request to get a page of LigneBonReceptions");
        Page<LigneBonReception> page = ligneBonReceptionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ligne-bon-receptions/:id} : get the "id" ligneBonReception.
     *
     * @param id the id of the ligneBonReception to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ligneBonReception, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ligne-bon-receptions/{id}")
    public ResponseEntity<LigneBonReception> getLigneBonReception(@PathVariable Long id) {
        log.debug("REST request to get LigneBonReception : {}", id);
        Optional<LigneBonReception> ligneBonReception = ligneBonReceptionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ligneBonReception);
    }

    /**
     * {@code DELETE  /ligne-bon-receptions/:id} : delete the "id" ligneBonReception.
     *
     * @param id the id of the ligneBonReception to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ligne-bon-receptions/{id}")
    public ResponseEntity<Void> deleteLigneBonReception(@PathVariable Long id) {
        log.debug("REST request to delete LigneBonReception : {}", id);
        ligneBonReceptionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
    @GetMapping("/ligne-bon-receptions/{id}/lignes")
    public ResponseEntity<List<LigneBonReception>> getAllLigneBonReceptionById(@PathVariable Long id) {
        log.debug("REST request to get LigneBonReception : {}", id);
        List<LigneBonReception> ligneBonReceptions = ligneBonReceptionRepository.findAllByBonReception_Id(id);
        log.debug("Show all LigneBonCommande : {}", ligneBonReceptions.size());
        return ResponseEntity.ok().body(ligneBonReceptions);
    }

}
