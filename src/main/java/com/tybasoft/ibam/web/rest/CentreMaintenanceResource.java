package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.CentreMaintenance;
import com.tybasoft.ibam.repository.CentreMaintenanceRepository;
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
 * {@link com.tybasoft.ibam.domain.CentreMaintenance}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CentreMaintenanceResource {

    private final Logger log = LoggerFactory.getLogger(CentreMaintenanceResource.class);

    private static final String ENTITY_NAME = "centreMaintenance";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CentreMaintenanceRepository centreMaintenanceRepository;

    public CentreMaintenanceResource(CentreMaintenanceRepository centreMaintenanceRepository) {
        this.centreMaintenanceRepository = centreMaintenanceRepository;
    }

    /**
     * {@code POST  /centre-maintenances} : Create a new centreMaintenance.
     *
     * @param centreMaintenance the centreMaintenance to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new centreMaintenance, or with status
     *         {@code 400 (Bad Request)} if the centreMaintenance has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/centre-maintenances")
    public ResponseEntity<CentreMaintenance> createCentreMaintenance(
            @Valid @RequestBody CentreMaintenance centreMaintenance) throws URISyntaxException {
        log.debug("REST request to save CentreMaintenance : {}", centreMaintenance);
        if (centreMaintenance.getId() != null) {
            throw new BadRequestAlertException("A new centreMaintenance cannot already have an ID", ENTITY_NAME,
                    "idexists");
        }
        CentreMaintenance result = centreMaintenanceRepository.save(centreMaintenance);
        return ResponseEntity
                .created(new URI("/api/centre-maintenances/" + result.getId())).headers(HeaderUtil
                        .createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /centre-maintenances} : Updates an existing centreMaintenance.
     *
     * @param centreMaintenance the centreMaintenance to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated centreMaintenance, or with status
     *         {@code 400 (Bad Request)} if the centreMaintenance is not valid, or
     *         with status {@code 500 (Internal Server Error)} if the
     *         centreMaintenance couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/centre-maintenances")
    public ResponseEntity<CentreMaintenance> updateCentreMaintenance(
            @Valid @RequestBody CentreMaintenance centreMaintenance) throws URISyntaxException {
        log.debug("REST request to update CentreMaintenance : {}", centreMaintenance);
        if (centreMaintenance.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CentreMaintenance result = centreMaintenanceRepository.save(centreMaintenance);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME,
                centreMaintenance.getId().toString())).body(result);
    }

    /**
     * {@code GET  /centre-maintenances} : get all the centreMaintenances.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of centreMaintenances in body.
     */
    @GetMapping("/centre-maintenances")
    public ResponseEntity<List<CentreMaintenance>> getAllCentreMaintenances(Pageable pageable) {
        log.debug("REST request to get a page of CentreMaintenances");
        Page<CentreMaintenance> page = centreMaintenanceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil
                .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /centre-maintenances/:id} : get the "id" centreMaintenance.
     *
     * @param id the id of the centreMaintenance to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the centreMaintenance, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/centre-maintenances/{id}")
    public ResponseEntity<CentreMaintenance> getCentreMaintenance(@PathVariable Long id) {
        log.debug("REST request to get CentreMaintenance : {}", id);
        Optional<CentreMaintenance> centreMaintenance = centreMaintenanceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(centreMaintenance);
    }

    /**
     * {@code DELETE  /centre-maintenances/:id} : delete the "id" centreMaintenance.
     *
     * @param id the id of the centreMaintenance to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/centre-maintenances/{id}")
    public ResponseEntity<Void> deleteCentreMaintenance(@PathVariable Long id) {
        log.debug("REST request to delete CentreMaintenance : {}", id);
        centreMaintenanceRepository.deleteById(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }

    @Autowired
    private ReportService reportService;

    @GetMapping("/centre-maintenances/report/{format}")
    public boolean generateReport(@PathVariable String format) {
        reportService.setName(ENTITY_NAME);
        reportService.setDataSource((List) centreMaintenanceRepository.findAll());
        return reportService.exportReport(format);
    }

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/centre-maintenances/upload")
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
