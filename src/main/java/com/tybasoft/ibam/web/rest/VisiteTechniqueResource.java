package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.VisiteTechnique;
import com.tybasoft.ibam.repository.VisiteTechniqueRepository;
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
 * REST controller for managing {@link com.tybasoft.ibam.domain.VisiteTechnique}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VisiteTechniqueResource {

    private final Logger log = LoggerFactory.getLogger(VisiteTechniqueResource.class);

    private static final String ENTITY_NAME = "visiteTechnique";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VisiteTechniqueRepository visiteTechniqueRepository;

    public VisiteTechniqueResource(VisiteTechniqueRepository visiteTechniqueRepository) {
        this.visiteTechniqueRepository = visiteTechniqueRepository;
    }

    /**
     * {@code POST  /visite-techniques} : Create a new visiteTechnique.
     *
     * @param visiteTechnique the visiteTechnique to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new visiteTechnique, or with status {@code 400 (Bad Request)} if the visiteTechnique has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/visite-techniques")
    public ResponseEntity<VisiteTechnique> createVisiteTechnique(@Valid @RequestBody VisiteTechnique visiteTechnique) throws URISyntaxException {
        log.debug("REST request to save VisiteTechnique : {}", visiteTechnique);
        if (visiteTechnique.getId() != null) {
            throw new BadRequestAlertException("A new visiteTechnique cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VisiteTechnique result = visiteTechniqueRepository.save(visiteTechnique);
        return ResponseEntity.created(new URI("/api/visite-techniques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /visite-techniques} : Updates an existing visiteTechnique.
     *
     * @param visiteTechnique the visiteTechnique to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated visiteTechnique,
     * or with status {@code 400 (Bad Request)} if the visiteTechnique is not valid,
     * or with status {@code 500 (Internal Server Error)} if the visiteTechnique couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/visite-techniques")
    public ResponseEntity<VisiteTechnique> updateVisiteTechnique(@Valid @RequestBody VisiteTechnique visiteTechnique) throws URISyntaxException {
        log.debug("REST request to update VisiteTechnique : {}", visiteTechnique);
        if (visiteTechnique.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VisiteTechnique result = visiteTechniqueRepository.save(visiteTechnique);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, visiteTechnique.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /visite-techniques} : get all the visiteTechniques.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of visiteTechniques in body.
     */
    @GetMapping("/visite-techniques")
    public ResponseEntity<List<VisiteTechnique>> getAllVisiteTechniques(Pageable pageable) {
        log.debug("REST request to get a page of VisiteTechniques");
        Page<VisiteTechnique> page = visiteTechniqueRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /visite-techniques/:id} : get the "id" visiteTechnique.
     *
     * @param id the id of the visiteTechnique to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the visiteTechnique, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/visite-techniques/{id}")
    public ResponseEntity<VisiteTechnique> getVisiteTechnique(@PathVariable Long id) {
        log.debug("REST request to get VisiteTechnique : {}", id);
        Optional<VisiteTechnique> visiteTechnique = visiteTechniqueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(visiteTechnique);
    }

    /**
     * {@code DELETE  /visite-techniques/:id} : delete the "id" visiteTechnique.
     *
     * @param id the id of the visiteTechnique to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/visite-techniques/{id}")
    public ResponseEntity<Void> deleteVisiteTechnique(@PathVariable Long id) {
        log.debug("REST request to delete VisiteTechnique : {}", id);
        visiteTechniqueRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
