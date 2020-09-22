package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.Projet;
import com.tybasoft.ibam.domain.SituationFinanciere;
import com.tybasoft.ibam.repository.ProjetRepository;
import com.tybasoft.ibam.repository.SituationFinanciereRepository;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.SituationFinanciere}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SituationFinanciereResource {

    private final Logger log = LoggerFactory.getLogger(SituationFinanciereResource.class);

    private static final String ENTITY_NAME = "situationFinanciere";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    @Autowired
    ProjetRepository projetRepository;

    @Autowired
    ReportService reportService;

    private final SituationFinanciereRepository situationFinanciereRepository;

    public SituationFinanciereResource(SituationFinanciereRepository situationFinanciereRepository) {
        this.situationFinanciereRepository = situationFinanciereRepository;
    }

    /**
     * {@code POST  /situation-financieres} : Create a new situationFinanciere.
     *
     * @param situationFinanciere the situationFinanciere to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new situationFinanciere, or with status {@code 400 (Bad Request)} if the situationFinanciere has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/situation-financieres")
    public ResponseEntity<SituationFinanciere> createSituationFinanciere(@Valid @RequestBody SituationFinanciere situationFinanciere) throws URISyntaxException {
        log.debug("REST request to save SituationFinanciere : {}", situationFinanciere);
        if (situationFinanciere.getId() != null) {
            throw new BadRequestAlertException("A new situationFinanciere cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if(Long.parseLong(situationFinanciere.getMontantFacture())<=0){
            throw new BadRequestAlertException("Facture < ou = 0", ENTITY_NAME, "Project Situation");
        }
        Projet projet = projetRepository.findById(situationFinanciere.getProjet().getId()).orElseThrow(
            ()-> new BadRequestAlertException("Projet Not Found", ENTITY_NAME, "Projet"));

        List<SituationFinanciere> allSituationWithSameId = situationFinanciereRepository.findAllByProjet_IdOrderByMontantEnCours(projet.getId());
        Long sommeOfPaidFacture=0L ;
        Long montantEnCours = 0L;

        //Check if facturation date is after projet start date
        if(projet.getDateDebut().isAfter(situationFinanciere.getDateFacturation())){
            throw new BadRequestAlertException("Date de facturation incorrect", ENTITY_NAME, "Project Situation");
        }
        if(allSituationWithSameId.size() != 0){
            log.info("PROJECT WITH MIN OF 'Montant En Cours'");
            log.debug(String.valueOf(allSituationWithSameId.get(0).getMontantEnCours()));
            log.info("New Facture");
            log.debug(situationFinanciere.getMontantFacture());
            log.info("NUMBER OF PROJECT WITH THE SAME ID");
            log.info(String.valueOf(allSituationWithSameId.size()));

            //Check if price of 'facture' is lower than 'Montant en cours'
            if(Long.parseLong(allSituationWithSameId.get(0).getMontantEnCours()) < Long.parseLong(situationFinanciere.getMontantFacture())){
                throw new BadRequestAlertException("La Facture > Budget du projet", ENTITY_NAME, "Project Situation");
            }

            //Check if the date of previous 'facture' is before next date 'facture'
            if(allSituationWithSameId.get(0).getDateFacturation().isAfter(situationFinanciere.getDateFacturation())){
                throw new BadRequestAlertException("Date de facturation incorrect", ENTITY_NAME, "Project Situation");
            }
            for(int i = 0 ; i<allSituationWithSameId.size() ; i++){
                sommeOfPaidFacture =sommeOfPaidFacture+ Long.parseLong(allSituationWithSameId.get(i).getMontantFacture());
//                log.debug("SOMME OF 'Montant facture'");
//                log.debug(String.valueOf(sommeOfPaidFacture));
            }
            montantEnCours = Long.parseLong(projet.getBudget())- (sommeOfPaidFacture + Long.parseLong(situationFinanciere.getMontantFacture())) ;

        }
        else {
            //This is for the  first 'facture' object
            montantEnCours = Long.parseLong(projet.getBudget())- Long.parseLong(situationFinanciere.getMontantFacture()) ;
        }
        log.debug("SOMME OF 'Montant facture'", sommeOfPaidFacture);
        situationFinanciere.setMontantEnCours(String.valueOf(montantEnCours));
        SituationFinanciere result = situationFinanciereRepository.save(situationFinanciere);
        return ResponseEntity.created(new URI("/api/situation-financieres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /situation-financieres} : Updates an existing situationFinanciere.
     *
     * @param situationFinanciere the situationFinanciere to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated situationFinanciere,
     * or with status {@code 400 (Bad Request)} if the situationFinanciere is not valid,
     * or with status {@code 500 (Internal Server Error)} if the situationFinanciere couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/situation-financieres")
    public ResponseEntity<SituationFinanciere> updateSituationFinanciere(@Valid @RequestBody SituationFinanciere situationFinanciere) throws URISyntaxException {
        log.debug("REST request to update SituationFinanciere : {}", situationFinanciere);
        if (situationFinanciere.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if(Long.parseLong(situationFinanciere.getMontantFacture())<=0){
            throw new BadRequestAlertException("Facture < ou = 0", ENTITY_NAME, "Project Situation");
        }
        Projet projet = projetRepository.findById(situationFinanciere.getProjet().getId()).orElseThrow(
            ()-> new BadRequestAlertException("Projet Not Found", ENTITY_NAME, "Projet"));

        List<SituationFinanciere> allSituationWithSameId = situationFinanciereRepository.findAllByProjet_IdOrderByMontantEnCours(projet.getId());
        Long sommeOfPaidFacture=0L ;
        Long montantEnCours = 0L;

        if(allSituationWithSameId.size() != 0){


            log.info("PROJECT WITH MIN OF 'Montant En Cours'");
            log.debug(String.valueOf(allSituationWithSameId.get(0).getMontantEnCours()));
            log.info("New Facture");
            log.debug(situationFinanciere.getMontantFacture());
            log.info("NUMBER OF PROJECT WITH THE SAME ID");
            log.info(String.valueOf(allSituationWithSameId.size()));

            //Check if price of 'facture' is lower than 'Montant en cours'
            if(Long.parseLong(allSituationWithSameId.get(0).getMontantEnCours()) < Long.parseLong(situationFinanciere.getMontantFacture())){
                throw new BadRequestAlertException("La Facture > Budget du projet", ENTITY_NAME, "Project Situation");
            }

            log.info("IDs of projet");
            log.info(String.valueOf(situationFinanciere.getId()));
            for(int i = 0 ; i<allSituationWithSameId.size() ; i++){
                if(!allSituationWithSameId.get(i).getId().equals(situationFinanciere.getId())){
                    log.info(String.valueOf(allSituationWithSameId.get(i).getId()));
                    sommeOfPaidFacture = sommeOfPaidFacture+ Long.parseLong(allSituationWithSameId.get(i).getMontantFacture());
                }
            }
            montantEnCours = Long.parseLong(projet.getBudget()) - (sommeOfPaidFacture + Long.parseLong(situationFinanciere.getMontantFacture())) ;

        }
        else {
            //This is for the  first 'facture' object

            montantEnCours = Long.parseLong(projet.getBudget())- Long.parseLong(situationFinanciere.getMontantFacture()) ;
        }
        log.debug("SOMME OF 'Montant facture'", sommeOfPaidFacture);
        situationFinanciere.setMontantEnCours(String.valueOf(montantEnCours));
        SituationFinanciere result = situationFinanciereRepository.save(situationFinanciere);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, situationFinanciere.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /situation-financieres} : get all the situationFinancieres.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of situationFinancieres in body.
     */
    @GetMapping("/situation-financieres")
    public ResponseEntity<List<SituationFinanciere>> getAllSituationFinancieres(Pageable pageable) {
        log.debug("REST request to get a page of SituationFinancieres");
        Page<SituationFinanciere> page = situationFinanciereRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /situation-financieres/:id} : get the "id" situationFinanciere.
     *
     * @param id the id of the situationFinanciere to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the situationFinanciere, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/situation-financieres/{id}")
    public ResponseEntity<SituationFinanciere> getSituationFinanciere(@PathVariable Long id) {
        log.debug("REST request to get SituationFinanciere : {}", id);
        Optional<SituationFinanciere> situationFinanciere = situationFinanciereRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(situationFinanciere);
    }

    @GetMapping("/situation-financieres/report/{id}")
    public boolean getReportSituationFinanciere(@PathVariable Long id) {
        log.debug("REST request to get SituationFinanciere REPORT: {}", id);
        log.info("Downloading for ID : {} ", id);
        reportService.setName(ENTITY_NAME);
        reportService.setDataSource((List) situationFinanciereRepository.findAll());
        return reportService.exportReport("pdf");
//        Optional<SituationFinanciere> situationFinanciere = situationFinanciereRepository.findById(id);
//        return ResponseUtil.wrapOrNotFound();
    }

    /**
     * {@code DELETE  /situation-financieres/:id} : delete the "id" situationFinanciere.
     *
     * @param id the id of the situationFinanciere to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/situation-financieres/{id}")
    public ResponseEntity<Void> deleteSituationFinanciere(@PathVariable Long id) {
        log.debug("REST request to delete SituationFinanciere : {}", id);
        situationFinanciereRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
