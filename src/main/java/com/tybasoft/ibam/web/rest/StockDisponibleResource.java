package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.domain.LigneBonReception;
import com.tybasoft.ibam.domain.LigneBonSortie;
import com.tybasoft.ibam.domain.StockDisponible;
import com.tybasoft.ibam.repository.LigneBonReceptionRepository;
import com.tybasoft.ibam.repository.LigneBonSortieRepository;
import com.tybasoft.ibam.repository.StockDisponibleRepository;
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
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.StockDisponible}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StockDisponibleResource {

    private final Logger log = LoggerFactory.getLogger(StockDisponibleResource.class);

    private static final String ENTITY_NAME = "stockDisponible";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StockDisponibleRepository stockDisponibleRepository;
    @Autowired
    LigneBonSortieRepository ligneBonSortieRepository;
    @Autowired
    LigneBonReceptionRepository ligneBonReceptionRepository;


    public StockDisponibleResource(StockDisponibleRepository stockDisponibleRepository) {
        this.stockDisponibleRepository = stockDisponibleRepository;
    }

    /**
     * {@code POST  /stock-disponibles} : Create a new stockDisponible.
     *
     * @param stockDisponible the stockDisponible to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new stockDisponible, or with status {@code 400 (Bad Request)} if the stockDisponible has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/stock-disponibles")
    public ResponseEntity<StockDisponible> createStockDisponible(@Valid @RequestBody StockDisponible stockDisponible) throws URISyntaxException {
        log.debug("REST request to save StockDisponible : {}", stockDisponible);
        if (stockDisponible.getId() != null) {
            throw new BadRequestAlertException("A new stockDisponible cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StockDisponible result = stockDisponibleRepository.save(stockDisponible);
        return ResponseEntity.created(new URI("/api/stock-disponibles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /stock-disponibles} : Updates an existing stockDisponible.
     *
     * @param stockDisponible the stockDisponible to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated stockDisponible,
     * or with status {@code 400 (Bad Request)} if the stockDisponible is not valid,
     * or with status {@code 500 (Internal Server Error)} if the stockDisponible couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/stock-disponibles")
    public ResponseEntity<StockDisponible> updateStockDisponible(@Valid @RequestBody StockDisponible stockDisponible) throws URISyntaxException {
        log.debug("REST request to update StockDisponible : {}", stockDisponible);
        if (stockDisponible.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StockDisponible result = stockDisponibleRepository.save(stockDisponible);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, stockDisponible.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /stock-disponibles} : get all the stockDisponibles.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of stockDisponibles in body.
     */
    @GetMapping("/stock-disponibles")
    public ResponseEntity<List<StockDisponible>> getAllStockDisponibles(Pageable pageable) {
        log.debug("REST request to get a page of StockDisponibles");
        List<LigneBonReception> ligneBonReceptionList = ligneBonReceptionRepository.findAll();
        List<LigneBonSortie> ligneBonSortieList = ligneBonSortieRepository.findAll();
        List<String> referencesEnter = new ArrayList<>();
        List<String> referencesSortie = new ArrayList<>();


        ligneBonReceptionList.forEach(ligneBonReception -> {
            if(ligneBonReception.getMateriel()!=null){
                referencesEnter.add(ligneBonReception.getMateriel().getReference());
            }
            if(ligneBonReception.getMateriau()!=null){
                referencesEnter.add(ligneBonReception.getMateriau().getReference());
            }
        });

        ligneBonSortieList.forEach(ligneBonSortie -> {
            if(ligneBonSortie.getMateriel()!=null){
                referencesSortie.add(ligneBonSortie.getMateriel().getReference());
            }
            if(ligneBonSortie.getMateriau()!=null){
                referencesSortie.add(ligneBonSortie.getMateriau().getReference());
            }
        });////
        stockDisponibleRepository.deleteAll();

        for(int i =0 ; i<referencesSortie.size() ; i++){
            int qntReception=0;
            int qntSortie=0;
            int totaleQnt=0;
            List<LigneBonReception> ligneBonReception  = ligneBonReceptionRepository.findAllByMateriau_ReferenceOrMateriel_Reference(referencesSortie.get(i),referencesSortie.get(i));
            List<LigneBonSortie> ligneBonSorties  = ligneBonSortieRepository.findAllByMateriau_ReferenceOrMateriel_Reference(referencesSortie.get(i),referencesSortie.get(i));
            for(int j=0 ; j<ligneBonReception.size();j++){
                qntReception =qntReception + Integer.parseInt(ligneBonReception.get(j).getQuantite());
            }
            for(int j=0 ; j<ligneBonSorties.size();j++){
                qntSortie =qntSortie + Integer.parseInt(ligneBonSorties.get(j).getQuantite());
            }
            totaleQnt = qntReception-qntSortie;
            log.info(String.valueOf(totaleQnt));
            StockDisponible stockDisponible = new StockDisponible();
            if(ligneBonReception.get(i).getMateriau()!=null){
                stockDisponible.setMateriau(ligneBonReception.get(i).getMateriau());
                stockDisponible.setQuantite(String.valueOf(totaleQnt));
            }
            if(ligneBonReception.get(i).getMateriel()!=null){
                stockDisponible.setMateriel(ligneBonReception.get(i).getMateriel());
                stockDisponible.setQuantite(String.valueOf(totaleQnt));
            }
            stockDisponible.setDateStock(LocalDate.now());
            stockDisponible.setRemarque("test");
            stockDisponible.setUserModif("test");
            stockDisponible.setDateModif(LocalDate.now());
            log.info(stockDisponible.toString());
            stockDisponibleRepository.save(stockDisponible);

        }
//            log.info(referencesEnter.toString());
//            log.info(referencesSortie.toString());
//            log.info(referencesSortie.toString());

        Page<StockDisponible> page = stockDisponibleRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());

    }
    /**
     * {@code GET  /stock-disponibles/:id} : get the "id" stockDisponible.
     *
     * @param id the id of the stockDisponible to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the stockDisponible, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/stock-disponibles/{id}")
    public ResponseEntity<StockDisponible> getStockDisponible(@PathVariable Long id) {
        log.debug("REST request to get StockDisponible : {}", id);
        Optional<StockDisponible> stockDisponible = stockDisponibleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(stockDisponible);
    }

    /**
     * {@code DELETE  /stock-disponibles/:id} : delete the "id" stockDisponible.
     *
     * @param id the id of the stockDisponible to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/stock-disponibles/{id}")
    public ResponseEntity<Void> deleteStockDisponible(@PathVariable Long id) {
        log.debug("REST request to delete StockDisponible : {}", id);
        stockDisponibleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
