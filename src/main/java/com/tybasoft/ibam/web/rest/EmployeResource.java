package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Employe;
import com.tybasoft.ibam.repository.EmployeRepository;
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
 * REST controller for managing {@link com.tybasoft.ibam.domain.Employe}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EmployeResource {

    private final Logger log = LoggerFactory.getLogger(EmployeResource.class);

    private static final String ENTITY_NAME = "employe";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmployeRepository employeRepository;

    public EmployeResource(EmployeRepository employeRepository) {
        this.employeRepository = employeRepository;
    }

    /**
     * {@code POST  /employes} : Create a new employe.
     *
     * @param employe the employe to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new employe, or with status {@code 400 (Bad Request)} if the employe has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/employes")
    public ResponseEntity<Employe> createEmploye(@Valid @RequestBody Employe employe) throws URISyntaxException {
        log.debug("REST request to save Employe : {}", employe);
        if (employe.getId() != null) {
            throw new BadRequestAlertException("A new employe cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Employe result = employeRepository.save(employe);
        return ResponseEntity.created(new URI("/api/employes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /employes} : Updates an existing employe.
     *
     * @param employe the employe to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employe,
     * or with status {@code 400 (Bad Request)} if the employe is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employe couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/employes")
    public ResponseEntity<Employe> updateEmploye(@Valid @RequestBody Employe employe) throws URISyntaxException {
        log.debug("REST request to update Employe : {}", employe);
        if (employe.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Employe result = employeRepository.save(employe);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employe.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /employes} : get all the employes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of employes in body.
     */
    @GetMapping("/employes")
    public ResponseEntity<List<Employe>> getAllEmployes(Pageable pageable) {
        log.debug("REST request to get a page of Employes");
        Page<Employe> page = employeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /employes/:id} : get the "id" employe.
     *
     * @param id the id of the employe to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the employe, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/employes/{id}")
    public ResponseEntity<Employe> getEmploye(@PathVariable Long id) {
        log.debug("REST request to get Employe : {}", id);
        Optional<Employe> employe = employeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(employe);
    }

    /**
     * {@code DELETE  /employes/:id} : delete the "id" employe.
     *
     * @param id the id of the employe to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/employes/{id}")
    public ResponseEntity<Void> deleteEmploye(@PathVariable Long id) {
        log.debug("REST request to delete Employe : {}", id);
        employeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
