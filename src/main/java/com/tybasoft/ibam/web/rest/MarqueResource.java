package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Maintenance;
import com.tybasoft.ibam.domain.Marque;
import com.tybasoft.ibam.repository.MarqueRepository;
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
import com.tybasoft.ibam.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.Marque}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MarqueResource {

    private final Logger log = LoggerFactory.getLogger(MarqueResource.class);

    private static final String ENTITY_NAME = "marque";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MarqueRepository marqueRepository;

    public MarqueResource(MarqueRepository marqueRepository) {
        this.marqueRepository = marqueRepository;
    }

    /**
     * {@code POST  /marques} : Create a new marque.
     *
     * @param marque the marque to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new marque, or with status {@code 400 (Bad Request)} if the
     *         marque has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/marques")
    public ResponseEntity<Marque> createMarque(@Valid @RequestBody Marque marque) throws URISyntaxException {
        log.debug("REST request to save Marque : {}", marque);
        if (marque.getId() != null) {
            throw new BadRequestAlertException("A new marque cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Marque result = marqueRepository.save(marque);
        return ResponseEntity
                .created(new URI("/api/marques/" + result.getId())).headers(HeaderUtil
                        .createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /marques} : Updates an existing marque.
     *
     * @param marque the marque to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated marque, or with status {@code 400 (Bad Request)} if the
     *         marque is not valid, or with status
     *         {@code 500 (Internal Server Error)} if the marque couldn't be
     *         updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/marques")
    public ResponseEntity<Marque> updateMarque(@Valid @RequestBody Marque marque) throws URISyntaxException {
        log.debug("REST request to update Marque : {}", marque);
        if (marque.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Marque result = marqueRepository.save(marque);
        return ResponseEntity.ok().headers(
                HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, marque.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /marques} : get all the marques.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of marques in body.
     */
    @GetMapping("/marques")
    public ResponseEntity<List<Marque>> getAllMarques(Pageable pageable) {
        log.debug("REST request to get a page of Marques");
        Page<Marque> page = marqueRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil
                .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /marques/:id} : get the "id" marque.
     *
     * @param id the id of the marque to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the marque, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/marques/{id}")
    public ResponseEntity<Marque> getMarque(@PathVariable Long id) {
        log.debug("REST request to get Marque : {}", id);
        Optional<Marque> marque = marqueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(marque);
    }

    @GetMapping("/marques/search-entities/{keyword}")
    public ResponseEntity<Collection<Marque>> seachInAllEntities(@PathVariable String  keyword, Pageable pageable){
        Page<Marque> marques ;
//        String key = keyword.toLowerCase();
        log.debug("GET ALL ENTITIES FOR SEARCHING IN FRONTEND");
        log.debug(keyword);
        marques = marqueRepository.findByDescriptionIsContainingOrLibelleIsContaining(keyword,keyword,pageable);
        log.debug(String.valueOf(marques.stream().count()));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), marques);

        return ResponseEntity.ok().headers(headers).body(marques.getContent());
    }


    /**
     * {@code DELETE  /marques/:id} : delete the "id" marque.
     *
     * @param id the id of the marque to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/marques/{id}")
    public ResponseEntity<Void> deleteMarque(@PathVariable Long id) {
        log.debug("REST request to delete Marque : {}", id);
        marqueRepository.deleteById(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }

    @Autowired
    private ReportService reportService;

    @GetMapping("/marques/report/{format}")
    public void generateReport(@PathVariable String format, HttpServletResponse response) {
        reportService.setName(ENTITY_NAME);
        reportService.setDataSource((List) marqueRepository.findAll());
        reportService.exportReport(format, response);
    }

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/marques/upload")
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
