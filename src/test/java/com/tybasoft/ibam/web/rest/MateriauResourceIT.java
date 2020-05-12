package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Materiau;
import com.tybasoft.ibam.repository.MateriauRepository;

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
 * Integration tests for the {@link MateriauResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class MateriauResourceIT {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE = "BBBBBBBBBB";

    private static final String DEFAULT_POIDS = "AAAAAAAAAA";
    private static final String UPDATED_POIDS = "BBBBBBBBBB";

    private static final String DEFAULT_VOLUME = "AAAAAAAAAA";
    private static final String UPDATED_VOLUME = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private MateriauRepository materiauRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMateriauMockMvc;

    private Materiau materiau;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Materiau createEntity(EntityManager em) {
        Materiau materiau = new Materiau()
            .libelle(DEFAULT_LIBELLE)
            .reference(DEFAULT_REFERENCE)
            .poids(DEFAULT_POIDS)
            .volume(DEFAULT_VOLUME)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return materiau;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Materiau createUpdatedEntity(EntityManager em) {
        Materiau materiau = new Materiau()
            .libelle(UPDATED_LIBELLE)
            .reference(UPDATED_REFERENCE)
            .poids(UPDATED_POIDS)
            .volume(UPDATED_VOLUME)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return materiau;
    }

    @BeforeEach
    public void initTest() {
        materiau = createEntity(em);
    }

    @Test
    @Transactional
    public void createMateriau() throws Exception {
        int databaseSizeBeforeCreate = materiauRepository.findAll().size();

        // Create the Materiau
        restMateriauMockMvc.perform(post("/api/materiaus")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(materiau)))
            .andExpect(status().isCreated());

        // Validate the Materiau in the database
        List<Materiau> materiauList = materiauRepository.findAll();
        assertThat(materiauList).hasSize(databaseSizeBeforeCreate + 1);
        Materiau testMateriau = materiauList.get(materiauList.size() - 1);
        assertThat(testMateriau.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testMateriau.getReference()).isEqualTo(DEFAULT_REFERENCE);
        assertThat(testMateriau.getPoids()).isEqualTo(DEFAULT_POIDS);
        assertThat(testMateriau.getVolume()).isEqualTo(DEFAULT_VOLUME);
        assertThat(testMateriau.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testMateriau.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createMateriauWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = materiauRepository.findAll().size();

        // Create the Materiau with an existing ID
        materiau.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMateriauMockMvc.perform(post("/api/materiaus")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(materiau)))
            .andExpect(status().isBadRequest());

        // Validate the Materiau in the database
        List<Materiau> materiauList = materiauRepository.findAll();
        assertThat(materiauList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLibelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = materiauRepository.findAll().size();
        // set the field null
        materiau.setLibelle(null);

        // Create the Materiau, which fails.

        restMateriauMockMvc.perform(post("/api/materiaus")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(materiau)))
            .andExpect(status().isBadRequest());

        List<Materiau> materiauList = materiauRepository.findAll();
        assertThat(materiauList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkReferenceIsRequired() throws Exception {
        int databaseSizeBeforeTest = materiauRepository.findAll().size();
        // set the field null
        materiau.setReference(null);

        // Create the Materiau, which fails.

        restMateriauMockMvc.perform(post("/api/materiaus")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(materiau)))
            .andExpect(status().isBadRequest());

        List<Materiau> materiauList = materiauRepository.findAll();
        assertThat(materiauList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMateriaus() throws Exception {
        // Initialize the database
        materiauRepository.saveAndFlush(materiau);

        // Get all the materiauList
        restMateriauMockMvc.perform(get("/api/materiaus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(materiau.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].reference").value(hasItem(DEFAULT_REFERENCE)))
            .andExpect(jsonPath("$.[*].poids").value(hasItem(DEFAULT_POIDS)))
            .andExpect(jsonPath("$.[*].volume").value(hasItem(DEFAULT_VOLUME)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getMateriau() throws Exception {
        // Initialize the database
        materiauRepository.saveAndFlush(materiau);

        // Get the materiau
        restMateriauMockMvc.perform(get("/api/materiaus/{id}", materiau.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(materiau.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE))
            .andExpect(jsonPath("$.reference").value(DEFAULT_REFERENCE))
            .andExpect(jsonPath("$.poids").value(DEFAULT_POIDS))
            .andExpect(jsonPath("$.volume").value(DEFAULT_VOLUME))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMateriau() throws Exception {
        // Get the materiau
        restMateriauMockMvc.perform(get("/api/materiaus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMateriau() throws Exception {
        // Initialize the database
        materiauRepository.saveAndFlush(materiau);

        int databaseSizeBeforeUpdate = materiauRepository.findAll().size();

        // Update the materiau
        Materiau updatedMateriau = materiauRepository.findById(materiau.getId()).get();
        // Disconnect from session so that the updates on updatedMateriau are not directly saved in db
        em.detach(updatedMateriau);
        updatedMateriau
            .libelle(UPDATED_LIBELLE)
            .reference(UPDATED_REFERENCE)
            .poids(UPDATED_POIDS)
            .volume(UPDATED_VOLUME)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restMateriauMockMvc.perform(put("/api/materiaus")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMateriau)))
            .andExpect(status().isOk());

        // Validate the Materiau in the database
        List<Materiau> materiauList = materiauRepository.findAll();
        assertThat(materiauList).hasSize(databaseSizeBeforeUpdate);
        Materiau testMateriau = materiauList.get(materiauList.size() - 1);
        assertThat(testMateriau.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testMateriau.getReference()).isEqualTo(UPDATED_REFERENCE);
        assertThat(testMateriau.getPoids()).isEqualTo(UPDATED_POIDS);
        assertThat(testMateriau.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testMateriau.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testMateriau.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingMateriau() throws Exception {
        int databaseSizeBeforeUpdate = materiauRepository.findAll().size();

        // Create the Materiau

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMateriauMockMvc.perform(put("/api/materiaus")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(materiau)))
            .andExpect(status().isBadRequest());

        // Validate the Materiau in the database
        List<Materiau> materiauList = materiauRepository.findAll();
        assertThat(materiauList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMateriau() throws Exception {
        // Initialize the database
        materiauRepository.saveAndFlush(materiau);

        int databaseSizeBeforeDelete = materiauRepository.findAll().size();

        // Delete the materiau
        restMateriauMockMvc.perform(delete("/api/materiaus/{id}", materiau.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Materiau> materiauList = materiauRepository.findAll();
        assertThat(materiauList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
