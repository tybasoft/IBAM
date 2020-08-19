package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.AffectationsMateriels;
import com.tybasoft.ibam.domain.Materiel;
import com.tybasoft.ibam.repository.AffectationsMaterielsRepository;
import com.tybasoft.ibam.repository.MaterielRepository;
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
import org.springframework.data.repository.support.Repositories;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.AffectationsMateriels}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AffectationsMaterielsResource {

    private final Logger log = LoggerFactory.getLogger(AffectationsMaterielsResource.class);

    private static final String ENTITY_NAME = "affectationsMateriels";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
    MaterielRepository materielRepository;

    @Autowired
    AffectationsMaterielsRepository affectationsMaterielsRepository;


    public AffectationsMaterielsResource(AffectationsMaterielsRepository affectationsMaterielsRepository) {
        this.affectationsMaterielsRepository = affectationsMaterielsRepository;
    }

    /**
     * {@code POST  /affectations-materiels} : Create a new affectationsMateriels.
     *
     * @param affectationMateriels the affectationsMateriels to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new affectationsMateriels, or with status {@code 400 (Bad Request)} if the affectationsMateriels has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/affectations-materiels")
    public ResponseEntity<AffectationsMateriels> createAffectationMateriels(@Valid @RequestBody AffectationsMateriels affectationMateriels) throws URISyntaxException {
        log.debug("REST request to save AffectationMateriels : {}", affectationMateriels);
        if (affectationMateriels.getId() != null) {
            throw new BadRequestAlertException("A new affectationMateriels cannot already have an ID", ENTITY_NAME, "idexists");
        }

        log.debug("Check if start date is after than end date : ");
        LocalDate dateStart = affectationMateriels.getDateDebut();
        LocalDate dateEnd = affectationMateriels.getDateFin();

        if (dateStart.isAfter(dateEnd)) {
            throw new BadRequestAlertException("Start date must be before the end date", ENTITY_NAME, "Dates");
        }

        Materiel materiel = materielRepository.findById(affectationMateriels.getMateriel().getId())
            .orElseThrow(()-> new BadRequestAlertException("Materiel not found", ENTITY_NAME, "idMateriel"));

        log.debug("get Materiel");
        log.debug(String.valueOf(affectationMateriels));
        log.debug(String.valueOf(materiel));

        List<AffectationsMateriels> projetMatList = affectationsMaterielsRepository.findByMaterielAndDateFinAfter(materiel,dateStart);
        log.debug("LIST OF PROJ MAT");
        log.debug(String.valueOf(projetMatList));
        log.debug(String.valueOf(materiel.getMultiProjet()));

        if(!materiel.getMultiProjet() && !projetMatList.isEmpty()){
            throw new BadRequestAlertException("Materiel already used", ENTITY_NAME, "Used Materiel ");
        }
        log.debug("Look for all materiel used after a date");
        log.debug(String.valueOf(affectationMateriels.getMateriel()));
        AffectationsMateriels result = affectationsMaterielsRepository.save(affectationMateriels);
        return ResponseEntity.created(new URI("/api/affectation-materiels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /affectation-materiels} : Updates an existing affectationMateriels.
     *
     * @param affectationMateriels the affectationMateriels to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated affectationMateriels,
     * or with status {@code 400 (Bad Request)} if the affectationMateriels is not valid,
     * or with status {@code 500 (Internal Server Error)} if the affectationMateriels couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/affectations-materiels")
    public ResponseEntity<AffectationsMateriels> updateAffectationMateriels(@Valid @RequestBody AffectationsMateriels affectationMateriels) throws URISyntaxException {
        if (affectationMateriels.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        log.debug("Check if start date is after than end date : ");
        LocalDate dateStart = affectationMateriels.getDateDebut();
        LocalDate dateEnd = affectationMateriels.getDateFin();
        if (dateStart.isAfter(dateEnd)) {
            throw new BadRequestAlertException("Start date must be before the end date", ENTITY_NAME, "Dates");
        }
        Materiel materiel = materielRepository.findById(affectationMateriels.getMateriel().getId())
            .orElseThrow(()-> new BadRequestAlertException("Materiel not found", ENTITY_NAME, "Used Materiel"));


        List<AffectationsMateriels> projetMatList = affectationsMaterielsRepository.findByMaterielAndDateFinAfter(materiel,dateStart);

        if(!materiel.getMultiProjet() && !projetMatList.isEmpty()){
            throw new BadRequestAlertException("Materiel already used in this period : "+dateStart, ENTITY_NAME, "idMateriel");
        }
        AffectationsMateriels result = affectationsMaterielsRepository.save(affectationMateriels);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, affectationMateriels.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /affectations-materiels} : get all the affectationsMateriels.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of affectationsMateriels in body.
     */
    @GetMapping("/affectations-materiels")
    public ResponseEntity<List<AffectationsMateriels>> getAllAffectationsMateriels(Pageable pageable) {
        log.debug("REST request to get a page of AffectationsMateriels");
        Page<AffectationsMateriels> page = affectationsMaterielsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/affectations-materiels/search-entities")
    public ResponseEntity<List<AffectationsMateriels>> seachInAllEntities(){
        log.debug("GET ALL ENTITIES FOR SEARCHING IN FRONTEND");
        List<AffectationsMateriels> affectationsMaterielsList = affectationsMaterielsRepository.findAll();
       return ResponseEntity.ok(affectationsMaterielsList);
    }

    /**
     * {@code GET  /affectations-materiels/:id} : get the "id" affectationsMateriels.
     *
     * @param id the id of the affectationsMateriels to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the affectationsMateriels, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/affectations-materiels/{id}")
    public ResponseEntity<AffectationsMateriels> getAffectationsMateriels(@PathVariable Long id) {
        log.debug("REST request to get AffectationsMateriels : {}", id);
        Optional<AffectationsMateriels> affectationsMateriels = affectationsMaterielsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(affectationsMateriels);
    }

    /**
     * {@code DELETE  /affectations-materiels/:id} : delete the "id" affectationsMateriels.
     *
     * @param id the id of the affectationsMateriels to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/affectations-materiels/{id}")
    public ResponseEntity<Void> deleteAffectationsMateriels(@PathVariable Long id) {
        log.debug("REST request to delete AffectationsMateriels : {}", id);
        affectationsMaterielsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
