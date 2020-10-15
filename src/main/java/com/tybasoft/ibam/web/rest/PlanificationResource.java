package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Employe;
import com.tybasoft.ibam.domain.Planification;
import com.tybasoft.ibam.repository.EmployeRepository;
import com.tybasoft.ibam.repository.PlanificationRepository;
import com.tybasoft.ibam.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
 * REST controller for managing {@link com.tybasoft.ibam.domain.Planification}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PlanificationResource {

    private final Logger log = LoggerFactory.getLogger(PlanificationResource.class);

    private static final String ENTITY_NAME = "planification";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlanificationRepository planificationRepository;

    @Autowired
    private  EmployeRepository employeRepository;


    public PlanificationResource(PlanificationRepository planificationRepository) {
        this.planificationRepository = planificationRepository;
    }


    /**
     * {@code POST  /planifications} : Create a new planification.
     *
     * @param planification the planification to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new planification, or with status {@code 400 (Bad Request)} if the planification has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/planifications")
    public ResponseEntity<Planification> createPlanification(@RequestBody Planification planification) throws URISyntaxException {
        log.debug("REST request to save Planification : {}", planification);
        if (planification.getId() != null) {
            throw new BadRequestAlertException("A new planification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Planification result = planificationRepository.save(planification);
        return ResponseEntity.created(new URI("/api/planifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /planifications} : Updates an existing planification.
     *
     * @param planification the planification to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planification,
     * or with status {@code 400 (Bad Request)} if the planification is not valid,
     * or with status {@code 500 (Internal Server Error)} if the planification couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/planifications")
    public ResponseEntity<Planification> updatePlanification(@RequestBody Planification planification) throws URISyntaxException {
        log.debug("REST request to update Planification : {}", planification);
        if (planification.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Planification result = planificationRepository.save(planification);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, planification.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /planifications} : get all the planifications.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of planifications in body.
     */
    @GetMapping("/planifications")
    public ResponseEntity<List<Planification>> getAllPlanifications(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Planifications");
        Page<Planification> page;
        if (eagerload) {
            page = planificationRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = planificationRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    /**
    *  Get tasks of employe
    * */
    @GetMapping("/planifications/employe/{id}")
    public List<Planification> getAllTasksOfEmploye(@PathVariable Long id) {
        log.debug("REST request to get a page of Planifications");

        Optional<Employe> employe = employeRepository.findById(id);
        List<Planification> tasks = planificationRepository.findAllByEmployes(employe);

    return tasks;
    }

    /**
     * {@code GET  /planifications/:id} : get the "id" planification.
     *
     * @param id the id of the planification to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the planification, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/planifications/{id}")
    public ResponseEntity<Planification> getPlanification(@PathVariable Long id) {
        log.debug("REST request to get Planification : {}", id);
        Optional<Planification> planification = planificationRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(planification);
    }

    /**
     * {@code DELETE  /planifications/:id} : delete the "id" planification.
     *
     * @param id the id of the planification to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/planifications/{id}")
    public ResponseEntity<Void> deletePlanification(@PathVariable Long id) {
        log.debug("REST request to delete Planification : {}", id);
        planificationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
