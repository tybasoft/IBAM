package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.BonCommande;
import com.tybasoft.ibam.repository.BonCommandeRepository;
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
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.BonCommande}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BonCommandeResource {

    private final Logger log = LoggerFactory.getLogger(BonCommandeResource.class);

    private static final String ENTITY_NAME = "bonCommande";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BonCommandeRepository bonCommandeRepository;

    public BonCommandeResource(BonCommandeRepository bonCommandeRepository) {
        this.bonCommandeRepository = bonCommandeRepository;
    }

    /**
     * {@code POST  /bon-commandes} : Create a new bonCommande.
     *
     * @param bonCommande the bonCommande to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new bonCommande, or with status {@code 400 (Bad Request)} if
     *         the bonCommande has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bon-commandes")
    public ResponseEntity<BonCommande> createBonCommande(@Valid @RequestBody BonCommande bonCommande)
            throws URISyntaxException {
        log.debug("REST request to save BonCommande : {}", bonCommande);
        if (bonCommande.getId() != null) {
            throw new BadRequestAlertException("A new bonCommande cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BonCommande result = bonCommandeRepository.save(bonCommande);
        return ResponseEntity
                .created(new URI("/api/bon-commandes/" + result.getId())).headers(HeaderUtil
                        .createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /bon-commandes} : Updates an existing bonCommande.
     *
     * @param bonCommande the bonCommande to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated bonCommande, or with status {@code 400 (Bad Request)} if
     *         the bonCommande is not valid, or with status
     *         {@code 500 (Internal Server Error)} if the bonCommande couldn't be
     *         updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bon-commandes")
    public ResponseEntity<BonCommande> updateBonCommande(@Valid @RequestBody BonCommande bonCommande)
            throws URISyntaxException {
        log.debug("REST request to update BonCommande : {}", bonCommande);
        if (bonCommande.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BonCommande result = bonCommandeRepository.save(bonCommande);
        return ResponseEntity.ok().headers(
                HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bonCommande.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /bon-commandes} : get all the bonCommandes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of bonCommandes in body.
     */
    @GetMapping("/bon-commandes")
    public ResponseEntity<List<BonCommande>> getAllBonCommandes(Pageable pageable) {
        log.debug("REST request to get a page of BonCommandes");
        Page<BonCommande> page = bonCommandeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil
                .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /bon-commandes/:id} : get the "id" bonCommande.
     *
     * @param id the id of the bonCommande to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the bonCommande, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bon-commandes/{id}")
    public ResponseEntity<BonCommande> getBonCommande(@PathVariable Long id) {
        log.debug("REST request to get BonCommande : {}", id);
        Optional<BonCommande> bonCommande = bonCommandeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bonCommande);
    }

    /**
     * {@code DELETE  /bon-commandes/:id} : delete the "id" bonCommande.
     *
     * @param id the id of the bonCommande to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bon-commandes/{id}")
    public ResponseEntity<Void> deleteBonCommande(@PathVariable Long id) {
        log.debug("REST request to delete BonCommande : {}", id);
        bonCommandeRepository.deleteById(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }

    @Autowired
    private ReportService reportService;

    @GetMapping("/bon-commandes/report/{format}")
    public boolean generateReport(@PathVariable String format) {
        reportService.setName(ENTITY_NAME);
        reportService.setDataSource((List) bonCommandeRepository.findAll());
        return reportService.exportReport(format);
    }

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/bon-commandes/upload")
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
