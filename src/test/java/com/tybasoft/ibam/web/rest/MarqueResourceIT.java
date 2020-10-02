package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Marque;
import com.tybasoft.ibam.repository.MarqueRepository;

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

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MarqueResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class MarqueResourceIT {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_MODIF = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_MODIF = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private MarqueRepository marqueRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMarqueMockMvc;

    private Marque marque;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Marque createEntity(EntityManager em) {
        Marque marque = new Marque()
            .libelle(DEFAULT_LIBELLE)
            .description(DEFAULT_DESCRIPTION)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return marque;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Marque createUpdatedEntity(EntityManager em) {
        Marque marque = new Marque()
            .libelle(UPDATED_LIBELLE)
            .description(UPDATED_DESCRIPTION)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return marque;
    }

    @BeforeEach
    public void initTest() {
        marque = createEntity(em);
    }

    @Test
    @Transactional
    public void createMarque() throws Exception {
        int databaseSizeBeforeCreate = marqueRepository.findAll().size();

        // Create the Marque
        restMarqueMockMvc.perform(post("/api/marques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(marque)))
            .andExpect(status().isCreated());

        // Validate the Marque in the database
        List<Marque> marqueList = marqueRepository.findAll();
        assertThat(marqueList).hasSize(databaseSizeBeforeCreate + 1);
        Marque testMarque = marqueList.get(marqueList.size() - 1);
        assertThat(testMarque.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testMarque.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testMarque.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testMarque.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createMarqueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = marqueRepository.findAll().size();

        // Create the Marque with an existing ID
        marque.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMarqueMockMvc.perform(post("/api/marques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(marque)))
            .andExpect(status().isBadRequest());

        // Validate the Marque in the database
        List<Marque> marqueList = marqueRepository.findAll();
        assertThat(marqueList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLibelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = marqueRepository.findAll().size();
        // set the field null
        marque.setLibelle(null);

        // Create the Marque, which fails.

        restMarqueMockMvc.perform(post("/api/marques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(marque)))
            .andExpect(status().isBadRequest());

        List<Marque> marqueList = marqueRepository.findAll();
        assertThat(marqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMarques() throws Exception {
        // Initialize the database
        marqueRepository.saveAndFlush(marque);

        // Get all the marqueList
        restMarqueMockMvc.perform(get("/api/marques?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(marque.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getMarque() throws Exception {
        // Initialize the database
        marqueRepository.saveAndFlush(marque);

        // Get the marque
        restMarqueMockMvc.perform(get("/api/marques/{id}", marque.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(marque.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMarque() throws Exception {
        // Get the marque
        restMarqueMockMvc.perform(get("/api/marques/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMarque() throws Exception {
        // Initialize the database
        marqueRepository.saveAndFlush(marque);

        int databaseSizeBeforeUpdate = marqueRepository.findAll().size();

        // Update the marque
        Marque updatedMarque = marqueRepository.findById(marque.getId()).get();
        // Disconnect from session so that the updates on updatedMarque are not directly saved in db
        em.detach(updatedMarque);
        updatedMarque
            .libelle(UPDATED_LIBELLE)
            .description(UPDATED_DESCRIPTION)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restMarqueMockMvc.perform(put("/api/marques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMarque)))
            .andExpect(status().isOk());

        // Validate the Marque in the database
        List<Marque> marqueList = marqueRepository.findAll();
        assertThat(marqueList).hasSize(databaseSizeBeforeUpdate);
        Marque testMarque = marqueList.get(marqueList.size() - 1);
        assertThat(testMarque.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testMarque.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testMarque.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testMarque.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingMarque() throws Exception {
        int databaseSizeBeforeUpdate = marqueRepository.findAll().size();

        // Create the Marque

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMarqueMockMvc.perform(put("/api/marques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(marque)))
            .andExpect(status().isBadRequest());

        // Validate the Marque in the database
        List<Marque> marqueList = marqueRepository.findAll();
        assertThat(marqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMarque() throws Exception {
        // Initialize the database
        marqueRepository.saveAndFlush(marque);

        int databaseSizeBeforeDelete = marqueRepository.findAll().size();

        // Delete the marque
        restMarqueMockMvc.perform(delete("/api/marques/{id}", marque.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Marque> marqueList = marqueRepository.findAll();
        assertThat(marqueList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
