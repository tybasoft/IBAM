package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Image;
import com.tybasoft.ibam.domain.Materiau;
import com.tybasoft.ibam.repository.ImageRepository;
import com.tybasoft.ibam.repository.MateriauRepository;
import com.tybasoft.ibam.service.FileStorageService;
import com.tybasoft.ibam.service.ImageService;
import com.tybasoft.ibam.service.ReportService;
import com.tybasoft.ibam.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
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
 * REST controller for managing {@link com.tybasoft.ibam.domain.Materiau}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MateriauResource {
    private final Logger log = LoggerFactory.getLogger(MateriauResource.class);

    private static final String ENTITY_NAME = "materiau";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
    private ReportService reportService;

    private final MateriauRepository materiauRepository;
    private final ImageService imageService;
    private final ImageRepository imageRepository;

    @Autowired
    private FileStorageService fileStorageService;

    public MateriauResource(
        MateriauRepository materiauRepository,
        ImageService imageService,
        ImageRepository imageRepository,
        FileStorageService fileStorageService
    ) {
        this.materiauRepository = materiauRepository;
        this.imageService = imageService;
        this.imageRepository = imageRepository;
        this.fileStorageService = fileStorageService;
    }

    /**
     * {@code POST  /materiaus} : Create a new materiau.
     *
     * @param materiau the materiau to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new materiau, or with status {@code 400 (Bad Request)} if
     *         the materiau has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/materiaus")
    public ResponseEntity<Materiau> createMateriau(@Valid @RequestBody Materiau materiau) throws URISyntaxException {
        Image image = materiau.getImage();
        Image resultImage = imageService.saveImage(image, log, ENTITY_NAME);

        log.debug("REST request to save Materiau : {}", materiau);
        if (materiau.getId() != null) {
            throw new BadRequestAlertException("A new materiau cannot already have an ID", ENTITY_NAME, "idexists");
        }
        materiau.setImage(resultImage);
        Materiau result = materiauRepository.save(materiau);
        return ResponseEntity
            .created(new URI("/api/materiaus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /materiaus} : Updates an existing materiau.
     *
     * @param materiau the materiau to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated materiau, or with status {@code 400 (Bad Request)} if the
     *         materiau is not valid, or with status
     *         {@code 500 (Internal Server Error)} if the materiau couldn't be
     *         updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/materiaus")
    public ResponseEntity<Materiau> updateMateriau(@Valid @RequestBody Materiau materiau) throws URISyntaxException {
        Image image = materiau.getImage();
        Image resultImage = null;
        if (image != null) {
            log.debug("REST request to save Image : {}", image);
            resultImage = imageService.createImageEntity(image);
        }

        log.debug("REST request to update Materiau : {}", materiau);
        if (materiau.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        materiau.setImage(resultImage);
        Materiau result = materiauRepository.save(materiau);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, materiau.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /materiaus} : get all the materiaus.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of materiaus in body.
     */
    @GetMapping("/materiaus")
    public ResponseEntity<List<Materiau>> getAllMateriaus(Pageable pageable) {
        log.debug("REST request to get a page of Materiaus");
        Page<Materiau> page = materiauRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /materiaus/:id} : get the "id" materiau.
     *
     * @param id the id of the materiau to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the materiau, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/materiaus/{id}")
    public ResponseEntity<Materiau> getMateriau(@PathVariable Long id) {
        log.debug("REST request to get Materiau : {}", id);
        Optional<Materiau> materiau = materiauRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(materiau);
    }

    /**
     * {@code DELETE  /materiaus/:id} : delete the "id" materiau.
     *
     * @param id the id of the materiau to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/materiaus/{id}")
    public ResponseEntity<Void> deleteMateriau(@PathVariable Long id) {
        Materiau materiau = materiauRepository.findById(id).get();
        Image image = materiau.getImage();

        imageService.deleteImageEntityFile(image, log, imageRepository, fileStorageService);

        log.debug("REST request to delete Materiau : {}", id);
        materiauRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @GetMapping("/materiaus/report/{format}")
    public boolean generateReport(@PathVariable String format) {
        reportService.setName(ENTITY_NAME);
        reportService.setDataSource((List) materiauRepository.findAll());
        return reportService.exportReport(format);
    }

    @PostMapping("/materiaus/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("filename") String filename) {
        try {
            fileStorageService.storeFile(file, filename, "Upload");

            reportService.importReport(filename, this.ENTITY_NAME);
        } catch (Exception e) {}
        return ResponseEntity.ok().body(true);
    }
}
