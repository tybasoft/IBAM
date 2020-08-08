package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.FichePointage;
import com.tybasoft.ibam.repository.FichePointageRepository;

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
 * Integration tests for the {@link FichePointageResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class FichePointageResourceIT {

    private static final LocalDate DEFAULT_DATEJOUR = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATEJOUR = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private FichePointageRepository fichePointageRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFichePointageMockMvc;

    private FichePointage fichePointage;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FichePointage createEntity(EntityManager em) {
        FichePointage fichePointage = new FichePointage()
            .datejour(DEFAULT_DATEJOUR);
        return fichePointage;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FichePointage createUpdatedEntity(EntityManager em) {
        FichePointage fichePointage = new FichePointage()
            .datejour(UPDATED_DATEJOUR);
        return fichePointage;
    }

    @BeforeEach
    public void initTest() {
        fichePointage = createEntity(em);
    }

    @Test
    @Transactional
    public void createFichePointage() throws Exception {
        int databaseSizeBeforeCreate = fichePointageRepository.findAll().size();
        // Create the FichePointage
        restFichePointageMockMvc.perform(post("/api/fiche-pointages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fichePointage)))
            .andExpect(status().isCreated());

        // Validate the FichePointage in the database
        List<FichePointage> fichePointageList = fichePointageRepository.findAll();
        assertThat(fichePointageList).hasSize(databaseSizeBeforeCreate + 1);
        FichePointage testFichePointage = fichePointageList.get(fichePointageList.size() - 1);
        assertThat(testFichePointage.getDatejour()).isEqualTo(DEFAULT_DATEJOUR);
    }

    @Test
    @Transactional
    public void createFichePointageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fichePointageRepository.findAll().size();

        // Create the FichePointage with an existing ID
        fichePointage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFichePointageMockMvc.perform(post("/api/fiche-pointages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fichePointage)))
            .andExpect(status().isBadRequest());

        // Validate the FichePointage in the database
        List<FichePointage> fichePointageList = fichePointageRepository.findAll();
        assertThat(fichePointageList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFichePointages() throws Exception {
        // Initialize the database
        fichePointageRepository.saveAndFlush(fichePointage);

        // Get all the fichePointageList
        restFichePointageMockMvc.perform(get("/api/fiche-pointages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fichePointage.getId().intValue())))
            .andExpect(jsonPath("$.[*].datejour").value(hasItem(DEFAULT_DATEJOUR.toString())));
    }
    
    @Test
    @Transactional
    public void getFichePointage() throws Exception {
        // Initialize the database
        fichePointageRepository.saveAndFlush(fichePointage);

        // Get the fichePointage
        restFichePointageMockMvc.perform(get("/api/fiche-pointages/{id}", fichePointage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fichePointage.getId().intValue()))
            .andExpect(jsonPath("$.datejour").value(DEFAULT_DATEJOUR.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingFichePointage() throws Exception {
        // Get the fichePointage
        restFichePointageMockMvc.perform(get("/api/fiche-pointages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFichePointage() throws Exception {
        // Initialize the database
        fichePointageRepository.saveAndFlush(fichePointage);

        int databaseSizeBeforeUpdate = fichePointageRepository.findAll().size();

        // Update the fichePointage
        FichePointage updatedFichePointage = fichePointageRepository.findById(fichePointage.getId()).get();
        // Disconnect from session so that the updates on updatedFichePointage are not directly saved in db
        em.detach(updatedFichePointage);
        updatedFichePointage
            .datejour(UPDATED_DATEJOUR);

        restFichePointageMockMvc.perform(put("/api/fiche-pointages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFichePointage)))
            .andExpect(status().isOk());

        // Validate the FichePointage in the database
        List<FichePointage> fichePointageList = fichePointageRepository.findAll();
        assertThat(fichePointageList).hasSize(databaseSizeBeforeUpdate);
        FichePointage testFichePointage = fichePointageList.get(fichePointageList.size() - 1);
        assertThat(testFichePointage.getDatejour()).isEqualTo(UPDATED_DATEJOUR);
    }

    @Test
    @Transactional
    public void updateNonExistingFichePointage() throws Exception {
        int databaseSizeBeforeUpdate = fichePointageRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFichePointageMockMvc.perform(put("/api/fiche-pointages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fichePointage)))
            .andExpect(status().isBadRequest());

        // Validate the FichePointage in the database
        List<FichePointage> fichePointageList = fichePointageRepository.findAll();
        assertThat(fichePointageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFichePointage() throws Exception {
        // Initialize the database
        fichePointageRepository.saveAndFlush(fichePointage);

        int databaseSizeBeforeDelete = fichePointageRepository.findAll().size();

        // Delete the fichePointage
        restFichePointageMockMvc.perform(delete("/api/fiche-pointages/{id}", fichePointage.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FichePointage> fichePointageList = fichePointageRepository.findAll();
        assertThat(fichePointageList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
