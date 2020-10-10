package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Document;
import com.tybasoft.ibam.domain.Employe;
import com.tybasoft.ibam.domain.Image;
import com.tybasoft.ibam.repository.EmployeRepository;
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
 * REST controller for managing {@link com.tybasoft.ibam.domain.Employe}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EmployeResource {
    private final Logger log = LoggerFactory.getLogger(EmployeResource.class);

    private static final String ENTITY_NAME = "employe";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmployeRepository employeRepository;
    private final ImageService imageService;
    private final ImageRepository imageRepository;
    private final FileStorageService fileStorageService;

    public EmployeResource(
        EmployeRepository employeRepository,
        ImageService imageService,
        ImageRepository imageRepository,
        FileStorageService fileStorageService
    ) {
        this.employeRepository = employeRepository;
        this.imageService = imageService;
        this.imageRepository = imageRepository;
        this.fileStorageService = fileStorageService;
    }

    /**
     * {@code POST  /employes} : Create a new employe.
     *
     * @param employe the employe to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new employe, or with status {@code 400 (Bad Request)} if the
     *         employe has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/employes")
    public ResponseEntity<Employe> createEmploye(@Valid @RequestBody Employe employe) throws URISyntaxException {
        Image image = employe.getImage();
        Image resultImage = imageService.saveImage(image, log, ENTITY_NAME);

        log.debug("REST request to save Employe : {}", employe);
        if (employe.getId() != null) {
            throw new BadRequestAlertException("A new employe cannot already have an ID", ENTITY_NAME, "idexists");
        }
        employe.setImage(resultImage);
        Employe result = employeRepository.save(employe);
        return ResponseEntity
            .created(new URI("/api/employes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /employes} : Updates an existing employe.
     *
     * @param employe the employe to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated employe, or with status {@code 400 (Bad Request)} if the
     *         employe is not valid, or with status
     *         {@code 500 (Internal Server Error)} if the employe couldn't be
     *         updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/employes")
    public ResponseEntity<Employe> updateEmploye(@Valid @RequestBody Employe employe) throws URISyntaxException {
        Image image = employe.getImage();
        Image resultImage = null;
        if (image != null) {
            log.debug("REST request to save Image : {}", image);
            resultImage = imageService.createImageEntity(image);
        }

        log.debug("REST request to update Employe : {}", employe);
        if (employe.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        employe.setImage(resultImage);
        Employe result = employeRepository.save(employe);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employe.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /employes} : get all the employes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of employes in body.
     */
    @GetMapping("/employes")
    public ResponseEntity<List<Employe>> getAllEmployes(Pageable pageable) {
        log.debug("REST request to get a page of Employes");
        Page<Employe> page = employeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /employes/:id} : get the "id" employe.
     *
     * @param id the id of the employe to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the employe, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/employes/{id}")
    public ResponseEntity<Employe> getEmploye(@PathVariable Long id) {
        log.debug("REST request to get Employe : {}", id);
        Optional<Employe> employe = employeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(employe);
    }

    @GetMapping("/employes/search-entities/{keyword}")
    public ResponseEntity<Collection<Employe>> seachInAllEntities(@PathVariable String  keyword, Pageable pageable){
        Page<Employe> employes ;
//        String key = keyword.toLowerCase();
        log.debug("GET ALL ENTITIES FOR SEARCHING IN FRONTEND");
        log.debug(keyword);
        employes = employeRepository.findByNomIsContainingOrPrenomIsContainingOrMatriculeIsContainingOrCinIsContaining(keyword,keyword,keyword,keyword,pageable);
        log.debug(String.valueOf(employes.stream().count()));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), employes);

        return ResponseEntity.ok().headers(headers).body(employes.getContent());
    }

    /**
     * {@code DELETE  /employes/:id} : delete the "id" employe.
     *
     * @param id the id of the employe to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/employes/{id}")
    public ResponseEntity<Void> deleteEmploye(@PathVariable Long id) {
        Employe employe = employeRepository.findById(id).get();
        Image image = employe.getImage();

        imageService.deleteImageEntityFile(image, log, imageRepository, fileStorageService);

        log.debug("REST request to delete Employe : {}", id);
        employeRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @Autowired
    private ReportService reportService;

    @GetMapping("/employes/report/{format}")
    public boolean generateReport(@PathVariable String format) {
        reportService.setName(ENTITY_NAME);
        reportService.setDataSource((List) employeRepository.findAll());
        return reportService.exportReport(format);
    }

    @PostMapping("/employes/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("filename") String filename) {
        try {
            fileStorageService.storeFile(file, filename, "Upload");

            reportService.importReport(filename, this.ENTITY_NAME);
        } catch (Exception e) {}
        return ResponseEntity.ok().body(true);
    }
}
