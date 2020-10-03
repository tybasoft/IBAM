package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Fonction;
import com.tybasoft.ibam.domain.Fournisseur;
import com.tybasoft.ibam.repository.FournisseurRepository;
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
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.Fournisseur}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FournisseurResource {

    private final Logger log = LoggerFactory.getLogger(FournisseurResource.class);

    private static final String ENTITY_NAME = "fournisseur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FournisseurRepository fournisseurRepository;

    public FournisseurResource(FournisseurRepository fournisseurRepository) {
        this.fournisseurRepository = fournisseurRepository;
    }

    /**
     * {@code POST  /fournisseurs} : Create a new fournisseur.
     *
     * @param fournisseur the fournisseur to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new fournisseur, or with status {@code 400 (Bad Request)} if
     *         the fournisseur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fournisseurs")
    public ResponseEntity<Fournisseur> createFournisseur(@Valid @RequestBody Fournisseur fournisseur)
            throws URISyntaxException {
        log.debug("REST request to save Fournisseur : {}", fournisseur);
        if (fournisseur.getId() != null) {
            throw new BadRequestAlertException("A new fournisseur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fournisseur result = fournisseurRepository.save(fournisseur);
        return ResponseEntity
                .created(new URI("/api/fournisseurs/" + result.getId())).headers(HeaderUtil
                        .createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /fournisseurs} : Updates an existing fournisseur.
     *
     * @param fournisseur the fournisseur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated fournisseur, or with status {@code 400 (Bad Request)} if
     *         the fournisseur is not valid, or with status
     *         {@code 500 (Internal Server Error)} if the fournisseur couldn't be
     *         updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fournisseurs")
    public ResponseEntity<Fournisseur> updateFournisseur(@Valid @RequestBody Fournisseur fournisseur)
            throws URISyntaxException {
        log.debug("REST request to update Fournisseur : {}", fournisseur);
        if (fournisseur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Fournisseur result = fournisseurRepository.save(fournisseur);
        return ResponseEntity.ok().headers(
                HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fournisseur.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /fournisseurs} : get all the fournisseurs.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of fournisseurs in body.
     */
    @GetMapping("/fournisseurs")
    public ResponseEntity<List<Fournisseur>> getAllFournisseurs(Pageable pageable) {
        log.debug("REST request to get a page of Fournisseurs");
        Page<Fournisseur> page = fournisseurRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil
                .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /fournisseurs/:id} : get the "id" fournisseur.
     *
     * @param id the id of the fournisseur to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the fournisseur, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fournisseurs/{id}")
    public ResponseEntity<Fournisseur> getFournisseur(@PathVariable Long id) {
        log.debug("REST request to get Fournisseur : {}", id);
        Optional<Fournisseur> fournisseur = fournisseurRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fournisseur);
    }


//    @GetMapping("/fournisseurs/search-entities/{keyword}")
//    public ResponseEntity<Collection<Fournisseur>> seachInAllEntities(@PathVariable String  keyword, Pageable pageable){
//        Page<Fournisseur> fournisseurs ;
////        String key = keyword.toLowerCase();
//        log.debug("GET ALL ENTITIES FOR SEARCHING IN FRONTEND");
//        log.debug(keyword);
//        fournisseurs = fournisseurRepository.findByNomIsContainingOrPrenomIsContainingOrTypeIsContainingOrNomCommercialIsContainingOrFaxIsContaining(keyword,keyword,keyword,keyword,keyword,pageable);
//        log.debug(String.valueOf(fournisseurs.stream().count()));
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), fournisseurs);
//
//        return ResponseEntity.ok().headers(headers).body(fournisseurs.getContent());
//    }

    /**
     * {@code DELETE  /fournisseurs/:id} : delete the "id" fournisseur.
     *
     * @param id the id of the fournisseur to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fournisseurs/{id}")
    public ResponseEntity<Void> deleteFournisseur(@PathVariable Long id) {
        log.debug("REST request to delete Fournisseur : {}", id);
        fournisseurRepository.deleteById(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }

    @Autowired
    private ReportService reportService;

    @GetMapping("/fournisseurs/report/{format}")
    public boolean generateReport(@PathVariable String format) {
        reportService.setName(ENTITY_NAME);
        reportService.setDataSource((List) fournisseurRepository.findAll());
        return reportService.exportReport(format);
    }

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/fournisseurs/upload")
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
