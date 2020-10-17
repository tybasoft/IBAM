package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.TransfertMateriel;
import com.tybasoft.ibam.domain.Unite;
import com.tybasoft.ibam.repository.UniteRepository;
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
 * REST controller for managing {@link com.tybasoft.ibam.domain.Unite}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UniteResource {

    private final Logger log = LoggerFactory.getLogger(UniteResource.class);

    private static final String ENTITY_NAME = "unite";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UniteRepository uniteRepository;

    public UniteResource(UniteRepository uniteRepository) {
        this.uniteRepository = uniteRepository;
    }

    /**
     * {@code POST  /unites} : Create a new unite.
     *
     * @param unite the unite to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new unite, or with status {@code 400 (Bad Request)} if the
     *         unite has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/unites")
    public ResponseEntity<Unite> createUnite(@Valid @RequestBody Unite unite) throws URISyntaxException {
        log.debug("REST request to save Unite : {}", unite);
        if (unite.getId() != null) {
            throw new BadRequestAlertException("A new unite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Unite result = uniteRepository.save(unite);
        return ResponseEntity
                .created(new URI("/api/unites/" + result.getId())).headers(HeaderUtil
                        .createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /unites} : Updates an existing unite.
     *
     * @param unite the unite to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated unite, or with status {@code 400 (Bad Request)} if the
     *         unite is not valid, or with status
     *         {@code 500 (Internal Server Error)} if the unite couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/unites")
    public ResponseEntity<Unite> updateUnite(@Valid @RequestBody Unite unite) throws URISyntaxException {
        log.debug("REST request to update Unite : {}", unite);
        if (unite.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Unite result = uniteRepository.save(unite);
        return ResponseEntity.ok().headers(
                HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, unite.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /unites} : get all the unites.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of unites in body.
     */
    @GetMapping("/unites")
    public ResponseEntity<List<Unite>> getAllUnites(Pageable pageable) {
        log.debug("REST request to get a page of Unites");
        Page<Unite> page = uniteRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil
                .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /unites/:id} : get the "id" unite.
     *
     * @param id the id of the unite to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the unite, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/unites/{id}")
    public ResponseEntity<Unite> getUnite(@PathVariable Long id) {
        log.debug("REST request to get Unite : {}", id);
        Optional<Unite> unite = uniteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(unite);
    }

    @GetMapping("/unites/search-entities/{keyword}")
    public ResponseEntity<Collection<Unite>> seachInAllEntities(@PathVariable String  keyword, Pageable pageable){
        Page<Unite> unites ;
//        String key = keyword.toLowerCase();
        log.debug("GET ALL ENTITIES FOR SEARCHING IN FRONTEND");
        log.debug(keyword);
        unites = uniteRepository.findByLibelleIsContainingOrSymboleIsContainingOrDescriptionIsContaining(keyword,keyword,keyword,pageable);
        log.debug(String.valueOf(unites.stream().count()));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), unites);

        return ResponseEntity.ok().headers(headers).body(unites.getContent());
    }

    /**
     * {@code DELETE  /unites/:id} : delete the "id" unite.
     *
     * @param id the id of the unite to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/unites/{id}")
    public ResponseEntity<Void> deleteUnite(@PathVariable Long id) {
        log.debug("REST request to delete Unite : {}", id);
        uniteRepository.deleteById(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }

    @Autowired
    private ReportService reportService;

    @GetMapping("/unites/report/{format}")
    public void generateReport(@PathVariable String format, HttpServletResponse response) {
        reportService.setName(ENTITY_NAME);
        reportService.setDataSource((List) uniteRepository.findAll());
        reportService.exportReport(format, response);
    }

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/unites/upload")
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
