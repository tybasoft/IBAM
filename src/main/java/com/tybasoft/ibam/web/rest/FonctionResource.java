package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Employe;
import com.tybasoft.ibam.domain.Fonction;
import com.tybasoft.ibam.repository.FonctionRepository;
import com.tybasoft.ibam.service.FileStorageService;
import com.tybasoft.ibam.service.ReportService;
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
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.Fonction}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FonctionResource {

    private final Logger log = LoggerFactory.getLogger(FonctionResource.class);

    private static final String ENTITY_NAME = "fonction";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FonctionRepository fonctionRepository;

    public FonctionResource(FonctionRepository fonctionRepository) {
        this.fonctionRepository = fonctionRepository;
    }

    /**
     * {@code POST  /fonctions} : Create a new fonction.
     *
     * @param fonction the fonction to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new fonction, or with status {@code 400 (Bad Request)} if
     *         the fonction has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fonctions")
    public ResponseEntity<Fonction> createFonction(@Valid @RequestBody Fonction fonction) throws URISyntaxException {
        log.debug("REST request to save Fonction : {}", fonction);
        if (fonction.getId() != null) {
            throw new BadRequestAlertException("A new fonction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fonction result = fonctionRepository.save(fonction);
        return ResponseEntity
                .created(new URI("/api/fonctions/" + result.getId())).headers(HeaderUtil
                        .createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /fonctions} : Updates an existing fonction.
     *
     * @param fonction the fonction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated fonction, or with status {@code 400 (Bad Request)} if the
     *         fonction is not valid, or with status
     *         {@code 500 (Internal Server Error)} if the fonction couldn't be
     *         updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fonctions")
    public ResponseEntity<Fonction> updateFonction(@Valid @RequestBody Fonction fonction) throws URISyntaxException {
        log.debug("REST request to update Fonction : {}", fonction);
        if (fonction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Fonction result = fonctionRepository.save(fonction);
        return ResponseEntity.ok().headers(
                HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fonction.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /fonctions} : get all the fonctions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of fonctions in body.
     */
    @GetMapping("/fonctions")
    public ResponseEntity<List<Fonction>> getAllFonctions(Pageable pageable) {
        log.debug("REST request to get a page of Fonctions");
        Page<Fonction> page = fonctionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil
                .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /fonctions/:id} : get the "id" fonction.
     *
     * @param id the id of the fonction to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the fonction, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fonctions/{id}")
    public ResponseEntity<Fonction> getFonction(@PathVariable Long id) {
        log.debug("REST request to get Fonction : {}", id);
        Optional<Fonction> fonction = fonctionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fonction);
    }

    @GetMapping("/fonctions/search-entities/{keyword}")
    public ResponseEntity<Collection<Fonction>> seachInAllEntities(@PathVariable String  keyword, Pageable pageable){
        Page<Fonction> fonctions ;
//        String key = keyword.toLowerCase();
        log.debug("GET ALL ENTITIES FOR SEARCHING IN FRONTEND");
        log.debug(keyword);
        fonctions = fonctionRepository.findByLibelleIsContainingOrDescriptionIsContainingOrCompetencesIsContaining(keyword,keyword,keyword,pageable);
        log.debug(String.valueOf(fonctions.stream().count()));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), fonctions);

        return ResponseEntity.ok().headers(headers).body(fonctions.getContent());
    }

    /**
     * {@code DELETE  /fonctions/:id} : delete the "id" fonction.
     *
     * @param id the id of the fonction to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fonctions/{id}")
    public ResponseEntity<Void> deleteFonction(@PathVariable Long id) {
        log.debug("REST request to delete Fonction : {}", id);
        fonctionRepository.deleteById(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }

    @Autowired
    private ReportService reportService;

    @GetMapping("/fonctions/report/{format}")
    public boolean generateReport(@PathVariable String format) {
        reportService.setName(ENTITY_NAME);
        reportService.setDataSource((List) fonctionRepository.findAll());
        return reportService.exportReport(format);
    }

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/fonctions/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,
            @RequestParam("filename") String filename) {
        try {
            fileStorageService.storeFile(file, filename, "Upload");

            reportService.importReport(filename, this.ENTITY_NAME);

        } catch (Exception e) {

        }
        return ResponseEntity.ok().body(true);

    }
}
