package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Employe;
import com.tybasoft.ibam.domain.Entreprise;
import com.tybasoft.ibam.domain.Image;
import com.tybasoft.ibam.repository.EntrepriseRepository;
import com.tybasoft.ibam.repository.ImageRepository;
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
 * REST controller for managing {@link com.tybasoft.ibam.domain.Entreprise}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EntrepriseResource {
    private final Logger log = LoggerFactory.getLogger(EntrepriseResource.class);

    private static final String ENTITY_NAME = "entreprise";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EntrepriseRepository entrepriseRepository;
    private final ImageService imageService;
    private final ImageRepository imageRepository;
    private final FileStorageService fileStorageService;

    public EntrepriseResource(
        EntrepriseRepository entrepriseRepository,
        ImageService imageService,
        ImageRepository imageRepository,
        FileStorageService fileStorageService
    ) {
        this.entrepriseRepository = entrepriseRepository;
        this.imageService = imageService;
        this.imageRepository = imageRepository;
        this.fileStorageService = fileStorageService;
    }

    /**
     * {@code POST  /entreprises} : Create a new entreprise.
     *
     * @param entreprise the entreprise to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new entreprise, or with status {@code 400 (Bad Request)} if
     *         the entreprise has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/entreprises")
    public ResponseEntity<Entreprise> createEntreprise(@Valid @RequestBody Entreprise entreprise) throws URISyntaxException {
        Image image = entreprise.getImage();
        Image resultImage = imageService.saveImage(image, log, ENTITY_NAME);

        log.debug("REST request to save Entreprise : {}", entreprise);
        if (entreprise.getId() != null) {
            throw new BadRequestAlertException("A new entreprise cannot already have an ID", ENTITY_NAME, "idexists");
        }
        entreprise.setImage(resultImage);
        Entreprise result = entrepriseRepository.save(entreprise);
        return ResponseEntity
            .created(new URI("/api/entreprises/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /entreprises} : Updates an existing entreprise.
     *
     * @param entreprise the entreprise to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated entreprise, or with status {@code 400 (Bad Request)} if
     *         the entreprise is not valid, or with status
     *         {@code 500 (Internal Server Error)} if the entreprise couldn't be
     *         updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/entreprises")
    public ResponseEntity<Entreprise> updateEntreprise(@Valid @RequestBody Entreprise entreprise) throws URISyntaxException {
        Image image = entreprise.getImage();
        Image resultImage = null;
        if (image != null) {
            log.debug("REST request to save Image : {}", image);
            resultImage = imageService.createImageEntity(image);
        }

        log.debug("REST request to update Entreprise : {}", entreprise);
        if (entreprise.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        entreprise.setImage(resultImage);
        Entreprise result = entrepriseRepository.save(entreprise);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, entreprise.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /entreprises} : get all the entreprises.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of entreprises in body.
     */
    @GetMapping("/entreprises")
    public List<Entreprise> getAllEntreprises() {
        log.debug("REST request to get all Entreprises");
        return entrepriseRepository.findAll();
    }

    /**
     * {@code GET  /entreprises/:id} : get the "id" entreprise.
     *
     * @param id the id of the entreprise to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the entreprise, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/entreprises/{id}")
    public ResponseEntity<Entreprise> getEntreprise(@PathVariable Long id) {
        log.debug("REST request to get Entreprise : {}", id);
        Optional<Entreprise> entreprise = entrepriseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(entreprise);
    }

    @GetMapping("/entreprises/search-entities/{keyword}")
    public ResponseEntity<Collection<Entreprise>> seachInAllEntities(@PathVariable String  keyword){
        List<Entreprise> entreprises;
//        String key = keyword.toLowerCase();
        log.debug("GET ALL ENTITIES FOR SEARCHING IN FRONTEND");
        log.debug(keyword);
        entreprises = entrepriseRepository.findByEntiteJuridiqueIsContainingOrNomCommercialIsContainingOrAdresseIsContainingOrCapitalIsContaining(keyword,keyword,keyword,keyword);
        log.debug(String.valueOf(entreprises.stream().count()));
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), entreprises);

        return ResponseEntity.ok().body(entreprises);
    }

    /**
     * {@code DELETE  /entreprises/:id} : delete the "id" entreprise.
     *
     * @param id the id of the entreprise to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/entreprises/{id}")
    public ResponseEntity<Void> deleteEntreprise(@PathVariable Long id) {
        Entreprise entreprise = entrepriseRepository.findById(id).get();
        Image image = entreprise.getImage();

        imageService.deleteImageEntityFile(image, log, imageRepository, fileStorageService);

        log.debug("REST request to delete Entreprise : {}", id);
        entrepriseRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @Autowired
    private ReportService reportService;

    @GetMapping("/entreprises/report/{format}")
    public boolean generateReport(@PathVariable String format) {
        reportService.setName(ENTITY_NAME);
        reportService.setDataSource((List) entrepriseRepository.findAll());
        return reportService.exportReport(format);
    }

    @PostMapping("/entreprises/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("filename") String filename) {
        try {
            fileStorageService.storeFile(file, filename, "Upload");

            reportService.importReport(filename, this.ENTITY_NAME);
        } catch (Exception e) {}
        return ResponseEntity.ok().body(true);
    }
}
