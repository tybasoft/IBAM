package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.LigneBonReception;
import com.tybasoft.ibam.domain.LigneBonSortie;
import com.tybasoft.ibam.repository.LigneBonSortieRepository;
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
 * REST controller for managing {@link com.tybasoft.ibam.domain.LigneBonSortie}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LigneBonSortieResource {

    private final Logger log = LoggerFactory.getLogger(LigneBonSortieResource.class);

    private final LigneBonSortieRepository ligneBonSortieRepository;

    public LigneBonSortieResource(LigneBonSortieRepository ligneBonSortieRepository) {
        this.ligneBonSortieRepository = ligneBonSortieRepository;
    }

    /**
     * {@code GET  /ligne-bon-sorties} : get all the ligneBonSorties.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ligneBonSorties in body.
     */
    @GetMapping("/ligne-bon-sorties")
    public ResponseEntity<List<LigneBonSortie>> getAllLigneBonSorties(Pageable pageable) {
        log.debug("REST request to get a page of LigneBonSorties");
        Page<LigneBonSortie> page = ligneBonSortieRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ligne-bon-sorties/:id} : get the "id" ligneBonSortie.
     *
     * @param id the id of the ligneBonSortie to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ligneBonSortie, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ligne-bon-sorties/{id}")
    public ResponseEntity<LigneBonSortie> getLigneBonSortie(@PathVariable Long id) {
        log.debug("REST request to get LigneBonSortie : {}", id);
        Optional<LigneBonSortie> ligneBonSortie = ligneBonSortieRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ligneBonSortie);
    }

    @GetMapping("/ligne-bon-sorties/{id}/lignes")
    public ResponseEntity<List<LigneBonSortie>> getAllLigneBonSortieById(@PathVariable Long id) {
        log.debug("REST request to get LigneBonReception : {}", id);
        List<LigneBonSortie> ligneBonSortieList = ligneBonSortieRepository.findAllByBonSortie_Id(id);
        log.debug("Show all LigneBonSortie : {}", ligneBonSortieList.size());
        return ResponseEntity.ok().body(ligneBonSortieList);
    }
}
