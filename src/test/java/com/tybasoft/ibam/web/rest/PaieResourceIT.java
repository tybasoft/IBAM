package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Paie;
import com.tybasoft.ibam.repository.PaieRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PaieResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class PaieResourceIT {

    private static final LocalDate DEFAULT_DATE_PAIEMENT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_PAIEMENT = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NBR_JOUR_TRAVAIL = "AAAAAAAAAA";
    private static final String UPDATED_NBR_JOUR_TRAVAIL = "BBBBBBBBBB";

    private static final String DEFAULT_MONTANT_PAY = "AAAAAAAAAA";
    private static final String UPDATED_MONTANT_PAY = "BBBBBBBBBB";

    private static final String DEFAULT_NBR_HEUR_SUP = "AAAAAAAAAA";
    private static final String UPDATED_NBR_HEUR_SUP = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_DEBUT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_DEBUT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FIN = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_REMARQUES = "AAAAAAAAAA";
    private static final String UPDATED_REMARQUES = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private PaieRepository paieRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPaieMockMvc;

    private Paie paie;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Paie createEntity(EntityManager em) {
        Paie paie = new Paie()
            .datePaiement(DEFAULT_DATE_PAIEMENT)
            .nbrJourTravail(DEFAULT_NBR_JOUR_TRAVAIL)
            .montantPay(DEFAULT_MONTANT_PAY)
            .nbrHeurSup(DEFAULT_NBR_HEUR_SUP)
            .dateDebut(DEFAULT_DATE_DEBUT)
            .dateFin(DEFAULT_DATE_FIN)
            .remarques(DEFAULT_REMARQUES)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return paie;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Paie createUpdatedEntity(EntityManager em) {
        Paie paie = new Paie()
            .datePaiement(UPDATED_DATE_PAIEMENT)
            .nbrJourTravail(UPDATED_NBR_JOUR_TRAVAIL)
            .montantPay(UPDATED_MONTANT_PAY)
            .nbrHeurSup(UPDATED_NBR_HEUR_SUP)
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN)
            .remarques(UPDATED_REMARQUES)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return paie;
    }

    @BeforeEach
    public void initTest() {
        paie = createEntity(em);
    }

    @Test
    @Transactional
    public void createPaie() throws Exception {
        int databaseSizeBeforeCreate = paieRepository.findAll().size();

        // Create the Paie
        restPaieMockMvc.perform(post("/api/paies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paie)))
            .andExpect(status().isCreated());

        // Validate the Paie in the database
        List<Paie> paieList = paieRepository.findAll();
        assertThat(paieList).hasSize(databaseSizeBeforeCreate + 1);
        Paie testPaie = paieList.get(paieList.size() - 1);
        assertThat(testPaie.getDatePaiement()).isEqualTo(DEFAULT_DATE_PAIEMENT);
        assertThat(testPaie.getNbrJourTravail()).isEqualTo(DEFAULT_NBR_JOUR_TRAVAIL);
        assertThat(testPaie.getMontantPay()).isEqualTo(DEFAULT_MONTANT_PAY);
        assertThat(testPaie.getNbrHeurSup()).isEqualTo(DEFAULT_NBR_HEUR_SUP);
        assertThat(testPaie.getDateDebut()).isEqualTo(DEFAULT_DATE_DEBUT);
        assertThat(testPaie.getDateFin()).isEqualTo(DEFAULT_DATE_FIN);
        assertThat(testPaie.getRemarques()).isEqualTo(DEFAULT_REMARQUES);
        assertThat(testPaie.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testPaie.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createPaieWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = paieRepository.findAll().size();

        // Create the Paie with an existing ID
        paie.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPaieMockMvc.perform(post("/api/paies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paie)))
            .andExpect(status().isBadRequest());

        // Validate the Paie in the database
        List<Paie> paieList = paieRepository.findAll();
        assertThat(paieList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDatePaiementIsRequired() throws Exception {
        int databaseSizeBeforeTest = paieRepository.findAll().size();
        // set the field null
        paie.setDatePaiement(null);

        // Create the Paie, which fails.

        restPaieMockMvc.perform(post("/api/paies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paie)))
            .andExpect(status().isBadRequest());

        List<Paie> paieList = paieRepository.findAll();
        assertThat(paieList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNbrJourTravailIsRequired() throws Exception {
        int databaseSizeBeforeTest = paieRepository.findAll().size();
        // set the field null
        paie.setNbrJourTravail(null);

        // Create the Paie, which fails.

        restPaieMockMvc.perform(post("/api/paies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paie)))
            .andExpect(status().isBadRequest());

        List<Paie> paieList = paieRepository.findAll();
        assertThat(paieList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMontantPayIsRequired() throws Exception {
        int databaseSizeBeforeTest = paieRepository.findAll().size();
        // set the field null
        paie.setMontantPay(null);

        // Create the Paie, which fails.

        restPaieMockMvc.perform(post("/api/paies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paie)))
            .andExpect(status().isBadRequest());

        List<Paie> paieList = paieRepository.findAll();
        assertThat(paieList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPaies() throws Exception {
        // Initialize the database
        paieRepository.saveAndFlush(paie);

        // Get all the paieList
        restPaieMockMvc.perform(get("/api/paies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paie.getId().intValue())))
            .andExpect(jsonPath("$.[*].datePaiement").value(hasItem(DEFAULT_DATE_PAIEMENT.toString())))
            .andExpect(jsonPath("$.[*].nbrJourTravail").value(hasItem(DEFAULT_NBR_JOUR_TRAVAIL)))
            .andExpect(jsonPath("$.[*].montantPay").value(hasItem(DEFAULT_MONTANT_PAY)))
            .andExpect(jsonPath("$.[*].nbrHeurSup").value(hasItem(DEFAULT_NBR_HEUR_SUP)))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())))
            .andExpect(jsonPath("$.[*].remarques").value(hasItem(DEFAULT_REMARQUES)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getPaie() throws Exception {
        // Initialize the database
        paieRepository.saveAndFlush(paie);

        // Get the paie
        restPaieMockMvc.perform(get("/api/paies/{id}", paie.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(paie.getId().intValue()))
            .andExpect(jsonPath("$.datePaiement").value(DEFAULT_DATE_PAIEMENT.toString()))
            .andExpect(jsonPath("$.nbrJourTravail").value(DEFAULT_NBR_JOUR_TRAVAIL))
            .andExpect(jsonPath("$.montantPay").value(DEFAULT_MONTANT_PAY))
            .andExpect(jsonPath("$.nbrHeurSup").value(DEFAULT_NBR_HEUR_SUP))
            .andExpect(jsonPath("$.dateDebut").value(DEFAULT_DATE_DEBUT.toString()))
            .andExpect(jsonPath("$.dateFin").value(DEFAULT_DATE_FIN.toString()))
            .andExpect(jsonPath("$.remarques").value(DEFAULT_REMARQUES))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPaie() throws Exception {
        // Get the paie
        restPaieMockMvc.perform(get("/api/paies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePaie() throws Exception {
        // Initialize the database
        paieRepository.saveAndFlush(paie);

        int databaseSizeBeforeUpdate = paieRepository.findAll().size();

        // Update the paie
        Paie updatedPaie = paieRepository.findById(paie.getId()).get();
        // Disconnect from session so that the updates on updatedPaie are not directly saved in db
        em.detach(updatedPaie);
        updatedPaie
            .datePaiement(UPDATED_DATE_PAIEMENT)
            .nbrJourTravail(UPDATED_NBR_JOUR_TRAVAIL)
            .montantPay(UPDATED_MONTANT_PAY)
            .nbrHeurSup(UPDATED_NBR_HEUR_SUP)
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN)
            .remarques(UPDATED_REMARQUES)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restPaieMockMvc.perform(put("/api/paies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPaie)))
            .andExpect(status().isOk());

        // Validate the Paie in the database
        List<Paie> paieList = paieRepository.findAll();
        assertThat(paieList).hasSize(databaseSizeBeforeUpdate);
        Paie testPaie = paieList.get(paieList.size() - 1);
        assertThat(testPaie.getDatePaiement()).isEqualTo(UPDATED_DATE_PAIEMENT);
        assertThat(testPaie.getNbrJourTravail()).isEqualTo(UPDATED_NBR_JOUR_TRAVAIL);
        assertThat(testPaie.getMontantPay()).isEqualTo(UPDATED_MONTANT_PAY);
        assertThat(testPaie.getNbrHeurSup()).isEqualTo(UPDATED_NBR_HEUR_SUP);
        assertThat(testPaie.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testPaie.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
        assertThat(testPaie.getRemarques()).isEqualTo(UPDATED_REMARQUES);
        assertThat(testPaie.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testPaie.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingPaie() throws Exception {
        int databaseSizeBeforeUpdate = paieRepository.findAll().size();

        // Create the Paie

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPaieMockMvc.perform(put("/api/paies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paie)))
            .andExpect(status().isBadRequest());

        // Validate the Paie in the database
        List<Paie> paieList = paieRepository.findAll();
        assertThat(paieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePaie() throws Exception {
        // Initialize the database
        paieRepository.saveAndFlush(paie);

        int databaseSizeBeforeDelete = paieRepository.findAll().size();

        // Delete the paie
        restPaieMockMvc.perform(delete("/api/paies/{id}", paie.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Paie> paieList = paieRepository.findAll();
        assertThat(paieList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
