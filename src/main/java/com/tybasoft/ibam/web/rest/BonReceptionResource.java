package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.BonCommande;
import com.tybasoft.ibam.domain.BonReception;
import com.tybasoft.ibam.domain.LigneBonCommande;
import com.tybasoft.ibam.domain.LigneBonReception;
import com.tybasoft.ibam.repository.BonReceptionRepository;
import com.tybasoft.ibam.repository.LigneBonReceptionRepository;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.BonReception}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BonReceptionResource {

    private final Logger log = LoggerFactory.getLogger(BonReceptionResource.class);

    private static final String ENTITY_NAME = "bonReception";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
    LigneBonReceptionRepository ligneBonReceptionRepository;

    private final BonReceptionRepository bonReceptionRepository;

    public BonReceptionResource(BonReceptionRepository bonReceptionRepository) {
        this.bonReceptionRepository = bonReceptionRepository;
    }

    /**
     * {@code POST  /bon-receptions} : Create a new bonReception.
     *
     * @param bonReception the bonReception to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bonReception, or with status {@code 400 (Bad Request)} if the bonReception has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
//    @PostMapping("/bon-receptions")
//    public ResponseEntity<BonReception> createBonReception( @RequestBody BonReception bonReception) throws URISyntaxException {
//        log.debug("REST request to save BonReception : {}", bonReception);
//        if (bonReception.getId() != null) {
//            throw new BadRequestAlertException("A new bonReception cannot already have an ID", ENTITY_NAME, "idexists");
//        }
//        BonReception result = bonReceptionRepository.save(bonReception);
//        return ResponseEntity.created(new URI("/api/bon-receptions/" + result.getId()))
//            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
//            .body(result);
//    }

    @PostMapping("/bon-receptions")
    public ResponseEntity<?> createBonReception(@RequestBody BonReception bonReception) throws URISyntaxException {
        log.debug("REST request to save BonReception : {}", bonReception.getLigneBonRecs());
        if (bonReception.getId() != null) {
            throw new BadRequestAlertException("A new bonReception cannot already have an ID", ENTITY_NAME, "idexists");
        }
        System.out.println("Ligne Bon de reception");
        System.out.println(bonReception);
        BonReception result = bonReceptionRepository.save(bonReception);
        log.info("My Command lines");
        List<LigneBonReception> ligneBonReceptionList = bonReception.getLigneBonRecs();
        log.info(ligneBonReceptionList.toString());

        for(int i=0 ; i<ligneBonReceptionList.size() ;i++){
            LigneBonReception ligneBonReception = ligneBonReceptionList.get(i);
            ligneBonReception.setBonReception(result);
            ligneBonReceptionRepository.save(ligneBonReceptionList.get(i));
        }
        return ResponseEntity.ok().body(result);
    }

    /**
     * {@code PUT  /bon-receptions} : Updates an existing bonReception.
     *
     * @param bonReception the bonReception to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bonReception,
     * or with status {@code 400 (Bad Request)} if the bonReception is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bonReception couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bon-receptions")
    public ResponseEntity<BonReception> updateBonReception(@Valid @RequestBody BonReception bonReception) throws URISyntaxException {
        log.debug("REST request to update BonReception : {}", bonReception);
        if (bonReception.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BonReception result = bonReceptionRepository.save(bonReception);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bonReception.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bon-receptions} : get all the bonReceptions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bonReceptions in body.
     */
    @GetMapping("/bon-receptions")
    public ResponseEntity<List<BonReception>> getAllBonReceptions(Pageable pageable) {
        log.debug("REST request to get a page of BonReceptions");
        Page<BonReception> page = bonReceptionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /bon-receptions/:id} : get the "id" bonReception.
     *
     * @param id the id of the bonReception to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bonReception, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bon-receptions/{id}")
    public ResponseEntity<BonReception> getBonReception(@PathVariable Long id) {
        log.debug("REST request to get BonReception : {}", id);
        Optional<BonReception> bonReception = bonReceptionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bonReception);
    }

    /**
     * {@code DELETE  /bon-receptions/:id} : delete the "id" bonReception.
     *
     * @param id the id of the bonReception to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bon-receptions/{id}")
    public ResponseEntity<Void> deleteBonReception(@PathVariable Long id) {
        log.debug("REST request to delete BonReception : {}", id);
        bonReceptionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }


}
