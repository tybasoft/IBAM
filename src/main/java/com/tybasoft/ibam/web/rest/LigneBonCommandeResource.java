package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.LigneBonCommande;
import com.tybasoft.ibam.repository.LigneBonCommandeRepository;
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
 * REST controller for managing {@link com.tybasoft.ibam.domain.LigneBonCommande}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LigneBonCommandeResource {

    private final Logger log = LoggerFactory.getLogger(LigneBonCommandeResource.class);

    private static final String ENTITY_NAME = "ligneBonCommande";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LigneBonCommandeRepository ligneBonCommandeRepository;

    public LigneBonCommandeResource(LigneBonCommandeRepository ligneBonCommandeRepository) {
        this.ligneBonCommandeRepository = ligneBonCommandeRepository;
    }

    /**
     * {@code POST  /ligne-bon-commandes} : Create a new ligneBonCommande.
     *
     * @param ligneBonCommande the ligneBonCommande to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ligneBonCommande, or with status {@code 400 (Bad Request)} if the ligneBonCommande has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ligne-bon-commandes")
    public ResponseEntity<LigneBonCommande> createLigneBonCommande(@Valid @RequestBody LigneBonCommande ligneBonCommande) throws URISyntaxException {
        log.debug("REST request to save LigneBonCommande : {}", ligneBonCommande);
        if (ligneBonCommande.getId() != null) {
            throw new BadRequestAlertException("A new ligneBonCommande cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LigneBonCommande result = ligneBonCommandeRepository.save(ligneBonCommande);
        return ResponseEntity.created(new URI("/api/ligne-bon-commandes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ligne-bon-commandes} : Updates an existing ligneBonCommande.
     *
     * @param ligneBonCommande the ligneBonCommande to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ligneBonCommande,
     * or with status {@code 400 (Bad Request)} if the ligneBonCommande is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ligneBonCommande couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ligne-bon-commandes")
    public ResponseEntity<LigneBonCommande> updateLigneBonCommande(@Valid @RequestBody LigneBonCommande ligneBonCommande) throws URISyntaxException {
        log.debug("REST request to update LigneBonCommande : {}", ligneBonCommande);
        if (ligneBonCommande.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LigneBonCommande result = ligneBonCommandeRepository.save(ligneBonCommande);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ligneBonCommande.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ligne-bon-commandes} : get all the ligneBonCommandes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ligneBonCommandes in body.
     */
    @GetMapping("/ligne-bon-commandes")
    public ResponseEntity<List<LigneBonCommande>> getAllLigneBonCommandes(Pageable pageable) {
        log.debug("REST request to get a page of LigneBonCommandes");
        Page<LigneBonCommande> page = ligneBonCommandeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ligne-bon-commandes/:id} : get the "id" ligneBonCommande.
     *
     * @param id the id of the ligneBonCommande to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ligneBonCommande, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ligne-bon-commandes/{id}")
    public ResponseEntity<LigneBonCommande> getLigneBonCommande(@PathVariable Long id) {
        log.debug("REST request to get LigneBonCommande : {}", id);
        Optional<LigneBonCommande> ligneBonCommande = ligneBonCommandeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ligneBonCommande);
    }

    /**
     * {@code DELETE  /ligne-bon-commandes/:id} : delete the "id" ligneBonCommande.
     *
     * @param id the id of the ligneBonCommande to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ligne-bon-commandes/{id}")
    public ResponseEntity<Void> deleteLigneBonCommande(@PathVariable Long id) {
        log.debug("REST request to delete LigneBonCommande : {}", id);
        ligneBonCommandeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
