package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Image;
import com.tybasoft.ibam.domain.Location;
import com.tybasoft.ibam.domain.Maintenance;
import com.tybasoft.ibam.repository.ImageRepository;
import com.tybasoft.ibam.repository.MaintenanceRepository;
import com.tybasoft.ibam.service.FileStorageService;
import com.tybasoft.ibam.service.ImageService;
import com.tybasoft.ibam.service.ReportService;
import com.tybasoft.ibam.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.Maintenance}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MaintenanceResource {
    private final Logger log = LoggerFactory.getLogger(MaintenanceResource.class);

    private static final String ENTITY_NAME = "maintenance";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MaintenanceRepository maintenanceRepository;
    private final ImageService imageService;
    private final ImageRepository imageRepository;
    private final FileStorageService fileStorageService;

    public MaintenanceResource(
        MaintenanceRepository maintenanceRepository,
        ImageService imageService,
        ImageRepository imageRepository,
        FileStorageService fileStorageService
    ) {
        this.maintenanceRepository = maintenanceRepository;
        this.imageService = imageService;
        this.imageRepository = imageRepository;
        this.fileStorageService = fileStorageService;
    }

    /**
     * {@code POST  /maintenances} : Create a new maintenance.
     *
     * @param maintenance the maintenance to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new maintenance, or with status {@code 400 (Bad Request)} if
     *         the maintenance has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/maintenances")
    public ResponseEntity<Maintenance> createMaintenance(@Valid @RequestBody Maintenance maintenance) throws URISyntaxException {
        Image image = maintenance.getImage();
        Image resultImage = imageService.saveImage(image, log, ENTITY_NAME);

        log.debug("REST request to save Maintenance : {}", maintenance);
        if (maintenance.getId() != null) {
            throw new BadRequestAlertException("A new maintenance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        maintenance.setImage(resultImage);
        Maintenance result = maintenanceRepository.save(maintenance);
        return ResponseEntity
            .created(new URI("/api/maintenances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /maintenances} : Updates an existing maintenance.
     *
     * @param maintenance the maintenance to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated maintenance, or with status {@code 400 (Bad Request)} if
     *         the maintenance is not valid, or with status
     *         {@code 500 (Internal Server Error)} if the maintenance couldn't be
     *         updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/maintenances")
    public ResponseEntity<Maintenance> updateMaintenance(@Valid @RequestBody Maintenance maintenance) throws URISyntaxException {
        Image image = maintenance.getImage();
        Image resultImage = null;
        if (image != null) {
            log.debug("REST request to save Image : {}", image);
            resultImage = imageService.createImageEntity(image);
        }

        log.debug("REST request to update Maintenance : {}", maintenance);
        if (maintenance.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        maintenance.setImage(resultImage);
        Maintenance result = maintenanceRepository.save(maintenance);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, maintenance.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /maintenances} : get all the maintenances.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of maintenances in body.
     */
    @GetMapping("/maintenances")
    public ResponseEntity<List<Maintenance>> getAllMaintenances(Pageable pageable) {
        log.debug("REST request to get a page of Maintenances");
        Page<Maintenance> page = maintenanceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /maintenances/:id} : get the "id" maintenance.
     *
     * @param id the id of the maintenance to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the maintenance, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/maintenances/{id}")
    public ResponseEntity<Maintenance> getMaintenance(@PathVariable Long id) {
        log.debug("REST request to get Maintenance : {}", id);
        Optional<Maintenance> maintenance = maintenanceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(maintenance);
    }

    @GetMapping("/maintenances/search-entities/{keyword}")
    public ResponseEntity<Collection<Maintenance>> seachInAllEntities(@PathVariable String  keyword, Pageable pageable){
        Page<Maintenance> maintenances ;
//        String key = keyword.toLowerCase();
        log.debug("GET ALL ENTITIES FOR SEARCHING IN FRONTEND");
        log.debug(keyword);
        maintenances = maintenanceRepository.findByReferenceIsContainingOrFraisIsContainingOrTechnicienIsContaining(keyword,keyword,keyword,pageable);
        log.debug(String.valueOf(maintenances.stream().count()));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), maintenances);

        return ResponseEntity.ok().headers(headers).body(maintenances.getContent());
    }

    /**
     * {@code DELETE  /maintenances/:id} : delete the "id" maintenance.
     *
     * @param id the id of the maintenance to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/maintenances/{id}")
    public ResponseEntity<Void> deleteMaintenance(@PathVariable Long id) {
        Maintenance maintenance = maintenanceRepository.findById(id).get();
        Image image = maintenance.getImage();

        imageService.deleteImageEntityFile(image, log, imageRepository, fileStorageService);

        log.debug("REST request to delete Maintenance : {}", id);
        maintenanceRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @Autowired
    private ReportService reportService;

    @GetMapping("/maintenances/report/{format}")
    public boolean generateReport(@PathVariable String format) {
        reportService.setName(ENTITY_NAME);
        reportService.setDataSource((List) maintenanceRepository.findAll());
        return reportService.exportReport(format);
    }

    @PostMapping("/maintenances/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("filename") String filename) {
        try {
            fileStorageService.storeFile(file, filename, "Upload");

            reportService.importReport(filename, this.ENTITY_NAME);
        } catch (Exception e) {}
        return ResponseEntity.ok().body(true);
    }
}
