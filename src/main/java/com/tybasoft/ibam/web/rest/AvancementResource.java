package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Avancement;
import com.tybasoft.ibam.repository.AvancementRepository;
import com.tybasoft.ibam.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import com.itextpdf.html2pdf.HtmlConverter;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.Avancement}.
 */
@CrossOrigin(origins = "http://localhost:9000/*")
@RestController
@RequestMapping("/api")
@Transactional
public class AvancementResource {

    private final Logger log = LoggerFactory.getLogger(AvancementResource.class);

    private static final String ENTITY_NAME = "avancement";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AvancementRepository avancementRepository;

    public AvancementResource(AvancementRepository avancementRepository) {
        this.avancementRepository = avancementRepository;
    }

    /**
     * {@code POST  /avancements} : Create a new avancement.
     *
     * @param avancement the avancement to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new avancement, or with status {@code 400 (Bad Request)} if the avancement has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/avancements")
    public ResponseEntity<Avancement> createAvancement(@Valid @RequestBody Avancement avancement) throws URISyntaxException {
        log.debug("REST request to save Avancement : {}", avancement);
        if (avancement.getId() != null) {
            throw new BadRequestAlertException("A new avancement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Avancement result = avancementRepository.save(avancement);
        return ResponseEntity.created(new URI("/api/avancements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /avancements} : Updates an existing avancement.
     *
     * @param avancement the avancement to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated avancement,
     * or with status {@code 400 (Bad Request)} if the avancement is not valid,
     * or with status {@code 500 (Internal Server Error)} if the avancement couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/avancements")
    public ResponseEntity<Avancement> updateAvancement(@Valid @RequestBody Avancement avancement) throws URISyntaxException {
        log.debug("REST request to update Avancement : {}", avancement);
        if (avancement.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Avancement result = avancementRepository.save(avancement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, avancement.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /avancements} : get all the avancements.
     *m
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of avancements in body.
     */
    @GetMapping("/avancements")
    public ResponseEntity<List<Avancement>> getAllAvancements(Pageable pageable) {
        log.debug("REST request to get a page of Avancements");
        Page<Avancement> page = avancementRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    @GetMapping("/avancements/{id}/download")
    public boolean downloadPdf(@PathVariable long id) throws IOException {
        log.debug("REST request to download PDF of avancement : {}", id);
        Avancement avancement = avancementRepository.findById(id).get();
        String title = avancement.getTitreCompteRendu();
        String content = avancement.getContenuCompteRendu();
        LocalDate date = avancement.getCreatedAt();
        String  redacteur = avancement.getEmploye().getNom();
        String wrapper = "<div style=\"margin-top:200px\"></div><div><strong>Titre:</span>"+title+
            "<div style=\"margin-top:40px\"></div><strong>Rédacteur:</span>"+redacteur+
            "<div style=\"margin-top:40px\"></div><strong>Date de rédaction:</span>" +date+
            "<div style=\"margin-top:80px\"></div>"+content;
        LocalDate today = LocalDate.now();
        HtmlConverter.convertToPdf(wrapper, new FileOutputStream("compte_rendu_"+avancement.getId()+"_"+today+".pdf"));

        System.out.println( "PDF Created!" );
        return true;
    }

    /**
     * {@code GET  /avancements/:id} : get the "id" avancement.
     *
     * @param id the id of the avancement to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the avancement, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/avancements/{id}")
    public ResponseEntity<Avancement> getAvancement(@PathVariable Long id) {
        log.debug("REST request to get Avancement : {}", id);
        Optional<Avancement> avancement = avancementRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(avancement);
    }

    /**
     * {@code DELETE  /avancements/:id} : delete the "id" avancement.
     *
     * @param id the id of the avancement to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/avancements/{id}")
    public ResponseEntity<Void> deleteAvancement(@PathVariable Long id) {
        log.debug("REST request to delete Avancement : {}", id);
        avancementRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
