package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.TypeMateriel;
import com.tybasoft.ibam.repository.TypeMaterielRepository;
import com.tybasoft.ibam.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.TypeMateriel}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TypeMaterielResource {

    private final Logger log = LoggerFactory.getLogger(TypeMaterielResource.class);

    private static final String ENTITY_NAME = "typeMateriel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TypeMaterielRepository typeMaterielRepository;

    public TypeMaterielResource(TypeMaterielRepository typeMaterielRepository) {
        this.typeMaterielRepository = typeMaterielRepository;
    }

    /**
     * {@code POST  /type-materiels} : Create a new typeMateriel.
     *
     * @param typeMateriel the typeMateriel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new typeMateriel, or with status {@code 400 (Bad Request)} if the typeMateriel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/type-materiels")
    public ResponseEntity<TypeMateriel> createTypeMateriel(@Valid @RequestBody TypeMateriel typeMateriel) throws URISyntaxException {
        log.debug("REST request to save TypeMateriel : {}", typeMateriel);
        if (typeMateriel.getId() != null) {
            throw new BadRequestAlertException("A new typeMateriel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TypeMateriel result = typeMaterielRepository.save(typeMateriel);
        return ResponseEntity.created(new URI("/api/type-materiels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /type-materiels} : Updates an existing typeMateriel.
     *
     * @param typeMateriel the typeMateriel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated typeMateriel,
     * or with status {@code 400 (Bad Request)} if the typeMateriel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the typeMateriel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/type-materiels")
    public ResponseEntity<TypeMateriel> updateTypeMateriel(@Valid @RequestBody TypeMateriel typeMateriel) throws URISyntaxException {
        log.debug("REST request to update TypeMateriel : {}", typeMateriel);
        if (typeMateriel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TypeMateriel result = typeMaterielRepository.save(typeMateriel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, typeMateriel.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /type-materiels} : get all the typeMateriels.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of typeMateriels in body.
     */
    @GetMapping("/type-materiels")
    public List<TypeMateriel> getAllTypeMateriels() {
        log.debug("REST request to get all TypeMateriels");
        return typeMaterielRepository.findAll();
    }

    /**
     * {@code GET  /type-materiels/:id} : get the "id" typeMateriel.
     *
     * @param id the id of the typeMateriel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the typeMateriel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/type-materiels/{id}")
    public ResponseEntity<TypeMateriel> getTypeMateriel(@PathVariable Long id) {
        log.debug("REST request to get TypeMateriel : {}", id);
        Optional<TypeMateriel> typeMateriel = typeMaterielRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(typeMateriel);
    }

    /**
     * {@code DELETE  /type-materiels/:id} : delete the "id" typeMateriel.
     *
     * @param id the id of the typeMateriel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/type-materiels/{id}")
    public ResponseEntity<Void> deleteTypeMateriel(@PathVariable Long id) {
        log.debug("REST request to delete TypeMateriel : {}", id);
        typeMaterielRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}