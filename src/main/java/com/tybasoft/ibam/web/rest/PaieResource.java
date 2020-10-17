package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Document;
import com.tybasoft.ibam.domain.Materiel;
import com.tybasoft.ibam.domain.Paie;
import com.tybasoft.ibam.domain.Pointage;
import com.tybasoft.ibam.repository.PaieRepository;
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

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.Paie}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PaieResource {

    private final Logger log = LoggerFactory.getLogger(PaieResource.class);

    private static final String ENTITY_NAME = "paie";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PaieRepository paieRepository;


    public PaieResource(PaieRepository paieRepository) {
        this.paieRepository = paieRepository;

    }

    /**
     * {@code POST  /paies} : Create a new paie.
     *
     * @param paie the paie to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new paie, or with status {@code 400 (Bad Request)} if the
     *         paie has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/paies")
    public ResponseEntity<Paie> createPaie(@Valid @RequestBody Paie paie) throws URISyntaxException {
        log.debug("REST request to save Paie : {}", paie);
        if (paie.getId() != null) {
            throw new BadRequestAlertException("A new paie cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Paie result = paieRepository.save(paie);
        return ResponseEntity
                .created(new URI("/api/paies/" + result.getId())).headers(HeaderUtil
                        .createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /paies} : Updates an existing paie.
     *
     * @param paie the paie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated paie, or with status {@code 400 (Bad Request)} if the
     *         paie is not valid, or with status {@code 500 (Internal Server Error)}
     *         if the paie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/paies")
    public ResponseEntity<Paie> updatePaie(@Valid @RequestBody Paie paie) throws URISyntaxException {
        log.debug("REST request to update Paie : {}", paie);
        if (paie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Paie result = paieRepository.save(paie);
        return ResponseEntity.ok()
                .headers(
                        HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paie.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /paies} : get all the paies.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of paies in body.
     */
    @GetMapping("/paies")
    public ResponseEntity<List<Paie>> getAllPaies(Pageable pageable) {
        log.debug("REST request to get a page of Paies");
        Page<Paie> page = paieRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil
                .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /paies/:id} : get the "id" paie.
     *
     * @param id the id of the paie to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the paie, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/paies/{id}")
    public ResponseEntity<Paie> getPaie(@PathVariable Long id) {
        log.debug("REST request to get Paie : {}", id);
        Optional<Paie> paie = paieRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(paie);
    }

    @GetMapping("/paies/search-entities/{keyword}")
    public ResponseEntity<Collection<Paie>> seachInAllEntities(@PathVariable String  keyword, Pageable pageable){
        Page<Paie> paies ;
//        String key = keyword.toLowerCase();
        log.debug("GET ALL ENTITIES FOR SEARCHING IN FRONTEND");
        log.debug(keyword);
        paies = paieRepository.findByRemarquesIsContainingOrNbrHeurSupIsContainingOrMontantPayIsContainingOrNbrHeurSupIsContaining(keyword,keyword,keyword,keyword,pageable);
        log.debug(String.valueOf(paies.stream().count()));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), paies);


        return ResponseEntity.ok().headers(headers).body(paies.getContent());
    }

    /**
     * {@code DELETE  /paies/:id} : delete the "id" paie.
     *
     * @param id the id of the paie to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/paies/{id}")
    public ResponseEntity<Void> deletePaie(@PathVariable Long id) {
        log.debug("REST request to delete Paie : {}", id);
        paieRepository.deleteById(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }

    @Autowired
    private ReportService reportService;

    @GetMapping("/paies/report/{format}")
    public void generateReport(@PathVariable String format, HttpServletResponse response) {
        reportService.setName(ENTITY_NAME);
        reportService.setDataSource((List) paieRepository.findAll());
        reportService.exportReport(format, response);
    }

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/paies/upload")
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
