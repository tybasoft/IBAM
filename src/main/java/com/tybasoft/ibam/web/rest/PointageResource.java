package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Pointage;
import com.tybasoft.ibam.repository.PointageRepository;
import com.tybasoft.ibam.service.PointageService;
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
 * REST controller for managing {@link com.tybasoft.ibam.domain.Pointage}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PointageResource {

    private final Logger log = LoggerFactory.getLogger(PointageResource.class);

    private static final String ENTITY_NAME = "pointage";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PointageRepository pointageRepository;
    private final  PointageService   pointageService;
    public PointageResource(PointageRepository pointageRepository,PointageService   pointageService) {
        this.pointageRepository = pointageRepository;
        this.pointageService=pointageService;
    }

    /**
     * {@code POST  /pointages} : Create a new pointage.
     *
     * @param pointage the pointage to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pointage, or with status {@code 400 (Bad Request)} if the pointage has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pointages")
    public ResponseEntity<Pointage> createPointage(@Valid @RequestBody Pointage pointage) throws URISyntaxException {
        log.debug("REST request to save Pointage : {}", pointage);
        if (pointage.getId() != null) {
            throw new BadRequestAlertException("A new pointage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        
        Pointage result = pointageRepository.save(pointage);
        return ResponseEntity.created(new URI("/api/pointages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    
    /**
     * {@code PUT  /pointages} : Updates an existing pointage.
     *
     * @param pointage the pointage to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pointage,
     * or with status {@code 400 (Bad Request)} if the pointage is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pointage couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pointages")
    public ResponseEntity<Pointage> updatePointage(@Valid @RequestBody Pointage pointage) throws URISyntaxException {
        log.debug("REST request to update Pointage : {}", pointage);
        if (pointage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Pointage result = pointageRepository.save(pointage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pointage.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pointages} : get all the pointages.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pointages in body.
     */
    @GetMapping("/pointages")
    public ResponseEntity<List<Pointage>> getAllPointages(Pageable pageable) {
        log.debug("REST request to get a page of Pointages");
        Page<Pointage> page = pointageRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /pointages/:id} : get the "id" pointage.
     *
     * @param id the id of the pointage to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pointage, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pointages/{id}")
    public ResponseEntity<Pointage> getPointage(@PathVariable Long id) {
        log.debug("REST request to get Pointage : {}", id);
        Optional<Pointage> pointage = pointageRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pointage);
    }

    /**
     * {@code DELETE  /pointages/:id} : delete the "id" pointage.
     *
     * @param id the id of the pointage to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pointages/{id}")
    public ResponseEntity<Void> deletePointage(@PathVariable Long id) {
        log.debug("REST request to delete Pointage : {}", id);
        pointageRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
    
    /*Pour faire l'insertion du pointage du jour dans la base de donnees*/
    @PostMapping("/pointages/createPointageList")
    public ResponseEntity<Pointage[]> createListPointage(@Valid @RequestBody Pointage []  tab) throws URISyntaxException {
		    	Pointage [] result = pointageService.createPointage(tab);
		        return   ResponseEntity.created(new URI("/api/pointages/" ))
		                .headers(HeaderUtil.createEntityCreationAlert(applicationName,true,ENTITY_NAME,""))
		                .body(result);  
    }

}
