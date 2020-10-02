package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Fournisseur;
import com.tybasoft.ibam.domain.Horaire;
import com.tybasoft.ibam.repository.HoraireRepository;
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
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.Horaire}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class HoraireResource {

    private final Logger log = LoggerFactory.getLogger(HoraireResource.class);

    private static final String ENTITY_NAME = "horaire";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HoraireRepository horaireRepository;

    public HoraireResource(HoraireRepository horaireRepository) {
        this.horaireRepository = horaireRepository;
    }

    /**
     * {@code POST  /horaires} : Create a new horaire.
     *
     * @param horaire the horaire to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new horaire, or with status {@code 400 (Bad Request)} if the
     *         horaire has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/horaires")
    public ResponseEntity<Horaire> createHoraire(@Valid @RequestBody Horaire horaire) throws URISyntaxException {
        log.debug("REST request to save Horaire : {}", horaire);
        if (horaire.getId() != null) {
            throw new BadRequestAlertException("A new horaire cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Horaire result = horaireRepository.save(horaire);
        return ResponseEntity
                .created(new URI("/api/horaires/" + result.getId())).headers(HeaderUtil
                        .createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /horaires} : Updates an existing horaire.
     *
     * @param horaire the horaire to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated horaire, or with status {@code 400 (Bad Request)} if the
     *         horaire is not valid, or with status
     *         {@code 500 (Internal Server Error)} if the horaire couldn't be
     *         updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/horaires")
    public ResponseEntity<Horaire> updateHoraire(@Valid @RequestBody Horaire horaire) throws URISyntaxException {
        log.debug("REST request to update Horaire : {}", horaire);
        if (horaire.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Horaire result = horaireRepository.save(horaire);
        return ResponseEntity.ok().headers(
                HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, horaire.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /horaires} : get all the horaires.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of horaires in body.
     */
    @GetMapping("/horaires")
    public List<Horaire> getAllHoraires() {
        log.debug("REST request to get all Horaires");
        return horaireRepository.findAll();
    }

    /**
     * {@code GET  /horaires/:id} : get the "id" horaire.
     *
     * @param id the id of the horaire to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the horaire, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/horaires/{id}")
    public ResponseEntity<Horaire> getHoraire(@PathVariable Long id) {
        log.debug("REST request to get Horaire : {}", id);
        Optional<Horaire> horaire = horaireRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(horaire);
    }


    @GetMapping("/horaires/search-entities/{keyword}")
    public ResponseEntity<Collection<Horaire>> seachInAllEntities(@PathVariable String  keyword){
        List<Horaire> horaires ;
//        String key = keyword.toLowerCase();
        log.debug("GET ALL ENTITIES FOR SEARCHING IN FRONTEND");
        log.debug(keyword);
        horaires = horaireRepository.findByLibelleIsContainingOrNbrHeurParJrIsContainingOrNbrJourParSemIsContaining(keyword,keyword,keyword);
        log.debug(String.valueOf(horaires.stream().count()));
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), fournisseurs);

        return ResponseEntity.ok().body(horaires);
    }
    /**
     * {@code DELETE  /horaires/:id} : delete the "id" horaire.
     *
     * @param id the id of the horaire to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/horaires/{id}")
    public ResponseEntity<Void> deleteHoraire(@PathVariable Long id) {
        log.debug("REST request to delete Horaire : {}", id);
        horaireRepository.deleteById(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }

    @Autowired
    private ReportService reportService;

    @GetMapping("/horaires/report/{format}")
    public boolean generateReport(@PathVariable String format) {
        reportService.setName(ENTITY_NAME);
        reportService.setDataSource((List) horaireRepository.findAll());
        return reportService.exportReport(format);
    }

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/horaires/upload")
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
