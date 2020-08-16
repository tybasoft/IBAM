package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.CompteRendu;
import com.tybasoft.ibam.repository.CompteRenduRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CompteRenduResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CompteRenduResourceIT {

    private static final String DEFAULT_TITRE = "AAAAAAAAAA";
    private static final String UPDATED_TITRE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENU = "AAAAAAAAAA";
    private static final String UPDATED_CONTENU = "BBBBBBBBBB";

    private static final String DEFAULT_FILE_PATH = "AAAAAAAAAA";
    private static final String UPDATED_FILE_PATH = "BBBBBBBBBB";

    @Autowired
    private CompteRenduRepository compteRenduRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCompteRenduMockMvc;

    private CompteRendu compteRendu;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CompteRendu createEntity(EntityManager em) {
        CompteRendu compteRendu = new CompteRendu()
            .titre(DEFAULT_TITRE)
            .contenu(DEFAULT_CONTENU)
            .filePath(DEFAULT_FILE_PATH);
        return compteRendu;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CompteRendu createUpdatedEntity(EntityManager em) {
        CompteRendu compteRendu = new CompteRendu()
            .titre(UPDATED_TITRE)
            .contenu(UPDATED_CONTENU)
            .filePath(UPDATED_FILE_PATH);
        return compteRendu;
    }

    @BeforeEach
    public void initTest() {
        compteRendu = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompteRendu() throws Exception {
        int databaseSizeBeforeCreate = compteRenduRepository.findAll().size();
        // Create the CompteRendu
        restCompteRenduMockMvc.perform(post("/api/compte-rendus")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(compteRendu)))
            .andExpect(status().isCreated());

        // Validate the CompteRendu in the database
        List<CompteRendu> compteRenduList = compteRenduRepository.findAll();
        assertThat(compteRenduList).hasSize(databaseSizeBeforeCreate + 1);
        CompteRendu testCompteRendu = compteRenduList.get(compteRenduList.size() - 1);
        assertThat(testCompteRendu.getTitre()).isEqualTo(DEFAULT_TITRE);
        assertThat(testCompteRendu.getContenu()).isEqualTo(DEFAULT_CONTENU);
        assertThat(testCompteRendu.getFilePath()).isEqualTo(DEFAULT_FILE_PATH);
    }

    @Test
    @Transactional
    public void createCompteRenduWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = compteRenduRepository.findAll().size();

        // Create the CompteRendu with an existing ID
        compteRendu.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompteRenduMockMvc.perform(post("/api/compte-rendus")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(compteRendu)))
            .andExpect(status().isBadRequest());

        // Validate the CompteRendu in the database
        List<CompteRendu> compteRenduList = compteRenduRepository.findAll();
        assertThat(compteRenduList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCompteRendus() throws Exception {
        // Initialize the database
        compteRenduRepository.saveAndFlush(compteRendu);

        // Get all the compteRenduList
        restCompteRenduMockMvc.perform(get("/api/compte-rendus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(compteRendu.getId().intValue())))
            .andExpect(jsonPath("$.[*].titre").value(hasItem(DEFAULT_TITRE)))
            .andExpect(jsonPath("$.[*].contenu").value(hasItem(DEFAULT_CONTENU)))
            .andExpect(jsonPath("$.[*].filePath").value(hasItem(DEFAULT_FILE_PATH)));
    }
    
    @Test
    @Transactional
    public void getCompteRendu() throws Exception {
        // Initialize the database
        compteRenduRepository.saveAndFlush(compteRendu);

        // Get the compteRendu
        restCompteRenduMockMvc.perform(get("/api/compte-rendus/{id}", compteRendu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(compteRendu.getId().intValue()))
            .andExpect(jsonPath("$.titre").value(DEFAULT_TITRE))
            .andExpect(jsonPath("$.contenu").value(DEFAULT_CONTENU))
            .andExpect(jsonPath("$.filePath").value(DEFAULT_FILE_PATH));
    }
    @Test
    @Transactional
    public void getNonExistingCompteRendu() throws Exception {
        // Get the compteRendu
        restCompteRenduMockMvc.perform(get("/api/compte-rendus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompteRendu() throws Exception {
        // Initialize the database
        compteRenduRepository.saveAndFlush(compteRendu);

        int databaseSizeBeforeUpdate = compteRenduRepository.findAll().size();

        // Update the compteRendu
        CompteRendu updatedCompteRendu = compteRenduRepository.findById(compteRendu.getId()).get();
        // Disconnect from session so that the updates on updatedCompteRendu are not directly saved in db
        em.detach(updatedCompteRendu);
        updatedCompteRendu
            .titre(UPDATED_TITRE)
            .contenu(UPDATED_CONTENU)
            .filePath(UPDATED_FILE_PATH);

        restCompteRenduMockMvc.perform(put("/api/compte-rendus")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompteRendu)))
            .andExpect(status().isOk());

        // Validate the CompteRendu in the database
        List<CompteRendu> compteRenduList = compteRenduRepository.findAll();
        assertThat(compteRenduList).hasSize(databaseSizeBeforeUpdate);
        CompteRendu testCompteRendu = compteRenduList.get(compteRenduList.size() - 1);
        assertThat(testCompteRendu.getTitre()).isEqualTo(UPDATED_TITRE);
        assertThat(testCompteRendu.getContenu()).isEqualTo(UPDATED_CONTENU);
        assertThat(testCompteRendu.getFilePath()).isEqualTo(UPDATED_FILE_PATH);
    }

    @Test
    @Transactional
    public void updateNonExistingCompteRendu() throws Exception {
        int databaseSizeBeforeUpdate = compteRenduRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompteRenduMockMvc.perform(put("/api/compte-rendus")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(compteRendu)))
            .andExpect(status().isBadRequest());

        // Validate the CompteRendu in the database
        List<CompteRendu> compteRenduList = compteRenduRepository.findAll();
        assertThat(compteRenduList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCompteRendu() throws Exception {
        // Initialize the database
        compteRenduRepository.saveAndFlush(compteRendu);

        int databaseSizeBeforeDelete = compteRenduRepository.findAll().size();

        // Delete the compteRendu
        restCompteRenduMockMvc.perform(delete("/api/compte-rendus/{id}", compteRendu.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CompteRendu> compteRenduList = compteRenduRepository.findAll();
        assertThat(compteRenduList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
