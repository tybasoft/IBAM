package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Avancement;
import com.tybasoft.ibam.repository.AvancementRepository;

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
 * Integration tests for the {@link AvancementResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AvancementResourceIT {

    private static final LocalDate DEFAULT_CREATED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_AT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_UPDATED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_UPDATED_AT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private AvancementRepository avancementRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAvancementMockMvc;

    private Avancement avancement;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Avancement createEntity(EntityManager em) {
        Avancement avancement = new Avancement()
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return avancement;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Avancement createUpdatedEntity(EntityManager em) {
        Avancement avancement = new Avancement()
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        return avancement;
    }

    @BeforeEach
    public void initTest() {
        avancement = createEntity(em);
    }

    @Test
    @Transactional
    public void createAvancement() throws Exception {
        int databaseSizeBeforeCreate = avancementRepository.findAll().size();
        // Create the Avancement
        restAvancementMockMvc.perform(post("/api/avancements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(avancement)))
            .andExpect(status().isCreated());

        // Validate the Avancement in the database
        List<Avancement> avancementList = avancementRepository.findAll();
        assertThat(avancementList).hasSize(databaseSizeBeforeCreate + 1);
        Avancement testAvancement = avancementList.get(avancementList.size() - 1);
        assertThat(testAvancement.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testAvancement.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createAvancementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = avancementRepository.findAll().size();

        // Create the Avancement with an existing ID
        avancement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAvancementMockMvc.perform(post("/api/avancements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(avancement)))
            .andExpect(status().isBadRequest());

        // Validate the Avancement in the database
        List<Avancement> avancementList = avancementRepository.findAll();
        assertThat(avancementList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAvancements() throws Exception {
        // Initialize the database
        avancementRepository.saveAndFlush(avancement);

        // Get all the avancementList
        restAvancementMockMvc.perform(get("/api/avancements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(avancement.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }
    
    @Test
    @Transactional
    public void getAvancement() throws Exception {
        // Initialize the database
        avancementRepository.saveAndFlush(avancement);

        // Get the avancement
        restAvancementMockMvc.perform(get("/api/avancements/{id}", avancement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(avancement.getId().intValue()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAvancement() throws Exception {
        // Get the avancement
        restAvancementMockMvc.perform(get("/api/avancements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAvancement() throws Exception {
        // Initialize the database
        avancementRepository.saveAndFlush(avancement);

        int databaseSizeBeforeUpdate = avancementRepository.findAll().size();

        // Update the avancement
        Avancement updatedAvancement = avancementRepository.findById(avancement.getId()).get();
        // Disconnect from session so that the updates on updatedAvancement are not directly saved in db
        em.detach(updatedAvancement);
        updatedAvancement
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restAvancementMockMvc.perform(put("/api/avancements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAvancement)))
            .andExpect(status().isOk());

        // Validate the Avancement in the database
        List<Avancement> avancementList = avancementRepository.findAll();
        assertThat(avancementList).hasSize(databaseSizeBeforeUpdate);
        Avancement testAvancement = avancementList.get(avancementList.size() - 1);
        assertThat(testAvancement.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testAvancement.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingAvancement() throws Exception {
        int databaseSizeBeforeUpdate = avancementRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAvancementMockMvc.perform(put("/api/avancements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(avancement)))
            .andExpect(status().isBadRequest());

        // Validate the Avancement in the database
        List<Avancement> avancementList = avancementRepository.findAll();
        assertThat(avancementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAvancement() throws Exception {
        // Initialize the database
        avancementRepository.saveAndFlush(avancement);

        int databaseSizeBeforeDelete = avancementRepository.findAll().size();

        // Delete the avancement
        restAvancementMockMvc.perform(delete("/api/avancements/{id}", avancement.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Avancement> avancementList = avancementRepository.findAll();
        assertThat(avancementList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
