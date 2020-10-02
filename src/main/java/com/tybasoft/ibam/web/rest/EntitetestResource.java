package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Entitetest;
import com.tybasoft.ibam.repository.EntitetestRepository;
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
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.Entitetest}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EntitetestResource {

    private final Logger log = LoggerFactory.getLogger(EntitetestResource.class);

    private final EntitetestRepository entitetestRepository;

    public EntitetestResource(EntitetestRepository entitetestRepository) {
        this.entitetestRepository = entitetestRepository;
    }

    /**
     * {@code GET  /entitetests} : get all the entitetests.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of entitetests in body.
     */
    @GetMapping("/entitetests")
    public ResponseEntity<List<Entitetest>> getAllEntitetests(Pageable pageable) {
        log.debug("REST request to get a page of Entitetests");
        Page<Entitetest> page = entitetestRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /entitetests/:id} : get the "id" entitetest.
     *
     * @param id the id of the entitetest to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the entitetest, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/entitetests/{id}")
    public ResponseEntity<Entitetest> getEntitetest(@PathVariable Long id) {
        log.debug("REST request to get Entitetest : {}", id);
        Optional<Entitetest> entitetest = entitetestRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(entitetest);
    }
}
