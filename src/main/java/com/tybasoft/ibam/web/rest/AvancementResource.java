package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Assurance;
import com.tybasoft.ibam.domain.Avancement;
import com.tybasoft.ibam.repository.AvancementRepository;
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
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.Avancement}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AvancementResource {

    private final Logger log = LoggerFactory.getLogger(AvancementResource.class);

    private static final String ENTITY_NAME = "avancement";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AvancementRepository avancementRepository;

    public AvancementResource(AvancementRepository avancementRepository) {
        this.avancementRepository = avancementRepository;
    }

    /**
     * {@code POST  /avancements} : Create a new avancement.
     *
     * @param avancement the avancement to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new avancement, or with status {@code 400 (Bad Request)} if the avancement has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/avancements")
    public ResponseEntity<Avancement> createAvancement(@RequestBody Avancement avancement) throws URISyntaxException {
        log.debug("REST request to save Avancement : {}", avancement);
        if (avancement.getId() != null) {
            throw new BadRequestAlertException("A new avancement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Avancement result = avancementRepository.save(avancement);
        return ResponseEntity.created(new URI("/api/avancements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /avancements} : Updates an existing avancement.
     *
     * @param avancement the avancement to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated avancement,
     * or with status {@code 400 (Bad Request)} if the avancement is not valid,
     * or with status {@code 500 (Internal Server Error)} if the avancement couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/avancements")
    public ResponseEntity<Avancement> updateAvancement(@RequestBody Avancement avancement) throws URISyntaxException {
        log.debug("REST request to update Avancement : {}", avancement);
        if (avancement.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Avancement result = avancementRepository.save(avancement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, avancement.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /avancements} : get all the avancements.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of avancements in body.
     */
    @GetMapping("/avancements")
    public ResponseEntity<List<Avancement>> getAllAvancements(Pageable pageable) {
        log.debug("REST request to get a page of Avancements");
        Page<Avancement> page = avancementRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /avancements/:id} : get the "id" avancement.
     *
     * @param id the id of the avancement to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the avancement, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/avancements/{id}")
    public ResponseEntity<Avancement> getAvancement(@PathVariable Long id) {
        log.debug("REST request to get Avancement : {}", id);
        Optional<Avancement> avancement = avancementRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(avancement);
    }




    @GetMapping("/avancement/search-entities/{keyword}")
    public ResponseEntity<Collection<Avancement>> seachInAllEntities(@PathVariable String  keyword, Pageable pageable){
        Page<Avancement> avancements ;
//        String key = keyword.toLowerCase();
        log.debug("GET ALL ENTITIES FOR SEARCHING IN FRONTEND");
        log.debug(keyword);
        avancements = avancementRepository.findByTitreCompteRenduIsContainingOrContenuCompteRenduIsContainingOrEmploye_EmailIsContaining(keyword,keyword,keyword,pageable);
        log.debug(String.valueOf(avancements.stream().count()));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), avancements);

        return ResponseEntity.ok().headers(headers).body(avancements.getContent());
    }

    /**
     * {@code DELETE  /avancements/:id} : delete the "id" avancement.
     *
     * @param id the id of the avancement to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/avancements/{id}")
    public ResponseEntity<Void> deleteAvancement(@PathVariable Long id) {
        log.debug("REST request to delete Avancement : {}", id);
        avancementRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
