package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Famille;
import com.tybasoft.ibam.repository.FamilleRepository;

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
 * Integration tests for the {@link FamilleResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class FamilleResourceIT {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private FamilleRepository familleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFamilleMockMvc;

    private Famille famille;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Famille createEntity(EntityManager em) {
        Famille famille = new Famille()
            .libelle(DEFAULT_LIBELLE)
            .description(DEFAULT_DESCRIPTION)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return famille;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Famille createUpdatedEntity(EntityManager em) {
        Famille famille = new Famille()
            .libelle(UPDATED_LIBELLE)
            .description(UPDATED_DESCRIPTION)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return famille;
    }

    @BeforeEach
    public void initTest() {
        famille = createEntity(em);
    }

    @Test
    @Transactional
    public void createFamille() throws Exception {
        int databaseSizeBeforeCreate = familleRepository.findAll().size();

        // Create the Famille
        restFamilleMockMvc.perform(post("/api/familles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(famille)))
            .andExpect(status().isCreated());

        // Validate the Famille in the database
        List<Famille> familleList = familleRepository.findAll();
        assertThat(familleList).hasSize(databaseSizeBeforeCreate + 1);
        Famille testFamille = familleList.get(familleList.size() - 1);
        assertThat(testFamille.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testFamille.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testFamille.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testFamille.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createFamilleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = familleRepository.findAll().size();

        // Create the Famille with an existing ID
        famille.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFamilleMockMvc.perform(post("/api/familles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(famille)))
            .andExpect(status().isBadRequest());

        // Validate the Famille in the database
        List<Famille> familleList = familleRepository.findAll();
        assertThat(familleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLibelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = familleRepository.findAll().size();
        // set the field null
        famille.setLibelle(null);

        // Create the Famille, which fails.

        restFamilleMockMvc.perform(post("/api/familles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(famille)))
            .andExpect(status().isBadRequest());

        List<Famille> familleList = familleRepository.findAll();
        assertThat(familleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFamilles() throws Exception {
        // Initialize the database
        familleRepository.saveAndFlush(famille);

        // Get all the familleList
        restFamilleMockMvc.perform(get("/api/familles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(famille.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getFamille() throws Exception {
        // Initialize the database
        familleRepository.saveAndFlush(famille);

        // Get the famille
        restFamilleMockMvc.perform(get("/api/familles/{id}", famille.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(famille.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFamille() throws Exception {
        // Get the famille
        restFamilleMockMvc.perform(get("/api/familles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFamille() throws Exception {
        // Initialize the database
        familleRepository.saveAndFlush(famille);

        int databaseSizeBeforeUpdate = familleRepository.findAll().size();

        // Update the famille
        Famille updatedFamille = familleRepository.findById(famille.getId()).get();
        // Disconnect from session so that the updates on updatedFamille are not directly saved in db
        em.detach(updatedFamille);
        updatedFamille
            .libelle(UPDATED_LIBELLE)
            .description(UPDATED_DESCRIPTION)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restFamilleMockMvc.perform(put("/api/familles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFamille)))
            .andExpect(status().isOk());

        // Validate the Famille in the database
        List<Famille> familleList = familleRepository.findAll();
        assertThat(familleList).hasSize(databaseSizeBeforeUpdate);
        Famille testFamille = familleList.get(familleList.size() - 1);
        assertThat(testFamille.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testFamille.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testFamille.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testFamille.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingFamille() throws Exception {
        int databaseSizeBeforeUpdate = familleRepository.findAll().size();

        // Create the Famille

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFamilleMockMvc.perform(put("/api/familles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(famille)))
            .andExpect(status().isBadRequest());

        // Validate the Famille in the database
        List<Famille> familleList = familleRepository.findAll();
        assertThat(familleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFamille() throws Exception {
        // Initialize the database
        familleRepository.saveAndFlush(famille);

        int databaseSizeBeforeDelete = familleRepository.findAll().size();

        // Delete the famille
        restFamilleMockMvc.perform(delete("/api/familles/{id}", famille.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Famille> familleList = familleRepository.findAll();
        assertThat(familleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
