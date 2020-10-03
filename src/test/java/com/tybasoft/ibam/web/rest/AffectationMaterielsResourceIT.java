package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.AffectationMateriels;
import com.tybasoft.ibam.domain.Projet;
import com.tybasoft.ibam.domain.Materiel;
import com.tybasoft.ibam.repository.AffectationMaterielsRepository;

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
 * Integration tests for the {@link AffectationMaterielsResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AffectationMaterielsResourceIT {

    private static final LocalDate DEFAULT_DATE_DEBUT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_DEBUT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FIN = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private AffectationMaterielsRepository affectationMaterielsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAffectationMaterielsMockMvc;

    private AffectationMateriels affectationMateriels;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AffectationMateriels createEntity(EntityManager em) {
        AffectationMateriels affectationMateriels = new AffectationMateriels()
            .dateDebut(DEFAULT_DATE_DEBUT)
            .dateFin(DEFAULT_DATE_FIN)
            .description(DEFAULT_DESCRIPTION);
        // Add required entity
        Projet projet;
        if (TestUtil.findAll(em, Projet.class).isEmpty()) {
            projet = ProjetResourceIT.createEntity(em);
            em.persist(projet);
            em.flush();
        } else {
            projet = TestUtil.findAll(em, Projet.class).get(0);
        }
        affectationMateriels.setProjet(projet);
        // Add required entity
        Materiel materiel;
        if (TestUtil.findAll(em, Materiel.class).isEmpty()) {
            materiel = MaterielResourceIT.createEntity(em);
            em.persist(materiel);
            em.flush();
        } else {
            materiel = TestUtil.findAll(em, Materiel.class).get(0);
        }
        affectationMateriels.setMateriel(materiel);
        return affectationMateriels;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AffectationMateriels createUpdatedEntity(EntityManager em) {
        AffectationMateriels affectationMateriels = new AffectationMateriels()
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN)
            .description(UPDATED_DESCRIPTION);
        // Add required entity
        Projet projet;
        if (TestUtil.findAll(em, Projet.class).isEmpty()) {
            projet = ProjetResourceIT.createUpdatedEntity(em);
            em.persist(projet);
            em.flush();
        } else {
            projet = TestUtil.findAll(em, Projet.class).get(0);
        }
        affectationMateriels.setProjet(projet);
        // Add required entity
        Materiel materiel;
        if (TestUtil.findAll(em, Materiel.class).isEmpty()) {
            materiel = MaterielResourceIT.createUpdatedEntity(em);
            em.persist(materiel);
            em.flush();
        } else {
            materiel = TestUtil.findAll(em, Materiel.class).get(0);
        }
        affectationMateriels.setMateriel(materiel);
        return affectationMateriels;
    }

    @BeforeEach
    public void initTest() {
        affectationMateriels = createEntity(em);
    }

    @Test
    @Transactional
    public void createAffectationMateriels() throws Exception {
        int databaseSizeBeforeCreate = affectationMaterielsRepository.findAll().size();
        // Create the AffectationMateriels
        restAffectationMaterielsMockMvc.perform(post("/api/affectation-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(affectationMateriels)))
            .andExpect(status().isCreated());

        // Validate the AffectationMateriels in the database
        List<AffectationMateriels> affectationMaterielsList = affectationMaterielsRepository.findAll();
        assertThat(affectationMaterielsList).hasSize(databaseSizeBeforeCreate + 1);
        AffectationMateriels testAffectationMateriels = affectationMaterielsList.get(affectationMaterielsList.size() - 1);
        assertThat(testAffectationMateriels.getDateDebut()).isEqualTo(DEFAULT_DATE_DEBUT);
        assertThat(testAffectationMateriels.getDateFin()).isEqualTo(DEFAULT_DATE_FIN);
        assertThat(testAffectationMateriels.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createAffectationMaterielsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = affectationMaterielsRepository.findAll().size();

        // Create the AffectationMateriels with an existing ID
        affectationMateriels.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAffectationMaterielsMockMvc.perform(post("/api/affectation-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(affectationMateriels)))
            .andExpect(status().isBadRequest());

        // Validate the AffectationMateriels in the database
        List<AffectationMateriels> affectationMaterielsList = affectationMaterielsRepository.findAll();
        assertThat(affectationMaterielsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateDebutIsRequired() throws Exception {
        int databaseSizeBeforeTest = affectationMaterielsRepository.findAll().size();
        // set the field null
        affectationMateriels.setDateDebut(null);

        // Create the AffectationMateriels, which fails.


        restAffectationMaterielsMockMvc.perform(post("/api/affectation-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(affectationMateriels)))
            .andExpect(status().isBadRequest());

        List<AffectationMateriels> affectationMaterielsList = affectationMaterielsRepository.findAll();
        assertThat(affectationMaterielsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAffectationMateriels() throws Exception {
        // Initialize the database
        affectationMaterielsRepository.saveAndFlush(affectationMateriels);

        // Get all the affectationMaterielsList
        restAffectationMaterielsMockMvc.perform(get("/api/affectation-materiels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(affectationMateriels.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getAffectationMateriels() throws Exception {
        // Initialize the database
        affectationMaterielsRepository.saveAndFlush(affectationMateriels);

        // Get the affectationMateriels
        restAffectationMaterielsMockMvc.perform(get("/api/affectation-materiels/{id}", affectationMateriels.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(affectationMateriels.getId().intValue()))
            .andExpect(jsonPath("$.dateDebut").value(DEFAULT_DATE_DEBUT.toString()))
            .andExpect(jsonPath("$.dateFin").value(DEFAULT_DATE_FIN.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingAffectationMateriels() throws Exception {
        // Get the affectationMateriels
        restAffectationMaterielsMockMvc.perform(get("/api/affectation-materiels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAffectationMateriels() throws Exception {
        // Initialize the database
        affectationMaterielsRepository.saveAndFlush(affectationMateriels);

        int databaseSizeBeforeUpdate = affectationMaterielsRepository.findAll().size();

        // Update the affectationMateriels
        AffectationMateriels updatedAffectationMateriels = affectationMaterielsRepository.findById(affectationMateriels.getId()).get();
        // Disconnect from session so that the updates on updatedAffectationMateriels are not directly saved in db
        em.detach(updatedAffectationMateriels);
        updatedAffectationMateriels
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN)
            .description(UPDATED_DESCRIPTION);

        restAffectationMaterielsMockMvc.perform(put("/api/affectation-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAffectationMateriels)))
            .andExpect(status().isOk());

        // Validate the AffectationMateriels in the database
        List<AffectationMateriels> affectationMaterielsList = affectationMaterielsRepository.findAll();
        assertThat(affectationMaterielsList).hasSize(databaseSizeBeforeUpdate);
        AffectationMateriels testAffectationMateriels = affectationMaterielsList.get(affectationMaterielsList.size() - 1);
        assertThat(testAffectationMateriels.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testAffectationMateriels.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
        assertThat(testAffectationMateriels.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingAffectationMateriels() throws Exception {
        int databaseSizeBeforeUpdate = affectationMaterielsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAffectationMaterielsMockMvc.perform(put("/api/affectation-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(affectationMateriels)))
            .andExpect(status().isBadRequest());

        // Validate the AffectationMateriels in the database
        List<AffectationMateriels> affectationMaterielsList = affectationMaterielsRepository.findAll();
        assertThat(affectationMaterielsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAffectationMateriels() throws Exception {
        // Initialize the database
        affectationMaterielsRepository.saveAndFlush(affectationMateriels);

        int databaseSizeBeforeDelete = affectationMaterielsRepository.findAll().size();

        // Delete the affectationMateriels
        restAffectationMaterielsMockMvc.perform(delete("/api/affectation-materiels/{id}", affectationMateriels.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AffectationMateriels> affectationMaterielsList = affectationMaterielsRepository.findAll();
        assertThat(affectationMaterielsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
