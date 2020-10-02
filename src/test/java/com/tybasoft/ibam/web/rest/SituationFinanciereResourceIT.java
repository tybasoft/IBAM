package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.SituationFinanciere;
import com.tybasoft.ibam.domain.Projet;
import com.tybasoft.ibam.repository.SituationFinanciereRepository;

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
 * Integration tests for the {@link SituationFinanciereResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SituationFinanciereResourceIT {

    private static final String DEFAULT_MONTANT_FACTURE = "AAAAAAAAAA";
    private static final String UPDATED_MONTANT_FACTURE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_FACTURATION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FACTURATION = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_MONTANT_EN_COURS = "AAAAAAAAAA";
    private static final String UPDATED_MONTANT_EN_COURS = "BBBBBBBBBB";

    @Autowired
    private SituationFinanciereRepository situationFinanciereRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSituationFinanciereMockMvc;

    private SituationFinanciere situationFinanciere;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SituationFinanciere createEntity(EntityManager em) {
        SituationFinanciere situationFinanciere = new SituationFinanciere()
            .montantFacture(DEFAULT_MONTANT_FACTURE)
            .dateFacturation(DEFAULT_DATE_FACTURATION)
            .montantEnCours(DEFAULT_MONTANT_EN_COURS);
        // Add required entity
        Projet projet;
        if (TestUtil.findAll(em, Projet.class).isEmpty()) {
            projet = ProjetResourceIT.createEntity(em);
            em.persist(projet);
            em.flush();
        } else {
            projet = TestUtil.findAll(em, Projet.class).get(0);
        }
        situationFinanciere.setProjet(projet);
        return situationFinanciere;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SituationFinanciere createUpdatedEntity(EntityManager em) {
        SituationFinanciere situationFinanciere = new SituationFinanciere()
            .montantFacture(UPDATED_MONTANT_FACTURE)
            .dateFacturation(UPDATED_DATE_FACTURATION)
            .montantEnCours(UPDATED_MONTANT_EN_COURS);
        // Add required entity
        Projet projet;
        if (TestUtil.findAll(em, Projet.class).isEmpty()) {
            projet = ProjetResourceIT.createUpdatedEntity(em);
            em.persist(projet);
            em.flush();
        } else {
            projet = TestUtil.findAll(em, Projet.class).get(0);
        }
        situationFinanciere.setProjet(projet);
        return situationFinanciere;
    }

    @BeforeEach
    public void initTest() {
        situationFinanciere = createEntity(em);
    }

    @Test
    @Transactional
    public void createSituationFinanciere() throws Exception {
        int databaseSizeBeforeCreate = situationFinanciereRepository.findAll().size();
        // Create the SituationFinanciere
        restSituationFinanciereMockMvc.perform(post("/api/situation-financieres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(situationFinanciere)))
            .andExpect(status().isCreated());

        // Validate the SituationFinanciere in the database
        List<SituationFinanciere> situationFinanciereList = situationFinanciereRepository.findAll();
        assertThat(situationFinanciereList).hasSize(databaseSizeBeforeCreate + 1);
        SituationFinanciere testSituationFinanciere = situationFinanciereList.get(situationFinanciereList.size() - 1);
        assertThat(testSituationFinanciere.getMontantFacture()).isEqualTo(DEFAULT_MONTANT_FACTURE);
        assertThat(testSituationFinanciere.getDateFacturation()).isEqualTo(DEFAULT_DATE_FACTURATION);
        assertThat(testSituationFinanciere.getMontantEnCours()).isEqualTo(DEFAULT_MONTANT_EN_COURS);
    }

    @Test
    @Transactional
    public void createSituationFinanciereWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = situationFinanciereRepository.findAll().size();

        // Create the SituationFinanciere with an existing ID
        situationFinanciere.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSituationFinanciereMockMvc.perform(post("/api/situation-financieres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(situationFinanciere)))
            .andExpect(status().isBadRequest());

        // Validate the SituationFinanciere in the database
        List<SituationFinanciere> situationFinanciereList = situationFinanciereRepository.findAll();
        assertThat(situationFinanciereList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkMontantFactureIsRequired() throws Exception {
        int databaseSizeBeforeTest = situationFinanciereRepository.findAll().size();
        // set the field null
        situationFinanciere.setMontantFacture(null);

        // Create the SituationFinanciere, which fails.


        restSituationFinanciereMockMvc.perform(post("/api/situation-financieres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(situationFinanciere)))
            .andExpect(status().isBadRequest());

        List<SituationFinanciere> situationFinanciereList = situationFinanciereRepository.findAll();
        assertThat(situationFinanciereList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateFacturationIsRequired() throws Exception {
        int databaseSizeBeforeTest = situationFinanciereRepository.findAll().size();
        // set the field null
        situationFinanciere.setDateFacturation(null);

        // Create the SituationFinanciere, which fails.


        restSituationFinanciereMockMvc.perform(post("/api/situation-financieres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(situationFinanciere)))
            .andExpect(status().isBadRequest());

        List<SituationFinanciere> situationFinanciereList = situationFinanciereRepository.findAll();
        assertThat(situationFinanciereList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSituationFinancieres() throws Exception {
        // Initialize the database
        situationFinanciereRepository.saveAndFlush(situationFinanciere);

        // Get all the situationFinanciereList
        restSituationFinanciereMockMvc.perform(get("/api/situation-financieres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(situationFinanciere.getId().intValue())))
            .andExpect(jsonPath("$.[*].montantFacture").value(hasItem(DEFAULT_MONTANT_FACTURE)))
            .andExpect(jsonPath("$.[*].dateFacturation").value(hasItem(DEFAULT_DATE_FACTURATION.toString())))
            .andExpect(jsonPath("$.[*].montantEnCours").value(hasItem(DEFAULT_MONTANT_EN_COURS)));
    }
    
    @Test
    @Transactional
    public void getSituationFinanciere() throws Exception {
        // Initialize the database
        situationFinanciereRepository.saveAndFlush(situationFinanciere);

        // Get the situationFinanciere
        restSituationFinanciereMockMvc.perform(get("/api/situation-financieres/{id}", situationFinanciere.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(situationFinanciere.getId().intValue()))
            .andExpect(jsonPath("$.montantFacture").value(DEFAULT_MONTANT_FACTURE))
            .andExpect(jsonPath("$.dateFacturation").value(DEFAULT_DATE_FACTURATION.toString()))
            .andExpect(jsonPath("$.montantEnCours").value(DEFAULT_MONTANT_EN_COURS));
    }
    @Test
    @Transactional
    public void getNonExistingSituationFinanciere() throws Exception {
        // Get the situationFinanciere
        restSituationFinanciereMockMvc.perform(get("/api/situation-financieres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSituationFinanciere() throws Exception {
        // Initialize the database
        situationFinanciereRepository.saveAndFlush(situationFinanciere);

        int databaseSizeBeforeUpdate = situationFinanciereRepository.findAll().size();

        // Update the situationFinanciere
        SituationFinanciere updatedSituationFinanciere = situationFinanciereRepository.findById(situationFinanciere.getId()).get();
        // Disconnect from session so that the updates on updatedSituationFinanciere are not directly saved in db
        em.detach(updatedSituationFinanciere);
        updatedSituationFinanciere
            .montantFacture(UPDATED_MONTANT_FACTURE)
            .dateFacturation(UPDATED_DATE_FACTURATION)
            .montantEnCours(UPDATED_MONTANT_EN_COURS);

        restSituationFinanciereMockMvc.perform(put("/api/situation-financieres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSituationFinanciere)))
            .andExpect(status().isOk());

        // Validate the SituationFinanciere in the database
        List<SituationFinanciere> situationFinanciereList = situationFinanciereRepository.findAll();
        assertThat(situationFinanciereList).hasSize(databaseSizeBeforeUpdate);
        SituationFinanciere testSituationFinanciere = situationFinanciereList.get(situationFinanciereList.size() - 1);
        assertThat(testSituationFinanciere.getMontantFacture()).isEqualTo(UPDATED_MONTANT_FACTURE);
        assertThat(testSituationFinanciere.getDateFacturation()).isEqualTo(UPDATED_DATE_FACTURATION);
        assertThat(testSituationFinanciere.getMontantEnCours()).isEqualTo(UPDATED_MONTANT_EN_COURS);
    }

    @Test
    @Transactional
    public void updateNonExistingSituationFinanciere() throws Exception {
        int databaseSizeBeforeUpdate = situationFinanciereRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSituationFinanciereMockMvc.perform(put("/api/situation-financieres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(situationFinanciere)))
            .andExpect(status().isBadRequest());

        // Validate the SituationFinanciere in the database
        List<SituationFinanciere> situationFinanciereList = situationFinanciereRepository.findAll();
        assertThat(situationFinanciereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSituationFinanciere() throws Exception {
        // Initialize the database
        situationFinanciereRepository.saveAndFlush(situationFinanciere);

        int databaseSizeBeforeDelete = situationFinanciereRepository.findAll().size();

        // Delete the situationFinanciere
        restSituationFinanciereMockMvc.perform(delete("/api/situation-financieres/{id}", situationFinanciere.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SituationFinanciere> situationFinanciereList = situationFinanciereRepository.findAll();
        assertThat(situationFinanciereList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
