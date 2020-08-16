package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.AffectationsMateriels;
import com.tybasoft.ibam.domain.Projet;
import com.tybasoft.ibam.domain.Materiel;
import com.tybasoft.ibam.repository.AffectationsMaterielsRepository;

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
 * Integration tests for the {@link AffectationsMaterielsResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AffectationsMaterielsResourceIT {

    private static final LocalDate DEFAULT_DATE_DEBUT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_DEBUT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FIN = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private AffectationsMaterielsRepository affectationsMaterielsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAffectationsMaterielsMockMvc;

    private AffectationsMateriels affectationsMateriels;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AffectationsMateriels createEntity(EntityManager em) {
        AffectationsMateriels affectationsMateriels = new AffectationsMateriels()
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
        affectationsMateriels.setProjet(projet);
        // Add required entity
        Materiel materiel;
        if (TestUtil.findAll(em, Materiel.class).isEmpty()) {
            materiel = MaterielResourceIT.createEntity(em);
            em.persist(materiel);
            em.flush();
        } else {
            materiel = TestUtil.findAll(em, Materiel.class).get(0);
        }
        affectationsMateriels.setMateriel(materiel);
        return affectationsMateriels;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AffectationsMateriels createUpdatedEntity(EntityManager em) {
        AffectationsMateriels affectationsMateriels = new AffectationsMateriels()
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
        affectationsMateriels.setProjet(projet);
        // Add required entity
        Materiel materiel;
        if (TestUtil.findAll(em, Materiel.class).isEmpty()) {
            materiel = MaterielResourceIT.createUpdatedEntity(em);
            em.persist(materiel);
            em.flush();
        } else {
            materiel = TestUtil.findAll(em, Materiel.class).get(0);
        }
        affectationsMateriels.setMateriel(materiel);
        return affectationsMateriels;
    }

    @BeforeEach
    public void initTest() {
        affectationsMateriels = createEntity(em);
    }

    @Test
    @Transactional
    public void createAffectationsMateriels() throws Exception {
        int databaseSizeBeforeCreate = affectationsMaterielsRepository.findAll().size();
        // Create the AffectationsMateriels
        restAffectationsMaterielsMockMvc.perform(post("/api/affectations-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(affectationsMateriels)))
            .andExpect(status().isCreated());

        // Validate the AffectationsMateriels in the database
        List<AffectationsMateriels> affectationsMaterielsList = affectationsMaterielsRepository.findAll();
        assertThat(affectationsMaterielsList).hasSize(databaseSizeBeforeCreate + 1);
        AffectationsMateriels testAffectationsMateriels = affectationsMaterielsList.get(affectationsMaterielsList.size() - 1);
        assertThat(testAffectationsMateriels.getDateDebut()).isEqualTo(DEFAULT_DATE_DEBUT);
        assertThat(testAffectationsMateriels.getDateFin()).isEqualTo(DEFAULT_DATE_FIN);
        assertThat(testAffectationsMateriels.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createAffectationsMaterielsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = affectationsMaterielsRepository.findAll().size();

        // Create the AffectationsMateriels with an existing ID
        affectationsMateriels.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAffectationsMaterielsMockMvc.perform(post("/api/affectations-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(affectationsMateriels)))
            .andExpect(status().isBadRequest());

        // Validate the AffectationsMateriels in the database
        List<AffectationsMateriels> affectationsMaterielsList = affectationsMaterielsRepository.findAll();
        assertThat(affectationsMaterielsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateDebutIsRequired() throws Exception {
        int databaseSizeBeforeTest = affectationsMaterielsRepository.findAll().size();
        // set the field null
        affectationsMateriels.setDateDebut(null);

        // Create the AffectationsMateriels, which fails.


        restAffectationsMaterielsMockMvc.perform(post("/api/affectations-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(affectationsMateriels)))
            .andExpect(status().isBadRequest());

        List<AffectationsMateriels> affectationsMaterielsList = affectationsMaterielsRepository.findAll();
        assertThat(affectationsMaterielsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAffectationsMateriels() throws Exception {
        // Initialize the database
        affectationsMaterielsRepository.saveAndFlush(affectationsMateriels);

        // Get all the affectationsMaterielsList
        restAffectationsMaterielsMockMvc.perform(get("/api/affectations-materiels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(affectationsMateriels.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getAffectationsMateriels() throws Exception {
        // Initialize the database
        affectationsMaterielsRepository.saveAndFlush(affectationsMateriels);

        // Get the affectationsMateriels
        restAffectationsMaterielsMockMvc.perform(get("/api/affectations-materiels/{id}", affectationsMateriels.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(affectationsMateriels.getId().intValue()))
            .andExpect(jsonPath("$.dateDebut").value(DEFAULT_DATE_DEBUT.toString()))
            .andExpect(jsonPath("$.dateFin").value(DEFAULT_DATE_FIN.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingAffectationsMateriels() throws Exception {
        // Get the affectationsMateriels
        restAffectationsMaterielsMockMvc.perform(get("/api/affectations-materiels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAffectationsMateriels() throws Exception {
        // Initialize the database
        affectationsMaterielsRepository.saveAndFlush(affectationsMateriels);

        int databaseSizeBeforeUpdate = affectationsMaterielsRepository.findAll().size();

        // Update the affectationsMateriels
        AffectationsMateriels updatedAffectationsMateriels = affectationsMaterielsRepository.findById(affectationsMateriels.getId()).get();
        // Disconnect from session so that the updates on updatedAffectationsMateriels are not directly saved in db
        em.detach(updatedAffectationsMateriels);
        updatedAffectationsMateriels
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN)
            .description(UPDATED_DESCRIPTION);

        restAffectationsMaterielsMockMvc.perform(put("/api/affectations-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAffectationsMateriels)))
            .andExpect(status().isOk());

        // Validate the AffectationsMateriels in the database
        List<AffectationsMateriels> affectationsMaterielsList = affectationsMaterielsRepository.findAll();
        assertThat(affectationsMaterielsList).hasSize(databaseSizeBeforeUpdate);
        AffectationsMateriels testAffectationsMateriels = affectationsMaterielsList.get(affectationsMaterielsList.size() - 1);
        assertThat(testAffectationsMateriels.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testAffectationsMateriels.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
        assertThat(testAffectationsMateriels.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingAffectationsMateriels() throws Exception {
        int databaseSizeBeforeUpdate = affectationsMaterielsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAffectationsMaterielsMockMvc.perform(put("/api/affectations-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(affectationsMateriels)))
            .andExpect(status().isBadRequest());

        // Validate the AffectationsMateriels in the database
        List<AffectationsMateriels> affectationsMaterielsList = affectationsMaterielsRepository.findAll();
        assertThat(affectationsMaterielsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAffectationsMateriels() throws Exception {
        // Initialize the database
        affectationsMaterielsRepository.saveAndFlush(affectationsMateriels);

        int databaseSizeBeforeDelete = affectationsMaterielsRepository.findAll().size();

        // Delete the affectationsMateriels
        restAffectationsMaterielsMockMvc.perform(delete("/api/affectations-materiels/{id}", affectationsMateriels.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AffectationsMateriels> affectationsMaterielsList = affectationsMaterielsRepository.findAll();
        assertThat(affectationsMaterielsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
