package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.AffectationMateriels;
import com.tybasoft.ibam.domain.Materiel;
import com.tybasoft.ibam.repository.AffectationMaterielsRepository;
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
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.AffectationMateriels}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AffectationMaterielsResource {

    private final Logger log = LoggerFactory.getLogger(AffectationMaterielsResource.class);

    private static final String ENTITY_NAME = "affectationMateriels";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AffectationMaterielsRepository affectationMaterielsRepository;

    @Autowired
    MaterielRepository materielRepository;


    public AffectationMaterielsResource(AffectationMaterielsRepository affectationMaterielsRepository) {
        this.affectationMaterielsRepository = affectationMaterielsRepository;
    }

    /**
     * {@code POST  /affectation-materiels} : Create a new affectationMateriels.
     *
     * @param affectationMateriels the affectationMateriels to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new affectationMateriels, or with status {@code 400 (Bad Request)} if the affectationMateriels has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/affectation-materiels")
    public ResponseEntity<AffectationMateriels> createAffectationMateriels(@Valid @RequestBody AffectationMateriels affectationMateriels) throws URISyntaxException {
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

        List<AffectationMateriels> projetMatList = affectationMaterielsRepository.findByMaterielAndDateFinAfter(materiel,dateStart);
        log.debug("LIST OF PROJ MAT");
        log.debug(String.valueOf(projetMatList));
        log.debug(String.valueOf(materiel.getMultiProjet()));

        if(!materiel.getMultiProjet() && !projetMatList.isEmpty()){
            throw new BadRequestAlertException("Materiel already used", ENTITY_NAME, "Used Materiel ");
        }
        log.debug("Look for all materiel used after a date");
        log.debug(String.valueOf(affectationMateriels.getMateriel()));
        AffectationMateriels result = affectationMaterielsRepository.save(affectationMateriels);
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
    @PutMapping("/affectation-materiels")
    public ResponseEntity<AffectationMateriels> updateAffectationMateriels(@Valid @RequestBody AffectationMateriels affectationMateriels) throws URISyntaxException {
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


        List<AffectationMateriels> projetMatList = affectationMaterielsRepository.findByMaterielAndDateFinAfter(materiel,dateStart);

        if(!materiel.getMultiProjet() && !projetMatList.isEmpty()){
            throw new BadRequestAlertException("Materiel already used in this period : "+dateStart, ENTITY_NAME, "idMateriel");
        }
        AffectationMateriels result = affectationMaterielsRepository.save(affectationMateriels);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, affectationMateriels.getId().toString()))
            .body(result);
    }


    /**
     * {@code GET  /affectation-materiels} : get all the affectationMateriels.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of affectationMateriels in body.
     */
    @GetMapping("/affectation-materiels")
    public ResponseEntity<List<AffectationMateriels>> getAllAffectationMateriels(Pageable pageable) {
        log.debug("REST request to get a page of AffectationMateriels");
        Page<AffectationMateriels> page = affectationMaterielsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/affectation-materiels/search-entities/{keyword}")
    public ResponseEntity<Collection<AffectationMateriels>> seachInAllEntities(@PathVariable String  keyword, Pageable pageable){
        Page<AffectationMateriels> affectationsMaterielsList ;
//        String key = keyword.toLowerCase();
        log.debug("GET ALL ENTITIES FOR SEARCHING IN FRONTEND");
        log.debug(keyword);
        affectationsMaterielsList = affectationMaterielsRepository.findByDescriptionIsContainingOrProjet_LibelleIsContainingOrMateriel_LibelleIsContaining(keyword,keyword,keyword,pageable);
        log.debug(String.valueOf(affectationsMaterielsList.stream().count()));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), affectationsMaterielsList);

        return ResponseEntity.ok().headers(headers).body(affectationsMaterielsList.getContent());
    }

    /**
     * {@code GET  /affectation-materiels/:id} : get the "id" affectationMateriels.
     *
     * @param id the id of the affectationMateriels to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the affectationMateriels, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/affectation-materiels/{id}")
    public ResponseEntity<AffectationMateriels> getAffectationMateriels(@PathVariable Long id) {
        log.debug("REST request to get AffectationMateriels : {}", id);
        Optional<AffectationMateriels> affectationMateriels = affectationMaterielsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(affectationMateriels);
    }

    /**
     * {@code DELETE  /affectation-materiels/:id} : delete the "id" affectationMateriels.
     *
     * @param id the id of the affectationMateriels to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/affectation-materiels/{id}")
    public ResponseEntity<Void> deleteAffectationMateriels(@PathVariable Long id) {
        log.debug("REST request to delete AffectationMateriels : {}", id);
        affectationMaterielsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
