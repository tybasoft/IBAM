package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.TransfertMateriel;
import com.tybasoft.ibam.repository.TransfertMaterielRepository;
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
 * REST controller for managing
 * {@link com.tybasoft.ibam.domain.TransfertMateriel}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TransfertMaterielResource {

    private final Logger log = LoggerFactory.getLogger(TransfertMaterielResource.class);

    private static final String ENTITY_NAME = "transfertMateriel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TransfertMaterielRepository transfertMaterielRepository;

    public TransfertMaterielResource(TransfertMaterielRepository transfertMaterielRepository) {
        this.transfertMaterielRepository = transfertMaterielRepository;
    }

    /**
     * {@code POST  /transfert-materiels} : Create a new transfertMateriel.
     *
     * @param transfertMateriel the transfertMateriel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new transfertMateriel, or with status
     *         {@code 400 (Bad Request)} if the transfertMateriel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/transfert-materiels")
    public ResponseEntity<TransfertMateriel> createTransfertMateriel(
            @Valid @RequestBody TransfertMateriel transfertMateriel) throws URISyntaxException {
        log.debug("REST request to save TransfertMateriel : {}", transfertMateriel);
        if (transfertMateriel.getId() != null) {
            throw new BadRequestAlertException("A new transfertMateriel cannot already have an ID", ENTITY_NAME,
                    "idexists");
        }
        TransfertMateriel result = transfertMaterielRepository.save(transfertMateriel);
        return ResponseEntity
                .created(new URI("/api/transfert-materiels/" + result.getId())).headers(HeaderUtil
                        .createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /transfert-materiels} : Updates an existing transfertMateriel.
     *
     * @param transfertMateriel the transfertMateriel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated transfertMateriel, or with status
     *         {@code 400 (Bad Request)} if the transfertMateriel is not valid, or
     *         with status {@code 500 (Internal Server Error)} if the
     *         transfertMateriel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/transfert-materiels")
    public ResponseEntity<TransfertMateriel> updateTransfertMateriel(
            @Valid @RequestBody TransfertMateriel transfertMateriel) throws URISyntaxException {
        log.debug("REST request to update TransfertMateriel : {}", transfertMateriel);
        if (transfertMateriel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransfertMateriel result = transfertMaterielRepository.save(transfertMateriel);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME,
                transfertMateriel.getId().toString())).body(result);
    }

    /**
     * {@code GET  /transfert-materiels} : get all the transfertMateriels.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of transfertMateriels in body.
     */
    @GetMapping("/transfert-materiels")
    public ResponseEntity<List<TransfertMateriel>> getAllTransfertMateriels(Pageable pageable) {
        log.debug("REST request to get a page of TransfertMateriels");
        Page<TransfertMateriel> page = transfertMaterielRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil
                .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /transfert-materiels/:id} : get the "id" transfertMateriel.
     *
     * @param id the id of the transfertMateriel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the transfertMateriel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/transfert-materiels/{id}")
    public ResponseEntity<TransfertMateriel> getTransfertMateriel(@PathVariable Long id) {
        log.debug("REST request to get TransfertMateriel : {}", id);
        Optional<TransfertMateriel> transfertMateriel = transfertMaterielRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(transfertMateriel);
    }

    /**
     * {@code DELETE  /transfert-materiels/:id} : delete the "id" transfertMateriel.
     *
     * @param id the id of the transfertMateriel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/transfert-materiels/{id}")
    public ResponseEntity<Void> deleteTransfertMateriel(@PathVariable Long id) {
        log.debug("REST request to delete TransfertMateriel : {}", id);
        transfertMaterielRepository.deleteById(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }

    @Autowired
    private ReportService reportService;

    @GetMapping("/transfert-materiels/report/{format}")
    public boolean generateReport(@PathVariable String format) {
        reportService.setName(ENTITY_NAME);
        reportService.setDataSource((List) transfertMaterielRepository.findAll());
        return reportService.exportReport(format);
    }

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/transfert-materiels/upload")
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
